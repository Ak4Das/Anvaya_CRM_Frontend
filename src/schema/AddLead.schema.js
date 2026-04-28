import * as yup from "yup"

export const addLeadSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(
      /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+$/,
      "Enter name in format like 'John Doe'",
    ),
  source: yup.string().required("Please mention a source"),
  salesAgent: yup.string().required("Please assign a Sales agent"),
  status: yup.string().required("Mention lead status"),
  tags: yup.string().required("Choose a tag"),
  timeToClose: yup.number().min(1).max(30).required("Mention time to close"),
  priority: yup.string().required("Please mention priority"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\(\+\d{1,3}\)\d{10}$/,
      "Phone number must be in format (+91)9785578985",
    ),
})
