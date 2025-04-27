export type Flow = {
  id?: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  planeId: number;
  airportId: number;
};


export const typeCash = ['income', 'expense'];