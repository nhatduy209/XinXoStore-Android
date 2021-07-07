import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    username:yup
      .string()
      .required("Username is required"),
    age:yup
      .string()
      .required('Age is Required')
  })
export default validationSchema;