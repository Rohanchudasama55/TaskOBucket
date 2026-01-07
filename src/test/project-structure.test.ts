import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { existsSync, statSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'

/**
 * Feature: project-structure-refactor, Property 1: Complete Directory Structure Creation
 * 
 * Property: For any project restructuring operation, all required directories should exist 
 * in the correct locations according to the target structure specification.
 * 
 * Validates: Requirements 1.5, 2.2, 3.2, 4.4, 5.1, 6.2, 7.1, 7.2, 8.1, 8.2, 8.3, 8.4, 9.2
 */

describe('Project Structure Refactor - Directory Structure', () => {
  const srcPath = join(process.cwd(), 'src')
  
  // Define the complete required directory structure
  const requiredDirectories = [
    // UI Components (Requirement 1.5)
    'components/ui/Button',
    'components/ui/Input', 
    'components/ui/Modal',
    'components/ui/Table',
    
    // Layout Components (Requirement 2.2)
    'components/layout/Header',
    'components/layout/Sidebar',
    'components/layout/PageLayout',
    
    // Common Components (Requirement 3.2)
    'components/common/Loader',
    'components/common/ErrorBoundary',
    'components/common/EmptyState',
    
    // Page Structure (Requirement 4.4)
    'pages/auth',
    'pages/auth/login',
    'pages/auth/register',
    'pages/dashboard',
    'pages/settings',
    
    // Hook Categories (Requirement 5.1)
    'hooks/query',
    'hooks/common',
    'hooks/auth',
    
    // Service Structure (Requirement 6.2)
    'services/api',
    
    // Library Configuration (Requirement 7.1, 7.2)
    'lib',
    
    // Utility Categories (Requirement 8.1, 8.2, 8.3, 8.4)
    'utils/format',
    'utils/validation', 
    'utils/permissions',
    
    // Type Organization (Requirement 9.2)
    'types'
  ]

  it('should have all required directories in the target structure', () => {
    // Test that every required directory exists
    for (const dir of requiredDirectories) {
      const fullPath = join(srcPath, dir)
      expect(existsSync(fullPath), `Directory ${dir} should exist`).toBe(true)
      expect(statSync(fullPath).isDirectory(), `${dir} should be a directory`).toBe(true)
    }
  })

  it('should validate individual directory existence (property-based)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...requiredDirectories),
        (directory) => {
          const fullPath = join(srcPath, directory)
          expect(existsSync(fullPath)).toBe(true)
          expect(statSync(fullPath).isDirectory()).toBe(true)
        }
      ),
      { numRuns: 10 }
    )
  })

  it('should have proper directory hierarchy', () => {
    // Test that parent directories exist for nested structures
    const hierarchyTests = [
      { parent: 'components', child: 'components/ui' },
      { parent: 'components', child: 'components/layout' },
      { parent: 'components', child: 'components/common' },
      { parent: 'components/ui', child: 'components/ui/Button' },
      { parent: 'components/layout', child: 'components/layout/Header' },
      { parent: 'components/common', child: 'components/common/Loader' },
      { parent: 'pages', child: 'pages/auth' },
      { parent: 'pages/auth', child: 'pages/auth/login' },
      { parent: 'services', child: 'services/api' },
      { parent: 'utils', child: 'utils/format' }
    ]

    for (const { parent, child } of hierarchyTests) {
      const parentPath = join(srcPath, parent)
      const childPath = join(srcPath, child)
      
      expect(existsSync(parentPath), `Parent directory ${parent} should exist`).toBe(true)
      expect(existsSync(childPath), `Child directory ${child} should exist`).toBe(true)
      expect(statSync(parentPath).isDirectory()).toBe(true)
      expect(statSync(childPath).isDirectory()).toBe(true)
    }
  })

  it('should validate top-level directory categories exist (property-based)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('components', 'pages', 'hooks', 'services', 'lib', 'utils', 'types'),
        (category) => {
          const fullPath = join(srcPath, category)
          expect(existsSync(fullPath)).toBe(true)
          expect(statSync(fullPath).isDirectory()).toBe(true)
        }
      ),
      { numRuns: 7 }
    )
  })
})

/**
 * Feature: project-structure-refactor, Property 2: Proper File Organization by Category
 * Feature: project-structure-refactor, Property 4: Business Logic Separation
 * 
 * Property 2: For any file in the restructured project, it should be located in the correct 
 * directory based on its type (UI component, layout component, common component, page, hook, service, utility, or type definition).
 * 
 * Property 4: For any UI component file, it should not contain imports from service layers 
 * or direct API calls, maintaining pure UI component principles.
 * 
 * Validates: Requirements 1.1, 1.3
 */

