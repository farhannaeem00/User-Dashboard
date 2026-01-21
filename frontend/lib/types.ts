// Projects
export interface Project {
  project_id: string;
  title: string;
  description: string;
  status: "Active" | "Completed" | "On-Hold";
  start_date: string;
  end_date: string;
  priority: "Low" | "Medium" | "High";
  created_at: string;
}

// Tasks
export interface Task {
  task_id: string;
  title: string;
  description: string;
  project_id: string;
  status: "Todo" | "In Progress" | "Done";
  due_date: string;
  priority: "Low" | "Medium" | "High";
  created_at: string;
}

// Notes
export interface Note {
  note_id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// Payments
export interface Payment {
  payment_id: string;
  amount: number;
  currency: string;
  payment_type: "Income" | "Expense";
  category: string;
  status: "Pending" | "Completed" | "Failed";
  payment_date: string;
  notes: string;
}

// Files
export interface FileItem {
  file_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  linked_to: "Project" | "Task" | "Note";
  linked_id: string;
  uploaded_at: string;
}

// Notifications
export interface Notification {
  notification_id: string;
  message: string;
  type: "Info" | "Warning" | "Success";
  is_read: boolean;
  created_at: string;
}

// Profile
export interface Profile {
  full_name: string;
  email: string;
  profile_image: string;
  timezone: string;
  language: string;
}

// Settings
export interface Settings {
  theme: "light" | "dark";
  notifications_enabled: boolean;
  language: string;
}

// Authentication & Role-Based Access
export type UserRole = "user" | "admin";

export interface AuthUser {
  user_id: string;
  name: string;
  email: string;
  role: UserRole;
  profile_image?: string;
}

export interface DashboardUser {
  user_id: string;
  full_name: string;
  email: string;
  role: UserRole;
  status: "Active" | "Blocked";
  created_at: string;
}

export interface AdminStats {
  total_users: number;
  active_users: number;
  total_transactions: number;
  total_revenue: number;
}
