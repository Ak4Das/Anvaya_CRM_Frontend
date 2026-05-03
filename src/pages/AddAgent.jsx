import styles from "../style_modules/page_modules/AddAgent.module.css"
import formStyles from "../style_modules/component_modules/Form.module.css"
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { addAgentSchema } from "../schema/AddAgent.schema.js"
import { toast } from "react-toastify"
import axios from "axios"
import { createAgent } from "../service/requestToServer.js"
import { getCurrentDate, normalizePhoneNumber } from "../service/functions.js"

export default function AddAgent() {
  const [nameInputClicked, setNameInputClick] = useState(false)
  const [countryInputClicked, setCountryInputClick] = useState(false)
  const [phoneNumberInputClicked, setPhoneNumberInputClick] = useState(false)
  const [emailInputClicked, setEmailInputClick] = useState(false)
  const [addressInputClicked, setAddressInputClick] = useState(false)
  const [passwordInputClicked, setPasswordInputClick] = useState(false)
  const [confirmPasswordInputClicked, setConfirmPasswordInputClick] =
    useState(false)

  const initialValues = {
    name: "",
    dateOfBirth: "",
    country: "",
    phoneNumber: "",
    email: "",
    address: "",
    profileImg: "",
    password: "",
    confirmPassword: "",
  }

  function generateAgentId() {
    const prefix = "AG"
    const time = Date.now().toString().slice(-4)
    const random = Math.floor(100000 + Math.random() * 900000)

    return `${prefix}-${time}${random}`
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addAgentSchema,
    onSubmit: async (values, action) => {
      values.agentCode = generateAgentId()
      values.joinedDate = getCurrentDate()
      values.phoneNumberNormalized = normalizePhoneNumber(values.phoneNumber)
      const response = await createAgent(values)
      if (response && Object.keys(response).length) {
        toast("Agent Created Successfully👍")
      }
      action.resetForm()
    },
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik

  function eventHandlerOnDocument() {
    const name = document.querySelector("[name = 'name']")
    !name.value && setNameInputClick(false)

    const country = document.querySelector("[name = 'country']")
    !country.value && setCountryInputClick(false)

    const phoneNumber = document.querySelector("[name = 'phoneNumber']")
    !phoneNumber.value && setPhoneNumberInputClick(false)

    const email = document.querySelector("[name = 'email']")
    !email.value && setEmailInputClick(false)

    const address = document.querySelector("[name = 'address']")
    !address.value && setAddressInputClick(false)

    const password = document.querySelector("[name = 'password']")
    !password.value && setPasswordInputClick(false)

    const confirmPassword = document.querySelector("[name = 'confirmPassword']")
    !confirmPassword.value && setConfirmPasswordInputClick(false)
  }

  useEffect(() => {
    document.addEventListener("click", eventHandlerOnDocument)
    return () => {
      document.removeEventListener("click", eventHandlerOnDocument)
    }
  }, [])

  return (
    <div className={`app`}>
      <SideBar />
      <main className={`content`}>
        <NavBar />
        <section className={`main_section`}>
          <div className={`${styles.heading}`}>
            <h2 className={`${styles.text1}`}>Agent Form</h2>
            <h5 className={`${styles.text2}`}>Add New Team Member</h5>
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
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="dateOfBirth"
                className={`${formStyles.input_clicked}`}
              >
                Date Of Birth
              </label>
              <input
                type="date"
                autoComplete="off"
                name="dateOfBirth"
                id="dateOfBirth"
                onClick={(e) => {
                  e.stopPropagation()
                }}
                value={values.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.dateOfBirth && touched.dateOfBirth ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.dateOfBirth}
                </span>
              ) : null}
            </div>
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="country"
                className={`${countryInputClicked && formStyles.input_clicked}`}
              >
                Country
              </label>
              <input
                type="text"
                autoComplete="off"
                name="country"
                id="country"
                onClick={(e) => {
                  e.stopPropagation()
                  setCountryInputClick(true)
                }}
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
                className={`${phoneNumberInputClicked && formStyles.input_clicked}`}
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
                  setPhoneNumberInputClick(true)
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
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="email"
                className={`${emailInputClicked && formStyles.input_clicked}`}
              >
                Email
              </label>
              <input
                type="email"
                autoComplete="off"
                name="email"
                id="email"
                onClick={(e) => {
                  e.stopPropagation()
                  setEmailInputClick(true)
                }}
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
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="address"
                className={`${addressInputClicked && formStyles.input_clicked}`}
              >
                Address
              </label>
              <input
                type="text"
                autoComplete="off"
                name="address"
                id="address"
                onClick={(e) => {
                  e.stopPropagation()
                  setAddressInputClick(true)
                }}
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
                value={values.profileImg}
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
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="password"
                className={`${passwordInputClicked && formStyles.input_clicked}`}
              >
                Password
              </label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                onClick={(e) => {
                  e.stopPropagation()
                  setPasswordInputClick(true)
                }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.password}
                </span>
              ) : null}
            </div>
            <div className={`${formStyles.input_wrapper}`}>
              <label
                htmlFor="confirmPassword"
                className={`${confirmPasswordInputClicked && formStyles.input_clicked}`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                autoComplete="off"
                name="confirmPassword"
                id="confirmPassword"
                onClick={(e) => {
                  e.stopPropagation()
                  setConfirmPasswordInputClick(true)
                }}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <span
                  className={`text-danger ${formStyles.show_validation_error}`}
                >
                  {errors.confirmPassword}
                </span>
              ) : null}
            </div>
            <button type="submit" className="btn btn-success">
              Create New Agent
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