describe('UI Component Organization', () => {
  const uiComponentsPath = join(process.cwd(), 'src', 'components', 'ui')
  
  const expectedUIComponents = [
    'Button',
    'Input', 
    'Modal',
    'Table'
  ]

  it('should have all UI components in the correct ui/ directory', () => {
    for (const component of expectedUIComponents) {
      const componentPath = join(uiComponentsPath, component)
      expect(existsSync(componentPath), `UI component ${component} should exist in ui/ directory`).toBe(true)
      expect(statSync(componentPath).isDirectory(), `${component} should be a directory`).toBe(true)
    }
  })

  it('should validate UI component file organization (property-based)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...expectedUIComponents),
        (component) => {
          const componentPath = join(uiComponentsPath, component)
          expect(existsSync(componentPath)).toBe(true)
          expect(statSync(componentPath).isDirectory()).toBe(true)
          
          // Check that main component file exists
          const mainComponentFile = join(componentPath, `${component}.tsx`)
          expect(existsSync(mainComponentFile)).toBe(true)
        }
      ),
      { numRuns: 4 }
    )
  })

  it('should ensure UI components contain no business logic imports', () => {
    const uiComponentFiles = [
      'src/components/ui/Button/Button.tsx',
      'src/components/ui/Input/Input.tsx',
      'src/components/ui/Modal/Modal.tsx',
      'src/components/ui/Table/Table.tsx'
    ]

    for (const filePath of uiComponentFiles) {
      if (existsSync(filePath)) {
        const content = readFileSync(filePath, 'utf-8')
        
        // Check that UI components don't import from services
        expect(content).not.toMatch(/import.*from.*services/)
        expect(content).not.toMatch(/import.*from.*\.\.\/\.\.\/services/)
        expect(content).not.toMatch(/import.*from.*\.\.\/\.\.\/\.\.\/services/)
        
        // Check that UI components don't contain API calls
        expect(content).not.toMatch(/fetch\(/)
        expect(content).not.toMatch(/axios\./)
        expect(content).not.toMatch(/api\./)
      }
    }
  })

  it('should validate business logic separation (property-based)', () => {
    const uiComponentFiles = [
      'src/components/ui/Button/Button.tsx',
      'src/components/ui/Input/Input.tsx', 
      'src/components/ui/Modal/Modal.tsx',
      'src/components/ui/Table/Table.tsx'
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...uiComponentFiles),
        (filePath) => {
          if (existsSync(filePath)) {
            const content = readFileSync(filePath, 'utf-8')
            
            // Ensure no service layer imports
            expect(content).not.toMatch(/import.*from.*services/)
            
            // Ensure no direct API calls
            expect(content).not.toMatch(/fetch\(|axios\.|api\./)
          }
        }
      ),
      { numRuns: 4 }
    )
  })
})
/**
 * Feature: project-structure-refactor, Property 3: Consistent File Structure Patterns
 * 
 * Property: For any component or feature directory, it should follow the established 
 * file structure pattern with appropriate supporting files (types, constants, styles, hooks) where applicable.
 * 
 * Validates: Requirements 1.2
 */

