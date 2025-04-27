"use client";
import React, { useState } from "react";
import { fetchApiEmployee } from "@/service/fetchAeroSystem";
import { EmployerStatus } from "@/types/typeEmployer";
import useLanguage from "@/service/context";

const AddEmployer = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [funcao, setFuncao] = useState("");

  const { language, es } = useLanguage();

  const handleAddEmployer = async () => {
    try {
      setLoading(true);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, matricula, funcao }),
      };

      const { message, error } = await fetchApiEmployee(options);
      if (message) {
        setSuccess(message);
        setNome("");
        setMatricula("");
        setFuncao("");
        setError("");
      }
      if (error) {
        setError(error);
        setSuccess("");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-r mb-4 from-emerald-900 via-emerald-800 to-emerald-700 text-white py-12">
      <form className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center text-center px-6 py-5">
          <h1 className="flex text-2xl justify-center items-center font-bold mb-4">
            {es ? language.add_employer : "Adicionar Funcionario"}
          </h1>
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
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <input
            type="text"
            placeholder="Matricula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <select
            value={funcao}
            onChange={(e) => setFuncao(e.target.value)}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">
              {es ? language.select_function : "Selecione uma função"}
            </option>
            {EmployerStatus.map((status) => (
              <option className="text-black" key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            disabled={!nome || !matricula || !funcao}
            type="button"
            onClick={handleAddEmployer}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? (
              <>↻ {es ? language.loading : "Carregando..."}</>
            ) : (
              <>✅ {es ? language.add : "Adicionar"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployer;
