// src/services/CommonvalidationSchema.js
import * as Yup from 'yup';

export const CommonvalidationSchema = Yup.object().shape({
  organisation_id: Yup.string().required('Organisation ID is required'),

  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(/[@$!%*?&]/, 'Must contain at least one special character'),
});
