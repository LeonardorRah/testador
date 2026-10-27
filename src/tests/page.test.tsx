import {
  render,
  screen,
} from "@testing-library/react";

import Home from "@/app/page";

describe("Home Page", () => {
  it("deve renderizar a lista de tarefas", async () => {
    const Page = await Home();

    render(Page);

    expect(
      screen.getByText(
        "Lista de Tarefas"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Estudar Next.js"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Aprender React"
      )
    ).toBeInTheDocument();
  });
});