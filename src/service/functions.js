export function sortArrayOfObjectsInAscendingOrderByPropertyContainingString( //sortStringsInAscendingOrder
  arr,
  prop,
) {
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      const firstCharacterOfI = arr[i][prop][0].toLowerCase()
      const firstCharacterOfJ = arr[j][prop][0].toLowerCase()
      if (firstCharacterOfI > firstCharacterOfJ) {
        const a = arr[i]
        arr[i] = arr[j]
        arr[j] = a
      }
    }
    i++
  }
  return arr
}

export function sortArrayOfObjectsInDescendingOrderByPropertyContainingString(
  arr,
  prop,
) {
  //sortStringsInDescendingOrder
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      const firstCharacterOfI = arr[i][prop][0].toLowerCase()
      const firstCharacterOfJ = arr[j][prop][0].toLowerCase()
      if (firstCharacterOfI < firstCharacterOfJ) {
        const a = arr[i]
        arr[i] = arr[j]
        arr[j] = a
      }
    }
    i++
  }
  return arr
}

export function sortArrayOfObjectsInAscendingOrderByPropertyContainingCodeNumber(
  arr,
  prop,
) {
  //sortCodeNumbersInAscendingOrder
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      const numberOfI = Number(arr[i][prop].replace(/.*-/, ""))
      const numberOfJ = Number(arr[j][prop].replace(/.*-/, ""))
      if (numberOfI > numberOfJ) {
        const a = arr[i]
        arr[i] = arr[j]
        arr[j] = a
      }
    }
    i++
  }
  return arr
}

export function sortArrayOfObjectsInDescendingOrderByPropertyContainingCodeNumber(
  arr,
  prop,
) {
  //sortCodeNumbersInDescendingOrder
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      const numberOfI = Number(arr[i][prop].replace(/.*-/, ""))
      const numberOfJ = Number(arr[j][prop].replace(/.*-/, ""))
      if (numberOfI < numberOfJ) {
        const a = arr[i]
        arr[i] = arr[j]
        arr[j] = a
      }
    }
    i++
  }
  return arr
}

export function sortArrayOfObjectsInAscendingOrderByPropertyContainingNumber(
  arr,
  prop,
) {
  //sortNumbersInAscendingOrder
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i][prop] > arr[j][prop]) {
        const a = arr[i]
        arr[i] = arr[j]
        arr[j] = a
      }
    }
    i++
  }
  return arr
}

export function sortArrayOfObjectsInDescendingOrderByPropertyContainingNumber(
  arr,
  prop,
) {
  //sortNumbersInDescendingOrder
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i][prop] < arr[j][prop]) {
        const a = arr[i]
        arr[i] = arr[j]
        arr[j] = a
      }
    }
    i++
  }
  return arr
}

export function sortArrayOfObjectsInAscendingOrderByPropertyContainingDate(
  arr,
  prop,
) {
  //sortDateInAscendingOrder
  arr.sort((a, b) => new Date(a[prop] || 0) - new Date(b[prop] || 0))
  return arr
}

export function sortArrayOfObjectsInDescendingOrderByPropertyContainingDate(
  arr,
  prop,
) {
  //sortDateInDescendingOrder
  arr.sort((a, b) => new Date(b[prop] || 0) - new Date(a[prop] || 0))
  return arr
}

export function sortArrayOfObjectsInAscendingOrderByPropertyContainingPhoneNumber(
  arr,
  prop,
) {
  //sortPhoneNumbersInAscendingOrder
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      const firstNumber = Number(arr[i][prop].replace(/^\(\+\d+\)/, ""))
      const secondNumber = Number(arr[j][prop].replace(/^\(\+\d+\)/, ""))
      if (firstNumber > secondNumber) {
        const a = arr[i]
        arr[i] = arr[j]
        arr[j] = a
      }
    }
    i++
  }
  return arr
}

export function sortArrayOfObjectsInDescendingOrderByPropertyContainingPhoneNumber(
  arr,
  prop,
) {
  //sortPhoneNumbersInDescendingOrder
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      const firstNumber = Number(arr[i][prop].replace(/^\(\+\d+\)/, ""))
      const secondNumber = Number(arr[j][prop].replace(/^\(\+\d+\)/, ""))
      if (firstNumber < secondNumber) {
        const a = arr[i]
        arr[i] = arr[j]
        arr[j] = a
      }
    }
    i++
  }
  return arr
}

