
export interface data{
  title: string;
  key: string;
  description: string;
  home: string;
  employee: string;
  ticket: string;
  Cashflow: string; 
  passenger: string;
}

export interface Language {
  language: data;
  es: boolean;
  setLanguage: () => void; 
  USA: string;
  BRAZIL: string;
};