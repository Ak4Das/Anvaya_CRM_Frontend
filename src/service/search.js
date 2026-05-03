function getActualText(query, prop) {
  const textInLowerCase = query.toLowerCase().trim()
  const textFreeFromSpecialCharacters =
    prop === "email"
      ? textInLowerCase.replace(/[^a-zA-Z@. ]/g, "")
      : prop === "phoneNumber"
        ? textInLowerCase.replace(/\(.*?\) /g, "").replace(/-/g, "")
        : textInLowerCase.replace(/[^a-zA-Z ]/g, "")
  return textFreeFromSpecialCharacters
}

function basicMatch(data, query, prop) {
  const cleanQuery = getActualText(query, prop)
  const matchByFirstName =
    prop === "name"
      ? data.filter(
          (agent) => agent.name.split(" ")[0].toLowerCase() === cleanQuery,
        )
      : []
  const matchByProp =
    prop !== "phoneNumber"
      ? data.filter((agent) => agent[prop].toLowerCase() === cleanQuery)
      : data.filter(
          (agent) =>
            agent[prop].replace(/\(.*?\) /g, "").replace(/-/g, "") ===
            cleanQuery,
        )

  return matchByFirstName.length ? matchByFirstName : matchByProp
}

function tokenize(query, prop) {
  const textTokens = getActualText(query, prop).split(/\s+/)

  return textTokens
}

function advanceMatch(data, query, prop) {
  const queryTokens = tokenize(query, prop)

  return data
    .map((agent) => {
      const value =
        prop !== "phoneNumber"
          ? agent[prop].toLowerCase()
          : agent[prop].replace(/\(.*?\) /g, "").replace(/-/g, "")
      let score = 0

      queryTokens.forEach((token) => {
        if (value.includes(token)) {
          score++
        } else {
          let matchCount = 0

          for (let i = 0; i < token.length; i++) {
            if (value.includes(token[i])) {
              matchCount++
            }
          }

          const similarity = matchCount / token.length

          if (
            prop === "email" ||
            prop === "country" ||
            prop === "phoneNumber"
          ) {
            if (similarity > 0.95) {
              score += similarity
            }
          } else {
            if (similarity > 0.7) {
              score += similarity
            }
          }
        }
      })
      return { ...agent, score }
    })
    .filter((p) => p.score > 0)
}

function rankedAdvanceMatch(data, query, prop) {
  const advanceMatchArray = advanceMatch(data, query, prop)
  for (let i = 0; i < advanceMatchArray.length; i++) {
    for (let j = i + 1; j < advanceMatchArray.length; j++) {
      if (advanceMatchArray[j].score > advanceMatchArray[i].score) {
        let a = advanceMatchArray[i]
        advanceMatchArray[i] = advanceMatchArray[j]
        advanceMatchArray[j] = a
      }
    }
  }
  return advanceMatchArray
}

export function SearchByName(data, query) {
  const basicMatchName = basicMatch(data, query, "name")
  const advanceMatchName = rankedAdvanceMatch(data, query, "name")
  return basicMatchName.length ? basicMatchName : advanceMatchName
}

export function SearchByCountry(data, query) {
  const basicMatchCountry = basicMatch(data, query, "country")
  const advanceMatchCountry = rankedAdvanceMatch(data, query, "country")
  return basicMatchCountry.length ? basicMatchCountry : advanceMatchCountry
}

export function SearchByPhoneNumber(data, query) {
  const basicMatchPhoneNumber = basicMatch(data, query, "phoneNumber")
  const advanceMatchPhoneNumber = rankedAdvanceMatch(data, query, "phoneNumber")
  return basicMatchPhoneNumber.length
    ? basicMatchPhoneNumber
    : advanceMatchPhoneNumber
}

export function SearchByEmail(data, query) {
  const basicMatchEmail = basicMatch(data, query, "email")
  const advanceMatchEmail = rankedAdvanceMatch(data, query, "email")
  return basicMatchEmail.length ? basicMatchEmail : advanceMatchEmail
}