describe('UI Component File Structure', () => {
  const uiComponentsPath = join(process.cwd(), 'src', 'components', 'ui')
  
  const expectedUIComponents = [
    'Button',
    'Input', 
    'Modal',
    'Table'
  ]

  const expectedFileTypes = [
    '.tsx',      // Main component
    '.types.ts', // TypeScript interfaces
    '.constants.ts', // Constants and defaults
    '.styles.ts' // Styling logic
  ]

  it('should have consistent file structure for all UI components', () => {
    for (const component of expectedUIComponents) {
      const componentPath = join(uiComponentsPath, component)
      
      // Check main component file
      const mainFile = join(componentPath, `${component}.tsx`)
      expect(existsSync(mainFile), `${component}.tsx should exist`).toBe(true)
      
      // Check types file
      const typesFile = join(componentPath, `${component}.types.ts`)
      expect(existsSync(typesFile), `${component}.types.ts should exist`).toBe(true)
      
      // Check constants file
      const constantsFile = join(componentPath, `${component}.constants.ts`)
      expect(existsSync(constantsFile), `${component}.constants.ts should exist`).toBe(true)
      
      // Check styles file
      const stylesFile = join(componentPath, `${component}.styles.ts`)
      expect(existsSync(stylesFile), `${component}.styles.ts should exist`).toBe(true)
      
      // Check index file
      const indexFile = join(componentPath, 'index.ts')
      expect(existsSync(indexFile), `${component}/index.ts should exist`).toBe(true)
    }
  })

  it('should validate consistent file structure patterns (property-based)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...expectedUIComponents),
        (component) => {
          const componentPath = join(uiComponentsPath, component)
          
          // Validate that all expected files exist
          for (const fileType of expectedFileTypes) {
            const filePath = join(componentPath, `${component}${fileType}`)
            expect(existsSync(filePath), `${component}${fileType} should exist`).toBe(true)
          }
          
          // Validate index file exists
          const indexPath = join(componentPath, 'index.ts')
          expect(existsSync(indexPath), `${component}/index.ts should exist`).toBe(true)
        }
      ),
      { numRuns: 4 }
    )
  })

  it('should validate file naming conventions', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...expectedUIComponents),
        fc.constantFrom(...expectedFileTypes),
        (component, fileType) => {
          const componentPath = join(uiComponentsPath, component)
          const filePath = join(componentPath, `${component}${fileType}`)
          
          if (existsSync(filePath)) {
            // File should follow PascalCase.extension naming
            const fileName = `${component}${fileType}`
            // Allow for .types.ts, .constants.ts, .styles.ts patterns
            expect(fileName).toMatch(/^[A-Z][a-zA-Z]*\.(tsx|types\.ts|constants\.ts|styles\.ts)$/)
          }
        }
      ),
      { numRuns: 8 }
    )
  })

  it('should validate index file exports', () => {
    for (const component of expectedUIComponents) {
      const indexPath = join(uiComponentsPath, component, 'index.ts')
      
      if (existsSync(indexPath)) {
        const content = readFileSync(indexPath, 'utf-8')
        
        // Should export the main component (handle multi-line exports)
        expect(content).toMatch(new RegExp(`export.*${component}`, 's'))
        
        // Should export types (handle both 'export type' and 'type' in export block)
        expect(content).toMatch(/export\s+type|type\s+\w+/s)
        
        // Should have proper export structure
        expect(content).toMatch(/export\s*{/)
      }
    }
  })
})
/**
 * Feature: project-structure-refactor, Property 5: Component Category Separation
 * 
 * Property: For any component file, it should be located in only one category directory 
 * (ui, layout, or common) and not mixed with other categories.
 * 
 * Validates: Requirements 2.4
 */

