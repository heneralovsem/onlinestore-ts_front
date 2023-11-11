import * as Yup from 'yup'
const nameRegExp = /(^[a-zA-Z][a-zA-Z\s]{0,25}[a-zA-Z]$)/
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$/
export const SignUpSchema = Yup.object().shape({
    password: Yup
    .string()
    //@ts-ignore
    .test('len', 'Must be longer than 8 characters', (val) => val?.length > 8)
    .matches(passwordRegExp, 'Password is not valid')
    .required('Password is required'),
    email: Yup
      .string()
      .email('Enter valid email')
      .required('Email is required'),
   })