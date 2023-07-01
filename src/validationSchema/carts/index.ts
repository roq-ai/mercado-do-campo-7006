import * as yup from 'yup';

export const cartValidationSchema = yup.object().shape({
  customer_id: yup.string().nullable(),
});
