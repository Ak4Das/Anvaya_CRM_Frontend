import styles from "../style_modules/page_modules/AddAgent.module.css"
import formStyles from "../style_modules/component_modules/Form.module.css"
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { editLeadSchema } from "../schema/EditLead.schema.js"
import Select from "react-select"
import {
  sourceOptions,
  getAgentOptions,
  editLeadStatusOptions,
  tagsOptions,
  priorityOptions,
} from "../service/reactSelectOptions.js"
import { customStyles } from "../service/reactSelectCustomStyles.js"
import axios from "axios"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import {
  filterLeadsByProperties,
  updateLeadById,
  getAllAgentsData,
} from "../service/requestToServer.js"

export default function EditLead() {
  const id = useParams().id
  const [lead, setLead] = useState([])
  const [salesAgents, setSalesAgents] = useState([])
  const [agentOptions, setAgentOptions] = useState([])

  useEffect(() => {
    async function fetch() {
      await getAllAgentsData(setSalesAgents)
      const filtersString = JSON.stringify({ _id: id })
      const response = await filterLeadsByProperties(filtersString)
      if (response.data.length) {
        setLead(response.data)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    const options = salesAgents.length && getAgentOptions(salesAgents)
    options && setAgentOptions(options)
  }, [salesAgents])

  const initialValues = {
    name: lead.length ? lead[0].name : "",
    source: lead.length ? lead[0].source : "",
    salesAgent: lead.length ? lead[0].salesAgent : "",
    status: lead.length ? lead[0].status : "",
    tags: lead.length ? lead[0].tags : "",
    timeToClose: lead.length ? lead[0].timeToClose : "",
    priority: lead.length ? lead[0].priority : "",
    phoneNumber: lead.length ? lead[0].phoneNumber : "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: editLeadSchema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const response = await updateLeadById({ id: lead[0]._id, body: values })
      if (response && Object.keys(response).length) {
        toast("Lead Updated Successfully👍")
      }
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

  return (
    <div className={`app`}>
      <SideBar />
      <main className={`content`}>
        <NavBar />
        <section className={`main_section`}>
          <div className={`${styles.heading}`}>
            <h2 className={`${styles.text1}`}>Edit Lead</h2>
            <h5 className={`${styles.text2}`}>Edit Existing Lead</h5>
          </div>
          <form onSubmit={handleSubmit} className="container">
            <div className={`${formStyles.input_wrapper}`}>
              <label htmlFor="name" className={`${formStyles.input_clicked}`}>
                Name
              </label>
              <input
                type="text"
                autoComplete="off"
                name="name"
                id="name"
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
            <div className={`${formStyles.input_wrapper}`}>
              <label htmlFor="source" className={`${formStyles.input_clicked}`}>
                Source
              </label>
              <Select
                options={sourceOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="source"
                id="source"
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
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="salesAgent"
                className={`${formStyles.input_clicked}`}
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
                value={
                  (agentOptions &&
                    agentOptions.find(
                      (opt) => opt.value === values.salesAgent,
                    )) ||
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
            <div className={`${formStyles.input_wrapper}`}>
              <label htmlFor="status" className={`${formStyles.input_clicked}`}>
                Status
              </label>
              <Select
                options={editLeadStatusOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="status"
                id="status"
                value={
                  editLeadStatusOptions.find((opt) => opt.value === values.status) ||
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
            <div className={`${formStyles.input_wrapper}`}>
              <label htmlFor="tags" className={`${formStyles.input_clicked}`}>
                Tags
              </label>
              <Select
                options={tagsOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="tags"
                id="tags"
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
                className={`${formStyles.input_clicked}`}
              >
                Time To Close
              </label>
              <input
                type="number"
                autoComplete="off"
                name="timeToClose"
                id="timeToClose"
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
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="priority"
                className={`${formStyles.input_clicked}`}
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
                className={`${formStyles.input_clicked}`}
              >
                Phone Number
              </label>
              <input
                type="text"
                autoComplete="off"
                name="phoneNumber"
                id="phoneNumber"
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
              Save Changes
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
