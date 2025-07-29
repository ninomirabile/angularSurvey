# Angular 20 Survey Builder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-Passing-green.svg)](https://github.com/ninomirabile/angularSurvey)

> **⚠️ Educational Project**: This project is created for educational and study purposes. It is used to experiment and verify new Angular 20 patterns and best practices. While the MIT license allows commercial use, this project is primarily intended for learning and educational purposes.

## 📋 Project Information

**Author:** [Antonino Mirabile](https://github.com/ninomirabile)  
**Repository:** https://github.com/ninomirabile/angularSurvey  
**License:** MIT License  
**Purpose:** Study and experimentation project to test and verify new Angular 20 patterns and best practices

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ninomirabile/angularSurvey.git
cd angularSurvey/survey-app

# Install dependencies
npm install

# Start the application
npm start

# Run tests
npm run test:unit
npm run test:e2e
```

The application will be available at: http://localhost:4200

## 🎯 Project Objective

Create a complete Angular 20 application that demonstrates all modern framework features through a survey management system with creation interface (admin) and compilation interface (public). The project serves as a showcase of best practices and new Angular 20 APIs.

## 🚀 Technology Stack

### Frontend Core
- **Angular 20**: Standalone application with all new APIs
- **UI Framework**: Angular Material (MDC) + Tailwind CSS
- **Architecture**: 100% Standalone components with modern dependency injection
- **Forms**: Typed Reactive Forms with validation
- **State Management**: Signals + ComponentStore + RxJS 7+
- **Routing**: Standalone routing with `inject()` and lazy loading

### Development & Testing
- **Build Tool**: Angular CLI 20+ (with Vite-ready configuration)
- **Testing**: Vitest + Playwright for comprehensive testing
- **Styling**: Tailwind CSS with custom design system
- **Performance**: OnPush change detection, lazy loading

### Specialized Libraries
- **SurveyJS**: Editor and Runner for advanced survey management
- **Storage**: LocalStorage + IndexedDB integration
- **Charts**: Chart.js for result visualization (ready for integration)
- **Animations**: Angular animations + Framer Motion integration

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
│   │   │   ├── components/             # Builder components
│   │   │   ├── store/                  # State management
│   │   │   └── services/               # Builder services
│   │   ├── survey-runner/              # Survey execution module
│   │   │   ├── components/             # Runner components
│   │   │   └── services/               # Runner services
│   │   ├── analytics/                  # Results analysis module
│   │   │   ├── components/             # Analytics components
│   │   │   └── services/               # Analytics services
│   │   └── admin/                      # Administration module
│   └── layout/                         # Layout components
├── assets/                             # Static assets
├── environments/                       # Environment configurations
└── styles/                             # Global styles
```

## 🎨 Features

### ✅ 1. Survey Builder Module (Admin Panel)
- **Survey Editor**: Complete drag & drop interface
- **Survey List**: Grid view with actions (edit, duplicate, delete)
- **Real-time Preview**: Live preview with tabs
- **Settings Panel**: Advanced survey properties configurator
- **Auto-save**: Automatic saving with dirty state tracking

### ✅ 2. Survey Runner Module (Public Interface)
- **Survey Display**: Responsive compilation interface
- **Progress Indicator**: Multi-step progress with animations
- **Form Validation**: Real-time validation for all question types
- **Navigation**: Previous/Next with conditional logic

### ✅ 3. Analytics Module
- **Dashboard**: Overview cards with key metrics
- **Charts Placeholders**: Ready for Chart.js integration
- **Reports Section**: Report generation interface
- **Responses Tracking**: Recent responses list

### ✅ 4. Shared UI Components
- **Button System**: Primary, secondary, and variant buttons
- **Card Components**: Configurable cards with themes
- **Form Components**: Input fields with validation
- **Modal System**: Reusable modal components
- **Toast Notifications**: Feedback system

## ⚡ Modern Angular 20 Features

- **Signals**: Reactive state management throughout
- **Control Flow**: `@if`, `@for`, `@switch` syntax implemented
- **Standalone Components**: 100% standalone architecture
- **Typed Forms**: Strongly typed reactive forms with validation
- **Performance**: OnPush strategy, lazy loading, optimized bundles
- **Testing**: Vitest + Playwright with comprehensive coverage

## 🧪 Testing

```bash
# Unit tests with Vitest
npm run test:unit

# E2E tests with Playwright
npm run test:e2e

# All tests
npm run test:all
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Lint code
npm run lint
```

## 📊 Current Status

### ✅ Completed Features (98%)
- ✅ Complete Survey Builder with editor
- ✅ Survey Runner with validation
- ✅ Analytics Dashboard
- ✅ Shared UI Component System
- ✅ Modern Angular 20 Architecture
- ✅ Comprehensive Testing Setup
- ✅ Responsive Design
- ✅ Performance Optimizations

### 🔄 In Progress (2%)
- 🔄 Chart.js integration for analytics
- 🔄 Advanced animations with Framer Motion

## 📚 Documentation

For detailed documentation, see the [AI folder](../ai/) which contains:
- [Project Blueprint](../ai/cursor.prompt.md) - Complete project specification
- Technical implementation details
- Best practices and patterns

## 🤝 Contributing

This is an educational project for studying Angular 20 patterns. Contributions are welcome for educational purposes only.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

**Note**: While the MIT license allows commercial use, this project is primarily intended for educational and learning purposes.

## 🙏 Acknowledgments

- [Angular Team](https://angular.io/) for the amazing framework
- [SurveyJS](https://surveyjs.io/) for the survey components
- [Angular Material](https://material.angular.io/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Contact

Antonino Mirabile - [@ninomirabile](https://github.com/ninomirabile)

Project Link: [https://github.com/ninomirabile/angularSurvey](https://github.com/ninomirabile/angularSurvey)

---

⭐ If this project helped you learn Angular 20, please give it a star!