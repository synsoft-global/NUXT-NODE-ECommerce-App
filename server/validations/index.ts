import { object, string } from 'yup';

export const userSignupSchema = object({
    name: string()
      .trim()
      .required('Name is required')
      .min(1, 'Name must be at least 1 character')
      .matches(/^[a-z]*$/, 'Invalid name'),
    email: string()
      .trim()
      .required('Email is required')
      .email('Invalid email'),
    password: string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    phone: string()
      .required('Phone is required')
      .min(8, 'Phone must be at least 8 characters')
      .matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{1,3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, 'Invalid phone'),
  });

export const userLoginSchema = object({
    email: string()
      .trim()
      .required('Email is required')
      .email('Invalid email'),
    password: string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });