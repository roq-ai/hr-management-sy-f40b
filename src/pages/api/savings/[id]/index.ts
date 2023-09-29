import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { savingsValidationSchema } from 'validationSchema/savings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.savings
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getSavingsById();
    case 'PUT':
      return updateSavingsById();
    case 'DELETE':
      return deleteSavingsById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSavingsById() {
    const data = await prisma.savings.findFirst(convertQueryToPrismaUtil(req.query, 'savings'));
    return res.status(200).json(data);
  }

  async function updateSavingsById() {
    await savingsValidationSchema.validate(req.body);
    const data = await prisma.savings.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteSavingsById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.savings.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
