"use client";
import Welcome from "@/components/welcome";
import React from "react";
import GetPassengers from "@/components/GetPassengers";

/**
 * Page component for passengers.
 *
 * Renders a background image of a passenger, a welcome message and a list of passengers.
 *
 * @returns {JSX.Element} - The page component for passengers.
 */
const Page = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/passenger.png')] bg-cover bg-center opacity-35 z-0" />
      <Welcome />
      <GetPassengers />
    </div>
  );
};

export default Page;
