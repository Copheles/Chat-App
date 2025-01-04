import * as yup from "yup";

export const LogInSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export const RegisterInSchema = yup.object({
  name: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
