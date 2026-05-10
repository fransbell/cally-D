import {
  Stack,
  Card,
  Badge,
  Text,
  Code,
  Center,
  Table,
} from '@mantine/core';
import { useReleases } from '../hook/useReleases';
import { releasesToChangelog, shortChangeSummary, changeType } from '../utils/parseReleases';

const typeColors: Record<string, string> = {
  feat: 'green',
  fix: 'red',
  refactor: 'blue',
  docs: 'grape',
  chore: 'gray',
  perf: 'orange',
  test: 'cyan',
  build: 'teal',
  ci: 'violet',
  other: 'dark',
};

export function ChangelogTab() {
  const { releases } = useReleases();
  const changelog = releasesToChangelog(releases);

  if (changelog.length === 0) {
    return (
      <Center h={300}>
        <Text c="dimmed">No changelog entries yet.</Text>
      </Center>
    );
  }

  return (
    <Stack gap="md" p="md" maw={900} mx="auto">
      <Text size="lg" fw={600} c="yellow">
        Changelog
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        Summary of all changes deployed to GitHub Pages, derived from conventional commit messages.
      </Text>

      <Card shadow="xs" padding="md" radius="md" withBorder>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Version</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Change</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Commit</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {changelog.map((entry) => {
              const cType = changeType(entry.message);
              const color = typeColors[cType] ?? 'dark';
              const summary = shortChangeSummary(entry.message);

              return (
                <Table.Tr key={entry.version}>
                  <Table.Td>
                    <Badge variant="filled" color="yellow" size="sm" radius="sm">
                      {entry.version}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color={color} size="xs">
                      {cType}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{summary}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" c="dimmed">
                      {entry.date}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Code>{entry.commit}</Code>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
}
