"use client";

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
    <div className="relative z-20 flex flex-col items-center justify-center text-center overflow-x-hidden">
      <h1 className="flex justify-center mt-4 text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg break-words text-center">
        {es ? (
          <>
            {language.key}{" "}
            <span className="flex text-emerald-300 flex-wrap">{language.title}</span>
          </>
        ) : (
          <>
            Bem-vindo ao <span className="text-emerald-300">AeroSystem</span>
          </>
        )}
      </h1>
      <p className="text-xl md:text-2xl w-full text-emerald-100 break-words">
        {es
          ? language.description
          : "A plataforma inteligente de gestão aeroportuária, conectando voos, aeronaves, equipes e finanças."}
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
