import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import styles from "../style_modules/page_modules/Calender.module.css"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function AddEvent() {
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)

  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setCloseMenu(state)
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
        <section className="main_section">
          <div className={`${styles.heading_container}`}>
            <div className={`${styles.heading}`}>
              <h2 className={`${styles.text1}`}>Add Event</h2>
              <h5 className={`${styles.text2}`}>Keep your event in calender</h5>
            </div>
          </div>
          <div className={`container ${styles.add_btn_form_wrapper} mt-3`}>
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="form-control"
                  placeholder="Start Date"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="startTime" className="form-label">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  className="form-control"
                  placeholder="Start Time"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="form-control"
                  placeholder="End Date"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endTime" className="form-label">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  className="form-control"
                  placeholder="End Time"
                />
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
