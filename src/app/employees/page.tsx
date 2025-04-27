'use client'
import React from 'react'
import Welcome from '@/components/welcome'
import AddEmployer from '@/components/addEmployer'

/**
 * Page component for the employee registration page.
 *
 * The component renders a form with input fields for the employee's name, email,
 * and identification document, as well as a select field for the airline. The
 * component also renders a success or error message depending on the result of
 * the submission. If the airline select field is empty, the component renders a
 * message indicating that no airplanes have been registered yet.
 *
 * The component uses the `useLanguage` hook to support multiple languages for
 * labels and messages.
 *
 * @returns {JSX.Element} - The page component.
 */
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
