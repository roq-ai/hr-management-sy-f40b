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

import { createIncome } from 'apiSdk/incomes';
import { incomeValidationSchema } from 'validationSchema/incomes';
import { UserInterface } from 'interfaces/user';
import { FamilyInterface } from 'interfaces/family';
import { getUsers } from 'apiSdk/users';
import { getFamilies } from 'apiSdk/families';
import { IncomeInterface } from 'interfaces/income';

function IncomeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: IncomeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createIncome(values);
      resetForm();
      router.push('/incomes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<IncomeInterface>({
    initialValues: {
      amount: 0,
      source: '',
      income_date: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
      family_id: (router.query.family_id as string) ?? null,
    },
    validationSchema: incomeValidationSchema,
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
              label: 'Incomes',
              link: '/incomes',
            },
            {
              label: 'Create Income',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Income
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

          <TextInput
            error={formik.errors.source}
            label={'Source'}
            props={{
              name: 'source',
              placeholder: 'Source',
              value: formik.values?.source,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="income_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Income Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.income_date ? new Date(formik.values?.income_date) : null}
              onChange={(value: Date) => formik.setFieldValue('income_date', value)}
            />
          </FormControl>
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
              onClick={() => router.push('/incomes')}
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
    entity: 'income',
    operation: AccessOperationEnum.CREATE,
  }),
)(IncomeCreatePage);
