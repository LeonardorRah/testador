import TarefasClient from "@/components/TarefasClient";

import { tarefasIniciais } from "@/data/tarefas";

async function buscarTarefas() {
  return Promise.resolve(
    tarefasIniciais
  );
}

export default async function Home() {
  const tarefas =
    await buscarTarefas();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 transition flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Lista de Tarefas
        </h1>

        <TarefasClient
          tarefasIniciais={tarefas}
        />
      </div>
    </main>
  );
}