import { AppShell, Container, Title, Group, TextInput, Badge, ActionIcon } from '@mantine/core';
import { useKanban } from '../hook/useKanban';
import { filterTasksByQuery, tasksForLane } from '../utils/filterTasks';
import { KanbanLane } from './KanbanLane';
import { TaskEditModal } from './TaskEditModal';

export function KanbanBoard() {
  const { lanes, tasks, searchQuery, setSearch, reset } = useKanban();

  const filteredTasks = filterTasksByQuery(tasks, searchQuery);

  const sortedLanes = [...lanes].sort((a, b) => a.order - b.order);

  return (
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
  );
}
