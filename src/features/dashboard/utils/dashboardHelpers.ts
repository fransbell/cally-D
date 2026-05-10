import type { Session } from '../hook/useDashboard';

export function totalTasks(sessions: Session[]): number {
  return sessions.reduce((acc, s) => acc + s.tasks, 0);
}

export function lastActiveDate(sessions: Session[]): string {
  return sessions[0]?.date ?? 'N/A';
}

export function sessionCount(sessions: Session[]): number {
  return sessions.length;
}
