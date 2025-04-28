import React from "react";
import { render, screen, act } from "@testing-library/react";
import Clock from "@/components/Clock";
import '@testing-library/jest-dom';

jest.useFakeTimers(); 

describe("Componente Clock", () => {
  it("deve renderizar a hora inicial corretamente", () => {
    render(<Clock />);
    const clockElement = screen.getByText(/🕛/); 
    expect(clockElement).toBeInTheDocument();
  });

  it("deve atualizar a hora após 1 segundo", () => {
    render(<Clock />);
    const initialTime = screen.getByText(/🕛/).textContent;

    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const updatedTime = screen.getByText(/🕛/).textContent;
    expect(updatedTime).not.toBe(initialTime); 
  });

  afterEach(() => {
    jest.clearAllTimers(); 
  });
});