export type Status = 'todo' | 'in-progress' | 'done';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Project = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  createdAt: string;
};
export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
  projectId: string;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
};
export type Profile = { name: string; email: string; avatar: string };
export type Store = {
  projects: Project[];
  tasks: Task[];
  profile: Profile;
  theme: 'light' | 'dark';
};

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type ProjectInput = Omit<Project, 'id' | 'createdAt'>;
export const priorities: Priority[] = ['low', 'medium', 'high', 'urgent'];
