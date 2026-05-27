import styles from "../style_modules/page_modules/Report.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import {
  getAllAgentsData,
  getLeadsDataInATimeRange,
} from "../service/requestToServer.js"
import { getScoreOfAgent } from "../service/functions.js"
import { sixMonthsAgentsPerformanceReportLineChart } from "../service/chart.js"
import Error from "./Error.jsx"

export default function LineChart() {
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)
  const getSixMonthsPerformanceReportChartRef = useRef(null)
  const getSixMonthsPerformanceReportChartInstance = useRef(null)
  const [getSixMonthsPerformanceReport, setSixMonthsPerformanceReport] =
    useState([])
  const [salesAgent, setSalesAgent] = useState([])
  const [isError, setIsError] = useState("")
  const [loading, setLoading] = useState(false)

  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setCloseMenu(state)
    }
  }, [])

  useEffect(() => {
    async function fetchData(setLoading, setIsError) {
      try {
        setLoading(true)

        await getAllAgentsData(setSalesAgent, setIsError)
      } catch (error) {
        if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
          console.error(error)
        }
        setIsError(error.message)
      }
    }
    fetchData(setLoading, setIsError)
  }, [])

  async function getPerformanceReportOfAgentsInATimeRange(obj) {
    try {
      const { endDay, setFunction } = obj
      const leadsData = await getLeadsDataInATimeRange({
        endDay,
        setIsError,
      })
      const performanceReport = salesAgent.map((agent) => {
        const obj = { leadsData, agentId: agent._id }
        const performanceScore = getScoreOfAgent(obj)
        return {
          id: agent.agentCode,
          name: agent.name.split(" ")[0],
          score: performanceScore,
        }
      })
      setFunction(performanceReport)
    } catch (error) {
      if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
        console.error(error)
      }
      setIsError(error.message)
    }
  }

  useEffect(() => {
    async function tasks() {
      try {
        if (salesAgent.length && !isError) {
          await getPerformanceReportOfAgentsInATimeRange({
            endDay: 180,
            setFunction: setSixMonthsPerformanceReport,
          })
        }
      } catch (error) {
        if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
          console.error(error)
        }
        setIsError(error.message)
      } finally {
        setLoading(false)
      }
    }
    tasks()
  }, [salesAgent])

  useEffect(() => {
    if (getSixMonthsPerformanceReport.length) {
      getSixMonthsPerformanceReportChartInstance.current?.destroy()
      getSixMonthsPerformanceReportChartInstance.current = null
      sixMonthsAgentsPerformanceReportLineChart({
        data: getSixMonthsPerformanceReport,
        chartRef: getSixMonthsPerformanceReportChartRef,
        chartInstance: getSixMonthsPerformanceReportChartInstance,
      })
    }
  }, [getSixMonthsPerformanceReport])

  useEffect(() => {
    return () => {
      getSixMonthsPerformanceReportChartInstance.current?.destroy()
      getSixMonthsPerformanceReportChartInstance.current = null
    }
  }, [])

  if (isError) {
    return <Error />
  }

  return (
    <>
      {loading ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center gap-3 bg-dark-subtle text-dark fw-bold fs-1"
          style={{ width: "100vw", height: "100vh" }}
        >
          Loading
        </div>
      ) : (
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
                  <h2 className={`${styles.text1}`}>Line Charts</h2>
                  <h5 className={`${styles.text2}`}>
                    30 days data visualization
                  </h5>
                </div>
              </div>
              <section
                className={`d-flex flex-column gap-4 ${styles.charts_container}`}
              >
                <div className="row row-gap-4">
                  <div className={`col-xll-12 ${styles.first_box}`}>
                    <div className={`card ${styles.card}`}>
                      <div className="card-body">
                        <canvas
                          id="sixMonthsPerformanceReport"
                          ref={getSixMonthsPerformanceReportChartRef}
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </main>
        </div>
      )}
    </>
  )
}
