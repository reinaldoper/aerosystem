'use client'
import React, { useState } from 'react'
import { fetchApiAirport } from '@/service/fetchAeroSystem'
import useLanguage from '@/service/context'


const AddAirport = () => {
  const { language, es } = useLanguage()
  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [codigoIATA, setCodigoIATA] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div className="relative bg-gradient-to-r mb-4 from-emerald-900 via-emerald-800 to-emerald-700 text-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">{es ? language.add_airport : 'Adicionar Aeroporto'}</h1>
      {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500 text-white p-4 rounded mb-4">{success}</div>}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
      <form
        className="flex flex-col items-center justify-center text-center px-6 py-5 z-10"
        onSubmit={async (e) => {
          e.preventDefault()
          if (!nome || !cidade || !codigoIATA || !estado) {
            setError(`${es ? language.error_add_airport : 'Preencha todos os campos.'}`)
            setSuccess('')
            return
          }
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nome,
              cidade,
              codigoIATA,
              estado,
            }),
          }
          try {
            setLoading(true)
            const response = await fetchApiAirport(options)
            if (response?.message) {
              setSuccess(`${es ? language.airport_add_success : 'Aeroporto adicionado com sucesso!'}`)
              setError('')
              setNome('')
              setCidade('')
              setEstado('')
              setCodigoIATA('')
            } else {
              setError(`${es ? language.error_add_airport : 'Erro ao adicionar aeroporto.'}`)
              setSuccess('')
            }
          } catch (error) {
            console.error('Error:', error)
            setError(`${es ? language.error_add_airport : 'Erro ao adicionar aeroporto.'}`)
            setSuccess('')
          } finally {
            setLoading(false)
          }
        }}
      >
        <input
          type="text"
          placeholder={es ? language.airport_name : 'Nome do Aeroporto'}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4"
        />
        <input
          type="text"
          placeholder={es ? language.city : 'Cidade'}
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4"
        />
        <input
          type="text"
          placeholder={es ? language.state : 'Estado'}
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4"
        />
        <input
          type="text"
          placeholder={es ? language.airport_code : 'Código IATA'}
          value={codigoIATA}
          onChange={(e) => setCodigoIATA(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4"
        />
        <button
          disabled={!nome || !cidade || !codigoIATA || !estado}
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
        >
          ✈️👨‍✈️🗺️ {es ? language.add_airport : 'Adicionar Aeroporto'}
        </button>
      </form>
    </div>
  )
}

export default AddAirport