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
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSavings } from 'apiSdk/savings';
import { savingsValidationSchema } from 'validationSchema/savings';
import { UserInterface } from 'interfaces/user';
import { FamilyInterface } from 'interfaces/family';
import { getUsers } from 'apiSdk/users';
import { getFamilies } from 'apiSdk/families';
import { SavingsInterface } from 'interfaces/savings';

function SavingsCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SavingsInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSavings(values);
      resetForm();
      router.push('/savings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SavingsInterface>({
    initialValues: {
      amount: 0,
      saving_date: new Date(new Date().toDateString()),
      purpose: '',
      user_id: (router.query.user_id as string) ?? null,
      family_id: (router.query.family_id as string) ?? null,
    },
    validationSchema: savingsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Savings',
              link: '/savings',
            },
            {
              label: 'Create Savings',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Savings
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Amount"
            formControlProps={{
              id: 'amount',
              isInvalid: !!formik.errors?.amount,
            }}
            name="amount"
            error={formik.errors?.amount}
            value={formik.values?.amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="saving_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Saving Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.saving_date ? new Date(formik.values?.saving_date) : null}
              onChange={(value: Date) => formik.setFieldValue('saving_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.purpose}
            label={'Purpose'}
            props={{
              name: 'purpose',
              placeholder: 'Purpose',
              value: formik.values?.purpose,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<FamilyInterface>
            formik={formik}
            name={'family_id'}
            label={'Select Family'}
            placeholder={'Select Family'}
            fetcher={getFamilies}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/savings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
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
    entity: 'savings',
    operation: AccessOperationEnum.CREATE,
  }),
)(SavingsCreatePage);
