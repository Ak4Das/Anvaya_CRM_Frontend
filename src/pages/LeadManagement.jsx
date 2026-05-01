import styles from "../style_modules/page_modules/LeadManagement.module.css"
import React, { useEffect, useState } from "react"
import SideBar from "../components/SideBar.jsx"
import NavBar from "../components/NavBar.jsx"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

export default function LeadManagement() {
  const id = useParams().id

  const [leadsData, setLeadsData] = useState([])
  const [salesAgents, setSalesAgents] = useState([])

  async function getLeadData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/leads?minDay=0&maxDay=30",
      )
      setLeadsData(response.data)
    } catch (error) {
      throw error
    }
  }

  async function getAgentData() {
    try {
      const response = await axios.get("http://localhost:3000/agents")
      setSalesAgents(response.data)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getLeadData()
    getAgentData()
  }, [])

  const lead = leadsData.find((lead) => lead._id === id)

  function getAgentNameById(id) {
    const agent = salesAgents.find((agent) => agent._id === id)
    return agent?.name
  }

  return (
    <div className={`app`}>
      <SideBar />
      <main className={`content`}>
        <NavBar />
        <section className={`main_section`}>
          <div className={`${styles.heading_container}`}>
            <div className={`${styles.heading}`}>
              <h2 className={`${styles.text1}`}>Manage Lead</h2>
              <h5 className={`${styles.text2}`}>Lead Management Screen</h5>
            </div>
            <Link
              to={`/editLead/${id}`}
              className={`btn btn-outline-success ${styles.editLeadBtn}`}
            >
              Edit Lead Details
            </Link>
          </div>
          <div className={`container ${styles.container}`}>
            <div className={`${styles.leadDetailsContainer}`}>
              <h1>Lead Details</h1>
              <p>
                Name: <span>{lead?.name}</span>
              </p>
              <p>
                Sales Agent: <span>{getAgentNameById(lead?.salesAgent)}</span>
              </p>
              <p>
                Source: <span>{lead?.source}</span>
              </p>
              <p>
                Status: <span>{lead?.status}</span>
              </p>
              <p>
                Priority: <span>{lead?.priority}</span>
              </p>
              <p>
                Time To Close: <span>{lead?.timeToClose} days</span>
              </p>
            </div>

            <div className={`${styles.comment_section}`}>
              <h1>Comment Section</h1>
              <section className={`${styles.previous_comments_section}`}>
                <h3>Previous Comments</h3>
                <div className={`${styles.previous_comment}`}>
                  <div className={`${styles.comment}`}>
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className={`${styles.timeAndDate}`}>
                    2026-08-25 | 1:00pm
                  </div>
                </div>
              </section>
              <section className={`${styles.add_comment_section}`}>
                <h3>Add New Comment</h3>
                <textarea
                  name="comment_box"
                  className={`${styles.comment_box}`}
                  rows="5"
                ></textarea>
                <button className="btn btn-success">Submit Comment</button>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
