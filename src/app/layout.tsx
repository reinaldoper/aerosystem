'use client';

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import english from '../service/english.json';
import { LanguageProvider } from '@/service/context';
import Clock from '@/components/Clock';



/**
 * Componente que renderiza a estrutura b sica de uma p gina do AeroSystem.
 *
 * Renderiza um header com um menu de navega o e a hora atual, um main
 * que   onde o conte do da p gina   renderizado, e um footer com a
 * informa o de copyright.
 *
 * @param {{ children: React.ReactNode }} props - Props do componente.
 * @returns {JSX.Element} - A estrutura b sica da p gina.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [language] = useState(english.data);
  const [es, setEs] = useState(false);

  const USA = "🇺🇲";
  const BRAZIL = "🇧🇷";

  return (
    <html lang="pt-BR">
      <body className="flex flex-wrap flex-col min-h-screen font-stretch-condensed">
        <header className="bg-emerald-700 shadow-md">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-white text-xl font-semibold">{es ? language.title : "AeroSystem"}</h1>
            <nav className="flex space-x-6">
              <Link href="/" className="text-white hover:text-emerald-100 transition-colors">
                {es ? language.home : "Início"}
              </Link>
              <Link href="/employees" className="text-white hover:text-emerald-100 transition-colors">
                {es ? language.employee : "Funcionários"}
              </Link>
              <Link href="/ticket" className="text-white hover:text-emerald-100 transition-colors">
                {es ? language.ticket : "Bilhete"}
              </Link>
              <Link href="/cashflow" className="text-white hover:text-emerald-100 transition-colors">
                {es ? language.Cashflow : "Fluxo de Caixa"}
              </Link>
              <Link href="/passengers" className="text-white hover:text-emerald-100 transition-colors">
                {es ? language.passenger : "Passageiro"}
              </Link>
              <p className="text-white hover:text-emerald-100 transition-colors">
                <Clock />
              </p>
              <button
                type="button"
                onClick={() => setEs(!es)}
                className="text-2xl cursor-pointer"
              >
                {es ? BRAZIL : USA}
              </button>
              <p className="text-lg text-emerald-100">
                {es ? "pt-BR" : "es-US"}
              </p>
            </nav>
          </div>
        </header>
        <main>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </main>
        <footer className="bg-emerald-700 text-white text-sm py-4">
          <div className="max-w-6xl mx-auto text-center">
            © 2025 AeroSystem. Todos os direitos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
