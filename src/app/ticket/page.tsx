import Welcome from '@/components/welcome'
import React from 'react'

const page = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/ticket.png')] bg-cover bg-center opacity-35 z-0" />
      <Welcome />
    </div>
  )
}

export default page
