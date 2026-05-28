import styles from "../style_modules/page_modules/LeadManagement.module.css"
import formStyles from "../style_modules/component_modules/Form.module.css"
import React, { useEffect, useRef, useState } from "react"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { Link, useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { useFormik } from "formik"
import { agentCommentSchema } from "../schema/AgentComment.schema.js"
import { customStyles } from "../service/reactSelectCustomStyles.js"
import { getAgentOptions } from "../service/reactSelectOptions.js"
import Select from "react-select"
import { toast } from "react-toastify"
import {
  filterLeadsByProperties,
  postAgentComment,
  getAgentCommentsOnALead,
  filterAgentsByProperties,
} from "../service/requestToServer.js"
import {
  getDateFromIsoString,
  getTimeFromIsoString,
} from "../service/functions.js"
import CompressedSideBar from "../components/CompressedSideBar.jsx"

export default function LeadManagement() {
  const id = useParams().id
  const [authorInputClicked, setAuthorInputClicked] = useState(false)
  const [comments, setComments] = useState([])

  const [lead, setLead] = useState([])
  const [salesAgents, setSalesAgents] = useState([])
  const [agentOptions, setAgentOptions] = useState([])
  const [isScrolling, setScrolling] = useState(false)
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)
  const [isError, setIsError] = useState("")

  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setCloseMenu(state)
    }
  }, [])

  const previousCommentRef = useRef()

  useEffect(() => {
    async function fetch() {
      try {
        const filtersString = JSON.stringify({ _id: id })
        await filterLeadsByProperties(filtersString, setLead, setIsError)
        const filterString = JSON.stringify({ isInTeam: true })
        await filterAgentsByProperties(filterString, setSalesAgents, setIsError)
        await getAgentCommentsOnALead({
          leadId: id,
          setFunction: setComments,
          setIsError,
        })
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
    const options = salesAgents.length ? getAgentOptions(salesAgents) : []
    options && setAgentOptions(options)
  }, [salesAgents])

  function getAgentNameById(id) {
    const agent = salesAgents.find((agent) => agent._id === id)
    return agent?.name
  }

  const initialValues = {
    commentText: "",
    author: "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: agentCommentSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await postAgentComment({
          leadId: id,
          body: values,
          setIsError,
        })
        if (response) {
          toast("Comment Posted Successfully👍")
        }
        await getAgentCommentsOnALead({
          leadId: id,
          setFunction: setComments,
          setIsError,
        })
        action.resetForm()
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

  function eventHandlerOnDocument() {
    const author = document.querySelector("[name='author']")
    !author.value && setAuthorInputClicked(false)
  }

  useEffect(() => {
    document.addEventListener("click", eventHandlerOnDocument)

    const previousCommentsBox = document.querySelector(
      ".previous_comments_section",
    )

    let lastScrollTop = 0

    const scrollHandler = () => {
      let currentScroll = previousCommentsBox.scrollTop

      if (currentScroll > lastScrollTop) {
        if (!previousCommentRef.current) {
          previousCommentRef.current = true
          setScrolling(true)
        }
      } else if (lastScrollTop === currentScroll) {
        if (previousCommentRef.current) {
          previousCommentRef.current = false
          setScrolling(false)
        }
      }
    }

    previousCommentsBox.addEventListener("scroll", scrollHandler)

    return () => {
      document.removeEventListener("click", eventHandlerOnDocument)
      previousCommentsBox.removeEventListener("scroll", scrollHandler)
    }
  }, [])

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
          <div className={`${styles.heading_container}`}>
            <div className={`${styles.heading}`}>
              <h2 className={`${styles.text1}`}>Manage Lead</h2>
              <h5 className={`${styles.text2}`}>Lead Management Screen</h5>
            </div>
            <Link
              to={`/editLead/${id}`}
              className={`btn btn-outline-success ${styles.editLeadBtn}`}
              state={closeMenu}
            >
              Edit Lead Details
            </Link>
          </div>
          <div className={`container ${styles.container}`}>
            <div className={`${styles.leadDetailsContainer}`}>
              <h1>Lead Details</h1>
              <p>
                Name: <span>{lead[0]?.name}</span>
              </p>
              <p>
                Sales Agent:{" "}
                <span>{getAgentNameById(lead[0]?.salesAgent)}</span>
              </p>
              <p>
                Source: <span>{lead[0]?.source}</span>
              </p>
              <p>
                Status: <span>{lead[0]?.status}</span>
              </p>
              <p>
                Priority: <span>{lead[0]?.priority}</span>
              </p>
              <p>
                Time To Close: <span>{lead[0]?.timeToClose} days</span>
              </p>
            </div>
            <div className={`${styles.comment_section}`}>
              <h1>Comment Section</h1>
              <section
                className={`previous_comments_section ${styles.previous_comments_section}`}
              >
                <h3>Previous Comments</h3>
                {comments.map((comment) => (
                  <div
                    className={`${styles.previous_comment}`}
                    key={comment._id}
                  >
                    <div className={` ${styles.author}`}>
                      {getAgentNameById(comment.author)}
                    </div>
                    <div className={`${styles.comment}`}>
                      {comment.commentText}
                    </div>
                    <div className={`${styles.timeAndDate}`}>
                      {getDateFromIsoString(comment.createdAt)} |{" "}
                      {getTimeFromIsoString(comment.createdAt)}
                    </div>
                  </div>
                ))}
                {!isScrolling && (
                  <button
                    type="button"
                    className={`btn rounded-pill ${styles.scrollToSeeMoreBtn}`}
                  >
                    Scroll to see more
                  </button>
                )}
              </section>
              <section className={`${styles.add_comment_section}`}>
                <h3>Add New Comment</h3>
                <form onSubmit={handleSubmit}>
                  <div
                    className={`${formStyles.input_wrapper}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label
                      htmlFor="author"
                      className={`${formStyles.label} ${authorInputClicked && formStyles.input_clicked}`}
                    >
                      Author
                    </label>
                    <Select
                      options={agentOptions}
                      styles={customStyles}
                      placeholder=""
                      classNamePrefix="custom-select"
                      name="author"
                      id="author"
                      onMenuOpen={() => {
                        setAuthorInputClicked(true)
                      }}
                      value={
                        (agentOptions &&
                          agentOptions.find(
                            (opt) => opt.value === values.author,
                          )) ||
                        null
                      }
                      onChange={(selected) => {
                        setFieldValue("author", selected ? selected.value : "")
                      }}
                      onBlur={() => setFieldTouched("author", true)}
                    />
                    {errors.author && touched.author ? (
                      <span
                        className={`text-danger ${formStyles.show_validation_error}`}
                      >
                        {errors.author}
                      </span>
                    ) : null}
                  </div>
                  <div className={`${formStyles.input_wrapper}`}>
                    <textarea
                      name="commentText"
                      className={`${styles.comment_box}`}
                      rows="5"
                      value={values.commentText}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    {errors.commentText && touched.commentText ? (
                      <span
                        className={`text-danger ${formStyles.show_validation_error}`}
                      >
                        {errors.commentText}
                      </span>
                    ) : null}
                  </div>
                  <button type="submit" className="btn btn-success">
                    Submit Comment
                  </button>
                </form>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
