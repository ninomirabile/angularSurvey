# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with Angular 20
- Core services (Storage, Notification, Theme)
- Survey builder components
- State management with ComponentStore
- Shared UI components
- Basic routing configuration

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

## [0.1.0] - 2024-12-19

### Added
- **Project Foundation**
  - Angular 20 standalone application setup
  - TypeScript configuration with strict mode
  - Angular Material integration
  - Basic project structure

- **Core Services**
  - `StorageService` with IndexedDB and LocalStorage support
  - `NotificationService` for toast notifications
  - `ThemeService` for theme management
  - `SurveyService` for survey CRUD operations

- **Data Models**
  - `Survey` interface with typed properties
  - `Question` interface with various question types
  - `SurveyResponse` interface for storing responses
  - `SurveyTemplate` interface for reusable templates

- **State Management**
  - `SurveyBuilderStore` using ComponentStore
  - Signals-based reactive state management
  - Effect-based side effects handling

- **UI Components**
  - `SurveyBuilderComponent` - Main builder interface
  - `SurveyEditorComponent` - Survey creation interface
  - `SurveyListComponent` - Survey management list
  - `SurveyPreviewComponent` - Survey preview
  - `SurveySettingsComponent` - Survey configuration

- **Shared Components**
  - `PrimaryButtonComponent` - Reusable button component
  - `SurveyCardComponent` - Survey display card

- **Features**
  - Survey creation and editing
  - Survey list management
  - Real-time preview
  - Settings configuration
  - Auto-save functionality
  - Sample data generation

- **Development Tools**
  - Start/stop scripts for easy development
  - Git configuration with proper .gitignore
  - Project documentation structure

### Technical Highlights
- **Modern Angular 20 Features**
  - Standalone components throughout
  - Control flow syntax (`@if`, `@for`, `@switch`)
  - Signals for reactive state
  - Typed reactive forms
  - Modern dependency injection with `inject()`

- **Performance Optimizations**
  - OnPush change detection strategy
  - TrackBy functions for lists
  - Lazy loading ready structure

- **Storage Solution**
  - Robust IndexedDB implementation
  - LocalStorage fallback
  - Error handling and recovery

- **Code Quality**
  - TypeScript strict mode
  - Consistent code style
  - Proper error handling
  - Comprehensive type safety

### Documentation
- README with setup instructions
- Contributing guidelines
- Code of conduct
- Security policy
- Changelog

---

## Version History

- **0.1.0** - Initial release with core functionality
- **Unreleased** - Development version with ongoing improvements

## Release Notes

### Version 0.1.0
This is the initial release of the Angular 20 Survey Builder project. It provides a solid foundation for building and managing surveys using modern Angular 20 patterns and best practices.

**Key Features:**
- Complete survey builder interface
- Modern Angular 20 architecture
- Robust data persistence
- Responsive design
- Educational focus

**Target Audience:**
- Angular developers learning version 20
- Students studying modern frontend patterns
- Developers experimenting with new Angular features

---

## Contributing to Changelog

When adding entries to the changelog, follow these guidelines:

1. **Use the existing format** and structure
2. **Group changes** by type (Added, Changed, Fixed, etc.)
3. **Be descriptive** but concise
4. **Include technical details** for significant changes
5. **Add version numbers** and dates for releases
6. **Use present tense** for entries
7. **Reference issues/PRs** when applicable

### Entry Format
```markdown
### Added
- Feature description with context

### Changed
- What was changed and why

### Fixed
- Bug description and impact
```

---

**Note**: This changelog is maintained as part of the educational nature of this project, helping developers understand the evolution of Angular 20 patterns and best practices. 