import * as yup from 'yup';

export const savingsValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  saving_date: yup.date().required(),
  purpose: yup.string().required(),
  user_id: yup.string().nullable().required(),
  family_id: yup.string().nullable().required(),
});
