import * as yup from 'yup';

export const reviewValidationSchema = yup.object().shape({
  comment: yup.string().required(),
  rating: yup.number().integer().required(),
  customer_id: yup.string().nullable(),
  product_id: yup.string().nullable(),
});
