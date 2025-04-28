import React from "react"; 
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import '@testing-library/jest-dom';




describe("Página inicial - AeroSystem", () => {
  beforeEach(() => {
   
    jest.mock("@/service/context", () => ({
      useLanguage: jest.fn(() => ({
        language: {
          explore_planes: "Explorar Aeronaves",
          explore_airports: "Ver Aeroportos",
          flight: "Voo",
        },
        es: false,
      })),
    }));

    render(<Home />);
  });

  it("deve renderizar os links corretamente", () => {
    
    expect(screen.getByText(/Explorar Aeronaves/)).toBeInTheDocument();
    expect(screen.getByText(/Ver Aeroportos/)).toBeInTheDocument();
    expect(screen.getByText(/Voo/)).toBeInTheDocument();
  });

  it("deve ter os links com o texto correto", () => {
    
    const explorePlanesLink = screen.getByText(/Explorar Aeronaves/);
    const exploreAirportsLink = screen.getByText(/Ver Aeroportos/);
    const flightLink = screen.getByText(/Voo/);

    expect(explorePlanesLink).toHaveAttribute("href", "/planes");
    expect(exploreAirportsLink).toHaveAttribute("href", "/airport");
    expect(flightLink).toHaveAttribute("href", "/flight");
  });

  it("deve renderizar a imagem de fundo do aeroporto", () => {
    const backgroundImage = screen.getByTestId("airport-background");
    expect(backgroundImage).toBeInTheDocument();
  });
});
