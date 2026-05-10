import { Card, Text, Badge, Group, ActionIcon, Menu } from '@mantine/core';
import { useKanban } from '../hook/useKanban';
import { priorityColor, priorityLabel, formatDate } from '../utils/taskHelpers';
import type { Task } from '../hook/useKanban';

interface KanbanCardProps {
  task: Task;
  lanes: { id: string; title: string }[];
}

export function KanbanCard({ task, lanes }: KanbanCardProps) {
  const { moveTask, removeTask, setEditing } = useKanban();

  const otherLanes = lanes.filter((l) => l.id !== task.laneId);

  return (
    <Card shadow="xs" padding="sm" radius="sm" withBorder mb="xs">
      <Group justify="space-between" wrap="nowrap" mb={4}>
        <Text fw={600} size="sm" lineClamp={1} style={{ flex: 1 }}>
          {task.title}
        </Text>
        <Menu shadow="md" width={180} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray" size="xs">
              ⋯
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setEditing(task.id)}>Edit</Menu.Item>
            {otherLanes.map((lane) => (
              <Menu.Item key={lane.id} onClick={() => moveTask(task.id, lane.id)}>
                Move → {lane.title}
              </Menu.Item>
            ))}
            <Menu.Divider />
            <Menu.Item color="red" onClick={() => removeTask(task.id)}>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      {task.description && (
        <Text size="xs" c="dimmed" lineClamp={2} mb={6}>
          {task.description}
        </Text>
      )}

      <Group justify="space-between" mt={4}>
        <Badge size="xs" variant="light" color={priorityColor(task.priority)}>
          {priorityLabel(task.priority)}
        </Badge>
        <Text size="xs" c="dimmed">
          {formatDate(task.updatedAt)}
        </Text>
      </Group>
    </Card>
  );
}
