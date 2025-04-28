import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GetPassengers from "@/components/GetPassengers";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { fetchApiPassenger } from "@/service/fetchAeroSystem";


jest.mock("@/service/fetchAeroSystem", () => ({
  fetchApiPassenger: jest.fn(),
}));


jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));


jest.mock("@/service/context", () => ({
  __esModule: true, 
  default: jest.fn(() => ({
    language: {
      dates_not_found: "Passageiros não encontrados",
      add_passenger: "Adicionar passageiro",
      plane_add_success: "Aeronave adicionada com sucesso!",
    },
    es: false,
  })),
}));

describe("Componente GetPassengers", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("deve renderizar a mensagem de 'Passageiros não encontrados' quando a lista está vazia", async () => {
    (fetchApiPassenger as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(<GetPassengers />);

    expect(
      await screen.getByTestId("passenger-not-found")
    ).toBeInTheDocument();
    expect(screen.getByTestId("add-passenger")).toBeInTheDocument();
  });

  it("deve exibir os passageiros retornados pela API", async () => {
    const mockPassengers = [
      {
        id: 1,
        nome: "João Silva",
        email: "joao@email.com",
        documentoIdentidade: "123456789",
        planeId: 101,
      },
      {
        id: 2,
        nome: "Maria Oliveira",
        email: "maria@email.com",
        documentoIdentidade: "987654321",
        planeId: 102,
      },
    ];

    (fetchApiPassenger as jest.Mock).mockResolvedValueOnce({
      data: mockPassengers,
    });

    render(<GetPassengers />);

    expect(await screen.findByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Maria Oliveira")).toBeInTheDocument();
  });

  it("deve navegar para a página de remoção ao clicar no botão de remover", async () => {
    const mockPassengers = [
      {
        id: 1,
        nome: "João Silva",
        email: "joao@email.com",
        documentoIdentidade: "123456789",
        planeId: 101,
      },
    ];

    (fetchApiPassenger as jest.Mock).mockResolvedValueOnce({
      data: mockPassengers,
    });

    render(<GetPassengers />);

    const removeButton = await screen.findByText("❌");
    fireEvent.click(removeButton);

    expect(mockPush).toHaveBeenCalledWith("/passengers/passenger/1");
  });
});