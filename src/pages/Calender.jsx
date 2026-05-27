import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"

import styles from "../style_modules/page_modules/Calender.module.css"
import "react-big-calendar/lib/css/react-big-calendar.css"

import "../Calendar.css"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function MyCalendar() {
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)

  const { state } = useLocation()

  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState([])

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
        <section className={`main_section`}>
          <div className={`${styles.heading_container}`}>
            <div className={`${styles.heading}`}>
              <h2 className={`${styles.text1}`}>Calender</h2>
              <h5 className={`${styles.text2}`}>
                Manage Your Day, Week, Month
              </h5>
            </div>
            <div className="d-flex gap-3">
              <Link
                to="/addEvent"
                className={`btn btn-outline-success ${styles.add_people_btn}`}
                state={closeMenu}
              >
                Add New Event
              </Link>
            </div>
          </div>
          <div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "90vh" }}
            />
          </div>
        </section>
      </main>
    </div>
  )
}
