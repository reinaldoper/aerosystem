import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SignInAirplane from "@/components/signInAirplane";
import "@testing-library/jest-dom";


jest.mock("@/service/fetchAeroSystem", () => ({
  fetchApiPlane: jest.fn(() =>
    Promise.resolve({ message: "Aeronave adicionada com sucesso!" })
  ),
}));


jest.mock("@/service/context", () => ({
  __esModule: true, 
  default: jest.fn(() => ({
    language: {
      add_airplane: "Adicionar Aeronave",
      add_filed: "Preencha todos os campos.",
      plane_add_success: "Aeronave adicionada com sucesso!",
      error_add_plane: "Erro ao adicionar aeronave.",
      add: "Adicionar",
    },
    es: false,
  })),
}));

describe("Componente SignInAirplane", () => {
  it("deve renderizar o formulário corretamente", () => {
    render(<SignInAirplane />);

    expect(screen.getByPlaceholderText("Nome da Aeronave")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Modelo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Capacidade")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Valor de Compra")).toBeInTheDocument();
    expect(screen.getByTestId("add-plane")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro ao enviar formulário vazio", async () => {
    render(<SignInAirplane />);

    const submitButton = screen.getByTestId("add-plane");
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Preencha todos os campos.")
    ).toBeInTheDocument();
  });

  it("deve exibir mensagem de sucesso ao enviar formulário válido", async () => {
    render(<SignInAirplane />);

    fireEvent.change(screen.getByPlaceholderText("Nome da Aeronave"), {
      target: { value: "Boeing 737" },
    });
    fireEvent.change(screen.getByPlaceholderText("Modelo"), {
      target: { value: "2023-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("Capacidade"), {
      target: { value: "200" },
    });
    fireEvent.change(screen.getByPlaceholderText("Valor de Compra"), {
      target: { value: "50000000" },
    });

    const submitButton = screen.getByTestId("add-plane");
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Aeronave adicionada com sucesso!")
    ).toBeInTheDocument();
  });

  it("deve exibir o spinner de carregamento ao enviar o formulário", async () => {
    render(<SignInAirplane />);

    fireEvent.change(screen.getByPlaceholderText("Nome da Aeronave"), {
      target: { value: "Boeing 737" },
    });
    fireEvent.change(screen.getByPlaceholderText("Modelo"), {
      target: { value: "2023-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("Capacidade"), {
      target: { value: "200" },
    });
    fireEvent.change(screen.getByPlaceholderText("Valor de Compra"), {
      target: { value: "50000000" },
    });

    const submitButton = screen.getByTestId("add-plane");

    act(() => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});