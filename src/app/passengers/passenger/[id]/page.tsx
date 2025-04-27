'use client'

import React, { useState } from 'react'
import Welcome from '@/components/welcome'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { fetchApiPassenger } from '@/service/fetchAeroSystem'
import useLanguage from '@/service/context'

  /**
   * Page component that renders a page for deleting a passenger.
   * It renders a confirmation message, a button to confirm the removal,
   * and a button to cancel the removal. If the removal is confirmed, it
   * redirects to the list of passengers. If the removal is cancelled, it
   * redirects to the list of passengers.
   *
   * @returns {JSX.Element} - The page component.
   */
const Page = () => {
  const { language, es } = useLanguage()
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const handlePassengers = () => {
    router.push('/passengers/passenger')
  }

  const handleRemovePassenger = async () => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      setLoading(true)
      const { message, error } = await fetchApiPassenger(options, Number(id))
      if (message) {
        router.push('/passengers/passenger')
      }
      if (error) {
        setLoading(false)
        setError(error)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/planes.png')] bg-cover bg-center opacity-35 z-0" />
      <Welcome />
      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
      <h1 className='flex flex-col items-center justify-center h-full text-center px-6 py-20'>
        {es ? language.remove_passenger : "Tem certeza que deseja remover o passageiro"} ⚠️ {id}?
        <span className="text-emerald-500">{es ? language.remove : "Remover"}</span>
      </h1>
      <div className="flex justify-center text-center gap-6">
        <button
          type='button'
          onClick={() => handleRemovePassenger()}
          className="z-20 mb-2.5 bg-emerald-500 justify-center cursor-pointer text-center hover:bg-emerald-300 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          ❌ {es ? language.remove : "Remover"}
        </button>
        <button
          type='button'
          onClick={() => handlePassengers()}
          className="z-20 mb-2.5 bg-emerald-500 justify-center cursor-pointer text-center hover:bg-emerald-300 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          ℹ️ {es ? language.cancel : "Cancelar"}
        </button>
      </div>
    </div>
  )
}

export default Page
