import axios from "axios"

let url = null
if (import.meta.env.VITE_MODE === "DEVELOPMENT") {
  url = "http://localhost:3000"
} else {
  url = "https://anvaya-crm-backend-delta.vercel.app"
}

export async function getLeadDataByPropertyInATimeRange(
  properties,
  endDay,
  setFunction,
  setIsError,
) {
  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const propString = JSON.stringify(properties)
    const response = await axios.get(
      `${url}/leads?minDay=0&maxDay=${endDay}&filters=${propString}`,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    setFunction && setFunction(response.data)
    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function getAllAgentsData(setSalesAgents, setIsError) {
  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.get(`${url}/agents/`, {
      signal: controller.signal,
    })

    clearTimeout(timerId)

    setSalesAgents && setSalesAgents(response.data)
    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function getLeadsDataInATimeRange(obj) {
  const { setFunction, endDay, setIsError } = obj

  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.get(
      `${url}/leads?minDay=0&maxDay=${endDay}`,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    setFunction && setFunction(response.data)
    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function filterAgentsByProperties(
  filtersString,
  setFunction,
  setIsError,
) {
  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.get(
      `${url}/agents/prop?filters=${encodeURIComponent(filtersString)}`,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    setFunction && setFunction(response.data)
    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function filterLeadsByProperties(
  filtersString,
  setFunction,
  setIsError,
) {
  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.get(
      `${url}/leads?minDay=0&maxDay=30&filters=${filtersString}`,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    setFunction && setFunction(response.data)
    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function getIdByManagerName(name, setIsError) {
  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.get(
      `${url}/managers/name/${name}`,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    const arrayOfId = response.data.map((agent) => agent._id)
    return arrayOfId
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function getIdByAgentName(name, setIsError) {
  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.get(
      `${url}/agents/name/${name}`,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    const arrayOfId = response.data.map((agent) => agent._id)
    return arrayOfId
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function getAllManagersData(setManagers, setIsError) {
  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.get(`${url}/managers`, {
      signal: controller.signal,
    })

    clearTimeout(timerId)

    setManagers && setManagers(response.data)
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function findOverallPerformanceScoreOfAgent(id) {
  // Lost leads
  const filtersToFindLostLeadsInOneYear = { salesAgent: id, status: "Lost" }
  const findLostFilterString = JSON.stringify(filtersToFindLostLeadsInOneYear)
  const lostLeadsInOneYear = await axios.get(
    `${url}/leads?minDay=0&maxDay=360&filters=${findLostFilterString}`,
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
    `${url}/leads?minDay=0&maxDay=360&filters=${findClosedFilterString}`,
  )

  // New leads
  const filtersToFindNewLeadsInOneYear = { salesAgent: id, status: "New" }
  const findNewFilterString = JSON.stringify(filtersToFindNewLeadsInOneYear)
  const NewLeadsInOneYear = await axios.get(
    `${url}/leads?minDay=0&maxDay=360&filters=${findNewFilterString}`,
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
    `${url}/leads?minDay=0&maxDay=360&filters=${findContactedFilterString}`,
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
    `${url}/leads?minDay=0&maxDay=360&filters=${findQualifiedFilterString}`,
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
    `${url}/leads?minDay=0&maxDay=360&filters=${findProposalSentFilterString}`,
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

export async function getSalesDataInATimeRange(obj) {
  const { setFunction, endDay, setIsError } = obj

  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.get(
      `${url}/sales/prop?minDay=0&maxDay=${endDay}`,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    setFunction && setFunction(response.data)
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function createAgent(body, setIsError) {
  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.post(
      `${url}/agents/addAgent`,
      body,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function createLead(body, setIsError) {
  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.post(
      `${url}/leads/addLead`,
      body,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function updateLeadById(obj) {
  const { id, body, setIsError } = obj

  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.patch(
      `${url}/leads/update/${id}`,
      body,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function updateAgentById(obj) {
  const { id, body, setIsError } = obj

  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.patch(
      `${url}/agents/update/${id}`,
      body,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function postAgentComment(obj) {
  const { leadId, body, setIsError } = obj

  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.post(
      `${url}/agentComment/leads/${leadId}/comments`,
      body,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function getAgentCommentsOnALead(obj) {
  const { leadId, setFunction, setIsError } = obj

  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.get(
      `${url}/agentComment/leads/${leadId}/comments`,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    setFunction && setFunction(response.data)
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}

export async function getLeadsWithDifferentStatusInATimeRange(endDay) {
  const newLeads = await getLeadDataByPropertyInATimeRange(
    { status: "New" },
    endDay,
  )
  const contactedLeads = await getLeadDataByPropertyInATimeRange(
    { status: "Contacted" },
    endDay,
  )
  const qualifiedLeads = await getLeadDataByPropertyInATimeRange(
    { status: "Qualified" },
    endDay,
  )
  const proposalSentLeads = await getLeadDataByPropertyInATimeRange(
    { status: "Proposal Sent" },
    endDay,
  )
  const closedLeads = await getLeadDataByPropertyInATimeRange(
    { status: "Closed" },
    endDay,
  )
  const lostLeads = await getLeadDataByPropertyInATimeRange(
    { status: "Lost" },
    endDay,
  )
  return {
    newLeads,
    contactedLeads,
    qualifiedLeads,
    proposalSentLeads,
    closedLeads,
    lostLeads,
  }
}

export async function deleteAgent(agentId, setIsError) {
  const controller = new AbortController()

  const timerId = setTimeout(() => {
    controller.abort()
  }, 10000)

  try {
    const response = await axios.delete(
      `${url}/agents/delete/${agentId}`,
      {
        signal: controller.signal,
      },
    )

    clearTimeout(timerId)

    return response.data
  } catch (error) {
    clearTimeout(timerId)

    if (error.name === "CanceledError") {
      setIsError && setIsError("Request timeout")
      return
    }

    if (error.response) {
      throw new Error("Request failed")
    }

    throw error
  }
}
