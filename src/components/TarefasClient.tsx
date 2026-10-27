"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import ListaDeTarefas from "./ListaDeTarefas";
import NovaTarefa from "./NovaTarefa";
import styles from "./TarefasClient.module.css";

import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";
import { Tarefa } from "@/types/tarefa";

type Props = {
  tarefasIniciais: Tarefa[];
};

const CHAVE_TAREFAS = "tarefas";
const ouvintes = new Set<() => void>();

function assinarTarefas(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  window.addEventListener("storage", ouvinte);

  return () => {
    ouvintes.delete(ouvinte);
    window.removeEventListener("storage", ouvinte);
  };
}

function obterTarefasSalvas() {
  return localStorage.getItem(CHAVE_TAREFAS);
}

function salvarTarefas(tarefas: Tarefa[]) {
  localStorage.setItem(
    CHAVE_TAREFAS,
    JSON.stringify(tarefas)
  );
  ouvintes.forEach((ouvinte) => ouvinte());
}

function interpretarTarefasSalvas(
  tarefasSalvas: string | null
): Tarefa[] | null {
  if (tarefasSalvas === null) {
    return null;
  }

  try {
    const dados: unknown = JSON.parse(tarefasSalvas);

    return Array.isArray(dados) && dados.length > 0
      ? dados as Tarefa[]
      : null;
  } catch (error) {
    console.error("Não foi possível carregar as tarefas salvas.", error);
    return null;
  }
}

export default function TarefasClient({
  tarefasIniciais,
}: Props) {
  const tarefasSalvas = useSyncExternalStore(
    assinarTarefas,
    obterTarefasSalvas,
    () => null
  );
  const tarefasInterpretadas =
    interpretarTarefasSalvas(tarefasSalvas);
  const tarefas =
    tarefasInterpretadas ?? tarefasIniciais;

  const [filtro, setFiltro] =
    useState("todas");

  useEffect(() => {
    if (
      tarefasInterpretadas === null &&
      obterTarefasSalvas() === tarefasSalvas
    ) {
      salvarTarefas(tarefasIniciais);
    }
  }, [tarefasIniciais, tarefasInterpretadas, tarefasSalvas]);

  function adicionarTarefa(
    titulo: string
  ) {
    const novaTarefa: Tarefa = {
      id: Date.now(),
      titulo,
      concluida: false,
    };

    salvarTarefas([...tarefas, novaTarefa]);
  }

  function removerTarefa(id: number) {
    salvarTarefas(
      tarefas.filter(
        (tarefa) => tarefa.id !== id
      )
    );
  }

  function alteraColclusao(
    id: number
  ) {
    salvarTarefas(
      tarefas.map((tarefa) =>
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