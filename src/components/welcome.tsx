'use client'

import React from "react";

import useLanguage from "@/service/context";

/**
 * Componente que renderiza uma mensagem de boas-vindas na p gina inicial do
 * AeroSystem.
 *
 * Renderiza um h1 com o t tulo "Bem-vindo ao AeroSystem" e um p com uma
 * descri o da plataforma.
 *
 * @returns {JSX.Element} - A mensagem de boas-vindas.
 */


const Welcome = () => {
  const { language, es, setLanguage, USA, BRAZIL } = useLanguage();
  return (
    <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 py-20">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
        {es ? (
          <>
            {language.key}{" "}
            <span className="text-emerald-300">{language.title}</span>
          </>
        ) : (
          <>
            Bem-vindo ao <span className="text-emerald-300">AeroSystem</span>
          </>
        )}
      </h1>
      <p className="text-xl md:text-2xl max-w-3xl text-emerald-100">
        {es
          ? language.description
          : "A plataforma inteligente de gestão aeroportuária, conectando voos," +
            "aeronaves, equipes e finanças."}
      </p>
      <div className="flex justify-center items-center mt-4">
        <button
          type="button"
          onClick={() => setLanguage()}
          className="text-2xl mr-2 cursor-pointer"
        >
          {es ? BRAZIL : USA}
        </button>
        <p className="text-lg text-emerald-100">
          {es ? "Português" : "English"}
        </p>
      </div>
    </div>
  );
};

export default Welcome;
