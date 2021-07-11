import * as yup from 'yup';

export const validationSchema = yup.object().shape({
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
      .required('Age is Required'),
    
  })
export const validationAdress= yup.object().shape({
    number:yup
      .string()
      .required('Age is Required'),
    commune:yup
      .string()
      .required('Age is Required'),
    district:yup
      .string()
      .required('Age is Required'),
    street:yup
      .string()
      .required('Age is Required'),
    city:yup
      .string()
      .required('Age is Required'),
})