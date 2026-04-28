import styles from "../style_modules/page_modules/AddAgent.module.css"
import formStyles from "../style_modules/component_modules/Form.module.css"
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { addLeadSchema } from "../schema/AddLead.schema.js"
import Select from "react-select"
import {
  sourceOptions,
  agentOptions,
  statusOptions,
  tagsOptions,
  priorityOptions,
} from "../reactSelectOptions.js"
import { customStyles } from "../reactSelectCustomStyles.js"
import axios from "axios"
import { toast } from "react-toastify"

export default function AddLead() {
  const [nameInputClicked, setNameInputClick] = useState(false)
  const [sourceInputClicked, setSourceInputClick] = useState(false)
  const [salesAgentInputClicked, setSalesAgentInputClick] = useState(false)
  const [statusInputClicked, setStatusInputClick] = useState(false)
  const [tagsInputClicked, setTagsInputClick] = useState(false)
  const [timeToCloseInputClicked, setTimeToCloseInputClick] = useState(false)
  const [priorityInputClicked, setPriorityInputClick] = useState(false)
  const [phoneInputClicked, setPhoneInputClick] = useState(false)

  const initialValues = {
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: "",
    timeToClose: "",
    priority: "",
    phoneNumber: "",
  }

  function generateLeadId() {
    const prefix = "LD"
    const time = Date.now().toString().slice(-4)
    const random = Math.floor(100000 + Math.random() * 900000)

    return `${prefix}-${time}${random}`
  }

  function getCurrentDate() {
    const currentDate = new Date().toISOString().split("T")[0]
    return currentDate
  }

  async function createLead(body) {
    try {
      const response = await axios.post(
        "http://localhost:3000/leads/addLead",
        body,
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addLeadSchema,
    onSubmit: async (values, action) => {
      values.leadCode = generateLeadId()
      values.createdAt = getCurrentDate()
      const response = await createLead(values)
      if (response && Object.keys(response).length) {
        toast("Lead Created Successfully👍")
      }
      action.resetForm()
    },
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = formik

  useEffect(() => {
    document.addEventListener("click", () => {
      const name = document.querySelector("[name = 'name']")
      !name.value && setNameInputClick(false)

      const source = document.querySelector("[name = 'source']")
      !source.value && setSourceInputClick(false)

      const salesAgent = document.querySelector("[name = 'salesAgent']")
      !salesAgent.value && setSalesAgentInputClick(false)

      const status = document.querySelector("[name = 'status']")
      !status.value && setStatusInputClick(false)

      const tags = document.querySelector("[name = 'tags']")
      !tags.value && setTagsInputClick(false)

      const timeToClose = document.querySelector("[name = 'timeToClose']")
      !timeToClose.value && setTimeToCloseInputClick(false)

      const priority = document.querySelector("[name = 'priority']")
      !priority.value && setPriorityInputClick(false)

      const phoneNumber = document.querySelector("[name = 'phoneNumber']")
      !phoneNumber.value && setPhoneInputClick(false)
    })
  }, [])

  return (
    <div className={`app`}>
      <SideBar />
      <main className={`content`}>
        <NavBar />
        <section className={`main_section`}>
          <div className={`${styles.heading}`}>
            <h2 className={`${styles.text1}`}>Lead Form</h2>
            <h5 className={`${styles.text2}`}>Add New Lead</h5>
          </div>
          <form onSubmit={handleSubmit} className="container">
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="name"
                className={`${nameInputClicked && formStyles.input_clicked}`}
              >
                Name
              </label>
              <input
                type="text"
                autoComplete="off"
                name="name"
                id="name"
                onClick={(e) => {
                  e.stopPropagation()
                  setNameInputClick(true)
                }}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.name}
                </span>
              ) : null}
            </div>
            <div
              className={`${formStyles.input_wrapper}`}
              onClick={(e) => e.stopPropagation()}
            >
              <label
                htmlFor="source"
                className={`${sourceInputClicked && formStyles.input_clicked}`}
              >
                Source
              </label>
              <Select
                options={sourceOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="source"
                id="source"
                onMenuOpen={() => {
                  setSourceInputClick(true)
                }}
                value={
                  sourceOptions.find((opt) => opt.value === values.source) ||
                  null
                }
                onChange={(selected) => {
                  setFieldValue("source", selected ? selected.value : "")
                }}
                onBlur={() => setFieldTouched("source", true)}
              />
              {errors.source && touched.source ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.source}
                </span>
              ) : null}
            </div>
            <div
              className={`${formStyles.input_wrapper}`}
              onClick={(e) => e.stopPropagation()}
            >
              <label
                htmlFor="salesAgent"
                className={`${salesAgentInputClicked && formStyles.input_clicked}`}
              >
                Sales Agent
              </label>
              <Select
                options={agentOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="salesAgent"
                id="salesAgent"
                onMenuOpen={() => {
                  setSalesAgentInputClick(true)
                }}
                value={
                  agentOptions.find((opt) => opt.value === values.salesAgent) ||
                  null
                }
                onChange={(selected) => {
                  setFieldValue("salesAgent", selected ? selected.value : "")
                }}
                onBlur={() => setFieldTouched("salesAgent", true)}
              />
              {errors.salesAgent && touched.salesAgent ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.salesAgent}
                </span>
              ) : null}
            </div>
            <div
              className={`${formStyles.input_wrapper}`}
              onClick={(e) => e.stopPropagation()}
            >
              <label
                htmlFor="status"
                className={`${statusInputClicked && formStyles.input_clicked}`}
              >
                Status
              </label>
              <Select
                options={statusOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="status"
                id="status"
                onMenuOpen={() => {
                  setStatusInputClick(true)
                }}
                value={
                  statusOptions.find((opt) => opt.value === values.status) ||
                  null
                }
                onChange={(selected) => {
                  setFieldValue("status", selected ? selected.value : "")
                }}
                onBlur={() => setFieldTouched("status", true)}
              />
              {errors.status && touched.status ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.status}
                </span>
              ) : null}
            </div>
            <div
              className={`${formStyles.input_wrapper}`}
              onClick={(e) => e.stopPropagation()}
            >
              <label
                htmlFor="tags"
                className={`${tagsInputClicked && formStyles.input_clicked}`}
              >
                Tags
              </label>
              <Select
                options={tagsOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="tags"
                id="tags"
                onMenuOpen={() => {
                  setTagsInputClick(true)
                }}
                value={
                  tagsOptions.find((opt) => opt.value === values.tags) || null
                }
                onChange={(selected) => {
                  setFieldValue("tags", selected ? selected.value : "")
                }}
                onBlur={() => setFieldTouched("tags", true)}
              />
              {errors.tags && touched.tags ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.tags}
                </span>
              ) : null}
            </div>
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="timeToClose"
                className={`${timeToCloseInputClicked && formStyles.input_clicked}`}
              >
                Time To Close
              </label>
              <input
                type="number"
                autoComplete="off"
                name="timeToClose"
                id="timeToClose"
                onClick={(e) => {
                  e.stopPropagation()
                  setTimeToCloseInputClick(true)
                }}
                value={values.timeToClose}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.timeToClose && touched.timeToClose ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.timeToClose}
                </span>
              ) : null}
            </div>
            <div
              className={`${formStyles.input_wrapper}`}
              onClick={(e) => e.stopPropagation()}
            >
              <label
                htmlFor="priority"
                className={`${priorityInputClicked && formStyles.input_clicked}`}
              >
                Priority
              </label>
              <Select
                options={priorityOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="priority"
                id="priority"
                onMenuOpen={() => {
                  setPriorityInputClick(true)
                }}
                value={
                  priorityOptions.find(
                    (opt) => opt.value === values.priority,
                  ) || null
                }
                onChange={(selected) => {
                  setFieldValue("priority", selected ? selected.value : "")
                }}
                onBlur={() => setFieldTouched("priority", true)}
              />
              {errors.priority && touched.priority ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.priority}
                </span>
              ) : null}
            </div>
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="phoneNumber"
                className={`${phoneInputClicked && formStyles.input_clicked}`}
              >
                Phone Number
              </label>
              <input
                type="text"
                autoComplete="off"
                name="phoneNumber"
                id="phoneNumber"
                onClick={(e) => {
                  e.stopPropagation()
                  setPhoneInputClick(true)
                }}
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.phoneNumber}
                </span>
              ) : null}
            </div>
            <button type="submit" className="btn btn-success">
              Create New Lead
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
