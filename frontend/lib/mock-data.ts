import { Project, Task, Note, Payment, FileItem, Notification, Profile, Settings, DashboardUser, AdminStats } from "./types";

export const mockProjects: Project[] = [
  {
    project_id: "p1",
    title: "Website Redesign",
    description: "Complete redesign of company website with modern UI/UX",
    status: "Active",
    start_date: "2024-01-15",
    end_date: "2024-06-30",
    priority: "High",
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    project_id: "p2",
    title: "Mobile App Development",
    description: "Native iOS and Android application",
    status: "In-Progress",
    start_date: "2024-02-01",
    end_date: "2024-08-31",
    priority: "High",
    created_at: "2024-01-20T14:30:00Z",
  },
  {
    project_id: "p3",
    title: "Database Migration",
    description: "Migrate legacy database to PostgreSQL",
    status: "On-Hold",
    start_date: "2024-03-01",
    end_date: "2024-05-15",
    priority: "Medium",
    created_at: "2024-02-15T09:00:00Z",
  },
  {
    project_id: "p4",
    title: "API Documentation",
    description: "Complete API documentation and examples",
    status: "Completed",
    start_date: "2024-01-01",
    end_date: "2024-03-31",
    priority: "Low",
    created_at: "2023-12-15T08:00:00Z",
  },
];

export const mockTasks: Task[] = [
  {
    task_id: "t1",
    title: "Design homepage mockup",
    description: "Create high-fidelity mockups for homepage",
    project_id: "p1",
    status: "In Progress",
    due_date: "2024-02-15",
    priority: "High",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    task_id: "t2",
    title: "Setup development environment",
    description: "Configure dev environment and tools",
    project_id: "p2",
    status: "Done",
    due_date: "2024-02-05",
    priority: "High",
    created_at: "2024-02-01T11:00:00Z",
  },
  {
    task_id: "t3",
    title: "Review API documentation",
    description: "Review and approve API documentation",
    project_id: "p1",
    status: "Todo",
    due_date: "2024-02-20",
    priority: "Medium",
    created_at: "2024-02-10T13:00:00Z",
  },
  {
    task_id: "t4",
    title: "Database schema design",
    description: "Design new database schema",
    project_id: "p3",
    status: "In Progress",
    due_date: "2024-03-15",
    priority: "High",
    created_at: "2024-03-01T09:00:00Z",
  },
  {
    task_id: "t5",
    title: "Update README",
    description: "Update project README with new information",
    project_id: "p4",
    status: "Done",
    due_date: "2024-03-25",
    priority: "Low",
    created_at: "2024-03-20T10:00:00Z",
  },
];

export const mockNotes: Note[] = [
  {
    note_id: "n1",
    title: "Project Ideas",
    content: "Ideas for new features and improvements",
    tags: ["ideas", "features"],
    created_at: "2024-02-10T10:00:00Z",
    updated_at: "2024-02-15T14:00:00Z",
  },
  {
    note_id: "n2",
    title: "Meeting Notes - Feb 12",
    content: "Discussed Q1 roadmap and priorities",
    tags: ["meeting", "important"],
    created_at: "2024-02-12T15:00:00Z",
    updated_at: "2024-02-12T15:30:00Z",
  },
  {
    note_id: "n3",
    title: "API Endpoints Reference",
    content: "Reference guide for all API endpoints",
    tags: ["api", "documentation"],
    created_at: "2024-02-08T09:00:00Z",
    updated_at: "2024-02-12T11:00:00Z",
  },
];

export const mockPayments: Payment[] = [
  {
    payment_id: "pay1",
    amount: 5000,
    currency: "USD",
    payment_type: "Income",
    category: "Project Revenue",
    status: "Completed",
    payment_date: "2024-02-01",
    notes: "Website redesign project payment",
  },
  {
    payment_id: "pay2",
    amount: 250,
    currency: "USD",
    payment_type: "Expense",
    category: "Software License",
    status: "Completed",
    payment_date: "2024-02-05",
    notes: "Annual Figma subscription",
  },
  {
    payment_id: "pay3",
    amount: 3000,
    currency: "USD",
    payment_type: "Income",
    category: "Consulting",
    status: "Pending",
    payment_date: "2024-02-20",
    notes: "Consulting services - Web development",
  },
  {
    payment_id: "pay4",
    amount: 100,
    currency: "USD",
    payment_type: "Expense",
    category: "Cloud Services",
    status: "Failed",
    payment_date: "2024-02-10",
    notes: "AWS monthly charge",
  },
];

export const mockFiles: FileItem[] = [
  {
    file_id: "f1",
    file_name: "homepage_mockup.fig",
    file_type: "figma",
    file_size: 2500000,
    linked_to: "Project",
    linked_id: "p1",
    uploaded_at: "2024-02-12T10:00:00Z",
  },
  {
    file_id: "f2",
    file_name: "project_requirements.pdf",
    file_type: "pdf",
    file_size: 1200000,
    linked_to: "Project",
    linked_id: "p1",
    uploaded_at: "2024-02-10T14:00:00Z",
  },
  {
    file_id: "f3",
    file_name: "database_schema.sql",
    file_type: "sql",
    file_size: 45000,
    linked_to: "Project",
    linked_id: "p3",
    uploaded_at: "2024-03-05T09:00:00Z",
  },
];

export const mockNotifications: Notification[] = [
  {
    notification_id: "notif1",
    message: "Task 'Design homepage mockup' is due tomorrow",
    type: "Warning",
    is_read: false,
    created_at: "2024-02-14T15:00:00Z",
  },
  {
    notification_id: "notif2",
    message: "Payment received for project Website Redesign",
    type: "Success",
    is_read: true,
    created_at: "2024-02-01T10:00:00Z",
  },
  {
    notification_id: "notif3",
    message: "New comment on Project 'Mobile App Development'",
    type: "Info",
    is_read: true,
    created_at: "2024-02-13T11:00:00Z",
  },
];

export const mockProfile: Profile = {
  full_name: "John Doe",
  email: "john.doe@example.com",
  profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  timezone: "EST",
  language: "English",
};

export const mockSettings: Settings = {
  theme: "light",
  notifications_enabled: true,
  language: "English",
};

// Admin Mock Data
export const mockDashboardUsers: DashboardUser[] = [
  {
    user_id: "user-001",
    full_name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    status: "Active",
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    user_id: "user-002",
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "Active",
    created_at: "2024-01-15T14:30:00Z",
  },
  {
    user_id: "user-003",
    full_name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "user",
    status: "Active",
    created_at: "2024-01-20T09:15:00Z",
  },
  {
    user_id: "user-004",
    full_name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "user",
    status: "Blocked",
    created_at: "2024-01-25T11:00:00Z",
  },
  {
    user_id: "user-005",
    full_name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "admin",
    status: "Active",
    created_at: "2024-01-05T08:30:00Z",
  },
];

export const mockAdminStats: AdminStats = {
  total_users: 5,
  active_users: 4,
  total_transactions: 156,
  total_revenue: 125000,
};
