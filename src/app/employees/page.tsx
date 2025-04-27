'use client'
import React from 'react'
import Welcome from '@/components/welcome'
import AddEmployer from '@/components/addEmployer'

const page = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/employeer.png')] bg-cover bg-center opacity-35 z-0" />
      <Welcome />
      <div className="flex mt-4 flex-col items-center justify-center h-full text-center px-6">
      <AddEmployer />
      </div>
    </div>
  )
}

export default page
