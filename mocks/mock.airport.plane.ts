const mockAirports = [
  { id: 1, 
    nome: "Aeroporto A",
    cidade: "Cidade A",
    estado: "Estado A",
    codigoIATA: "AAA",
  },
  { id: 2, 
    nome: "Aeroporto B",
    cidade: "Cidade B",
    estado: "Estado B",
    codigoIATA: "BBB",
   },
];
const mockPlanes = [
  { id: 1,
     modelo: "Boeing 737",
     anoFabricacao: 2000,
     capacidade: 200,
     valorCompra: 50000000,
     },
  { id: 2,
     modelo: "Airbus A320",
     anoFabricacao: 2010,
     capacidade: 300,
     valorCompra: 60000000,
     },
];

export { mockAirports, mockPlanes }