// export function sortArrayByProperty(arr, prop) {
//   const newArr = [...arr]
//   for (let i = 0; i < newArr.length; ) {
//     for (let j = i + 1; j < newArr.length; j++) {
//       if (newArr[i][prop] < newArr[j][prop]) {
//         const a = newArr[i]
//         newArr[i] = newArr[j]
//         newArr[j] = a
//       }
//     }
//     i++
//   }
//   return newArr
// }

export function capitalizeFirstLetter(string) {
  const String = string.trim()
  const array = String.split(" ")
  const updatedArray = array.map((word) => {
    const result = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    return result
  })
  return updatedArray.join(" ")
}

export async function handleClickOnApplyBtnForFilter(obj) {
  const {
    openFilterInput,
    properties,
    filterByProperties,
    setFunction,
    setProperties,
    getIdByManagerName,
    getIdByAgentName,
  } = obj
  const inputField = document.querySelector("#input")
  const inputValue = inputField.value
  if (inputValue) {
    let updatedInputValue
    if (openFilterInput === "phoneNumber") {
      updatedInputValue = inputValue
    } else {
      updatedInputValue = capitalizeFirstLetter(inputValue)
    }

    const updatedProperties = {
      ...properties,
    }

    if (openFilterInput === "phoneNumber") {
      updatedProperties[openFilterInput] = { $regex: updatedInputValue }
    } else if (openFilterInput === "manager") {
      const arrayOfAgentsId = await getIdByManagerName(updatedInputValue)
      updatedProperties.manager = { $in: arrayOfAgentsId }
    } else if (openFilterInput === "salesAgent") {
      const arrayOfAgentsId = await getIdByAgentName(updatedInputValue)
      updatedProperties.salesAgent = { $in: arrayOfAgentsId }
    } else {
      updatedProperties[openFilterInput] = updatedInputValue
    }

    const updatedPropertiesString = JSON.stringify(updatedProperties)

    const response = await filterByProperties(updatedPropertiesString)

    setFunction(response.data)
    setProperties(updatedProperties)
  } else {
    delete properties[openFilterInput]

    const propertiesString = JSON.stringify(properties)

    const response = await filterByProperties(propertiesString)
    setFunction(response.data)
    setProperties(properties)
  }
}

export async function removePropertyFilterHandler(obj) {
  const {
    properties,
    property,
    filterByProperties,
    setFunction,
    setProperties,
  } = obj
  delete properties[property]
  const propertiesString = JSON.stringify(properties)
  const response = await filterByProperties(propertiesString)
  setFunction(response.data)
  setProperties(properties)
}

export async function clearAllFiltersHandler(obj) {
  const { properties, filterByProperties, setFunction, setProperties } = obj
  Object.keys(properties).forEach((key) => delete properties[key])
  const propertiesString = JSON.stringify(properties)
  const response = await filterByProperties(propertiesString)
  setFunction(response.data)
  setProperties(properties)
}

export function sortDataInAscendingOrderByProperty(obj) {
  const { data, prop, setFunction } = obj
  if (prop === "agentCode" || prop === "leadCode") {
    const updatedAgentsData =
      sortArrayOfObjectsInAscendingOrderByPropertyContainingCodeNumber(
        data,
        prop,
      )
    setFunction(updatedAgentsData)
  } else if (
    prop === "dateOfBirth" ||
    prop === "joinedDate" ||
    prop === "closedAt"
  ) {
    const updatedAgentsData =
      sortArrayOfObjectsInAscendingOrderByPropertyContainingDate(data, prop)
    setFunction(updatedAgentsData)
  } else if (prop === "phoneNumber") {
    const updatedAgentsData =
      sortArrayOfObjectsInAscendingOrderByPropertyContainingPhoneNumber(
        data,
        prop,
      )
    setFunction(updatedAgentsData)
  } else if (
    prop === "performanceScore" ||
    prop === "totalSalesDoneInBtw30Days" ||
    prop === "rank" ||
    prop === "timeToClose"
  ) {
    const updatedAgentsData =
      sortArrayOfObjectsInAscendingOrderByPropertyContainingNumber(data, prop)
    setFunction(updatedAgentsData)
  } else {
    const updatedAgentsData =
      sortArrayOfObjectsInAscendingOrderByPropertyContainingString(data, prop)
    setFunction(updatedAgentsData)
  }
}

