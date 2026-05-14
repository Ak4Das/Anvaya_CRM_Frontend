import styles from "../style_modules/page_modules/Report.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import {
  getAllAgentsData,
  getLeadDataByPropertyInATimeRange,
  getLeadsWithDifferentStatusInATimeRange,
} from "../service/requestToServer.js"
import { useEffect, useRef, useState } from "react"
import {
  leadsClosedAndInPipelinePieChart,
  leadsClosedBySalesAgentsBarChart,
  leadStatusDistributionPieChart,
} from "../service/chart.js"
import Select from "react-select"
import { reportOptions } from "../service/reactSelectOptions.js"
import { customStylesForReportPage } from "../service/reactSelectCustomStyles.js"
import CompressedSideBar from "../components/CompressedSideBar.jsx"
import { useLocation } from "react-router-dom"

export default function ReportPage() {
  const [leadsClosedAndInPipeline, setLeadsClosedAndInPipeline] = useState({})
  const [leadsClosedBySalesAgents, setLeadsClosedBySalesAgents] = useState([])
  const [leadStatusDistribution, setLeadStatusDistribution] = useState([])
  const [option, setOption] = useState("")
  const leadsClosedAndInPipelinePieChartRef = useRef(null)
  const leadsClosedAndInPipelinePieChartInstance = useRef(null)
  const leadStatusDistributionPieChartRef = useRef(null)
  const leadStatusDistributionPieChartInstance = useRef(null)
  const leadsClosedBySalesAgentsBarChartRef = useRef(null)
  const leadsClosedBySalesAgentsBarChartInstance = useRef(null)
  const [closeMenu, setCloseMenu] = useState(false)
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599)
  const [isError, setIsError] = useState("")

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 599) {
        setIsMobile(true)
      } else if (window.innerWidth >= 600) {
        setIsMobile(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setCloseMenu(state)
    }
  }, [])

  async function getNumberOfLeadsClosedAndInPipeline(endDay) {
    const {
      newLeads,
      contactedLeads,
      qualifiedLeads,
      proposalSentLeads,
      closedLeads,
      lostLeads,
    } = await getLeadsWithDifferentStatusInATimeRange(endDay)

    setLeadStatusDistribution({
      newLeads: newLeads.length,
      contactedLeads: contactedLeads.length,
      qualifiedLeads: qualifiedLeads.length,
      proposalSentLeads: proposalSentLeads.length,
      closedLeads: closedLeads.length,
      lostLeads: lostLeads.length,
    })

    const NumberOfLeadsInPipeline =
      newLeads.length +
      contactedLeads.length +
      qualifiedLeads.length +
      proposalSentLeads.length

    setLeadsClosedAndInPipeline({
      leadsInPipeline: NumberOfLeadsInPipeline,
      closedLeads: closedLeads.length,
      lostLeads: lostLeads.length,
    })
  }

  async function getLeadsClosedBySalesAgents(endDay) {
    const agents = await getAllAgentsData(undefined, setIsError)
    const data = await Promise.all(
      agents.map(async (agent) => {
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
      }),
    )
    setLeadsClosedBySalesAgents(data)
  }

  useEffect(() => {
    async function getResult() {
      await getNumberOfLeadsClosedAndInPipeline(option ? option : 30)
      await getLeadsClosedBySalesAgents(option ? option : 30)
    }
    getResult()
  }, [option])

  useEffect(() => {
    if (leadsClosedBySalesAgents.length) {
      leadsClosedAndInPipelinePieChartInstance.current?.destroy()
      leadsClosedAndInPipelinePieChartInstance.current = null
      leadsClosedAndInPipelinePieChart({
        data: leadsClosedAndInPipeline,
        chartRef: leadsClosedAndInPipelinePieChartRef,
        chartInstance: leadsClosedAndInPipelinePieChartInstance,
        isMobile: isMobile,
      })
      leadStatusDistributionPieChartInstance.current?.destroy()
      leadStatusDistributionPieChartInstance.current = null
      leadStatusDistributionPieChart({
        data: leadStatusDistribution,
        chartRef: leadStatusDistributionPieChartRef,
        chartInstance: leadStatusDistributionPieChartInstance,
        isMobile: isMobile,
      })
      leadsClosedBySalesAgentsBarChart({
        data: leadsClosedBySalesAgents,
        chartRef: leadsClosedBySalesAgentsBarChartRef,
        chartInstance: leadsClosedBySalesAgentsBarChartInstance,
      })
    }
  }, [leadsClosedBySalesAgents, isMobile])

  useEffect(() => {
    return () => {
      leadsClosedAndInPipelinePieChartInstance.current?.destroy()
      leadsClosedAndInPipelinePieChartInstance.current = null
      leadStatusDistributionPieChartInstance.current?.destroy()
      leadStatusDistributionPieChartInstance.current = null
      leadsClosedBySalesAgentsBarChartInstance.current?.destroy()
      leadsClosedBySalesAgentsBarChartInstance.current = null
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
              <h2 className={`${styles.text1}`}>Reports</h2>
              <h5 className={`${styles.text2}`}>
                Reports Of The Agents Performance
              </h5>
            </div>
          </div>
          <div className={`d-flex justify-content-end`}>
            <Select
              options={reportOptions}
              styles={customStylesForReportPage}
              placeholder="Choose a option"
              classNamePrefix="custom-select"
              name="source"
              id="source"
              onChange={(selected) => setOption(selected.value)}
            />
          </div>
          <section
            className={`d-flex flex-column gap-4 ${styles.charts_container}`}
          >
            <div className="row row-gap-4">
              <div className={`col-xl-12 col-xxl-6 ${styles.first_box}`}>
                <div className={`card ${styles.card}`}>
                  <div className="card-body">
                    <canvas
                      id="leadsClosedAndInPipeline"
                      ref={leadsClosedAndInPipelinePieChartRef}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className={`col-xl-12 col-xxl-6 ${styles.second_box}`}>
                <div className={`card ${styles.card}`}>
                  <div className="card-body">
                    <canvas
                      id="leadStatusDistribution"
                      ref={leadStatusDistributionPieChartRef}
                    ></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className={`col-12 ${styles.third_box}`}>
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
  )
}
