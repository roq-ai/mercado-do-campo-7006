import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  total: yup.number().integer().required(),
  delivery_address: yup.string().required(),
  order_status: yup.string().required(),
  customer_id: yup.string().nullable(),
});
