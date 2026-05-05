import styles from "./style_modules/page_modules/App.module.css"
import { useState, useEffect, useRef } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useTheme } from "styled-components"
import SideBar from "./components/SideBar.jsx"
import NavBar from "./components/NavBar.jsx"
import {
  thirtyDaysAgentsPerformanceReportBarChart,
  sixMonthsAgentsPerformanceReportLineChart,
  oneYearAgentsPerformanceReportPieChart,
} from "./service/chart.js"
import {
  getScoreOfAgent,
  sortArrayOfObjectsInDescendingOrderByPropertyContainingNumber,
} from "./service/functions.js"
import {
  getLeadDataByPropertyInATimeRange,
  getAllAgentsData,
  getLeadsDataInATimeRange,
} from "./service/requestToServer.js"

function App() {
  const theme = useTheme()
  const [newLeadsData, setNewLeadsData] = useState([])
  const [contactedLeadsData, setContactedLeadsData] = useState([])
  const [qualifiedLeadsData, setQualifiedLeadsData] = useState([])
  const [proposalSentLeadsData, setProposalSentLeadsData] = useState([])
  const [closedLeadsData, setClosedLeadsData] = useState([])
  const [salesAgent, setSalesAgent] = useState([])
  const [sortAgentsByPerformanceScore, setSortAgentsByPerformanceScore] =
    useState([])
  const [getThirtyDaysPerformanceReport, setThirtyDaysPerformanceReport] =
    useState([])
  const [getSixMonthsPerformanceReport, setSixMonthsPerformanceReport] =
    useState([])
  const [getOneYearPerformanceReport, setOneYearPerformanceReport] = useState(
    [],
  )
  const getThirtyDaysPerformanceReportChartRef = useRef(null)
  const getThirtyDaysPerformanceReportChartInstance = useRef(null)
  const getSixMonthsPerformanceReportChartRef = useRef(null)
  const getSixMonthsPerformanceReportChartInstance = useRef(null)
  const getOneYearPerformanceReportChartRef = useRef(null)
  const getOneYearPerformanceReportChartInstance = useRef(null)

  async function updateSalesAgentsData() {
    const updatedData = await Promise.all(
      salesAgent.map(async (agent) => {
        const assignedLead = await getLeadDataByPropertyInATimeRange(
          { salesAgent: agent._id },
          360,
        )
        const closedLead = await getLeadDataByPropertyInATimeRange(
          { salesAgent: agent._id, status: "Closed" },
          360,
        )
        agent.assignedLead = assignedLead.length
        agent.closedLead = closedLead.length
        const performanceScore = Number(
          ((agent.closedLead / agent.assignedLead) * 10).toFixed(1),
        )
        agent.performanceScore = performanceScore
        return agent
      }),
    )
    const sortAgentsByPerformanceScore =
      sortArrayOfObjectsInDescendingOrderByPropertyContainingNumber(
        updatedData,
        "performanceScore",
      )
    setSortAgentsByPerformanceScore(sortAgentsByPerformanceScore)
  }

  async function getPerformanceReportOfAgentsInATimeRange(obj) {
    const { endDay, setFunction } = obj
    const leadsData = await getLeadsDataInATimeRange({
      endDay,
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
  }

  useEffect(() => {
    async function fetch() {
      await getLeadDataByPropertyInATimeRange(
        { status: "New" },
        30,
        setNewLeadsData,
      )
      await getLeadDataByPropertyInATimeRange(
        { status: "Contacted" },
        30,
        setContactedLeadsData,
      )
      await getLeadDataByPropertyInATimeRange(
        { status: "Qualified" },
        30,
        setQualifiedLeadsData,
      )
      await getLeadDataByPropertyInATimeRange(
        { status: "Proposal Sent" },
        30,
        setProposalSentLeadsData,
      )
      await getLeadDataByPropertyInATimeRange(
        { status: "Closed" },
        30,
        setClosedLeadsData,
      )
      await getAllAgentsData(setSalesAgent)
    }
    fetch()
  }, [])

  useEffect(() => {
    async function tasks() {
      if (salesAgent.length) {
        await updateSalesAgentsData()
        await getPerformanceReportOfAgentsInATimeRange({
          endDay: 30,
          setFunction: setThirtyDaysPerformanceReport,
        })
        await getPerformanceReportOfAgentsInATimeRange({
          endDay: 180,
          setFunction: setSixMonthsPerformanceReport,
        })
        await getPerformanceReportOfAgentsInATimeRange({
          endDay: 360,
          setFunction: setOneYearPerformanceReport,
        })
      }
    }
    tasks()
  }, [salesAgent])

  useEffect(() => {
    if (getOneYearPerformanceReport.length) {
      thirtyDaysAgentsPerformanceReportBarChart({
        data: getThirtyDaysPerformanceReport,
        chartRef: getThirtyDaysPerformanceReportChartRef,
        chartInstance: getThirtyDaysPerformanceReportChartInstance,
      })
      sixMonthsAgentsPerformanceReportLineChart({
        data: getSixMonthsPerformanceReport,
        chartRef: getSixMonthsPerformanceReportChartRef,
        chartInstance: getSixMonthsPerformanceReportChartInstance,
      })
      oneYearAgentsPerformanceReportPieChart({
        data: getOneYearPerformanceReport,
        chartRef: getOneYearPerformanceReportChartRef,
        chartInstance: getOneYearPerformanceReportChartInstance,
      })
    }
  }, [getOneYearPerformanceReport])

  useEffect(() => {
    return () => {
      getThirtyDaysPerformanceReportChartInstance.current?.destroy()
      getThirtyDaysPerformanceReportChartInstance.current = null
      getSixMonthsPerformanceReportChartInstance.current?.destroy()
      getSixMonthsPerformanceReportChartInstance.current = null
      getOneYearPerformanceReportChartInstance.current?.destroy()
      getOneYearPerformanceReportChartInstance.current = null
    }
  }, [])

  return (
    <>
      <div className={`app`}>
        <SideBar />
        <main className={`content`}>
          <NavBar />
          <section className={`main_section`}>
            <div className={`${styles.grid_container}`}>
              <div className={`${styles.first_row_item_wrapper}`}>
                <div className={`${styles.first_row_item_container}`}>
                  <div className={`${styles.first_row_item_content}`}>
                    <span>
                      <i className="bi bi-people-fill"></i>
                    </span>
                    <span>{newLeadsData.length}</span>
                    <span className={`${styles.about}`}>New Lead</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.first_row_item_wrapper}`}>
                <div className={`${styles.first_row_item_container}`}>
                  <div className={`${styles.first_row_item_content}`}>
                    <span>
                      <i className="bi bi-telephone-outbound-fill"></i>
                    </span>
                    <span>{contactedLeadsData.length}</span>
                    <span className={`${styles.about}`}>Contacted</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.first_row_item_wrapper}`}>
                <div className={`${styles.first_row_item_container}`}>
                  <div className={`${styles.first_row_item_content}`}>
                    <span>
                      <i className="bi bi-check-square-fill"></i>
                    </span>
                    <span>{qualifiedLeadsData.length}</span>
                    <span className={`${styles.about}`}>Qualified</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.first_row_item_wrapper}`}>
                <div className={`${styles.first_row_item_container}`}>
                  <div className={`${styles.first_row_item_content}`}>
                    <span>
                      <i className="bi bi-box-seam-fill"></i>
                    </span>
                    <span>{proposalSentLeadsData.length}</span>
                    <span className={`${styles.about}`}>Proposal Sent</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.agent_performance_table}`}>
                <h6>Agents overall performance table (1 year)</h6>
                <table className={`table ${styles.table}`}>
                  <thead>
                    <tr>
                      <th scope="col">code</th>
                      <th scope="col">Agent Name</th>
                      <th scope="col">Assigned Lead</th>
                      <th scope="col">Closed Lead</th>
                      <th scope="col">Performance Score</th>
                      <th scope="col">Status</th>
                      <th scope="col">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortAgentsByPerformanceScore.map((agent, index) => {
                      return (
                        <tr key={agent.agentCode}>
                          <th scope="row">{agent.agentCode}</th>
                          <td>{agent.name}</td>
                          <td>{agent.assignedLead}</td>
                          <td>{agent.closedLead}</td>
                          <td>
                            <span style={{ color: "#70d89d" }}>
                              {agent.performanceScore.toFixed(1)}
                            </span>{" "}
                            out of 10
                          </td>
                          <td style={{ color: "#70d89d" }}>{agent.status}</td>
                          <td>{index + 1}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className={`${styles.agent_performance_pie_chart}`}>
                <canvas
                  className={`${styles.pie_chart}`}
                  id="pie_chart"
                  ref={getOneYearPerformanceReportChartRef}
                ></canvas>
              </div>
              <div className={`${styles.agent_performance_bar_chart}`}>
                <canvas
                  className={`${styles.bar_chart}`}
                  id="bar_chart"
                  ref={getThirtyDaysPerformanceReportChartRef}
                ></canvas>
              </div>
              <div className={`${styles.agent_performance_line_chart}`}>
                <canvas
                  className={`${styles.line_chart}`}
                  id="line_chart"
                  ref={getSixMonthsPerformanceReportChartRef}
                ></canvas>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default App
