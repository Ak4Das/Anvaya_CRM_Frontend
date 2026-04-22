import styles from "../style_modules/page_modules/AddAgent.module.css"
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar.jsx"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { addAgentSchema } from "../schema/AddAgent.schema.jsx"

export default function AddAgent() {
  const [nameInputClicked, setNameInputClick] = useState(false)
  const [ageInputClicked, setAgeInputClick] = useState(false)
  const [countryInputClicked, setCountryInputClick] = useState(false)
  const [phoneNumberInputClicked, setPhoneNumberInputClick] = useState(false)
  const [emailInputClicked, setEmailInputClick] = useState(false)
  const [addressInputClicked, setAddressInputClick] = useState(false)
  const [passwordInputClicked, setPasswordInputClick] = useState(false)
  const [confirmPasswordInputClicked, setConfirmPasswordInputClick] =
    useState(false)

  const initialValues = {
    name: "",
    age: "",
    country: "",
    phone: "",
    email: "",
    address: "",
    profileImage: "",
    password: "",
    confirmPassword: "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addAgentSchema,
    onSubmit: (values, action) => {
      console.log(values)
      action.resetForm()
    },
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik

  useEffect(() => {
    document.addEventListener("click", () => {
      const name = document.querySelector("[name = 'name']")
      !name.value && setNameInputClick(false)

      const age = document.querySelector("[name = 'age']")
      !age.value && setAgeInputClick(false)

      const country = document.querySelector("[name = 'country']")
      !country.value && setCountryInputClick(false)

      const phoneNumber = document.querySelector("[name = 'phone']")
      !phoneNumber.value && setPhoneNumberInputClick(false)

      const email = document.querySelector("[name = 'email']")
      !email.value && setEmailInputClick(false)

      const address = document.querySelector("[name = 'address']")
      !address.value && setAddressInputClick(false)

      const password = document.querySelector("[name = 'password']")
      !password.value && setPasswordInputClick(false)

      const confirmPassword = document.querySelector(
        "[name = 'confirmPassword']",
      )
      !confirmPassword.value && setConfirmPasswordInputClick(false)
    })
  }, [])

  return (
    <div className={`${styles.app}`}>
      <SideBar />
      <main className={`${styles.content}`}>
        <NavBar />
        <section className={`${styles.main_section}`}>
          <div className={`${styles.heading}`}>
            <h2 className={`${styles.text1}`}>Agent Form</h2>
            <h5 className={`${styles.text2}`}>Add New Team Member</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={`${styles.input_wrapper}`}>
              <label
                htmlFor="name"
                className={`${nameInputClicked && styles.input_clicked}`}
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
                <span className={`text-danger ${styles.show_validation_error}`}>
                  {errors.name}
                </span>
              ) : null}
            </div>
            <div className={`${styles.input_wrapper}`}>
              <label
                htmlFor="age"
                className={`${ageInputClicked && styles.input_clicked}`}
              >
                Age
              </label>
              <input
                type="number"
                autoComplete="off"
                name="age"
                id="age"
                onClick={(e) => {
                  e.stopPropagation()
                  setAgeInputClick(true)
                }}
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.age && touched.age ? (
                <span className={`text-danger ${styles.show_validation_error}`}>
                  {errors.age}
                </span>
              ) : null}
            </div>
            <div className={`${styles.input_wrapper}`}>
              <label
                htmlFor="country"
                className={`${countryInputClicked && styles.input_clicked}`}
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
                <span className={`text-danger ${styles.show_validation_error}`}>
                  {errors.country}
                </span>
              ) : null}
            </div>
            <div className={`${styles.input_wrapper}`}>
              <label
                htmlFor="phone"
                className={`${phoneNumberInputClicked && styles.input_clicked}`}
              >
                Phone Number
              </label>
              <input
                type="text"
                autoComplete="off"
                name="phone"
                id="phone"
                onClick={(e) => {
                  e.stopPropagation()
                  setPhoneNumberInputClick(true)
                }}
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone ? (
                <span className={`text-danger ${styles.show_validation_error}`}>
                  {errors.phone}
                </span>
              ) : null}
            </div>
            <div className={`${styles.input_wrapper}`}>
              <label
                htmlFor="email"
                className={`${emailInputClicked && styles.input_clicked}`}
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
                <span className={`text-danger ${styles.show_validation_error}`}>
                  {errors.email}
                </span>
              ) : null}
            </div>
            <div className={`${styles.input_wrapper}`}>
              <label
                htmlFor="address"
                className={`${addressInputClicked && styles.input_clicked}`}
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
                <span className={`text-danger ${styles.show_validation_error}`}>
                  {errors.address}
                </span>
              ) : null}
            </div>
            <div className={`${styles.input_wrapper}`}>
              <label
                htmlFor="profile Image"
                className={`${styles.input_clicked}`}
              >
                Profile Image
              </label>
              <input
                className={`${styles.profile_image_input}`}
                type="file"
                autoComplete="off"
                name="profileImage"
                id="profile Image"
                value={values.profileImage}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.profileImage && touched.profileImage ? (
                <span className={`text-danger ${styles.show_validation_error}`}>
                  {errors.profileImage}
                </span>
              ) : null}
            </div>
            <div className={`${styles.input_wrapper}`}>
              <label
                htmlFor="password"
                className={`${passwordInputClicked && styles.input_clicked}`}
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
                <span className={`text-danger ${styles.show_validation_error}`}>
                  {errors.password}
                </span>
              ) : null}
            </div>
            <div className={`${styles.input_wrapper}`}>
              <label
                htmlFor="confirmPassword"
                className={`${confirmPasswordInputClicked && styles.input_clicked}`}
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
                <span className={`text-danger ${styles.show_validation_error}`}>
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
