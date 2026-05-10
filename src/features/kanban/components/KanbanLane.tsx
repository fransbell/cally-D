import { useState } from 'react';
import { Stack, Title, Badge, Group, TextInput, ActionIcon, Text } from '@mantine/core';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useKanban } from '../hook/useKanban';
import { taskCountForLane } from '../utils/filterTasks';
import { SortableKanbanCard } from './KanbanCard';
import type { Lane, Task } from '../hook/useKanban';

interface KanbanLaneProps {
  lane: Lane;
  filteredTasks: Task[];
}

export function KanbanLane({ lane, filteredTasks }: KanbanLaneProps) {
  const { lanes, addTask, removeLane } = useKanban();
  const count = taskCountForLane(filteredTasks, lane.id);

  const { setNodeRef, isOver } = useDroppable({
    id: `lane-${lane.id}`,
    data: { type: 'lane', laneId: lane.id },
  });

  const taskIds = filteredTasks.map((t) => t.id);

  return (
    <Stack
      gap="xs"
      ref={setNodeRef}
      style={{
        minWidth: 280,
        maxWidth: 320,
        flexShrink: 0,
        background: isOver
          ? 'var(--mantine-color-dark-6)'
          : 'var(--mantine-color-dark-7)',
        borderRadius: 'var(--mantine-radius-md)',
        padding: 'var(--mantine-spacing-md)',
        border: isOver
          ? '2px dashed var(--mantine-color-yellow-6)'
          : '1px solid var(--mantine-color-dark-5)',
        transition: 'background 0.2s, border 0.2s',
      }}
    >
      <Group justify="space-between" mb={4}>
        <Group gap="xs">
          <Title order={5}>{lane.title}</Title>
          <Badge size="sm" variant="light" color={lane.color}>
            {count}
          </Badge>
        </Group>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="xs"
          onClick={() => removeLane(lane.id)}
          title="Remove lane"
        >
          ✕
        </ActionIcon>
      </Group>

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        {filteredTasks.map((task) => (
          <SortableKanbanCard key={task.id} task={task} lanes={lanes} />
        ))}
      </SortableContext>

      {count === 0 && (
        <Text size="xs" c="dimmed" ta="center" py="md">
          No tasks
        </Text>
      )}

      <AddTaskForm laneId={lane.id} onAdd={addTask} />
    </Stack>
  );
}

function AddTaskForm({ laneId, onAdd }: { laneId: string; onAdd: (title: string, desc: string, laneId: string, priority: 'low' | 'medium' | 'high') => void }) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed, '', laneId, 'medium');
    setValue('');
  };

  return (
    <TextInput
      placeholder="+ Add a task..."
      size="xs"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleSubmit();
      }}
      styles={{ input: { background: 'var(--mantine-color-dark-8)', border: 'none' } }}
    />
  );
}
