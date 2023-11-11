import { replace } from 'formik';
import * as Yup from 'yup'
const phoneRegExp = /^((\+?3)?8)?0\d{9}$/;
const nameRegExp = /(^[a-zA-Z][a-zA-Z\s]{0,25}[a-zA-Z]$)/
export const CheckoutSchema = Yup.object().shape({
    name: Yup
    .string()
    .typeError('Must be string')
    //@ts-ignore
    .test('len', 'Must be longer than 2 characters', (val) => val?.length > 2)
    .matches(nameRegExp, 'Name is not valid')
    .required('Name is required'),
    email: Yup
      .string()
      .email('Enter valid email')
      .required('Email is required'),
    phone: Yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is required'),
   })