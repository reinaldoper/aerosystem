import './globals.css'
import Link from 'next/link'
import Welcome from '@/components/welcome';

/**
 * P gina inicial do AeroSystem.
 *
 * Renderiza uma imagem de fundo de um aeroporto, uma mensagem de boas-vindas,
 * e dois links para explorar aeronaves ou ver aeroportos.
 *
 * @returns {JSX.Element} - A p gina inicial do AeroSystem.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
      <div className="absolute inset-0 bg-[url('/airport.png')] bg-cover bg-center opacity-35 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 py-20">
        <Welcome />
        <div className="flex gap-6">
          <Link
            href="/planes"
            className="bg-emerald-500 hover:bg-emerald-300 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            🛬 Explorar Aeronaves
          </Link>
          <Link
            href="/airport"
            className="bg-white hover:bg-gray-200 text-emerald-800 font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            🛫 Ver Aeroportos
          </Link>

        </div>
      </div>
    </div>
  );
}
