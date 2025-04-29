'use client'

import React, { useEffect, useState } from 'react'
import { fetchApiAirport, fetchApiFlight } from '@/service/fetchAeroSystem'
import { statusFlight } from '@/types/typeFlight'
import { Airport } from '@/types/typeAirport'
import { fetchApiPlane } from '@/service/fetchAeroSystem'
import { Plane } from '@/types/typePlane'
import useLanguage from '@/service/context'


  /**
   * CreateFlight component.
   * 
   * This component renders a form to create a new flight.
   * The form contains fields for the origin and destination airports, 
   * the departure and arrival dates and times, the status of the flight 
   * and the plane that will be used.
   * 
   * After submitting the form, the component will make a POST request 
   * to the server to create a new flight.
   * 
   * @returns {JSX.Element} - The CreateFlight component.
   */
const CreateFlight = () => {
  const [origem, setOrigem] = useState(0)
  const [destino, setDestino] = useState(0)
  const [dataHoraPartida, setDataHoraPartida] = useState('')
  const [dataHoraChegada, setDataHoraChegada] = useState('')
  const [status, setStatus] = useState('')
  const [plane, setPlane] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(true)

  const { language, es } = useLanguage()


  const [airports, setAirports] = useState<Airport[]>([])
  const [planes, setPlanes] = useState<Plane[]>([])
  
    useEffect(() => {
      const fetchAirports = async () => {
        const { data } = await fetchApiAirport()
        setShow(false)
        setAirports(data)
      }
      const fetchPlanes = async () => {
        const { data } = await fetchApiPlane()
        setShow(false)
        setPlanes(data)
      }
      fetchAirports()
      fetchPlanes()
    }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origem,
        destino,
        dataHoraPartida,
        dataHoraChegada,
        status,
        plane
      }), 
    }
    try {
      setLoading(true)
      const { message, error } = await fetchApiFlight(options)
      if (message) {
        setLoading(false)
        setSuccess(message)
        setError('')
      }
      if (error) {
        setError('Erro ao criar voo')
        setSuccess('')
      }
    } catch (error) {
      console.error('Error creating flight:', error)
    }
  }


  return (
    <div className="relative bg-gradient-to-r mb-4 from-emerald-900 via-emerald-800 to-emerald-700 text-white px-6 py-12">
      <h2 className="text-2xl font-semibold mb-4">{es ? language.create_flight : 'Criar Voo'}</h2>
      {show && <p className="text-blue-500">Loading...</p>}
      {airports.length > 0 && planes.length > 0 ? <form onSubmit={handleSubmit} className="w-full max-w-md">
      {loading && <p className="text-blue-500" data-testid="loading">Loading...</p>}
      {success && <p className="text-green-500" data-testid="success">{success}</p>}
      {error && <p className="text-red-500" data-testid="error">{error}</p>}
        <div className="mb-4">
          <label htmlFor="origem" className="block text-gray-700 font-semibold mb-2">{es ? language.origin : 'Origem'}:</label>
          <select
            data-testid="origem"
            id="origem"
            value={origem}
            onChange={(e) => setOrigem(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">{es ? language.airport_origin : 'Selecione o aeroporto de origem'}</option>
            {airports.map((airport) => (
              <option className='text-black' key={airport.id} value={airport.id}>
                {airport.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="destino" className="block text-gray-700 font-semibold mb-2">{es ? language.destination : 'Destino'}:</label>
          <select
            data-testid="destino"
            id="destino"
            value={destino}
            onChange={(e) => setDestino(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">{es ? language.airport_destination : 'Selecione o aeroporto de destino'}</option>
            {airports.map((airport) => (
              <option className='text-black' key={airport.id} value={airport.id}>
                {airport.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dataHoraPartida" className="block text-gray-700 font-semibold mb-2">{es ? language.date_start : 'Data e Hora de Partida'}:</label>
          <input
            data-testid="dataHoraPartida"
            type="datetime-local"
            id="dataHoraPartida"
            value={dataHoraPartida}
            onChange={(e) => setDataHoraPartida(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dataHoraChegada" className="block text-gray-700 font-semibold mb-2">{es ? language.date_end : 'Data e Hora de Chegada'}:</label>
          <input
            type="datetime-local"
            data-testid="dataHoraChegada"
            id="dataHoraChegada"
            value={dataHoraChegada}
            onChange={(e) => setDataHoraChegada(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">{es ? language.status : 'Status'}:</label>
          <select
            data-testid="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">{es ? language.select_status : 'Selecione um status'}</option>
            {statusFlight.map((stat) => (
              <option className='text-black' key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="plane" className="block text-gray-700 font-semibold mb-2">{es ? language.plane : 'Aeronave'}:</label>
          <select
            data-testid="plane"
            id="plane"
            value={plane}
            onChange={(e) => setPlane(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">{es ? language.select_airplane : 'Selecione uma aeronave'}</option>
            {planes.map((plane) => (
              <option className='text-black' key={plane.id} value={plane.id}>
                {plane.modelo}
              </option>
            ))}
          </select>
        </div>
        <button
          data-testid="create-flight"
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md"
        >
          🛬🕒📅 {es ? language.create_flight: "Criar Voo"}
        </button>
      </form>: <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">{es ? language.not_plane_not_airport: "Não há aeroporto ou voos disponiveis."}</h1>
      </div>}
    </div>
  )
}

export default CreateFlight
