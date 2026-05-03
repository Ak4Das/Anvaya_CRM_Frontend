export const sourceOptions = [
  { value: "Website", label: "Website" },
  { value: "Youtube", label: "Youtube" },
  { value: "Instagram", label: "Instagram" },
  { value: "Facebook", label: "Facebook" },
  { value: "News Paper", label: "News Paper" },
  { value: "Referral", label: "Referral" },
  { value: "Our Customers", label: "Our Customers" },
  { value: "Television Ad", label: "Television Ad" },
  { value: "Google", label: "Google" },
  { value: "Other", label: "Other" },
]

export function getAgentOptions(agents) {
  const options = agents.map((agent) => {
    return { value: agent._id, label: agent.name }
  })
  return options
}

export const statusOptions = [
  { value: "New", label: "New" },
  { value: "Contacted", label: "Contacted" },
  { value: "Qualified", label: "Qualified" },
  { value: "Proposal Sent", label: "Proposal Sent" },
]

export const priorityOptions = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
]

export const tagsOptions = [
  { value: "Follow Up", label: "Follow Up" },
  { value: "High Value", label: "High Value" },
]
