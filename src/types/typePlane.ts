export const PlaneStatus = ["operante", "manutencao", "fora_servico"]

export type Plane = {
  modelo?: string
  anoFabricacao: number
  capacidade: number
  valorCompra: number
  id: string
  createdAt: string;
  status?: "operante" | "manutencao" | "fora_servico"
}