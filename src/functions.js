export function sortArrayOfStringsInAscendingOrder(arr, prop) {
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

export function sortArrayOfStringsInDescendingOrder(arr, prop) {
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

export function sortArrayOfCodeNumbersInAscendingOrder(arr, prop) {
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

export function sortArrayOfCodeNumbersInDescendingOrder(arr, prop) {
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

export function sortArrayOfNumbersInAscendingOrder(arr, prop) {
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

export function sortArrayOfNumbersInDescendingOrder(arr, prop) {
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

export function sortDateInAscOrder(arr, prop) {
  arr.sort((a, b) => new Date(a[prop] || 0) - new Date(b[prop] || 0))
  return arr
}

export function sortDateInDescOrder(arr, prop) {
  arr.sort((a, b) => new Date(b[prop] || 0) - new Date(a[prop] || 0))
  return arr
}

export function sortArrayOfPhoneNumbersInAscendingOrder(arr, prop) {
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

export function sortArrayOfPhoneNumbersInDescendingOrder(arr, prop) {
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
