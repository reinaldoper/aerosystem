import React from 'react'
import Welcome from '@/components/welcome'

const page = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/employeer.png')] bg-cover bg-center opacity-35 z-0" />
      <Welcome />
    </div>
  )
}

export default page
