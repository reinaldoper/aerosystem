'use client'
import { fetchApiPassenger } from '@/service/fetchAeroSystem';
import { Passenger } from '@/types/typePassenger';
import Link from 'next/link';
import { useEffect, useState } from 'react'

const GetPassengers = () => {
  const [passenger, setPassenger] = useState<Passenger[]>([]);
    const handlePassenger = async () => {
      const { data } = await fetchApiPassenger();
      setPassenger(data);
    };
  
    useEffect(() => {
      handlePassenger();
    }, []);
  return (
    <>
    {passenger.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {passenger.map((passenger) => (
            <div
              key={passenger.id}
              className="bg-white text-black hover:bg-emerald-100 z-20 p-4 rounded-lg shadow-md mb-4"
            >
              <h2 className="text-xl font-bold">{passenger.nome}</h2>
              <p>{passenger.email}</p>
              <p>{passenger.documentoIdentidade}</p>
              <p>{passenger.planeId}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full z-10">
          <h2 className="text-2xl font-bold">No passengers found</h2>
          <p>Please add a passenger.</p>
          <Link
            href="/passengers"
            className="bg-emerald-700 text-white hover:text-emerald-100 px-4 py-2 rounded-lg mt-4 z-10"
          >
            ⟳ Add Passenger
          </Link>
        </div>
      )}
    </>
  )
}

export default GetPassengers
