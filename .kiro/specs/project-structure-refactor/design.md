# Design Document: Project Structure Refactor

## Overview

This design outlines the systematic restructuring of a React TypeScript project from a flat component structure to a well-organized, scalable architecture. The refactoring will improve maintainability, developer experience, and code organization by implementing clear separation of concerns and consistent file organization patterns.

The project currently uses React 19, TypeScript, Vite, TanStack Query, Redux Toolkit, and Tailwind CSS. The restructuring will preserve all existing functionality while organizing code into logical, feature-based directories with consistent naming conventions.

## Architecture

### Current Structure Analysis

The existing project has several organizational issues:
- Components are mixed in a flat structure without clear categorization
- Pages lack consistent organization and supporting files
- Hooks are scattered without clear purpose-based grouping
- Services mix API configuration with business logic
- Utilities lack categorical organization
- Types are domain-specific but not well-organized

### Target Architecture Principles

1. **Separation of Concerns**: Clear boundaries between UI, business logic, and data access
2. **Feature-Based Organization**: Related files grouped by functionality
3. **Consistent File Patterns**: Standardized naming and structure across similar components
4. **Scalable Structure**: Easy to extend and maintain as the project grows
5. **Import Path Clarity**: Intuitive and predictable import paths

## Components and Interfaces

### UI Components Structure

```
src/components/ui/
├── Button/
│   ├── Button.tsx          # Main component
│   ├── Button.types.ts     # TypeScript interfaces
│   ├── Button.constants.ts # Variant definitions, defaults
│   └── Button.styles.ts    # Tailwind variants using clsx/cva
├── Input/
├── Modal/
└── Table/
```

**Design Decisions:**
- Each UI component gets its own directory for better organization
- Separate files for types, constants, and styles improve maintainability
- UI components remain pure with no business logic or API calls
- Consistent export patterns across all UI components

### Layout Components Structure

```
src/components/layout/
├── Header/
│   ├── Header.tsx
│   ├── Header.types.ts
│   └── Header.constants.ts
├── Sidebar/
└── PageLayout/
```

**Design Decisions:**
- Layout components handle app-wide structure and navigation
- Separate from page-specific components to avoid coupling
- Reusable across different page contexts

### Common Components Structure

```
src/components/common/
├── Loader/
├── ErrorBoundary/
└── EmptyState/
```

**Design Decisions:**
- Utility components used across multiple features
- Each component in its own directory for consistency
- Focus on reusability and generic functionality

### Page Components Structure

```
src/pages/
├── auth/
│   ├── login/
│   │   ├── Login.page.tsx     # Main page component
│   │   ├── Login.constants.ts # Page-specific constants
│   │   └── Login.hooks.ts     # Page-specific hooks
│   └── register/
├── dashboard/
└── settings/
```

**Design Decisions:**
- Feature-based page organization
- Consistent file naming with `.page.tsx` suffix
- Supporting files (constants, hooks) co-located with pages
- Clear separation between different page features

## Data Models

### Hook Organization

```
src/hooks/
├── query/                    # TanStack Query hooks
│   ├── auth.queries.ts
│   ├── account.queries.ts
│   └── project.queries.ts
├── common/                   # Utility hooks
│   ├── useDebounce.ts
│   ├── useToggle.ts
│   └── usePrevious.ts
└── auth/                     # Authentication hooks
    └── useAuth.ts
```

**Design Decisions:**
- Query hooks separated from utility hooks for clarity
- Domain-specific query files for better organization
- Common utility hooks easily discoverable
- Authentication hooks in dedicated directory

### Service Layer Architecture

```
src/services/
├── api/
│   ├── axios.ts              # Axios instance configuration
│   ├── apiClient.ts          # Typed request wrapper
│   └── endpoints.ts          # API endpoint definitions
├── auth.service.ts           # Authentication business logic
├── account.service.ts        # Account management logic
└── project.service.ts        # Project-related logic
```

**Design Decisions:**
- API configuration separated from business logic
- Typed request wrappers for better TypeScript support
- Domain-specific service files for clear responsibility
- Centralized endpoint definitions

### Library Configuration

```
src/lib/
├── queryClient.ts            # TanStack Query configuration
├── router.tsx                # React Router setup
├── auth.ts                   # Authentication utilities
└── env.ts                    # Environment configuration
```

**Design Decisions:**
- Centralized third-party library configurations
- Environment-specific settings isolated
- Authentication utilities separated from business logic

### Utility Organization

```
src/utils/
├── format/
│   ├── date.ts
│   ├── currency.ts
│   └── string.ts
├── validation/
│   ├── regex.ts
│   └── schema.ts
└── permissions/
    └── roleGuard.ts
```

**Design Decisions:**
- Categorical organization for easy discovery
- Related utilities grouped together
- Clear naming conventions for utility functions

### Type Definitions

