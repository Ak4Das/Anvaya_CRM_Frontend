import * as yup from "yup"

export const addAgentSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(
      /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+$/,
      "Enter name in format like 'John Doe'",
    ),
  dateOfBirth: yup
    .string()
    .matches(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
      "Date must be in yyyy-mm-dd format",
    )
    .required("Date is required"),
  country: yup
    .string()
    .matches(/^[A-Z]/, "First letter must be capital")
    .required("Country is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\(\+\d{1,3}\)\d{10}$/,
      "Phone number must be in format (+91)9785578985",
    ),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Please enter your email")
    .test(
      "is-lowercase",
      "Email must be in lowercase",
      (value) => value === value?.toLowerCase(),
    ),
  address: yup.string().required("Please enter your address"),
  profileImg: yup.string().required("Please enter your profile image"),
  password: yup.string().min(6).required("Please enter a password"),
  confirmPassword: yup
    .string()
    .required("Please enter your password")
    .oneOf([yup.ref("password"), null], "Password must be same"),
})
