'use client';

import Welcome from "@/components/welcome";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchApiPlane, fetchApiPassenger } from "@/service/fetchAeroSystem";
import { Plane } from "@/types/typePlane";
import useLanguage from "@/service/context";

/**
 * Page component for the passenger registration page.
 *
 * The component renders a form with input fields for the passenger's name, email,
 * and identification document, as well as a select field for the airline. The
 * component also renders a success or error message depending on the result of
 * the submission. If the airline select field is empty, the component renders a
 * message indicating that no airplanes have been registered yet.
 *
 * The component uses the `useLanguage` hook to support multiple languages for
 * labels and messages.
 *
 * @returns {JSX.Element} - The Page component.
 */
const Page = () => {
  const { language, es } = useLanguage();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [documentoIdentidade, setDocumentoIdentidade] = useState("");
  const [planeId, setPlaneId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [planes, setPlanes] = useState([] as Plane[]);

  const handlePlanes = async () => {
    const { data } = await fetchApiPlane();
    setPlanes(data);
  };

  useEffect(() => {
    handlePlanes();
  },[]);

  const handlePassenger = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passenger = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        documentoIdentidade,
        planeId,
      }),
    };
    setLoading(true);
    const { message, error } = await fetchApiPassenger(passenger);
    if (message) {
      setSuccess(message);
      setNome("");
      setEmail("");
      setDocumentoIdentidade("");
      setPlaneId(0);
      setLoading(false);
      setError("");
    }
    if (error) {
      setError(error);
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/passenger.png')] bg-cover bg-center opacity-35 z-0" />
      <Welcome />
      <Link
        href="/passengers/passenger"
        className="absolute top-4 left-10 text-black hover:text-emerald-100 transition-colors z-20"
      >
        ☰ {es ? language.list_passengers : "Lista de Passageiros"}
      </Link>
      <div className="flex mt-4 flex-col h-full px-6">
        {success && <p className="text-green-500 flex justify-center items-center z-20">{success}</p>}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4 flex justify-center items-center">{error}</div>
        )}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          </div>
        )}
        {planes.length > 0 ? (
          <form
            onSubmit={handlePassenger}
            className="flex flex-col items-center h-full text-center px-6 py-1"
          >
            <input
              required
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mb-2.5 bg-emerald-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition z-10"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2.5 bg-emerald-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition z-10"
            />
            <input
              required
              type="text"
              placeholder="Documento de Identidade"
              value={documentoIdentidade}
              onChange={(e) => setDocumentoIdentidade(e.target.value)}
              className="mb-2.5 bg-emerald-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition z-10"
            />
            <select
              required
              value={planeId}
              onChange={(e) => setPlaneId(Number(e.target.value))}
              className="mb-2.5 bg-emerald-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition z-10"
            >
              <option value="">{es ? language.select_airline : "Selecione o avião:"}</option>
              {planes.map((plane: Plane) => (
                <option key={plane.id} value={plane.id}>
                  {plane.modelo}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="z-20 mb-20 bg-emerald-500 justify-center cursor-pointer text-center hover:bg-emerald-300 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              🔑 {es ? language.add_passenger : "Cadastrar Passageiro"}
            </button>
          </form>
        ) : (
          <div className="flex mb-7 flex-col items-center justify-center h-full text-center px-6 py-20">
            <h1>⚠️ {es ? language.currently_airline : "Nenhuma aeronave cadastrada"}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
