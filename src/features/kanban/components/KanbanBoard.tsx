import {
  Group,
  TextInput,
  ActionIcon,
} from '@mantine/core';
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { useKanban } from '../hook/useKanban';
import { filterTasksByQuery, tasksForLane } from '../utils/filterTasks';
import { KanbanLane } from './KanbanLane';
import { TaskEditModal } from './TaskEditModal';
import type { Task } from '../hook/useKanban';

export function KanbanBoard() {
  const { lanes, tasks, searchQuery, setSearch, reset, moveTask } = useKanban();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const filteredTasks = filterTasksByQuery(tasks, searchQuery);
  const sortedLanes = [...lanes].sort((a, b) => a.order - b.order);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const overLaneId = overId.startsWith('lane-') ? overId.replace('lane-', '') : null;

    if (overLaneId && activeTask.laneId !== overLaneId) {
      moveTask(activeId, overLaneId);
      return;
    }

    const overTask = tasks.find((t) => t.id === overId);
    if (overTask && activeTask.laneId !== overTask.laneId) {
      moveTask(activeId, overTask.laneId);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const overLaneId = overId.startsWith('lane-') ? overId.replace('lane-', '') : null;
    if (overLaneId) {
      moveTask(activeId, overLaneId);
      return;
    }

    const overTask = tasks.find((t) => t.id === overId);
    if (overTask && activeTask.laneId !== overTask.laneId) {
      moveTask(activeId, overTask.laneId);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Group gap="xs" mb="md" justify="flex-end">
        <TextInput
          placeholder="Search tasks..."
          size="sm"
          value={searchQuery}
          onChange={(e) => setSearch(e.currentTarget.value)}
          w={220}
        />
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          onClick={reset}
          title="Reset to defaults"
        >
          ↺
        </ActionIcon>
      </Group>

      <div
        style={{
          display: 'flex',
          gap: 'var(--mantine-spacing-md)',
          overflowX: 'auto',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        {sortedLanes.map((lane) => (
          <KanbanLane
            key={lane.id}
            lane={lane}
            filteredTasks={tasksForLane(filteredTasks, lane.id)}
          />
        ))}
      </div>

      <TaskEditModal />

      <DragOverlay>
        {activeTask ? <DragOverlayCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

function DragOverlayCard({ task }: { task: Task }) {
  return (
    <div
      style={{
        background: 'var(--mantine-color-body)',
        border: '2px solid var(--mantine-color-yellow-6)',
        borderRadius: 'var(--mantine-radius-sm)',
        padding: 'var(--mantine-spacing-sm)',
        minWidth: 250,
        opacity: 0.9,
        boxShadow: 'var(--mantine-shadow-lg)',
        transform: 'rotate(2deg)',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: 'var(--mantine-color-text)' }}>{task.title}</div>
      {task.description && (
        <div style={{ fontSize: 12, color: 'var(--mantine-color-dimmed)', marginBottom: 4 }}>
          {task.description}
        </div>
      )}
    </div>
  );
}
