"use client";

import { useEffect, useState } from "react";

import ListaDeTarefas from "./ListaDeTarefas";
import NovaTarefa from "./NovaTarefa";
import styles from "./TarefasClient.module.css";

import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";
import { Tarefa } from "@/types/tarefa";

type Props = {
  tarefasIniciais: Tarefa[];
};

export default function TarefasClient({
  tarefasIniciais,
}: Props) {
  const [tarefas, setTarefas] =
    useState<Tarefa[]>(tarefasIniciais);

  const [filtro, setFiltro] =
    useState("todas");

  useEffect(() => {
    const tarefasSalvas =
      localStorage.getItem("tarefas");

    if (!tarefasSalvas) {
      setTarefas(tarefasIniciais);
      return;
    }

    try {
      const dados =
        JSON.parse(tarefasSalvas);

      if (
        Array.isArray(dados) &&
        dados.length > 0
      ) {
        setTarefas(dados);
      } else {
        setTarefas(tarefasIniciais);
      }
    } catch {
      setTarefas(tarefasIniciais);
    }
  }, [tarefasIniciais]);

  useEffect(() => {
    localStorage.setItem(
      "tarefas",
      JSON.stringify(tarefas)
    );
  }, [tarefas]);

  function adicionarTarefa(
    titulo: string
  ) {
    const novaTarefa: Tarefa = {
      id: Date.now(),
      titulo,
      concluida: false,
    };

    setTarefas((prev) => [
      ...prev,
      novaTarefa,
    ]);
  }

  function removerTarefa(id: number) {
    setTarefas((prev) =>
      prev.filter(
        (tarefa) => tarefa.id !== id
      )
    );
  }

  function alteraColclusao(
    id: number
  ) {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id
          ? {
              ...tarefa,
              concluida:
                !tarefa.concluida,
            }
          : tarefa
      )
    );
  }

  const contagem =
    useContadorDeTarefas(tarefas);

  const tarefasFiltradas =
    tarefas.filter((tarefa) => {
      if (filtro === "concluidas") {
        return tarefa.concluida;
      }

      if (filtro === "pendentes") {
        return !tarefa.concluida;
      }

      return true;
    });

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        <div className={`${styles.card} ${styles.total}`}>
          <p className={styles.label}>Total</p>
          <p className={styles.value}>{contagem.total}</p>
        </div>

        <div className={`${styles.card} ${styles.concluidas}`}>
          <p className={styles.label}>Concluídas</p>
          <p className={styles.value}>{contagem.concluidas}</p>
        </div>

        <div className={`${styles.card} ${styles.pendentes}`}>
          <p className={styles.label}>Pendentes</p>
          <p className={styles.value}>{contagem.pendentes}</p>
        </div>
      </div>

      <NovaTarefa
        adicionarTarefa={adicionarTarefa}
      />

      <div className={styles.filters}>
        <button
          onClick={() => setFiltro("todas")}
          className={styles.filterButton}
        >
          Todas
        </button>

        <button
          onClick={() => setFiltro("pendentes")}
          className={styles.filterButton}
        >
          Pendentes
        </button>

        <button
          onClick={() => setFiltro("concluidas")}
          className={styles.filterButton}
        >
          Concluídas
        </button>
      </div>

      <ListaDeTarefas
        tarefas={tarefasFiltradas}
        removerTarefa={removerTarefa}
        alteraColclusao={alteraColclusao}
      />
    </div>
  );
}