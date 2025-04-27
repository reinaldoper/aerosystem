export type Employer = {
  id?: number;
  nome: string;
  matricula: string;
  funcao: 'piloto' | 'comissario' | 'tecnico' | 'atendente';
}

export const EmployerStatus = ['piloto', 'comissario', 'tecnico', 'atendente']