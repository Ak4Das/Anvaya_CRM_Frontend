import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import styles from "../style_modules/page_modules/Calender.module.css"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { useFormik } from "formik"
import { addEventSchema } from "../schema/AddEvent.schema.js"
import { toast } from "react-toastify"

export default function AddEvent() {
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)
  const [isError, setIsError] = useState("")

  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setCloseMenu(state)
    }
  }, [])

  const initialValues = {
    eventTitle: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  }

  function createEventObject(values) {
    const startDate = new Date(values.startDate)
    const endDate = new Date(values.endDate)

    const [startHour, startMinute] = values.startTime.split(":")
    const [endHour, endMinute] = values.endTime.split(":")

    const start = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      Number(startHour),
      Number(startMinute),
    )

    const end = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      Number(endHour),
      Number(endMinute),
    )

    return {
      title: values.eventTitle,
      start,
      end,
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addEventSchema,
    onSubmit: async (values, actions) => {
      try {
        const eventObj = createEventObject(values)
        console.log(eventObj)
        actions.resetForm()
        toast("Event Added successfully👍")
      } catch (error) {
        if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
          console.error(error)
        }
        setIsError(error.message)
      }
    },
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik

  return (
    <div className={`app ${styles.app}`}>
      <div className={`${styles.sidebar_container_1}`}>
        {!closeMenu ? (
          <SideBar closeMenu={closeMenu} setCloseMenu={setCloseMenu} />
        ) : (
          <CompressedSideBar
            closeMenu={closeMenu}
            setCloseMenu={setCloseMenu}
          />
        )}
      </div>
      <div className={`${styles.sidebar_container_2}`}>
        {isMenuBtnClicked && (
          <SideBar
            closeMenu={closeMenu}
            setCloseMenu={setCloseMenu}
            setIsMenuBtnClicked={setIsMenuBtnClicked}
          />
        )}
      </div>
      <button
        className={`${styles.menu_button}`}
        title="Menu"
        onClick={() => setIsMenuBtnClicked(true)}
      >
        <i className="bi bi-list"></i>
      </button>
      <main className={`content`}>
        <NavBar setIsMenuBtnClicked={setIsMenuBtnClicked} />
        <section className="main_section">
          <div className={`${styles.heading_container}`}>
            <div className={`${styles.heading}`}>
              <h2 className={`${styles.text1}`}>Add Event</h2>
              <h5 className={`${styles.text2}`}>Keep your event in calender</h5>
            </div>
          </div>
          <div className={`container ${styles.add_btn_form_wrapper} mt-3`}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="eventTitle" className="form-label">
                  Event Title
                </label>
                <input
                  type="text"
                  id="eventTitle"
                  name="eventTitle"
                  className="form-control"
                  placeholder="Title"
                  autoComplete="off"
                  value={values.eventTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.eventTitle && touched.eventTitle ? (
                  <span
                    className={`text-danger ${styles.show_validation_error}`}
                  >
                    {errors.eventTitle}
                  </span>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  placeholder="Start Date"
                  autoComplete="off"
                  value={values.startDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.startDate && touched.startDate ? (
                  <span
                    className={`text-danger ${styles.show_validation_error}`}
                  >
                    {errors.startDate}
                  </span>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="startTime" className="form-label">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="form-control"
                  placeholder="Start Time"
                  autoComplete="off"
                  value={values.startTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.startTime && touched.startTime ? (
                  <span
                    className={`text-danger ${styles.show_validation_error}`}
                  >
                    {errors.startTime}
                  </span>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="form-control"
                  placeholder="End Date"
                  autoComplete="off"
                  value={values.endDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.endDate && touched.endDate ? (
                  <span
                    className={`text-danger ${styles.show_validation_error}`}
                  >
                    {errors.endDate}
                  </span>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="endTime" className="form-label">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="form-control"
                  placeholder="End Time"
                  autoComplete="off"
                  value={values.endTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.endTime && touched.endTime ? (
                  <span
                    className={`text-danger ${styles.show_validation_error}`}
                  >
                    {errors.endTime}
                  </span>
                ) : null}
              </div>
              <button type="submit" className="mt-2 btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
