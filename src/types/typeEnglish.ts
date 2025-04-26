
export interface data{
  title: string;
  key: string;
  description: string;
  home: string;
  employee: string;
  ticket: string;
  Cashflow: string; 
  passenger: string;
  select_passenger: string;
  select_flight: string;
  seat: string;
  price: string;
  add_ticket: string;
  dates_not_found: string;
  please: string;
  flight: string;
  explore_airports: string;
  explore_planes: string;
  select_airline: string;
  list_passengers: string;
  add_passenger: string;
  currently_airline: string;
  remove_airplane: string;
  remove: string;
  cancel: string;
  add_airplane: string;
  see_airplanes: string;
  list_planes: string;
  any_planes: string;
  page: string;
  next: string;
  back: string;
  plane_add_success: string;
  error_add_plane: string;
  add_filed: string;
  add: string;
  remove_passenger: string;
  add_airport: string;
  error_add_airport: string;
  airport_add_success: string;
  airport_name: string;
  airport_code: string;
  city: string;
  state: string;
  origin: string;
  destination: string;
  date_start: string;
  date_end: string;
  status: string;
  plane: string;
  not_plane_not_airport: string;
  select_airplane: string;
  select_status: string;
  airport_destination: string;
  airport_origin: string;
  create_flight: string
}


export interface Language {
  language: data;
  es: boolean;
  setLanguage: () => void; 
  USA: string;
  BRAZIL: string;
};