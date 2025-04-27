"use client";

import React, { useEffect, useState } from "react";
import { fetchApiCashFlow } from "@/service/fetchAeroSystem";
import { fetchApiPlane } from "@/service/fetchAeroSystem";
import { fetchApiAirport } from "@/service/fetchAeroSystem";
import { Plane } from "@/types/typePlane";
import { Airport } from "@/types/typeAirport";
import useLanguage from "@/service/context";
import { typeCash } from "@/types/typeFlow";

const AddCashFlow = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [planeId, setPlaneId] = useState(0);
  const [airportId, setAirportId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [planes, setPlanes] = useState<Plane[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const { language, es } = useLanguage();
  const [type, setType] = useState('');

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const { data } = await fetchApiPlane();
        setShow(false);
        setPlanes(data);
      } catch (error) {
        console.error("Error fetching planes:", error);
      }
    };

    const fetchAirports = async () => {
      try {
        const { data } = await fetchApiAirport();
        setShow(false);
        setAirports(data);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };

    fetchPlanes();
    fetchAirports();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log('airportId', airportId);
      
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, amount, type, planeId, airportId }),
      };
      const { message, error } = await fetchApiCashFlow(options);
      console.log(message, error);
      
      if (message) {
        setLoading(false);
        setSuccess(message);
        setDescription("");
        setAmount(0);
        setPlaneId(0);
        setAirportId(0);
        setError("");
        setType('');
      }
      if (error) {
        setError(error);
        setSuccess("");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating cash flow:", error);
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-r mb-4 from-emerald-900 via-emerald-800 to-emerald-700 text-white py-12">
      <h2 className="text-2xl font-semibold mb-4 p-3">
        {es ? language.Cashflow : "Criar Fluxo de Caixa"}
      </h2>
      {show && <p className="text-blue-500">{es ? language.loading : "Carregando..."}</p>}
      {airports.length > 0 && planes.length > 0 ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md p-4">
          {success && (
            <div className="bg-green-500 text-white p-4 rounded mb-4">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-500 text-white p-4 rounded mb-4">
              {error}
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
              {es ? language.description_ : "Descrição"}:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 font-semibold mb-2"
            >
              {es ? language.amount : "Quantidade"}:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="plane"
              className="block text-gray-700 font-semibold mb-2"
            >
              {es ? language.plane : "Aeronave"}:
            </label>
            <select
              id="plane"
              value={planeId}
              onChange={(e) => setPlaneId(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">
                {es ? language.select_airplane : "Selecione uma aeronave"}
              </option>
              {planes.map((plane) => (
                <option className="text-black" key={plane.id} value={plane.id}>
                  {plane.modelo}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="airport"
              className="block text-gray-700 font-semibold mb-2"
            >
              {es ? language.add_airport : "Aeroporto"}:
            </label>
            <select
              id="airport"
              value={airportId}
              onChange={(e) => setAirportId(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">
                {es ? language.select_airport : "Selecione um aeroporto"}
              </option>
              {airports.map((airport) => (
                <option className="text-black" key={airport.id} value={airport.id}>
                  {airport.nome}
                </option>
              ))}
            </select>
            <label
              htmlFor="airport"
              className="block text-gray-700 font-semibold mb-2"
            >
              {es ? language.select_type : "Selecione um tipo"}:
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">
                {es ? language.select_type : "Selecione um tipo"}
              </option>
              {typeCash.map((type) => (
                <option className="text-black" key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button
            disabled={!description || !amount || !type || !planeId || !airportId}
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md"
          >
            ✅ {es ? language.add : "Adicionar"}
          </button>
        </form>
      ) : (
        <p className="flex justify-center p-3 items-center px-2 gap-2 text-blue-500">
          {es ? language.not_planes_not_airports : "Sem aeronaves ou aeroportos"}
        </p>
      )}
    </div>
  );
};

export default AddCashFlow;
