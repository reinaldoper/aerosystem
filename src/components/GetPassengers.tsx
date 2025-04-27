"use client";
import { fetchApiPassenger } from "@/service/fetchAeroSystem";
import { Passenger } from "@/types/typePassenger";
import Link from "next/link";
import { useEffect, useState } from "react";
import useLanguage from "@/service/context";
import { useRouter } from "next/navigation";

  /**
   * Fetch the list of passengers from the API.
   *
   * @returns The list of passengers
   */
const GetPassengers = () => {
  const router = useRouter()
  const { language, es } = useLanguage();
  const [passenger, setPassenger] = useState<Passenger[]>([]);
  const handlePassenger = async () => {
    const { data } = await fetchApiPassenger();
    setPassenger(data);
  };

  useEffect(() => {
    handlePassenger();
  }, []);

  const handleRemovePassenger = async (id: number) => {
    router.push(`/passengers/passenger/${id}`)
  }
  return (
    <>
      {passenger.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-4 gap-6 p-6">
          {passenger.map((passenger) => (
            <div
              key={passenger.id}
              className="bg-white text-black hover:bg-emerald-100 z-20 p-4 rounded-lg shadow-md mb-4"
            >
              <h2 className="text-xl font-bold">{passenger.nome}</h2>
              <p>{passenger.email}</p>
              <p>{passenger.documentoIdentidade}</p>
              <p>{passenger.planeId}</p>
              <button
                onClick={() => {
                  handleRemovePassenger(Number(passenger.id));
                }}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col mt-4 items-center justify-center h-full z-10">
          <h2 className="text-2xl font-bold">
            {es ? language.dates_not_found : "Passageiros não encontrados"}
          </h2>
          <p>{es ? language.add_passenger : "Adicionar passageiro"}</p>
          <Link
            href="/passengers"
            className="bg-emerald-700 text-white hover:text-emerald-100 px-4 py-2 rounded-lg mt-4 z-10"
          >
            ⟳ {es ? language.add_passenger : "Adicionar passageiro"}
          </Link>
        </div>
      )}
    </>
  );
};

export default GetPassengers;
