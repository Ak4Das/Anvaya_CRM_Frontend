import * as yup from "yup"

export const addLeadSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(
      /^[A-Z].*$/,
      "First letter must be capital",
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
    .required("source is required"),
  salesAgent: yup
    .string()
    .required("Please assign a Sales agent")
    .matches(/^[0-9a-fA-F]{24}$/, "salesAgent must be a valid ObjectId."),
  status: yup
    .string()
    .oneOf([`New`, `Contacted`, `Qualified`, `Proposal Sent`], "Invalid status")
    .required("Mention lead status"),
  tags: yup
    .string()
    .oneOf([`High Value`, `Follow Up`], "Invalid tag")
    .required("Tag is required."),
  timeToClose: yup.number().min(1).max(30).required("Mention time to close"),
  priority: yup
    .string()
    .oneOf([`High`, `Medium`, `Low`], "Invalid status")
    .required("Please mention priority"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\(\+\d{1,3}\)\d+$/,
      "Phone number must be in format (+91)9785578985",
    ),
})
