'use client'
import Welcome from '@/components/welcome'
import React from 'react'
import CreateFlight from '@/components/createFlight'

/**
 * Page component for flights.
 *
 * Renders a background image of an airport, a welcome message and a form to create a new flight.
 *
 * @returns {JSX.Element} - The page component for flights.
 */
const Page = () => {
  console.log('Flight');
  
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/airport.png')] bg-cover bg-center opacity-35 z-0" />

      <div className="flex mt-4 flex-col items-center justify-center h-full text-center px-6">
        <Welcome />
        <CreateFlight />
      </div>
      
    </div>
  )
}

export default Page
