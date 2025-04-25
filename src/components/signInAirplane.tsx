'use client'
import React, { useState } from 'react'
import { fetchApiPlane } from '@/service/fetchAeroSystem'
import useLanguage from '@/service/context'

  /**
   * Componente que renderiza um formul rio para adicionar uma aeronave.
   * @returns {JSX.Element} - O formul rio para adicionar uma aeronave.
   */
const SignInAirplane = () => {
  const { language, es } = useLanguage()
  const [modelo, setModelo] = useState('')
  const [anoFabricacao, setAnoFabricacao] = useState<Date>()
  const [capacidade, setCapacidade] = useState('')
  const [valorCompra, setValorCompra] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)



  /**
   * Fun o que trata do envio do formul rio de adicionar aeronave.
   * @param {React.FormEvent<HTMLFormElement>} event - O evento do formul rio.
   * @returns {Promise<void>}
   */
  const handleAirplanes = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const ano = anoFabricacao?.getFullYear()
    if (!modelo || !ano || !capacidade || !valorCompra) {
      setSuccess('')
      setError(`${es ? language.add_filed : 'Preencha todos os campos.'}`)
      return
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelo,
        anoFabricacao: ano,
        capacidade: Number(capacidade),
        valorCompra: Number(valorCompra),
      }), 
    }
    try {
      setLoading(false)
      const { message } = await fetchApiPlane(options)
      if (message) {
        setSuccess(`${es ? language.plane_add_success : 'Aeronave adicionada com sucesso!'}`)
        setError('')
        setLoading(true)
        setModelo('')
        setCapacidade('')
        setValorCompra('')
        setAnoFabricacao(undefined)
      } else {
        setLoading(true)
        setSuccess('')
        setError(`${es ? language.error_add_plane : 'Erro ao adicionar aeronave.'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setSuccess('')
      setLoading(true)
      setError(`${es ? language.error_add_plane : 'Erro ao adicionar aeronave.'}`)
    }
    
  }

  
  return (
    <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500 text-white p-4 rounded mb-4">
          {success}
        </div>
      )}
      {!loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
      <form onSubmit={handleAirplanes} method="post">
        <div className="flex flex-col items-center justify-center text-center px-6 py-5">
          <h1 className="text-2xl font-bold mb-4">{es ? language.add_airplane: "Adicionar Aeronave"}</h1>
          <input
            type="text"
            name="name"
            onChange={(e) => setModelo(e.target.value)}
            value={modelo}
            placeholder="Nome da Aeronave"
            className="z-20 mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="model"
            onChange={(e) => setAnoFabricacao(new Date(e.target.value))}
            value={anoFabricacao?.toISOString().split('T')[0]}
            placeholder="Modelo"
            className="z-20 mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="capacity"
            onChange={(e) => setCapacidade(e.target.value)}
            value={capacidade}
            placeholder="Capacidade"
            className="z-20 mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="value"
            onChange={(e) => setValorCompra(e.target.value)}
            value={valorCompra}
            placeholder="Valor de Compra"
            className="z-20 mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            type='submit'
            className="z-20 bg-emerald-500 justify-center cursor-pointer text-center hover:bg-emerald-300 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            🛬 {es ? language.add : "Adicionar"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignInAirplane
