import type { Task } from '../hook/useKanban';

export function priorityColor(priority: Task['priority']): string {
  switch (priority) {
    case 'high': return 'red';
    case 'medium': return 'orange';
    case 'low': return 'teal';
  }
}

export function priorityLabel(priority: Task['priority']): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function shortId(id: string): string {
  return id.slice(0, 6);
}
