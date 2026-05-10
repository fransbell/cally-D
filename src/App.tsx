import { AppShell, Container, Title, Badge, Group, Tabs } from '@mantine/core';
import { KanbanBoard } from './features/kanban/components/KanbanBoard';
import { ReleasesTab } from './features/releases/components/ReleasesTab';
import { ChangelogTab } from './features/releases/components/ChangelogTab';

export function App() {
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
                v0.1
              </Badge>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Tabs defaultValue="kanban" variant="outline" radius="md">
          <Tabs.List mb="md">
            <Tabs.Tab value="kanban" color="yellow">
              Kanban
            </Tabs.Tab>
            <Tabs.Tab value="releases" color="green">
              Releases
            </Tabs.Tab>
            <Tabs.Tab value="changelog" color="blue">
              Changelog
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="kanban">
            <KanbanBoard />
          </Tabs.Panel>

          <Tabs.Panel value="releases">
            <ReleasesTab />
          </Tabs.Panel>

          <Tabs.Panel value="changelog">
            <ChangelogTab />
          </Tabs.Panel>
        </Tabs>
      </AppShell.Main>
    </AppShell>
  );
}
