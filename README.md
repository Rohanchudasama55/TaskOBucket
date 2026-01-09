# TaskOBucket

A modern task management and project collaboration platform built with React, TypeScript, and Redux Toolkit.

## Features

- **Kanban Board**: Drag-and-drop task management with customizable columns
- **User Authentication**: Secure login, registration, and password recovery
- **Project Management**: Create and manage multiple projects with team collaboration
- **Dashboard Analytics**: Visual insights with charts and project statistics
- **Team Collaboration**: User profiles, team management, and role-based access
- **Real-time Updates**: Socket.io integration for live collaboration
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit, React Query
- **Styling**: Tailwind CSS, Lucide React Icons
- **Drag & Drop**: @dnd-kit for kanban functionality
- **Charts**: ECharts for data visualization
- **Forms**: React Hook Form for form management
- **Routing**: React Router DOM
- **Real-time**: Socket.io Client
- **Testing**: Vitest, Testing Library, Fast-check

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rohanchudasama55/TaskOBucket.git
cd taskobucket
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your configuration values.

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint


## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components
│   ├── kanban/         # Kanban board components
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components
├── contexts/           # React contexts
├── features/           # Feature-specific logic
├── hooks/              # Custom React hooks
├── layouts/            # Page layouts
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   ├── projects/       # Project management pages
│   ├── settings/       # Settings pages
│   └── team/           # Team management pages
├── redux/              # Redux store and slices
├── routes/             # Routing configuration
├── services/           # API services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Key Features

### Kanban Board
- Drag-and-drop task management
- Customizable columns and workflows
- Task filtering and search
- Issue creation and editing

### Authentication
- User registration and login
- Password recovery
- Protected routes
- User profile management

### Project Management
- Create and manage projects
- Team collaboration
- Role-based permissions
- Project analytics


## License

This project is private and not licensed for public use.