```
src/types/
├── api.types.ts              # API-related types
├── auth.types.ts             # Authentication types
└── common.types.ts           # Shared utility types
```

**Design Decisions:**
- Domain-based type organization
- Consolidation of related type definitions
- Clear export patterns for type reuse

## Migration Strategy

### Phase 1: Create New Directory Structure
- Create all new directories according to the target structure
- Ensure proper directory hierarchy is established

### Phase 2: Move and Reorganize UI Components
- Move existing components to appropriate UI, layout, or common directories
- Split components into separate files (types, constants, styles)
- Update component exports and internal structure

### Phase 3: Reorganize Pages and Features
- Move page components to feature-based directories
- Create supporting files (constants, hooks) where needed
- Ensure consistent naming patterns

### Phase 4: Restructure Hooks and Services
- Organize hooks by category (query, common, auth)
- Separate API configuration from business logic in services
- Create library configuration files

### Phase 5: Organize Utilities and Types
- Categorize utility functions by purpose
- Consolidate and organize type definitions
- Ensure proper exports and imports

### Phase 6: Update All Import Paths
- Systematically update all import statements
- Verify no broken imports remain
- Test application functionality

## Error Handling

### Import Path Resolution
- Use relative imports within feature directories
- Use absolute imports from src root for cross-feature dependencies
- Maintain consistent import patterns throughout the codebase

### File Movement Validation
- Verify all files are moved to correct locations
- Ensure no files are lost during restructuring
- Validate that all exports are properly maintained

### Functionality Preservation
- Test critical application flows after each phase
- Ensure all existing functionality remains intact
- Validate that build process continues to work

## Testing Strategy

The restructuring process will use both unit tests and property-based tests to ensure correctness and completeness of the migration.

### Unit Testing Approach
- Test specific file movements and import updates
- Verify component functionality after restructuring
- Test build process and application startup
- Validate critical user flows remain functional

### Property-Based Testing Approach
- Test that all files are properly moved (no orphaned files)
- Verify import path consistency across the codebase
- Test that all exports are maintained after restructuring
- Validate that component interfaces remain unchanged

**Testing Configuration:**
- Use Vitest as the testing framework (already configured)
- Run minimum 100 iterations per property test
- Tag each test with feature reference: **Feature: project-structure-refactor, Property {number}: {property_text}**

### Dual Testing Benefits
- Unit tests catch specific migration issues and validate functionality
- Property tests ensure comprehensive coverage of file movements and import updates
- Together they provide confidence that the restructuring is complete and correct

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Complete Directory Structure Creation
*For any* project restructuring operation, all required directories should exist in the correct locations according to the target structure specification.
**Validates: Requirements 1.5, 2.2, 3.2, 4.4, 5.1, 6.2, 7.1, 7.2, 8.1, 8.2, 8.3, 8.4, 9.2**

### Property 2: Proper File Organization by Category
*For any* file in the restructured project, it should be located in the correct directory based on its type (UI component, layout component, common component, page, hook, service, utility, or type definition).
**Validates: Requirements 1.1, 2.1, 3.1, 4.1, 5.2, 5.4, 6.1, 9.1**

### Property 3: Consistent File Structure Patterns
*For any* component or feature directory, it should follow the established file structure pattern with appropriate supporting files (types, constants, styles, hooks) where applicable.
**Validates: Requirements 1.2, 3.4, 4.2**

### Property 4: Business Logic Separation
*For any* UI component file, it should not contain imports from service layers or direct API calls, maintaining pure UI component principles.
**Validates: Requirements 1.3**

### Property 5: Component Category Separation
*For any* component file, it should be located in only one category directory (ui, layout, or common) and not mixed with other categories.
**Validates: Requirements 2.4**

### Property 6: Functionality Preservation
*For any* existing function, component, or service in the original codebase, it should maintain the same public interface and behavior after restructuring.
**Validates: Requirements 4.5, 5.5, 6.4, 7.3, 8.5, 9.4, 10.3**

### Property 7: Service Layer Type Safety
*For any* service file, it should export properly typed interfaces and maintain TypeScript type safety for all API interactions.
**Validates: Requirements 6.5**

### Property 8: Library Configuration Centralization
*For any* third-party library configuration, it should be centralized in the lib directory and not scattered across multiple files.
**Validates: Requirements 7.4**

### Property 9: Type Definition Consolidation
*For any* related set of TypeScript types, they should be grouped together in the appropriate domain-specific type file.
**Validates: Requirements 9.3**

### Property 10: Import Path Correctness
*For any* import statement in the restructured codebase, it should resolve correctly to the target file and follow the established path conventions (relative for intra-feature, absolute for cross-feature).
**Validates: Requirements 10.1, 10.2, 10.4**

### Property 11: Build System Compatibility
*For any* restructuring operation, the final codebase should compile successfully without TypeScript or build errors.
**Validates: Requirements 10.5**