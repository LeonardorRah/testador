import { renderHook } from "@testing-library/react";

import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";

describe("useContadorDeTarefas", () => {
  it("deve retornar a contagem correta", () => {
    const { result } = renderHook(() =>
      useContadorDeTarefas([
        {
          id: 1,
          titulo: "Tarefa 1",
          concluida: true,
        },
        {
          id: 2,
          titulo: "Tarefa 2",
          concluida: false,
        },
      ])
    );

    expect(result.current.total).toBe(
      2
    );

    expect(
      result.current.concluidas
    ).toBe(1);

    expect(
      result.current.pendentes
    ).toBe(1);
  });

  it("deve retornar zero para lista vazia", () => {
    const { result } = renderHook(() =>
      useContadorDeTarefas([])
    );

    expect(result.current.total).toBe(
      0
    );

    expect(
      result.current.concluidas
    ).toBe(0);

    expect(
      result.current.pendentes
    ).toBe(0);
  });
});