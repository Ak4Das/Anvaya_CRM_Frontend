import * as yup from "yup"

export const addEventSchema = yup.object({
  eventTitle: yup.string().required("Event title is required."),

  startDate: yup.string().required("Start date is required."),

  startTime: yup.string().required("Start time is required."),

  endDate: yup.string().required("End date is required."),

  endTime: yup
    .string()
    .required("End time is required.")
    .test(
      "is-end-after-start",
      "End date/time must be after start date/time",
      function (value) {
        const { startDate, startTime, endDate } = this.parent

        // Parse start date
        const start = new Date(startDate)
        const end = new Date(endDate)

        // Split time
        const [startHour, startMinute] = startTime.split(":")

        const [endHour, endMinute] = value.split(":")

        // Set time manually
        start.setHours(startHour)
        start.setMinutes(startMinute)

        end.setHours(endHour)
        end.setMinutes(endMinute)

        return end > start
      },
    ),
})
