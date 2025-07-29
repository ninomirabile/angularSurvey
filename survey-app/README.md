# Survey App - Angular 20 Implementation

This is the main Angular 20 application implementing the Survey Builder system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm run test:unit
npm run test:e2e

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                           # Core services and utilities
│   │   ├── services/                   # Application services
│   │   ├── models/                     # TypeScript interfaces
│   │   └── utils/                      # Utility functions
│   ├── shared/                         # Reusable components
│   │   └── ui/                         # Design system components
│   │       ├── buttons/                # Button components
│   │       ├── cards/                  # Card components
│   │       ├── forms/                  # Form components
│   │       ├── modals/                 # Modal components
│   │       └── feedback/               # Toast notifications
│   ├── features/
│   │   ├── survey-builder/             # Survey creation module
│   │   ├── survey-runner/              # Survey execution module
│   │   ├── analytics/                  # Results analysis module
│   │   └── admin/                      # Administration module
│   └── layout/                         # Layout components
├── assets/                             # Static assets
├── environments/                       # Environment configurations
└── styles/                             # Global styles
```

## 🎯 Features

### ✅ Survey Builder Module
- Complete drag & drop survey editor
- Survey list with CRUD operations
- Real-time preview
- Settings configuration
- Auto-save functionality

### ✅ Survey Runner Module
- Interactive survey display
- Progress tracking
- Form validation
- Navigation controls

### ✅ Analytics Module
- Dashboard with metrics
- Charts placeholders
- Reports interface
- Response tracking

### ✅ Shared UI Components
- Button system
- Card components
- Form components
- Modal system
- Toast notifications

## 🧪 Testing

- **Unit Tests**: Vitest with Angular testing utilities
- **E2E Tests**: Playwright for browser testing
- **Coverage**: Comprehensive test coverage

## 🔧 Development

- **Angular 20**: Latest framework features
- **Tailwind CSS**: Utility-first styling
- **Angular Material**: UI component library
- **Signals**: Reactive state management
- **Lazy Loading**: Performance optimization

## 📊 Build Information

- **Bundle Size**: ~600KB initial
- **Lazy Chunks**: 11 chunks for optimization
- **Performance**: OnPush change detection
- **Modern**: Standalone components
