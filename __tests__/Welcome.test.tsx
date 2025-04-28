import React from "react"; 
import { render, screen } from "@testing-library/react";
import Welcome from "@/components/welcome";
import '@testing-library/jest-dom';


jest.mock("@/service/context", () => ({
  __esModule: true, 
  default: jest.fn(() => ({
    language: {
      key: "Bem-vindo ao",
      description: "A plataforma inteligente de gestão aeroportuária, conectando voos, aeronaves, equipes e finanças.",
    },
    setLanguage: jest.fn(),
  })),
}));
describe("Componente Welcome", () => {
  beforeEach(() => {
    render(<Welcome />);
  });

  it("deve renderizar o titulo corretamente", () => {
    expect(screen.getByText(/Bem-vindo ao/)).toBeInTheDocument();
  });

  it("deve renderizar a descrito corretamente", () => {
    expect(screen.getByText(/A plataforma inteligente de gestão aeroportuária, conectando voos, aeronaves, equipes e finanças./)).toBeInTheDocument();
  });
  it("deve renderizar os links corretamente", () => {
    const button = screen.getByTestId('language-button');
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    const p = screen.getByTestId('language-text');
    expect(p).toBeInTheDocument();
    expect(p).toHaveClass('text-lg text-emerald-100');
    
    button.click();
    
    expect(button).toHaveClass('text-2xl mr-2 cursor-pointer');
  
    expect(button.textContent).toBe("");
    
    expect(p).toHaveTextContent('English');
  })
});