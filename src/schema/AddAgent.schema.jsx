import * as yup from "yup"

export const addAgentSchema = yup.object({
  name: yup.string().required("Please enter your name"),
  age: yup.number().min(18).max(50).required("Please enter your age"),
  country: yup.string().required("Please enter your country"),
  phone: yup.string().required("Please enter your phone number"),
  email: yup.string().email().required("Please enter your email"),
  address: yup.string().required("Please enter your address"),
  profileImage: yup.string().required("Please enter your profile image"),
  password: yup.string().min(6).required("Please enter a password"),
  confirmPassword: yup
    .string()
    .required("Please enter your password")
    .oneOf([yup.ref("password"), null], "Password must be same"),
})
