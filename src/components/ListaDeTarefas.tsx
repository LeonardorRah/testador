import { Tarefa } from "@/types/tarefa";

import styles from "./ListaDeTarefas.module.css";

type Props = {
  tarefas: Tarefa[];
  removerTarefa: (id: number) => void;
  alteraColclusao: (id: number) => void;
};

export default function ListaDeTarefas({
  tarefas,
  removerTarefa,
  alteraColclusao,
}: Props) {
  if (tarefas.length === 0) {
    return (
      <div className={styles.empty}>
        Nenhuma tarefa encontrada
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {tarefas.map((tarefa) => (
        <li key={tarefa.id} className={styles.item}>
          <div className={styles.taskContent}>
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() =>
                alteraColclusao(tarefa.id)
              }
              className={styles.checkbox}
            />
            <span
              className={
                tarefa.concluida
                  ? styles.completed
                  : styles.title
              }
            >
              {tarefa.titulo}
            </span>
          </div>

          <button
            onClick={() =>
              removerTarefa(tarefa.id)
            }
            className={styles.removeButton}
          >
            Remover
          </button>
        </li>
      ))}
    </ul>
  );
}