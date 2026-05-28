import * as yup from "yup"

export const addEventSchema = yup
  .object({
    eventTitle: yup
      .string()
      .required("Event title is required.")
      .matches(
        /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/,
        "Each word must start with a capital letter.",
      ),

    startDate: yup.date().required("Start date is required."),

    startTime: yup.string().required("Start time is required."),

    endDate: yup.date().required("End date is required."),

    endTime: yup.string().required("End time is required."),
  })
  .test(
    "is-end-after-start",
    "End date/time must be after start date/time",
    (values) => {
      if (!values) return false

      const start = new Date(`${values.startDate}T${values.startTime}`)

      const end = new Date(`${values.endDate}T${values.endTime}`)

      return end > start
    },
  )
