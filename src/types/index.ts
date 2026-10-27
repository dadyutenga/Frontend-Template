export type Role = 'member' | 'admin';
export interface DemoUser {
  name: string;
  email: string;
  role: Role;
}
export interface ExampleRecord {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Paused' | 'Draft';
  category: string;
  updatedAt: string;
  description: string;
}
