import type { Project, Store, Task } from './types';
import { dateOffset } from './dates';

const initialProjects: Project[] = [
  {
    id: 'studio-site',
    name: 'Studio website',
    description: 'A fresh home for the studio and its work.',
    color: '#558b73',
    icon: 'S',
    createdAt: '2025-01-10',
  },
  {
    id: 'field-notes',
    name: 'Field Notes',
    description: 'Turn the research into a useful product.',
    color: '#c47d5d',
    icon: 'F',
    createdAt: '2025-01-14',
  },
  {
    id: 'launch-plan',
    name: 'Spring launch',
    description: 'Everything needed for a thoughtful release.',
    color: '#6d83a9',
    icon: 'L',
    createdAt: '2025-01-18',
  },
];

const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Sketch the new landing page',
    description:
      'Explore a few directions for the opening story. Keep the first screen focused on the work, not the process.',
    status: 'in-progress',
    priority: 'high',
    dueDate: dateOffset(1),
    projectId: 'studio-site',
    assignee: 'Maya Chen',
    createdAt: dateOffset(-4),
    updatedAt: dateOffset(-1),
  },
  {
    id: 'task-2',
    title: 'Collect customer quotes',
    description:
      'Pull the most useful lines from recent conversations and ask for permission to publish.',
    status: 'todo',
    priority: 'medium',
    dueDate: dateOffset(3),
    projectId: 'studio-site',
    assignee: 'Maya Chen',
    createdAt: dateOffset(-3),
    updatedAt: dateOffset(-2),
  },
  {
    id: 'task-3',
    title: 'Audit image library',
    description:
      'Find the strongest project photography and flag anything that needs a new crop.',
    status: 'done',
    priority: 'low',
    dueDate: dateOffset(-1),
    projectId: 'studio-site',
    assignee: 'Maya Chen',
    createdAt: dateOffset(-8),
    updatedAt: dateOffset(-1),
  },
  {
    id: 'task-4',
    title: 'Map the onboarding journey',
    description:
      'Make the first-use path feel clear, useful, and welcoming. Include the empty states.',
    status: 'todo',
    priority: 'urgent',
    dueDate: dateOffset(2),
    projectId: 'field-notes',
    assignee: 'Maya Chen',
    createdAt: dateOffset(-5),
    updatedAt: dateOffset(-2),
  },
  {
    id: 'task-5',
    title: 'Synthesize interview themes',
    description:
      'Bring together six interviews and highlight repeated language, friction, and surprises.',
    status: 'in-progress',
    priority: 'high',
    dueDate: dateOffset(4),
    projectId: 'field-notes',
    assignee: 'Maya Chen',
    createdAt: dateOffset(-7),
    updatedAt: dateOffset(-1),
  },
  {
    id: 'task-6',
    title: 'Draft release checklist',
    description:
      'A practical list of the few things that need to be true before launch day.',
    status: 'todo',
    priority: 'medium',
    dueDate: dateOffset(5),
    projectId: 'launch-plan',
    assignee: 'Maya Chen',
    createdAt: dateOffset(-3),
    updatedAt: dateOffset(-2),
  },
  {
    id: 'task-7',
    title: 'Confirm launch partners',
    description:
      'Check timing and assets with the small group of collaborators.',
    status: 'done',
    priority: 'low',
    projectId: 'launch-plan',
    assignee: 'Maya Chen',
    createdAt: dateOffset(-10),
    updatedAt: dateOffset(-4),
  },
  {
    id: 'task-8',
    title: 'Write the launch note',
    description: 'Tell the story behind the release in a human, direct voice.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: dateOffset(6),
    projectId: 'launch-plan',
    assignee: 'Maya Chen',
    createdAt: dateOffset(-2),
    updatedAt: dateOffset(-1),
  },
];

// Fixtures retain their original module-evaluation dates across workspace mounts.
export const demoStore = (): Store => ({
  projects: initialProjects,
  tasks: initialTasks,
  profile: { name: 'Maya Chen', email: 'maya@taskflow.demo', avatar: 'MC' },
  theme: 'light',
});
