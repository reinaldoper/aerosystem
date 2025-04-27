'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Plane } from '@/types/typePlane'
import { fetchApiPlane } from '@/service/fetchAeroSystem'
import useLanguage from '@/service/context'

/**
 * Componente que renderiza uma lista de aeronaves.
 *
 * @returns {JSX.Element} - A lista de aeronaves.
 */
const AllAirPlanes = () => {
  const { language, es } = useLanguage()
  const router = useRouter()
  const [airplanes, setAirplanes] = useState<Plane[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(6)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')


  const fetchAirplanes = useCallback(async () => {
    try {
      const { data, message } = await fetchApiPlane()
      setAirplanes(data)
      setSuccess(data.length === 0 ? <>{es ? language.any_planes : "Aeronaves não encontradas"}</> : message)
      setError('')
      setTotalPages(Math.ceil(data.length / limit))
      setLoading(false)
    } catch (error) {
      console.log('Error:', error)
      setError(`${es ? language.any_planes : "Erro ao buscar aeronaves"}`)
      setLoading(false)
    }
  }, [limit, es, language])

  useEffect(() => {
    fetchAirplanes()
  }, [fetchAirplanes])

  const filteredAirplanes = airplanes?.filter((plane) =>
    plane.modelo?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedAirplanes = filteredAirplanes?.slice((page - 1) * limit, page * limit)
  const filteredTotalPages = Math.ceil(filteredAirplanes?.length / limit)

  const handleRemoveAirplane = async (id: number) => {
    router.push(`/planes/${id}`)
  }

  const handleDate = (date: string) => {
    if (typeof window !== 'undefined') {
      const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      return formattedDate
    }
    return date;
  }
  return (
    <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">{es ? language.list_planes : "Todas as Aeronaves"}</h1>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
      {error && <p className="text-center text-red-500 font-semibold">{error}</p>}
      {success && <p className="text-center text-green-300 font-semibold">{success}</p>}

      <input
        type="text"
        placeholder="Pesquisar por modelo"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setPage(1)
        }}
        className="mt-4 mb-8 p-2 border border-gray-300 rounded w-full text-black"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedAirplanes?.map((plane) => (
          <div key={plane.id} className="bg-white hover:bg-emerald-300 text-black rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">Fabricação: {plane.anoFabricacao}</h2>
            <p className="text-gray-700">Modelo: {plane.modelo}</p>
            <p className="text-gray-700">Capacidade: {plane.capacidade}</p>
            <p className="text-gray-700">Valor de Compra: {plane.valorCompra}</p>
            <p className="text-gray-700">Data criação:{' '}
              {handleDate(plane.createdAt)}
            </p>
            <p className="text-gray-700">Status : {plane.status}</p>
            <button
              onClick={() => {
                handleRemoveAirplane(Number(plane.id))
              }}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {filteredTotalPages > 1 && (
        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-emerald-500 px-4 py-2 rounded text-black font-semibold hover:bg-emerald-300 disabled:opacity-50"
          >
            {es ? language.back : "Anterior"}
          </button>
          <span className="text-white font-medium">
            {es ? language.page : "Página"} {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, filteredTotalPages))}
            disabled={page === filteredTotalPages}
            className="bg-emerald-500 px-4 py-2 rounded text-black font-semibold hover:bg-emerald-300 disabled:opacity-50"
          >
            {es ? language.next : "Próximo"}
          </button>
        </div>
      )}
    </div>
  )
}

export default AllAirPlanes
