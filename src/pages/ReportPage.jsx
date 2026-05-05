import styles from "../style_modules/page_modules/Report.module.css"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import {
  getAllAgentsData,
  getLeadDataByPropertyInATimeRange,
  getLeadsWithDifferentStatusInATimeRange,
} from "../service/requestToServer.js"
import { useEffect, useState } from "react"
import {
  leadsClosedAndInPipelinePieChart,
  leadsClosedBySalesAgentsBarChart,
  leadStatusDistributionPieChart,
} from "../service/chart.js"

export default function ReportPage() {
  const [leadsClosedAndInPipeline, setLeadsClosedAndInPipeline] = useState({})
  const [leadsClosedBySalesAgents, setLeadsClosedBySalesAgents] = useState([])
  const [leadStatusDistribution, setLeadStatusDistribution] = useState([])

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
      await getNumberOfLeadsClosedAndInPipeline(30)
      await getLeadsClosedBySalesAgents(30)
    }
    getResult()
  }, [])

  useEffect(() => {
    if (leadsClosedBySalesAgents.length) {
      leadsClosedAndInPipelinePieChart(leadsClosedAndInPipeline)
      leadStatusDistributionPieChart(leadStatusDistribution)
      leadsClosedBySalesAgentsBarChart(leadsClosedBySalesAgents)
    }
  }, [leadsClosedBySalesAgents])

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
          </div>
          <section className={`${styles.charts_container}`}>
            <div className={`${styles.first_box} ${styles.box}`}>
              <canvas id="leadsClosedAndInPipeline"></canvas>
            </div>
            <div className={`${styles.second_box} ${styles.box}`}>
              <canvas id="leadStatusDistribution"></canvas>
            </div>
            <div className={`${styles.third_box} ${styles.box}`}>
              <canvas id="leadsClosedBySalesAgents"></canvas>
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}
