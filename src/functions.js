export function sortStringsInAscendingOrder(arr, prop) {
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

export function sortStringsInDescendingOrder(arr, prop) {
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

export function sortCodeNumbersInAscendingOrder(arr, prop) {
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

export function sortCodeNumbersInDescendingOrder(arr, prop) {
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

export function sortNumbersInAscendingOrder(arr, prop) {
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

export function sortNumbersInDescendingOrder(arr, prop) {
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

export function sortDateInAscendingOrder(arr, prop) {
  arr.sort((a, b) => new Date(a[prop] || 0) - new Date(b[prop] || 0))
  return arr
}

export function sortDateInDescendingOrder(arr, prop) {
  arr.sort((a, b) => new Date(b[prop] || 0) - new Date(a[prop] || 0))
  return arr
}

export function sortPhoneNumbersInAscendingOrder(arr, prop) {
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

export function sortPhoneNumbersInDescendingOrder(arr, prop) {
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

export function sortArrayByProperty(arr, prop) {
  const newArr = [...arr]
  for (let i = 0; i < newArr.length; ) {
    for (let j = i + 1; j < newArr.length; j++) {
      if (newArr[i][prop] < newArr[j][prop]) {
        const a = newArr[i]
        newArr[i] = newArr[j]
        newArr[j] = a
      }
    }
    i++
  }
  return newArr
}
