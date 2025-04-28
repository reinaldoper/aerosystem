
'use client';


import React, { useState, useEffect } from 'react';

/**
 * Componente que renderiza um rel gio atualizado a cada segundo.
 *
 * Ele utiliza o hook useEffect para criar um intervalo de 1 segundo que
 * atualiza o estado hora com a hora atual. O componente renderingiza
 * uma p com a hora atual e um nico caracter de rel gio.
 *
 * @returns {JSX.Element} - O rel gio atualizado a cada segundo.
 */
export default function Clock() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-white hover:text-emerald-100 transition-colors">
      🕛 {hora}
    </p>
  );
}