export function sortDataInDescendingOrderByProperty(obj) {
  const { data, prop, setFunction } = obj
  if (prop === "agentCode" || prop === "leadCode") {
    const updatedAgentsData =
      sortArrayOfObjectsInDescendingOrderByPropertyContainingCodeNumber(
        data,
        prop,
      )
    setFunction(updatedAgentsData)
  } else if (
    prop === "dateOfBirth" ||
    prop === "joinedDate" ||
    prop === "closedAt"
  ) {
    const updatedAgentsData =
      sortArrayOfObjectsInDescendingOrderByPropertyContainingDate(data, prop)
    setFunction(updatedAgentsData)
  } else if (prop === "phoneNumber") {
    const updatedAgentsData =
      sortArrayOfObjectsInDescendingOrderByPropertyContainingPhoneNumber(
        data,
        prop,
      )
    setFunction(updatedAgentsData)
  } else if (
    prop === "performanceScore" ||
    prop === "totalSalesDoneInBtw30Days" ||
    prop === "rank" ||
    prop === "timeToClose"
  ) {
    const updatedAgentsData =
      sortArrayOfObjectsInDescendingOrderByPropertyContainingNumber(data, prop)
    setFunction(updatedAgentsData)
  } else {
    const updatedAgentsData =
      sortArrayOfObjectsInDescendingOrderByPropertyContainingString(data, prop)
    setFunction(updatedAgentsData)
  }
}

export async function unsortData(obj) {
  const { properties, filterByProperties, setFunction, applySort } = obj
  const propertiesString = JSON.stringify(properties)
  const response = await filterByProperties(propertiesString)
  setFunction(response.data)
  applySort(false)
}

export function getTotalSalesAmountOfAgent(obj) {
  const { agentId, salesData } = obj
  const arrayOfSalesDoneByAgent = salesData.filter(
    (sales) => sales.salesAgent === agentId,
  )
  const totalSales = arrayOfSalesDoneByAgent.reduce((acc, curr) => {
    return acc + curr.purchaseAmount
  }, 0)
  return totalSales
}

export function getScoreOfAgent(obj) {
  const { leadsData, agentId } = obj

  const leadsHandledByAgent = numberOfLeadsHandleByAgent(obj)

  const numberOfClosedLeadHandledByTheAgent = leadsHandledByAgent.filter(
    (lead) => lead.status === "Closed",
  )

  const denominator = leadsHandledByAgent.length
  const numerator = numberOfClosedLeadHandledByTheAgent.length
  const score = (numerator / denominator) * 10
  return Number(score.toFixed(1))
}

export function numberOfLeadsHandleByAgent(obj) {
  const { leadsData, agentId } = obj
  const leadsHandledByAgent =
    leadsData.length && agentId
      ? leadsData.filter((lead) => lead.salesAgent === agentId)
      : []
  return leadsHandledByAgent
}

export function leadsHandleByAgentAccordingToStatus(obj) {
  const { leadsData, agentId } = obj

  const leadsHandledByAgent = numberOfLeadsHandleByAgent({
    leadsData,
    agentId,
  })

  const numberOfNewLeadHandleByTheAgent = leadsHandledByAgent.filter(
    (lead) => lead.status === "New",
  )

  const numberOfContactedLeadHandledByTheAgent = leadsHandledByAgent.filter(
    (lead) => lead.status === "Contacted",
  )

  const numberOfQualifiedLeadHandledByTheAgent = leadsHandledByAgent.filter(
    (lead) => lead.status === "Qualified",
  )

  const numberOfProposalSentLeadHandledByTheAgent = leadsHandledByAgent.filter(
    (lead) => lead.status === "Proposal Sent",
  )

  const numberOfClosedLeadHandledByTheAgent = leadsHandledByAgent.filter(
    (lead) => lead.status === "Closed",
  )

  const numberOfLostLeadHandledByTheAgent = leadsHandledByAgent.filter(
    (lead) => lead.status === "Lost",
  )

  return {
    newLeads: numberOfNewLeadHandleByTheAgent,
    contactedLeads: numberOfContactedLeadHandledByTheAgent,
    qualifiedLeads: numberOfQualifiedLeadHandledByTheAgent,
    proposalSentLeads: numberOfProposalSentLeadHandledByTheAgent,
    closedLeads: numberOfClosedLeadHandledByTheAgent,
    lostLeads: numberOfLostLeadHandledByTheAgent,
  }
}

export function getCurrentDate() {
  const currentDate = new Date().toISOString().split("T")[0]
  return currentDate
}

export function normalizePhoneNumber(phoneNumber) {
  const normalizedPhoneNumber = phoneNumber.replace(/^\(\+\d+\)/, "")
  return normalizedPhoneNumber
}

export function getTimeFromIsoString(isoString) {
  const date = new Date(isoString)

  const time = date.toLocaleTimeString("en-GB", {
    hour12: false,
  })

  return time
}

export function getDateFromIsoString(isoString) {
  const date = isoString.split("T")[0]

  return date
}
