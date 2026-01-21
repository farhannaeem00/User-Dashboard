# Role-Based Access Control (RBAC) - Admin Panel v1

## Overview

This document outlines the new Role-Based Access Control system added to the Productivity Dashboard as v1 enhancement. The User Dashboard (v0) remains unchanged and fully functional.

## Architecture

### Separation of Concerns

- **User Dashboard** (`/dashboard/*`) - Unchanged from v0
  - All user CRUD operations remain the same
  - No modifications to existing components or routes
  
- **Admin Panel** (`/admin/*`) - New addition
  - Separate layout and navigation
  - Isolated from user dashboard
  - Admin-only features and data access

### Authentication & Roles

Users have two possible roles:
- **User** - Default role with access to personal dashboard
- **Admin** - System administrator with access to admin panel

On login, the auth context returns:
```json
{
  "user_id": "uuid",
  "name": "User Name",
  "email": "email@example.com",
  "role": "user" | "admin"
}
```

## Features

### 1. Authentication Context (`/lib/auth-context.tsx`)

Manages global user state and role information:
- `user` - Current authenticated user
- `isLoading` - Authentication loading state
- `login()` - Mock login function
- `logout()` - Clear authentication
- `switchRole()` - Switch between user/admin roles (for testing)

### 2. Role Guard (`/components/role-guard.tsx`)

Protects routes based on user role:
- Checks if user has required role
- Redirects to `/access-denied` if unauthorized
- Redirects to home if not authenticated

### 3. Admin Layout (`/components/admin-layout.tsx`, `/components/admin-sidebar.tsx`)

Separate layout for admin panel:
- Dedicated admin sidebar (not shared with user dashboard)
- Admin navigation menu
- Responsive design

### 4. Access Denied Page (`/app/access-denied/page.tsx`)

Shown when user lacks permissions:
- Displays current user role
- Provides navigation based on role
- Friendly error messaging

## Admin Panel Pages

### Admin Dashboard (`/app/admin/page.tsx`)

Overview page with:
- **Stats Cards**
  - Total Users
  - Active Users
  - Total Transactions
  - Total Revenue
- **Recent Users Table** - Shows latest users with key info
- Real-time data from mock data

### Users Management (`/app/admin/users/page.tsx`)

Complete user management interface:
- **Users List Component** (`/components/admin/users-list.tsx`)
  - Display all users in table format
  - Filter by role (User/Admin)
  - Filter by status (Active/Blocked)
  - Edit button for each user

- **Edit User Modal** (`/components/admin/edit-user-modal.tsx`)
  - Update user full name
  - Change email
  - Assign role (User/Admin)
  - Change status (Active/Blocked)
  - Form validation
  - Save confirmation

### Payments Overview (`/app/admin/payments/page.tsx`)

System-wide payment monitoring:
- **Summary Stats**
  - Total Income (all completed income transactions)
  - Total Expense (all completed expense transactions)
  - Net Revenue (income - expense)
  
- **Filters**
  - By payment status (Pending, Completed, Failed)
  - By payment type (Income, Expense)
  
- **Payments Table**
  - Display all system payments
  - Color-coded status badges
  - Detailed payment information

### Admin Profile (`/app/admin/profile/page.tsx`)

Admin account settings:
- Edit full name and email
- View role (read-only)
- Manage timezone and language preferences
- Save changes with confirmation

### Admin Settings (`/app/admin/settings/page.tsx`)

System configuration:
- **Appearance** - Theme selection (Light/Dark)
- **System** - Maintenance mode, email notifications
- **Security** - Password change, 2FA, session management
- All settings persist across sessions

## Integration Points

### Types Extended (`/lib/types.ts`)

New types added:
```typescript
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
```

### Mock Data Enhanced (`/lib/mock-data.ts`)

Added:
- `mockDashboardUsers` - 5 sample users with various roles/statuses
- `mockAdminStats` - System statistics

## Role-Based Routing

### User Role Access

```
✓ /dashboard (all user pages)
✓ /projects, /tasks, /notes, /payments, /files
✓ /profile, /settings, /notifications
✗ /admin/* (redirects to /access-denied)
```

### Admin Role Access

```
✓ /admin (all admin pages)
✓ /admin/users, /admin/payments, /admin/profile, /admin/settings
✗ /dashboard/* (can access but not their primary workspace)
✗ User private content (cannot view user projects/tasks)
```

## Testing Role Switching

On the homepage, users can switch roles using the "Switch to Admin" or "Switch to User" button in the top right:

```
Homepage → Role Switcher Button → Redirects to appropriate dashboard
```

Mock credentials (for demonstration):
- All routes auto-authenticate with mock user
- Switch roles to test access control
- Each role has appropriate dashboard

## Data Security (Frontend)

Current implementation uses mock data. Backend integration should implement:
- JWT token validation
- Role verification on every request
- Row-level security for data access
- Audit logging for admin actions
- Rate limiting for sensitive operations

## Future Enhancements

Potential improvements for backend integration:
1. Real OAuth/JWT authentication
2. Permission-based access (more granular than roles)
3. Activity logging and audit trail
4. Two-factor authentication
5. Session management
6. IP whitelisting for admin access
7. Admin action approval workflow

## File Structure

```
/app
  /admin
    page.tsx (dashboard)
    /users
      page.tsx
    /payments
      page.tsx
    /profile
      page.tsx
    /settings
      page.tsx

/components
  /admin
    users-list.tsx
    edit-user-modal.tsx
  admin-layout.tsx
  admin-sidebar.tsx
  role-guard.tsx

/lib
  auth-context.tsx
  types.ts (extended with RBAC types)
  mock-data.ts (extended with admin data)

/app
  access-denied/
    page.tsx
  page.tsx (updated with role switcher)
```

## Notes

- User dashboard (v0) is completely unchanged
- No existing routes or components were modified
- RBAC is additive - existing functionality preserved
- All components use mock data ready for API integration
- Theme switching works in both user and admin dashboards
- Authentication state persists across page navigation
