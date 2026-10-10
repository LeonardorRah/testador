import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import NovaTarefa from "@/components/NovaTarefa";

describe("NovaTarefa", () => {
  it("deve renderizar input e botão", () => {
    render(
      <NovaTarefa
        adicionarTarefa={jest.fn()}
      />
    );

    expect(
      screen.getByPlaceholderText(
        "Digite uma tarefa"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Adicionar")
    ).toBeInTheDocument();
  });

  it("deve adicionar nova tarefa", async () => {
    const mockAdicionar =
      jest.fn();

    const user =
      userEvent.setup();

    render(
      <NovaTarefa
        adicionarTarefa={
          mockAdicionar
        }
      />
    );

    const input =
      screen.getByPlaceholderText(
        "Digite uma tarefa"
      );

    const botao =
      screen.getByText("Adicionar");

    await user.type(
      input,
      "Nova tarefa"
    );

    await user.click(botao);

    expect(
      mockAdicionar
    ).toHaveBeenCalledWith(
      "Nova tarefa"
    );
  });

  it("não deve adicionar tarefa vazia", async () => {
    const mockAdicionar =
      jest.fn();

    const user =
      userEvent.setup();

    render(
      <NovaTarefa
        adicionarTarefa={
          mockAdicionar
        }
      />
    );

    const botao =
      screen.getByText("Adicionar");

    await user.click(botao);

    expect(
      mockAdicionar
    ).not.toHaveBeenCalled();
  });

  it("deve desabilitar o botão quando o input estiver vazio", () => {
    render(
      <NovaTarefa
        adicionarTarefa={jest.fn()}
      />
    );

    const botao =
      screen.getByText("Adicionar");

    expect(botao).toBeDisabled();
  });

  it("deve habilitar o botão quando houver texto", async () => {
    const user =
      userEvent.setup();

    render(
      <NovaTarefa
        adicionarTarefa={jest.fn()}
      />
    );

    const input =
      screen.getByPlaceholderText(
        "Digite uma tarefa"
      );

    const botao =
      screen.getByText("Adicionar");

    await user.type(input, "Teste");

    expect(botao).toBeEnabled();
  });
});