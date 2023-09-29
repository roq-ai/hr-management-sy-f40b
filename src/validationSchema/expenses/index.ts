import * as yup from 'yup';

export const expenseValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  reason: yup.string().required(),
  expense_date: yup.date().required(),
  user_id: yup.string().nullable().required(),
  family_id: yup.string().nullable().required(),
});
