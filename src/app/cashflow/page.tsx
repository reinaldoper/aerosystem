"use client";
import Welcome from "@/components/welcome";
import React from "react";
import AddCashFlow from "@/components/addCashFlow";

/**
 * Page component for cash flow.
 *
 * Renders a background image of cash, a welcome message and a form to add a new cash flow.
 *
 * @returns {JSX.Element} - The page component for cash flow.
 */
const page = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/cash.png')] bg-cover bg-center opacity-35 z-0" />
      <div className="flex mt-4 flex-col items-center justify-center h-full text-center px-8">
        <Welcome />
        <AddCashFlow />
      </div>
    </div>
  );
};

export default page;
