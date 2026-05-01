import axios from "axios"

export async function getLeadDataByPropertyInATimeRange(
  properties,
  endDay,
  setFunction,
) {
  try {
    const propString = JSON.stringify(properties)
    const response = await axios.get(
      `http://localhost:3000/leads?minDay=0&maxDay=${endDay}&filters=${propString}`,
    )
    setFunction && setFunction(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getAllAgentsData(setSalesAgents) {
  try {
    const response = await axios.get("http://localhost:3000/agents")
    setSalesAgents(response.data)
  } catch (error) {
    throw error
  }
}

export async function getLeadsDataInATimeRange(obj) {
  const { setFunction, endDay } = obj
  try {
    const response = await axios.get(
      `http://localhost:3000/leads?minDay=0&maxDay=${endDay}`,
    )
    setFunction(response.data)
  } catch (error) {
    throw error
  }
}

export async function filterAgentsByProperties(filtersString, setFunction) {
  try {
    const response = await axios.get(
      `http://localhost:3000/agents/prop?filters=${encodeURIComponent(JSON.stringify(filtersString))}`,
    )
    setFunction && setFunction(response.data)
    return response
  } catch (error) {
    throw error
  }
}

export async function filterLeadsByProperties(filtersString) {
  try {
    const response = await axios.get(
      `http://localhost:3000/leads?minDay=0&maxDay=30&filters=${filtersString}`,
    )
    return response
  } catch (error) {
    throw error
  }
}

export async function getIdByManagerName(name) {
  try {
    const response = await axios.get(
      `http://localhost:3000/managers/name/${name}`,
    )
    const arrayOfId = response.data.map((agent) => agent._id)
    return arrayOfId
  } catch (error) {
    throw error
  }
}

export async function getIdByAgentName(name) {
  try {
    const response = await axios.get(
      `http://localhost:3000/agents/name/${name}`,
    )
    const arrayOfId = response.data.map((agent) => agent._id)
    return arrayOfId
  } catch (error) {
    throw error
  }
}

export async function getAllManagersData(setManagers) {
  try {
    const response = await axios.get("http://localhost:3000/managers")
    setManagers(response.data)
  } catch (error) {
    throw error
  }
}

export async function findOverallPerformanceScoreOfAgent(id) {
  // Lost leads
  const filtersToFindLostLeadsInOneYear = { salesAgent: id, status: "Lost" }
  const findLostFilterString = JSON.stringify(filtersToFindLostLeadsInOneYear)
  const lostLeadsInOneYear = await axios.get(
    `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findLostFilterString}`,
  )

  // Closed leads
  const filtersToFindClosedLeadsInOneYear = {
    salesAgent: id,
    status: "Closed",
  }
  const findClosedFilterString = JSON.stringify(
    filtersToFindClosedLeadsInOneYear,
  )
  const closedLeadsInOneYear = await axios.get(
    `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findClosedFilterString}`,
  )

  // New leads
  const filtersToFindNewLeadsInOneYear = { salesAgent: id, status: "New" }
  const findNewFilterString = JSON.stringify(filtersToFindNewLeadsInOneYear)
  const NewLeadsInOneYear = await axios.get(
    `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findNewFilterString}`,
  )

  // Contacted leads
  const filtersToFindContactedLeadsInOneYear = {
    salesAgent: id,
    status: "Contacted",
  }
  const findContactedFilterString = JSON.stringify(
    filtersToFindContactedLeadsInOneYear,
  )
  const ContactedLeadsInOneYear = await axios.get(
    `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findContactedFilterString}`,
  )

  // Qualified leads
  const filtersToFindQualifiedLeadsInOneYear = {
    salesAgent: id,
    status: "Qualified",
  }
  const findQualifiedFilterString = JSON.stringify(
    filtersToFindQualifiedLeadsInOneYear,
  )
  const QualifiedLeadsInOneYear = await axios.get(
    `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findQualifiedFilterString}`,
  )

  // Proposal sent leads
  const filtersToFindProposalSentLeadsInOneYear = {
    salesAgent: id,
    status: "Proposal Sent",
  }
  const findProposalSentFilterString = JSON.stringify(
    filtersToFindProposalSentLeadsInOneYear,
  )
  const ProposalSentLeadsInOneYear = await axios.get(
    `http://localhost:3000/leads?minDay=0&maxDay=360&filters=${findProposalSentFilterString}`,
  )

  const denominator =
    NewLeadsInOneYear.data.length +
    ContactedLeadsInOneYear.data.length +
    QualifiedLeadsInOneYear.data.length +
    ProposalSentLeadsInOneYear.data.length +
    lostLeadsInOneYear.data.length +
    closedLeadsInOneYear.data.length

  const numerator = closedLeadsInOneYear.data.length

  return (numerator / denominator) * 10
}

export async function getOverallPerformanceScores(obj) {
  const { salesAgents, setFunction } = obj
  try {
    const performanceScores = await Promise.all(
      salesAgents.map(async (agent) => {
        const performanceScore = await findOverallPerformanceScoreOfAgent(
          agent._id,
        )
        agent.performanceScore = Number(performanceScore.toFixed(1)) || 0
        return {
          id: agent._id,
          performanceScore: Number(performanceScore.toFixed(1)) || 0,
        }
      }),
    )
    setFunction(performanceScores)
  } catch (error) {
    throw error
  }
}

export async function getSalesData(obj) {
  const { setFunction, endDay } = obj
  try {
    const response = await axios.get(
      `http://localhost:3000/sales/prop?minDay=0&maxDay=${endDay}`,
    )
    setFunction(response.data)
  } catch (error) {
    throw error
  }
}

export async function createAgent(body) {
  try {
    const response = await axios.post(
      "http://localhost:3000/agents/addAgent",
      body,
    )

    return response.data
  } catch (error) {
    throw error
  }
}

export async function createLead(body) {
  try {
    const response = await axios.post(
      "http://localhost:3000/leads/addLead",
      body,
    )

    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateLeadById(obj) {
  const { id, body } = obj
  try {
    const response = await axios.patch(
      `http://localhost:3000/leads/update/${id}`,
      body,
    )
    return response.data
  } catch (error) {
    throw error
  }
}
