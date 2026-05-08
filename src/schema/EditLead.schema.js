import * as yup from "yup"

export const editLeadSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(
      /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+$/,
      "Enter name in format like 'John Doe'",
    ),
  source: yup
    .string()
    .oneOf(
      [
        `Website`,
        `Youtube`,
        `Instagram`,
        `Facebook`,
        `News Paper`,
        `Our Customers`,
        `Referral`,
        `Television Ad`,
        `Google`,
        `Other`,
      ],
      "Invalid source",
    )
    .required("Please mention a source"),
  salesAgent: yup
    .string()
    .required("Please assign a Sales agent")
    .matches(/^[0-9a-fA-F]{24}$/, "salesAgent must be a valid ObjectId."),
  status: yup
    .string()
    .oneOf(
      [`New`, `Contacted`, `Qualified`, `Proposal Sent`, `Closed`, `Lost`],
      "Invalid status",
    )
    .required("Mention lead status"),
  tags: yup
    .string()
    .oneOf([`High Value`, `Follow Up`], "Invalid tag")
    .when("status", {
      is: (status) => status !== "Closed" && status !== "Lost",
      then: (schema) => schema.required("Time to close is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  timeToClose: yup
    .number()
    .min(1)
    .max(30)
    .when("status", {
      is: (status) => status !== "Closed" && status !== "Lost",
      then: (schema) => schema.required("Time to close is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  priority: yup
    .string()
    .oneOf([`High`, `Medium`, `Low`], "Invalid status")
    .when("status", {
      is: (status) => status !== "Closed" && status !== "Lost",
      then: (schema) => schema.required("Time to close is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\(\+\d{1,3}\)\d+$/,
      "Phone number must be in format (+91)9785578985",
    ),
})
