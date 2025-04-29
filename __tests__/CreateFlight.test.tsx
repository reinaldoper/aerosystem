import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateFlight from "@/components/createFlight";
import "@testing-library/jest-dom";
import { fetchApiAirport, fetchApiPlane } from "@/service/fetchAeroSystem";
import { fetchApiFlight } from "@/service/fetchAeroSystem";
import { mockAirports, mockPlanes } from "../mocks/mock.airport.plane";

jest.mock("@/service/fetchAeroSystem", () => ({
  fetchApiAirport: jest.fn(),
  fetchApiPlane: jest.fn(),
  fetchApiFlight: jest.fn(),
}));


jest.mock("@/service/context", () => ({
  __esModule: true, 
  default: jest.fn(() => ({
    language: {
      create_flight: "Criar Voo",
      airport_origin: "Selecione o aeroporto de origem",
      airport_destination: "Selecione o aeroporto de destino",
      date_start: "Data e Hora de Partida",
      date_end: "Data e Hora de Chegada",
      status: "Status",
      select_status: "Selecione um status",
      plane: "Aeronave",
      select_airplane: "Selecione uma aeronave",
      not_plane_not_airport: "Não há aeroporto ou voos disponíveis.",
    },
    es: false,
  })),
}));

describe("Componente CreateFlight", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve exibir a mensagem de carregamento enquanto os dados estão sendo carregados", async () => {
    (fetchApiAirport as jest.Mock).mockResolvedValueOnce({ data: [] });
    (fetchApiPlane as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(<CreateFlight />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("deve exibir o formulário quando há aeroportos e aeronaves disponíveis", async () => {

    (fetchApiAirport as jest.Mock).mockResolvedValueOnce({ data: mockAirports });
    (fetchApiPlane as jest.Mock).mockResolvedValueOnce({ data: mockPlanes });

    render(<CreateFlight />);
    
    await waitFor(() => {
      expect(screen.getByTestId('origem')).toBeInTheDocument();
      expect(screen.getByTestId('destino')).toBeInTheDocument();
      expect(screen.getByTestId('dataHoraPartida')).toBeInTheDocument();
      expect(screen.getByTestId('dataHoraChegada')).toBeInTheDocument();
      expect(screen.getByTestId('status')).toBeInTheDocument();
      expect(screen.getByTestId('plane')).toBeInTheDocument();
    })
    
  });
  it("deve exibir mensagem de erro ao enviar formulário vazio", async () => {
    (fetchApiAirport as jest.Mock).mockResolvedValueOnce({ data: mockAirports });
    (fetchApiPlane as jest.Mock).mockResolvedValueOnce({ data: mockPlanes });

    render(<CreateFlight />);
    await waitFor(() => {
      const submitButton = screen.getByTestId("create-flight");
      expect(submitButton).toBeInTheDocument();
      fireEvent.click(submitButton);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    })
    await expect(screen.findByText("Erro ao criar voo"))
  })

  it("deve exibir mensagem de erro ao enviar formulário invalido", async () => {
    (fetchApiAirport as jest.Mock).mockResolvedValueOnce({ data: mockAirports });
    (fetchApiPlane as jest.Mock).mockResolvedValueOnce({ data: mockPlanes });


    render(<CreateFlight />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("origem"), {
        target: { value: "Aeroporto A" },
      });
      fireEvent.change(screen.getByTestId("destino"), {
        target: { value: "Aeroporto B" },
      });
      fireEvent.change(screen.getByTestId("dataHoraPartida"), {
        target: { value: "2023-01-01T00:00:00" },
      });
      fireEvent.change(screen.getByTestId("dataHoraChegada"), {
        target: { value: "2023-01-01T00:00:00" },
      });
      fireEvent.change(screen.getByTestId("status"), {
        target: { value: "Em Voo" },
      });
      fireEvent.change(screen.getByTestId("plane"), {
        target: { value: "Boeing 737" },
      });

      const submitButton = screen.getByTestId("create-flight");
      fireEvent.click(submitButton);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    })
    await expect(screen.findByText("Erro ao criar voo"))
  });

  it("deve exibir mensagem de sucesso ao enviar formulário válido", async () => {
    (fetchApiAirport as jest.Mock).mockResolvedValueOnce({ data: mockAirports });
    (fetchApiPlane as jest.Mock).mockResolvedValueOnce({ data: mockPlanes });
    (fetchApiFlight as jest.Mock).mockResolvedValueOnce({ message: 'Voo criado com sucesso' });


    render(<CreateFlight />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("origem"), {
        target: { value: 1 },
      });
      fireEvent.change(screen.getByTestId("destino"), {
        target: { value: 1 },
      });
      fireEvent.change(screen.getByTestId("dataHoraPartida"), {
        target: { value: "2023-01-01T00:00:00" },
      });
      fireEvent.change(screen.getByTestId("dataHoraChegada"), {
        target: { value: "2023-01-01T00:00:00" },
      });
      fireEvent.change(screen.getByTestId("status"), {
        target: { value: "Em Voo" },
      });
      fireEvent.change(screen.getByTestId("plane"), {
        target: { value: 1 },
      });

      const submitButton = screen.getByTestId("create-flight");
      fireEvent.click(submitButton);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    })
    expect(screen.findByText("Voo criado com sucesso"))
  });
  
});