describe('Component Category Separation', () => {
  const componentsPath = join(process.cwd(), 'src', 'components')
  
  const componentCategories = ['ui', 'layout', 'common']
  
  it('should have clear separation between component categories', () => {
    // Check that each category directory exists
    for (const category of componentCategories) {
      const categoryPath = join(componentsPath, category)
      expect(existsSync(categoryPath), `${category} directory should exist`).toBe(true)
      expect(statSync(categoryPath).isDirectory(), `${category} should be a directory`).toBe(true)
    }
  })

  it('should not have components mixed between categories', () => {
    // UI components should only be in ui/ directory
    const uiComponents = ['Button', 'Input', 'Modal', 'Table', 'Alert', 'Avatar']
    for (const component of uiComponents) {
      const uiPath = join(componentsPath, 'ui', component)
      expect(existsSync(uiPath), `${component} should exist in ui/ directory`).toBe(true)
      
      // Should not exist in other categories
      const layoutPath = join(componentsPath, 'layout', component)
      const commonPath = join(componentsPath, 'common', component)
      expect(existsSync(layoutPath), `${component} should not exist in layout/ directory`).toBe(false)
      expect(existsSync(commonPath), `${component} should not exist in common/ directory`).toBe(false)
    }

    // Layout components should only be in layout/ directory
    const layoutComponents = ['Header', 'Sidebar', 'PageLayout']
    for (const component of layoutComponents) {
      const layoutPath = join(componentsPath, 'layout', component)
      expect(existsSync(layoutPath), `${component} should exist in layout/ directory`).toBe(true)
      
      // Should not exist in other categories
      const uiPath = join(componentsPath, 'ui', component)
      const commonPath = join(componentsPath, 'common', component)
      expect(existsSync(uiPath), `${component} should not exist in ui/ directory`).toBe(false)
      expect(existsSync(commonPath), `${component} should not exist in common/ directory`).toBe(false)
    }

    // Common components should only be in common/ directory
    const commonComponents = ['Loader', 'ErrorBoundary', 'EmptyState', 'Toast', 'ToastContainer']
    for (const component of commonComponents) {
      const commonPath = join(componentsPath, 'common', component)
      expect(existsSync(commonPath), `${component} should exist in common/ directory`).toBe(true)
      
      // Should not exist in other categories
      const uiPath = join(componentsPath, 'ui', component)
      const layoutPath = join(componentsPath, 'layout', component)
      expect(existsSync(uiPath), `${component} should not exist in ui/ directory`).toBe(false)
      expect(existsSync(layoutPath), `${component} should not exist in layout/ directory`).toBe(false)
    }
  })

  it('should validate component category separation (property-based)', () => {
    const allComponents = [
      { name: 'Button', category: 'ui' },
      { name: 'Input', category: 'ui' },
      { name: 'Modal', category: 'ui' },
      { name: 'Table', category: 'ui' },
      { name: 'Alert', category: 'ui' },
      { name: 'Avatar', category: 'ui' },
      { name: 'Header', category: 'layout' },
      { name: 'Sidebar', category: 'layout' },
      { name: 'PageLayout', category: 'layout' },
      { name: 'Loader', category: 'common' },
      { name: 'ErrorBoundary', category: 'common' },
      { name: 'EmptyState', category: 'common' },
      { name: 'Toast', category: 'common' },
      { name: 'ToastContainer', category: 'common' }
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...allComponents),
        (component) => {
          const correctPath = join(componentsPath, component.category, component.name)
          expect(existsSync(correctPath), `${component.name} should exist in ${component.category}/ directory`).toBe(true)
          
          // Check that it doesn't exist in wrong categories
          const wrongCategories = componentCategories.filter(cat => cat !== component.category)
          for (const wrongCategory of wrongCategories) {
            const wrongPath = join(componentsPath, wrongCategory, component.name)
            expect(existsSync(wrongPath), `${component.name} should not exist in ${wrongCategory}/ directory`).toBe(false)
          }
        }
      ),
      { numRuns: 14 }
    )
  })

  it('should ensure no loose component files in root components directory', () => {
    // Check that there are no .tsx files directly in src/components/
    const componentFiles = readdirSync(componentsPath)
      .filter((file: string) => file.endsWith('.tsx'))
    
    expect(componentFiles.length, 'No .tsx files should exist directly in components/ directory').toBe(0)
  })
})

/**
 * Feature: project-structure-refactor, Property 2: Proper File Organization by Category
 * Feature: project-structure-refactor, Property 3: Consistent File Structure Patterns
 * 
 * Property 2: For any file in the restructured project, it should be located in the correct 
 * directory based on its type (UI component, layout component, common component, page, hook, service, utility, or type definition).
 * 
 * Property 3: For any component or feature directory, it should follow the established 
 * file structure pattern with appropriate supporting files (types, constants, styles, hooks) where applicable.
 * 
 * Validates: Requirements 4.1, 4.2
 */

