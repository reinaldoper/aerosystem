"use client";

import Welcome from "@/components/welcome";
import React, { useEffect, useState } from "react";
import { Passenger } from "@/types/typePassenger";
import { fetchApiPassenger, fetchApiTicket } from "@/service/fetchAeroSystem";

const Page = () => {
  const [passenger, setPassenger] = useState<Passenger[]>([]);
  const [passageiroId, setPassengerId] = useState<number>(0);
  const [vooId, setVooId] = useState<number>(0);
  const [assento, setAssento] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const handlePassenger = async () => {
    const { data } = await fetchApiPassenger();
    setPassenger(data);
  };

  useEffect(() => {
    handlePassenger();
  }, []);

  const handleTicket = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        passageiroId,
        vooId,
        assento,
        preco,
      }),
    };
    const { message, error } = await fetchApiTicket(options);
    if (message) {
      setMessage(message);
    }
    if (error) {
      setError(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/ticket.png')] bg-cover bg-center opacity-35 z-0" />
      <Welcome />
      <div className="flex flex-col items-center justify-center h-full text-center px-6 py-20">
        <h1 className="text-2xl font-bold text-center mt-4">
          Adicionar Ticket
        </h1>
        {message && (
          <div className="bg-green-500 text-white py-2 px-4 rounded mt-4">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white py-2 px-4 rounded mt-4">
            {error}
          </div>
        )}
        {passenger.length > 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-20 z-10">
            <label htmlFor="passageiroId">Passageiro:</label>
            <select
              required
              id="passageiroId"
              name="passageiroId"
              value={passageiroId}
              onChange={(e) => setPassengerId(Number(e.target.value))}
            >
              <option value="">Selecione um passageiro</option>
              {passenger.map((passenger) => (
                <option key={passenger.id} value={passenger.id}>
                  {passenger.nome}
                </option>
              ))}
            </select>
            <label htmlFor="vooId">Voo:</label>
            <input
              required
              type="number"
              id="vooId"
              name="vooId"
              value={vooId}
              onChange={(e) => setVooId(Number(e.target.value))}
            />
            <label htmlFor="assento">Assento:</label>
            <input
              required
              type="text"
              id="assento"
              name="assento"
              value={assento}
              onChange={(e) => setAssento(e.target.value)}
            />
            <label htmlFor="preco">Preço:</label>
            <input
              required
              type="number"
              id="preco"
              name="preco"
              value={preco}
              onChange={(e) => setPreco(Number(e.target.value))}
            />
            <button
              type="button"
              onClick={handleTicket}
              disabled={!passageiroId || !vooId || !assento || !preco}
              className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded mt-4 z-10"
            >
              Adicionar Ticket
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full z-10">
            <h2 className="text-2xl font-bold">No passengers found</h2>
            <p>Please add a passenger.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
