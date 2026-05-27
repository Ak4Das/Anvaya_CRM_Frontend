import styles from "../style_modules/page_modules/AddAgent.module.css"
import formStyles from "../style_modules/component_modules/Form.module.css"
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { toast } from "react-toastify"
import axios from "axios"
import {
  filterAgentsByProperties,
  updateAgentById,
} from "../service/requestToServer.js"
import { normalizePhoneNumber } from "../service/functions.js"
import Select from "react-select"
import {
  agentRoleOptions,
  agentStatusOptions,
  getManagerOptions,
} from "../service/reactSelectOptions.js"
import { getAllManagersData } from "../service/requestToServer.js"
import { customStyles } from "../service/reactSelectCustomStyles.js"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { useLocation, useParams } from "react-router-dom"
import { EditAgentSchema } from "../schema/EditAgent.schema.js"

export default function EditAgent() {
  const id = useParams().id
  const [agent, setAgent] = useState([])
  const [managers, setManagers] = useState([])
  const [managerOptions, setManagerOptions] = useState([])
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
        await getAllManagersData(setManagers, setIsError)
        const filtersString = JSON.stringify({ _id: id })
        await filterAgentsByProperties(filtersString, setAgent, setIsError)
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
    const options = managers.length && getManagerOptions(managers)
    options && setManagerOptions(options)
  }, [managers])

  const initialValues = {
    name: agent.length ? agent[0].name : "",
    country: agent.length ? agent[0].country : "",
    phoneNumber: agent.length ? agent[0].phoneNumber : "",
    email: agent.length ? agent[0].email : "",
    manager: agent.length ? agent[0].manager : "",
    status: agent.length ? agent[0].status : "",
    role: agent.length ? agent[0].role : "",
    address: agent.length ? agent[0].address : "",
    profileImg: "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EditAgentSchema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      try {
        if (values.phoneNumber !== agent[0].phoneNumber) {
          values.phoneNumberNormalized = normalizePhoneNumber(
            values.phoneNumber,
          )
        }
        if (values.profileImg === "") {
          values.profileImg = agent[0].profileImg
        }
        const response = await updateAgentById({
          id: agent[0]._id,
          body: values,
          setIsError,
        })
        if (response && Object.keys(response).length) {
          toast("Agent Edited Successfully👍")
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
            <h2 className={`${styles.text1}`}>Edit Agent</h2>
            <h5 className={`${styles.text2}`}>Edit Existing Members</h5>
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
              <label
                htmlFor="country"
                className={`${formStyles.input_clicked}`}
              >
                Country
              </label>
              <input
                type="text"
                autoComplete="off"
                name="country"
                id="country"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.country && touched.country ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.country}
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
            <div className={`${formStyles.input_wrapper}`}>
              <label htmlFor="email" className={`${formStyles.input_clicked}`}>
                Email
              </label>
              <input
                type="email"
                autoComplete="off"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.email}
                </span>
              ) : null}
            </div>
            <div
              className={`${formStyles.input_wrapper}`}
              onClick={(e) => e.stopPropagation()}
            >
              <label
                htmlFor="manager"
                className={`${formStyles.input_clicked}`}
              >
                Manager
              </label>
              <Select
                options={managerOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="manager"
                id="manager"
                value={
                  (managerOptions &&
                    managerOptions.find(
                      (opt) => opt.value === values.manager,
                    )) ||
                  null
                }
                onChange={(selected) => {
                  setFieldValue("manager", selected ? selected.value : "")
                }}
                onBlur={() => setFieldTouched("manager", true)}
              />
              {errors.manager && touched.manager ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.manager}
                </span>
              ) : null}
            </div>
            <div
              className={`${formStyles.input_wrapper}`}
              onClick={(e) => e.stopPropagation()}
            >
              <label htmlFor="status" className={`${formStyles.input_clicked}`}>
                Status
              </label>
              <Select
                options={agentStatusOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="status"
                id="status"
                value={
                  (agentStatusOptions &&
                    agentStatusOptions.find(
                      (opt) => opt.value === values.status,
                    )) ||
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
              <label htmlFor="role" className={`${formStyles.input_clicked}`}>
                Role
              </label>
              <Select
                options={agentRoleOptions}
                styles={customStyles}
                placeholder=""
                classNamePrefix="custom-select"
                name="role"
                id="role"
                value={
                  (agentRoleOptions &&
                    agentRoleOptions.find(
                      (opt) => opt.value === values.role,
                    )) ||
                  null
                }
                onChange={(selected) => {
                  setFieldValue("role", selected ? selected.value : "")
                }}
                onBlur={() => setFieldTouched("role", true)}
              />
              {errors.role && touched.role ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.role}
                </span>
              ) : null}
            </div>
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="address"
                className={`${formStyles.input_clicked}`}
              >
                Address
              </label>
              <input
                type="text"
                autoComplete="off"
                name="address"
                id="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.address && touched.address ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.address}
                </span>
              ) : null}
            </div>
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="profile Image"
                className={`${formStyles.input_clicked}`}
              >
                Profile Image
              </label>
              <input
                className={`${styles.profile_image_input}`}
                type="file"
                autoComplete="off"
                name="profileImg"
                id="profile Image"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.profileImg && touched.profileImg ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.profileImg}
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
