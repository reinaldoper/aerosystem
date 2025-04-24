'use client'

import React from 'react'
import Welcome from '@/components/welcome'
import { useState } from 'react'
import SignInAirplane from '@/components/signInAirplane'
import AllAirPlanes from '@/components/allAirPlanes'

const Page = () => {

  const [airplanes, setAirplanes] = useState(true)
  
  const handleAirplanes = () => {
    setAirplanes(!airplanes)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/planes.png')] bg-cover bg-center opacity-35 z-0" />
      <Welcome />
      {!airplanes ?
        <div className="flex flex-col items-center justify-center h-full text-center px-6 py-20">
          <SignInAirplane />
        </div>: <div className="flex flex-col items-center justify-center h-full text-center px-6 py-20">
          <AllAirPlanes />
      </div>}
      <div className="flex justify-center text-center gap-6">
        <button
          type='button'
          onClick={handleAirplanes}
          className="z-20 mb-2.5 bg-emerald-500 justify-center cursor-pointer text-center hover:bg-emerald-300 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          {airplanes ? 'Adicionar Aeronave' : 'Ver Aeronaves'}
        </button>
      </div>
    </div>
  )
}

export default Page
