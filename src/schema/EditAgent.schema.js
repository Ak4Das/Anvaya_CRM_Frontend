import * as yup from "yup"

export const EditAgentSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(
      /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+$/,
      "Enter name in format like 'John Doe'",
    ),
  country: yup
    .string()
    .matches(/^[A-Z]/, "First letter must be capital")
    .required("Country is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\(\+\d{1,3}\)\d+$/,
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
  manager: yup
    .string()
    .matches(/^[0-9a-fA-F]{24}$/, "manager must be a valid ObjectId.")
    .required("Assign a manager"),
  address: yup.string().required("Please enter your address"),
  profileImg: yup.string().notRequired(),
  status: yup
    .string()
    .oneOf(["Active", "Inactive"], "status must be one of 'Active', 'Inactive'")
    .required("status is required."),
  role: yup.string().required("role is required."),
})
