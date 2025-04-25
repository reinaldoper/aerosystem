export type Flight = {
  origem: number;
  destino: number;
  dataHoraPartida: string;
  dataHoraChegada: string;
  status?: 'programado' | 'em_andamento' | 'concluido' | 'cancelado';
  plane: number;
  id?: number;
};
 