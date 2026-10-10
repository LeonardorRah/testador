"use client";

import { useState } from "react";

import styles from "./NovaTarefa.module.css";

type Props = {
  adicionarTarefa: (
    tarefa: string
  ) => void;
};

export default function NovaTarefa({
  adicionarTarefa,
}: Props) {
  const [novaTarefa, setNovaTarefa] =
    useState("");

  const inputVazio =
    !novaTarefa.trim();

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (inputVazio) return;

    adicionarTarefa(novaTarefa);

    setNovaTarefa("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={novaTarefa}
        onChange={(e) =>
          setNovaTarefa(e.target.value)
        }
        className={styles.input}
      />

      <button
        type="submit"
        disabled={inputVazio}
        className={styles.button}
      >
        Adicionar
      </button>
    </form>
  );
}