import * as yup from 'yup';

export const incomeValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  source: yup.string().required(),
  income_date: yup.date().required(),
  user_id: yup.string().nullable().required(),
  family_id: yup.string().nullable().required(),
});
