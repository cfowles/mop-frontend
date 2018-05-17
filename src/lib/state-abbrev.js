export const states = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
}

export const miscRegions = {
  AS: 'American Samoa',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  GU: 'Guam',
  MH: 'Marshall Islands',
  MP: 'Northern Mariana Islands',
  PW: 'Palau',
  PR: 'Puerto Rico',
  VI: 'Virgin Islands'
}

export const armedForcesRegions = [
  ['AE', 'Armed Forces Africa'],
  ['AA', 'Armed Forces America'],
  ['AE', 'Armed Forces Canada'],
  ['AE', 'Armed Forces Europe'],
  ['AE', 'Armed Forces Middle East'],
  ['AP', 'Armed Forces Pacific']
]

export function getStateFullName(stateAbrv) {
  return states[stateAbrv] || miscRegions[stateAbrv]
}

function getRegionsUncached(onlyStates) {
  const statesArr = Object.keys(states).map(key => [key, states[key]])
  if (onlyStates) return statesArr

  return [
    ...statesArr,
    ...Object.keys(miscRegions).map(key => [key, miscRegions[key]])
  ].sort((a, b) => a[1].localeCompare(b[1]))
}

// We'll cache the result in memory
let ALL_REGIONS = null
let STATES = null

/**
 * Gets an array of regions or states. Uses an array because the list is alphabetized
 * @param {boolean} onlyStates - If true, returns the 50 US states, otherwise also returns territories, etc.
 * @return {array} An array of arrays, element[i][0] is abbreviation, element[i][1] is full name
 */
export function getRegions(onlyStates) {
  if (onlyStates) {
    // eslint-disable-next-line no-return-assign
    return STATES || (STATES = getRegionsUncached(true))
  }

  // eslint-disable-next-line no-return-assign
  return ALL_REGIONS || (ALL_REGIONS = getRegionsUncached(false))
}