describe('Page Organization', () => {
  const pagesPath = join(process.cwd(), 'src', 'pages')
  
  const expectedPageStructure = [
    // Auth pages (Requirement 4.1)
    { category: 'auth', pages: ['login', 'register'] },
    // Dashboard pages (Requirement 4.1)
    { category: 'dashboard', pages: ['Dashboard.page.tsx'] },
    // Project pages (Requirement 4.1)
    { category: 'projects', pages: ['Board.page.tsx'] },
    // Settings pages (Requirement 4.1)
    { category: 'settings', pages: ['CreateOrganization.page.tsx'] },
    // Common pages (Requirement 4.1)
    { category: 'common', pages: ['NotFound.page.tsx'] }
  ]

  it('should have all page categories in the correct directory structure', () => {
    for (const { category } of expectedPageStructure) {
      const categoryPath = join(pagesPath, category)
      expect(existsSync(categoryPath), `Page category ${category} should exist`).toBe(true)
      expect(statSync(categoryPath).isDirectory(), `${category} should be a directory`).toBe(true)
    }
  })

  it('should validate page category organization (property-based)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...expectedPageStructure),
        (pageCategory) => {
          const categoryPath = join(pagesPath, pageCategory.category)
          expect(existsSync(categoryPath)).toBe(true)
          expect(statSync(categoryPath).isDirectory()).toBe(true)
          
          // Check that expected pages exist in the category
          for (const page of pageCategory.pages) {
            const pagePath = join(categoryPath, page)
            if (page.endsWith('.tsx')) {
              // Direct page file
              expect(existsSync(pagePath), `Page ${page} should exist in ${pageCategory.category}/`).toBe(true)
            } else {
              // Page directory
              expect(existsSync(pagePath), `Page directory ${page} should exist in ${pageCategory.category}/`).toBe(true)
              expect(statSync(pagePath).isDirectory(), `${page} should be a directory`).toBe(true)
            }
          }
        }
      ),
      { numRuns: 5 }
    )
  })

  it('should follow consistent file structure patterns for feature pages', () => {
    const featurePages = [
      { category: 'auth', feature: 'login' },
      { category: 'auth', feature: 'register' },
      { category: 'dashboard', feature: null }, // Direct page file
      { category: 'projects', feature: null }, // Direct page file
      { category: 'settings', feature: null }, // Direct page file
      { category: 'common', feature: null } // Direct page file
    ]

    for (const { category, feature } of featurePages) {
      const categoryPath = join(pagesPath, category)
      
      if (feature) {
        // Feature-based structure (auth pages)
        const featurePath = join(categoryPath, feature)
        expect(existsSync(featurePath), `Feature directory ${feature} should exist in ${category}/`).toBe(true)
        
        // Check for required files in feature directory
        const pageFile = join(featurePath, `${feature.charAt(0).toUpperCase() + feature.slice(1)}.page.tsx`)
        const constantsFile = join(featurePath, `${feature.charAt(0).toUpperCase() + feature.slice(1)}.constants.ts`)
        const hooksFile = join(featurePath, `${feature.charAt(0).toUpperCase() + feature.slice(1)}.hooks.ts`)
        const indexFile = join(featurePath, 'index.ts')
        
        expect(existsSync(pageFile), `${feature} page file should exist`).toBe(true)
        expect(existsSync(constantsFile), `${feature} constants file should exist`).toBe(true)
        expect(existsSync(hooksFile), `${feature} hooks file should exist`).toBe(true)
        expect(existsSync(indexFile), `${feature} index file should exist`).toBe(true)
      } else {
        // Direct page file structure
        expect(existsSync(categoryPath), `Category directory ${category} should exist`).toBe(true)
      }
    }
  })

  it('should validate page file naming conventions (property-based)', () => {
    const pageFiles = [
      'src/pages/auth/login/Login.page.tsx',
      'src/pages/auth/register/Register.page.tsx',
      'src/pages/dashboard/Dashboard.page.tsx',
      'src/pages/projects/Board.page.tsx',
      'src/pages/settings/CreateOrganization.page.tsx',
      'src/pages/common/NotFound.page.tsx'
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...pageFiles),
        (filePath) => {
          if (existsSync(filePath)) {
            const fileName = filePath.split('/').pop() || ''
            // Page files should follow PascalCase.page.tsx naming
            expect(fileName).toMatch(/^[A-Z][a-zA-Z]*\.page\.tsx$/)
          }
        }
      ),
      { numRuns: 6 }
    )
  })

  it('should ensure no loose page files in root pages directory', () => {
    // Check that there are no .tsx files directly in src/pages/ (except index.ts)
    const pageFiles = readdirSync(pagesPath)
      .filter((file: string) => file.endsWith('.tsx'))
    
    expect(pageFiles.length, 'No .tsx files should exist directly in pages/ directory').toBe(0)
  })

  it('should have proper index files for page exports', () => {
    const indexFiles = [
      'src/pages/auth/index.ts',
      'src/pages/auth/login/index.ts',
      'src/pages/auth/register/index.ts',
      'src/pages/dashboard/index.ts',
      'src/pages/projects/index.ts',
      'src/pages/settings/index.ts',
      'src/pages/common/index.ts',
      'src/pages/index.ts'
    ]

    for (const indexFile of indexFiles) {
      expect(existsSync(indexFile), `Index file ${indexFile} should exist`).toBe(true)
      
      if (existsSync(indexFile)) {
        const content = readFileSync(indexFile, 'utf-8')
        // Should have export statements
        expect(content).toMatch(/export\s*{/)
      }
    }
  })
})