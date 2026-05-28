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
import { useLocation, useParams } from "react-router-dom"
import {
  filterLeadsByProperties,
  updateLeadById,
  filterAgentsByProperties,
} from "../service/requestToServer.js"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { getCurrentDate } from "../service/functions.js"

export default function EditLead() {
  const id = useParams().id
  const [lead, setLead] = useState([])
  const [salesAgents, setSalesAgents] = useState([])
  const [agentOptions, setAgentOptions] = useState([])
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)
  const [isError, setIsError] = useState("")

  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setCloseMenu(state)
    }
  }, [])

  useEffect(() => {
    async function fetch() {
      try {
        const filterString = JSON.stringify({ isInTeam: true })
        await filterAgentsByProperties(filterString, setSalesAgents, setIsError)
        const filtersString = JSON.stringify({ _id: id })
        const response = await filterLeadsByProperties(
          filtersString,
          undefined,
          setIsError,
        )
        if (response.length) {
          setLead(response)
        }
      } catch (error) {
        if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
          console.error(error)
        }
        setIsError(error.message)
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
      try {
        if (values.status === "Lost") {
          values.lostAt = getCurrentDate()
        } else {
          values.lostAt = ""
        }
        const response = await updateLeadById({
          id: lead[0]._id,
          body: values,
          setIsError,
        })
        if (response && Object.keys(response).length) {
          toast("Lead Updated Successfully👍")
        }
      } catch (error) {
        if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
          console.error(error)
        }
        setIsError(error.message)
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
        <section className={`main_section`}>
          <div className={`${styles.heading}`}>
            <h2 className={`${styles.text1}`}>Edit Lead</h2>
            <h5 className={`${styles.text2}`}>Edit Existing Lead</h5>
          </div>
          <form onSubmit={handleSubmit} className="container">
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="name"
                className={`${formStyles.label} ${formStyles.input_clicked}`}
              >
                Name
              </label>
              <input
                type="text"
                autoComplete="off"
                name="name"
                id="name"
                className={`${formStyles.input}`}
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
              <label
                htmlFor="source"
                className={`${formStyles.label} ${formStyles.input_clicked}`}
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
                className={`${formStyles.label} ${formStyles.input_clicked}`}
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
              <label
                htmlFor="status"
                className={`${formStyles.label} ${formStyles.input_clicked}`}
              >
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
                  editLeadStatusOptions.find(
                    (opt) => opt.value === values.status,
                  ) || null
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
              <label
                htmlFor="tags"
                className={`${formStyles.label} ${formStyles.input_clicked}`}
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
                className={`${formStyles.label} ${formStyles.input_clicked}`}
              >
                Time To Close
              </label>
              <input
                type="number"
                autoComplete="off"
                name="timeToClose"
                id="timeToClose"
                className={`${formStyles.input}`}
                value={values.timeToClose || 0}
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
                className={`${formStyles.label} ${formStyles.input_clicked}`}
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
                className={`${formStyles.label} ${formStyles.input_clicked}`}
              >
                Phone Number
              </label>
              <input
                type="text"
                autoComplete="off"
                name="phoneNumber"
                id="phoneNumber"
                className={`${formStyles.input}`}
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
