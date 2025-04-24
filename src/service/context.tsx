'use client'

import React, { createContext, useContext, useState } from 'react';
import english from './english.json';
import { Language } from '@/types/typeEnglish';

const LanguageContext = createContext({} as Language);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [es, setEs] = useState<boolean>(false);
  const [language] = useState(english.data);

  const USA = "🇺🇲";
  const BRAZIL = "🇧🇷";

  const setLanguage = () => {
    setEs(!es);
  };

  return (
    <LanguageContext.Provider value={{ language, es, setLanguage, USA, BRAZIL }}>
      {children}
    </LanguageContext.Provider>
  );
}   

export default function useLanguage() {
  return useContext(LanguageContext);
}