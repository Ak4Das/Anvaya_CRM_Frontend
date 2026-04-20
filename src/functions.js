function sortArrayOfStringsInAscendingOrder(arr) {
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      const firstCharacterOfI = arr[i][0].toLowerCase()
      const firstCharacterOfJ = arr[j][0].toLowerCase()
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

function sortArrayOfStringsInDescendingOrder(arr) {
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      const firstCharacterOfI = arr[i][0].toLowerCase()
      const firstCharacterOfJ = arr[j][0].toLowerCase()
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

function sortArrayOfNumbersInAscendingOrder(arr) {
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        const a = arr[i]
        arr[i] = arr[j]
        arr[j] = a
      }
    }
    i++
  }
  return arr
}

function sortArrayOfNumbersInDescendingOrder(arr) {
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        const a = arr[i]
        arr[i] = arr[j]
        arr[j] = a
      }
    }
    i++
  }
  return arr
}

function sortArrayOfPhoneNumbersInAscendingOrder(arr) {
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      const firstNumber = Number(
        arr[i].replace(/\(.*?\) /g, "").replace(/-/g, ""),
      )
      const secondNumber = Number(
        arr[j].replace(/\(.*?\) /g, "").replace(/-/g, ""),
      )
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

function sortArrayOfPhoneNumbersInDescendingOrder(arr) {
  for (let i = 0; i < arr.length; ) {
    for (let j = i + 1; j < arr.length; j++) {
      const firstNumber = Number(
        arr[i].replace(/\(.*?\) /g, "").replace(/-/g, ""),
      )
      const secondNumber = Number(
        arr[j].replace(/\(.*?\) /g, "").replace(/-/g, ""),
      )
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