import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getOrderById, updateOrderById } from 'apiSdk/orders';
import { Error } from 'components/error';
import { orderValidationSchema } from 'validationSchema/orders';
import { OrderInterface } from 'interfaces/order';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CustomerInterface } from 'interfaces/customer';
import { getCustomers } from 'apiSdk/customers';

function OrderEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OrderInterface>(
    () => (id ? `/orders/${id}` : null),
    () => getOrderById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OrderInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOrderById(id, values);
      mutate(updated);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<OrderInterface>({
    initialValues: data,
    validationSchema: orderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Order
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="total" mb="4" isInvalid={!!formik.errors?.total}>
              <FormLabel>Total</FormLabel>
              <NumberInput
                name="total"
                value={formik.values?.total}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('total', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.total && <FormErrorMessage>{formik.errors?.total}</FormErrorMessage>}
            </FormControl>
            <FormControl id="delivery_address" mb="4" isInvalid={!!formik.errors?.delivery_address}>
              <FormLabel>Delivery Address</FormLabel>
              <Input
                type="text"
                name="delivery_address"
                value={formik.values?.delivery_address}
                onChange={formik.handleChange}
              />
              {formik.errors.delivery_address && <FormErrorMessage>{formik.errors?.delivery_address}</FormErrorMessage>}
            </FormControl>
            <FormControl id="order_status" mb="4" isInvalid={!!formik.errors?.order_status}>
              <FormLabel>Order Status</FormLabel>
              <Input
                type="text"
                name="order_status"
                value={formik.values?.order_status}
                onChange={formik.handleChange}
              />
              {formik.errors.order_status && <FormErrorMessage>{formik.errors?.order_status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<CustomerInterface>
              formik={formik}
              name={'customer_id'}
              label={'Select Customer'}
              placeholder={'Select Customer'}
              fetcher={getCustomers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.id}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'order',
    operation: AccessOperationEnum.UPDATE,
  }),
)(OrderEditPage);
