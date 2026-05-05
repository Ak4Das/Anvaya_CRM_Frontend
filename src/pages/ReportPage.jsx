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
    const agents = await getAllAgentsData()
    const data = await Promise.all(
      agents.map(async (agent) => {
        const leadsClosedByAgent = await getLeadDataByPropertyInATimeRange(
          {
            salesAgent: agent._id,
            status: "Closed",
          },
          endDay,
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
      leadsClosedAndInPipelinePieChart({
        data: leadsClosedAndInPipeline,
        chartRef: leadsClosedAndInPipelinePieChartRef,
        chartInstance: leadsClosedAndInPipelinePieChartInstance,
      })
      leadStatusDistributionPieChart({
        data: leadStatusDistribution,
        chartRef: leadStatusDistributionPieChartRef,
        chartInstance: leadStatusDistributionPieChartInstance,
      })
      leadsClosedBySalesAgentsBarChart({
        data: leadsClosedBySalesAgents,
        chartRef: leadsClosedBySalesAgentsBarChartRef,
        chartInstance: leadsClosedBySalesAgentsBarChartInstance,
      })
    }
  }, [leadsClosedBySalesAgents])

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
    <div className={`app`}>
      <SideBar />
      <main className={`content`}>
        <NavBar />
        <section className="main_section">
          <div className={`${styles.heading_container}`}>
            <div className={`${styles.heading}`}>
              <h2 className={`${styles.text1}`}>Reports</h2>
              <h5 className={`${styles.text2}`}>
                Reports Of The Agents Performance
              </h5>
            </div>
            <div className={`${styles.select}`}>
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
          </div>
          <section className={`${styles.charts_container}`}>
            <div className={`${styles.first_box} ${styles.box}`}>
              <canvas
                id="leadsClosedAndInPipeline"
                ref={leadsClosedAndInPipelinePieChartRef}
              ></canvas>
            </div>
            <div className={`${styles.second_box} ${styles.box}`}>
              <canvas
                id="leadStatusDistribution"
                ref={leadStatusDistributionPieChartRef}
              ></canvas>
            </div>
            <div className={`${styles.third_box} ${styles.box}`}>
              <canvas
                id="leadsClosedBySalesAgents"
                ref={leadsClosedBySalesAgentsBarChartRef}
              ></canvas>
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}
