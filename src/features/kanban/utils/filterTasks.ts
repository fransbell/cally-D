import type { Task } from '../hook/useKanban';

export function filterTasksByQuery(tasks: Task[], query: string): Task[] {
  if (!query.trim()) return tasks;
  const lower = query.toLowerCase();
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(lower) ||
      t.description.toLowerCase().includes(lower)
  );
}

export function tasksForLane(tasks: Task[], laneId: string): Task[] {
  return tasks.filter((t) => t.laneId === laneId);
}

export function taskCountForLane(tasks: Task[], laneId: string): number {
  return tasks.filter((t) => t.laneId === laneId).length;
}
