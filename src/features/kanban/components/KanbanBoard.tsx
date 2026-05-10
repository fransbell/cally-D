import { AppShell, Container, Title, Group, TextInput, Badge, ActionIcon } from '@mantine/core';
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

    // Find which lane the item is being dragged over
    // overId could be a task id or a lane id (from droppable area)
    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if over a lane (droppable id format: "lane-{laneId}")
    const overLaneId = overId.startsWith('lane-') ? overId.replace('lane-', '') : null;

    if (overLaneId && activeTask.laneId !== overLaneId) {
      moveTask(activeId, overLaneId);
      return;
    }

    // Check if over another task — find that task's lane
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

    // Over a lane droppable area
    const overLaneId = overId.startsWith('lane-') ? overId.replace('lane-', '') : null;
    if (overLaneId) {
      moveTask(activeId, overLaneId);
      return;
    }

    // Over another task — move to that task's lane (if not already there)
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
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <Container size="100%" h="100%">
            <Group h="100%" justify="space-between" px="md">
              <Group gap="xs">
                <Title order={3} c="yellow">
                  Cally-D
                </Title>
                <Badge variant="light" color="yellow" size="lg">
                  Kanban
                </Badge>
              </Group>
              <Group gap="xs">
                <TextInput
                  placeholder="Search tasks..."
                  size="sm"
                  value={searchQuery}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  w={220}
                  styles={{ input: { background: 'var(--mantine-color-dark-7)' } }}
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
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main>
          <div
            style={{
              display: 'flex',
              gap: 'var(--mantine-spacing-md)',
              padding: 'var(--mantine-spacing-md)',
              overflowX: 'auto',
              minHeight: 'calc(100vh - 100px)',
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
        </AppShell.Main>

        <TaskEditModal />
      </AppShell>

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
        background: 'var(--mantine-color-dark-6)',
        border: '2px solid var(--mantine-color-yellow-6)',
        borderRadius: 'var(--mantine-radius-sm)',
        padding: 'var(--mantine-spacing-sm)',
        minWidth: 250,
        opacity: 0.9,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        transform: 'rotate(2deg)',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{task.title}</div>
      {task.description && (
        <div style={{ fontSize: 12, color: 'var(--mantine-color-dimmed)', marginBottom: 4 }}>
          {task.description}
        </div>
      )}
    </div>
  );
}
