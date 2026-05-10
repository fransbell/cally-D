import {
  AppShell,
  Container,
  Title,
  Text,
  Group,
  Button,
  Stack,
  Card,
  Badge,
  SimpleGrid,
} from '@mantine/core';

const sessions = [
  { id: '1', date: '2026-05-10', summary: 'Set up memory skill & session persistence', tasks: 7 },
];

export function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Title order={3} c="yellow">
              Cally-D
            </Title>
            <Badge variant="light" color="yellow" size="lg">
              Session Memory
            </Badge>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg">
          <Stack gap="xl" mt="xl">
            <div>
              <Title order={2} mb="xs">
                Session Memory Dashboard
              </Title>
              <Text c="dimmed" size="lg">
                Persistent agent session history powered by cally-D
              </Text>
            </div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={500} size="lg" mb="xs">
                  Total Sessions
                </Text>
                <Title order={1} c="yellow">
                  {sessions.length}
                </Title>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={500} size="lg" mb="xs">
                  Total Tasks
                </Text>
                <Title order={1} c="yellow">
                  {sessions.reduce((acc, s) => acc + s.tasks, 0)}
                </Title>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={500} size="lg" mb="xs">
                  Last Active
                </Text>
                <Title order={1} c="yellow">
                  {sessions[0]?.date || 'N/A'}
                </Title>
              </Card>
            </SimpleGrid>

            <Group>
              <Button variant="filled" color="yellow" size="md">
                Boot from cally-D
              </Button>
              <Button variant="outline" color="yellow" size="md">
                Save State
              </Button>
            </Group>

            <Stack gap="md">
              <Title order={3}>Session History</Title>
              {sessions.map((session) => (
                <Card key={session.id} shadow="xs" padding="md" radius="md" withBorder>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500}>{session.summary}</Text>
                      <Text size="sm" c="dimmed">
                        {session.date} · {session.tasks} tasks
                      </Text>
                    </div>
                    <Badge color="yellow" variant="light">
                      Session #{session.id}
                    </Badge>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
