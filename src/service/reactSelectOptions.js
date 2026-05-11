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

export function getManagerOptions(managers) {
  const options = managers.map((manager) => {
    return { value: manager._id, label: manager.name }
  })
  return options
}

export const statusOptions = [
  { value: "New", label: "New" },
  { value: "Contacted", label: "Contacted" },
  { value: "Qualified", label: "Qualified" },
  { value: "Proposal Sent", label: "Proposal Sent" },
]

export const editLeadStatusOptions = [
  { value: "New", label: "New" },
  { value: "Contacted", label: "Contacted" },
  { value: "Qualified", label: "Qualified" },
  { value: "Proposal Sent", label: "Proposal Sent" },
  { value: "Closed", label: "Closed" },
  { value: "Lost", label: "Lost" },
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

export const reportOptions = [
  { value: 30, label: "Thirty Days" },
  { value: 180, label: "Six Months" },
  { value: 360, label: "One Year" },
]

export const teamFilterOptions = [
  { value: "agentCode", label: "Code" },
  { value: "name", label: "Name" },
  { value: "role", label: "Role" },
  { value: "status", label: "Status" },
  { value: "joinedDate", label: "Joined Date" },
  { value: "department", label: "Department" },
  { value: "manager", label: "Manager" },
  { value: "location", label: "Location" },
  { value: "performanceScore", label: "Performance Score" },
]

export const teamContactFilterOptions = [
  { value: "agentCode", label: "Code" },
  { value: "name", label: "Name" },
  { value: "dateOfBirth", label: "Date Of Birth" },
  { value: "country", label: "Country" },
  { value: "email", label: "Email" },
  { value: "phoneNumber", label: "Phone Number" },
]

export const salesInfoFilterOptions = [
  { value: "agentCode", label: "Code" },
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "phoneNumber", label: "Phone Number" },
  { value: "totalSalesDoneInBtw30Days", label: "Total Sale" },
  { value: "rank", label: "Rank" },
]

export const leadsHandledBySalesAgentFilterOptions = [
  { value: "leadCode", label: "Code" },
  { value: "name", label: "Name" },
  { value: "source", label: "Source" },
  { value: "status", label: "Status" },
  { value: "tags", label: "Tags" },
  { value: "priority", label: "Priority" },
  { value: "timeToClose", label: "Time To Close" },
  { value: "closedAt", label: "Closed At" },
]

export const leadsFilterOptions = [
  { value: "leadCode", label: "Code" },
  { value: "name", label: "Name" },
  { value: "source", label: "Source" },
  { value: "agentName", label: "Agent Name" },
  { value: "status", label: "Status" },
  { value: "tags", label: "Tags" },
  { value: "priority", label: "Priority" },
  { value: "timeToClose", label: "Time To Close" },
  { value: "closedAt", label: "Closed At" },
]
