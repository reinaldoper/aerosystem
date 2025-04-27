'use client'
import Welcome from '@/components/welcome'
import React from 'react'
import AddAirport from '@/components/addAirport'

/**
 * Page component for the airport section.
 *
 * Renders a background image of an airport, a welcome message, and a form to add a new airport.
 *
 * @returns {JSX.Element} - The page component for the airport section.
 */

const page = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/airport.png')] bg-cover bg-center opacity-35 z-0" />
      <Welcome />
      <div className="relative z-10 flex flex-col flex-wrap items-center justify-center mt-4 text-center">
      <AddAirport />
      </div>
    </div>
  )
}

export default page
