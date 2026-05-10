import { Modal, TextInput, Textarea, Select, Group, Button, Stack } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useKanban } from '../hook/useKanban';

export function TaskEditModal() {
  const { editingTask, editingTaskId, setEditing, updateTask } = useKanban();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<string>('medium');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const handleSave = () => {
    if (!editingTaskId) return;
    updateTask(editingTaskId, {
      title: title.trim() || editingTask!.title,
      description,
      priority: priority as 'low' | 'medium' | 'high',
    });
    setEditing(null);
  };

  const handleClose = () => {
    setEditing(null);
  };

  return (
    <Modal
      opened={editingTaskId !== null}
      onClose={handleClose}
      title="Edit Task"
      size="md"
    >
      <Stack gap="md">
        <TextInput
          label="Title"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <Textarea
          label="Description"
          placeholder="Task description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <Select
          label="Priority"
          data={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          value={priority}
          onChange={(v) => setPriority(v ?? 'medium')}
        />
        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="yellow" onClick={handleSave}>
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
