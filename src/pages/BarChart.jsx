import styles from "../style_modules/page_modules/Report.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import {
  leadsClosedBySalesAgentsBarChart,
  thirtyDaysAgentsPerformanceReportBarChart,
} from "../service/chart.js"
import {
  getAllAgentsData,
  getLeadDataByPropertyInATimeRange,
  getLeadsDataInATimeRange,
} from "../service/requestToServer.js"
import { getScoreOfAgent } from "../service/functions.js"
import Error from "./Error.jsx"

export default function BarChart() {
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)
  const [salesAgent, setSalesAgent] = useState([])
  const getThirtyDaysPerformanceReportChartRef = useRef(null)
  const getThirtyDaysPerformanceReportChartInstance = useRef(null)
  const leadsClosedBySalesAgentsBarChartRef = useRef(null)
  const leadsClosedBySalesAgentsBarChartInstance = useRef(null)
  const [getThirtyDaysPerformanceReport, setThirtyDaysPerformanceReport] =
    useState([])
  const [leadsClosedBySalesAgents, setLeadsClosedBySalesAgents] = useState([])
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
        throw error
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

  async function getLeadsClosedBySalesAgents(endDay) {
    try {
      const agents = await getAllAgentsData(undefined, setIsError)
      const data = await Promise.all(
        agents.map(async (agent) => {
          try {
            const leadsClosedByAgent = await getLeadDataByPropertyInATimeRange(
              {
                salesAgent: agent._id,
                status: "Closed",
              },
              endDay,
              undefined,
              setIsError,
            )
            return {
              agentCode: agent.agentCode,
              name: agent.name.split(" ")[0],
              leadsClosedByAgent: leadsClosedByAgent.length,
            }
          } catch (error) {
            if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
              console.error(error)
            }
            setIsError(error.message)
          }
        }),
      )
      setLeadsClosedBySalesAgents(data)
    } catch (error) {
      if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
        console.error(error)
      }
      setIsError(error.message)
    }
  }

  useEffect(() => {
    async function tasks(setLoading, setIsError) {
      try {
        if (!isError) {
          if (salesAgent.length) {
            await getPerformanceReportOfAgentsInATimeRange({
              endDay: 30,
              setFunction: setThirtyDaysPerformanceReport,
            })
          }
          await getLeadsClosedBySalesAgents(30)
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

    tasks(setLoading, setIsError)
  }, [salesAgent])

  useEffect(() => {
    if (getThirtyDaysPerformanceReport.length && !loading) {
      getThirtyDaysPerformanceReportChartInstance.current?.destroy()
      getThirtyDaysPerformanceReportChartInstance.current = null
      thirtyDaysAgentsPerformanceReportBarChart({
        data: getThirtyDaysPerformanceReport,
        chartRef: getThirtyDaysPerformanceReportChartRef,
        chartInstance: getThirtyDaysPerformanceReportChartInstance,
      })
    }
  }, [getThirtyDaysPerformanceReport, loading])

  useEffect(() => {
    if (leadsClosedBySalesAgents.length) {
      leadsClosedBySalesAgentsBarChartInstance.current?.destroy()
      leadsClosedBySalesAgentsBarChartInstance.current = null
      leadsClosedBySalesAgentsBarChart({
        data: leadsClosedBySalesAgents,
        chartRef: leadsClosedBySalesAgentsBarChartRef,
        chartInstance: leadsClosedBySalesAgentsBarChartInstance,
      })
    }
  }, [leadsClosedBySalesAgents])

  useEffect(() => {
    return () => {
      getThirtyDaysPerformanceReportChartInstance.current?.destroy()
      getThirtyDaysPerformanceReportChartInstance.current = null
      leadsClosedBySalesAgentsBarChartInstance.current?.destroy()
      leadsClosedBySalesAgentsBarChartInstance.current = null
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
                  <h2 className={`${styles.text1}`}>Bar Charts</h2>
                  <h5 className={`${styles.text2}`}>
                    30 days data visualization
                  </h5>
                </div>
              </div>
              <section
                className={`d-flex flex-column gap-4 ${styles.charts_container}`}
              >
                <div className="row row-gap-4">
                  <div className={`col-xl-12 ${styles.first_box}`}>
                    <div className={`card ${styles.card}`}>
                      <div className="card-body">
                        <canvas
                          id="thirtyDaysPerformanceReport"
                          ref={getThirtyDaysPerformanceReportChartRef}
                        ></canvas>
                      </div>
                    </div>
                  </div>
                  <div className={`col-xl-12 ${styles.second_box}`}>
                    <div className={`card ${styles.card}`}>
                      <div className="card-body">
                        <canvas
                          id="leadsClosedBySalesAgents"
                          ref={leadsClosedBySalesAgentsBarChartRef}
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
