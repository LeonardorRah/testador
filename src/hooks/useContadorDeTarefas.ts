import { Tarefa } from "@/types/tarefa";

export function useContadorDeTarefas(
  tarefas: Tarefa[]
) {
  return {
    total: tarefas.length,
    concluidas: tarefas.filter(
      (tarefa) => tarefa.concluida
    ).length,
    pendentes: tarefas.filter(
      (tarefa) => !tarefa.concluida
    ).length,
  };
}