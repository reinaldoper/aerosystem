'use client'


const URL_API_PLANE = process.env.NEXT_PUBLIC_API_PLANES || 'http://localhost:3000/api/planes'
const URL_API_AIRPORT = process.env.NEXT_PUBLIC_API_AIRPORT || 'http://localhost:3000/api/airports'
const URL_API_FLIGHT = process.env.NEXT_PUBLIC_API_FLIGHT || 'http://localhost:3000/api/flights'
const URL_API_TICKET = process.env.NEXT_PUBLIC_API_TICKET || 'http://localhost:3000/api/tickets'
const URL_API_PASSENGER = process.env.NEXT_PUBLIC_API_PASSENGER || 'http://localhost:3000/api/passengers'
const URL_API_CASHFLOW = process.env.NEXT_PUBLIC_API_CASHFLOW || 'http://localhost:3000/api/cashFlow'
const URL_API_EMPLOYEE = process.env.NEXT_PUBLIC_API_EMPLOYEE || 'http://localhost:3000/api/employees'


/**
 * Fetch the list of planes from the API.
 *
 * @param {RequestInit} [options] - Options to pass to the fetch function.
 * @returns {Promise<Plane[]>} - A promise that resolves with the list of planes.
 */
export const fetchApiPlane = async (options?: RequestInit, id?: number) => {
  if(id) {
    const response = await fetch(`${URL_API_PLANE}/${id}`, options )
    const data = await response.json()
    return data
  } else {
    const response = await fetch(`${URL_API_PLANE}`, options )
    const data = await response.json()
    return data
  }
}


/**
 * Fetch the list of airports from the API.
 *
 * @param {RequestInit} [options] - Options to pass to the fetch function.
 * @returns {Promise<Airport[]>} - A promise that resolves with the list of airports.
 */
export const fetchApiAirport = async (options?: RequestInit) => {
  const response = await fetch(`${URL_API_AIRPORT}`, options )
  const data = await response.json()
  return data
}
/**
 * Fetch the list of flights from the API.
 *
 * @param {RequestInit} [options] - Options to pass to the fetch function.
 * @returns {Promise<Flight[]>} - A promise that resolves with the list of flights.
 */
export const fetchApiFlight = async (options?: RequestInit) => {
  const response = await fetch(`${URL_API_FLIGHT}`, options )
  const data = await response.json()
  return data
}

/**
 * Fetch the list of tickets from the API.
 *
 * @param {RequestInit} [options] - Options to pass to the fetch function.
 * @returns {Promise<Ticket[]>} - A promise that resolves with the list of tickets.
 */

export const fetchApiTicket = async (options?: RequestInit) => {
  const response = await fetch(`${URL_API_TICKET}`, options )
  const data = await response.json()
  return data
}

/**
 * Fetch the list of passengers from the API.
 *
 * @param {RequestInit} [options] - Options to pass to the fetch function.
 * @returns {Promise<Passenger[]>} - A promise that resolves with the list of passengers.
 */
export const fetchApiPassenger = async (options?: RequestInit, id?: number) => {
  if (id) {
    const response = await fetch(`${URL_API_PASSENGER}/${id}`, options )
    const data = await response.json()
    return data
  } else {
    const response = await fetch(`${URL_API_PASSENGER}`, options )
    const data = await response.json()
    return data
  }
}

/**
 * Fetch the list of cash flow from the API.
 *
 * @param {RequestInit} [options] - Options to pass to the fetch function.
 * @returns {Promise<CashFlow[]>} - A promise that resolves with the list of cash flow.
 */
export const fetchApiCashFlow = async (options?: RequestInit) => {
  const response = await fetch(`${URL_API_CASHFLOW}`, options )
  const data = await response.json()
  return data
}

/**
 * Fetch the list of employees from the API.
 *
 * @param {RequestInit} [options] - Options to pass to the fetch function.
 * @returns {Promise<Employee[]>} - A promise that resolves with the list of employees.
 */
export const fetchApiEmployee = async (options?: RequestInit) => {
  const response = await fetch(`${URL_API_EMPLOYEE}`, options )
  const data = await response.json()
  return data
}