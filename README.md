# Angular 20 Survey Builder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-20-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)

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
cd angularSurvey

# Start the application
./start.sh

# Stop the application  
./stop.sh
```

The application will be available at: http://localhost:4200

## 🎯 Project Objective

Create a complete Angular 20 application that demonstrates all modern framework features through a survey management system with creation interface (admin) and compilation interface (public). The project serves as a showcase of best practices and new Angular 17+ APIs.

## 🚀 Technology Stack

### Frontend Core
- **Angular 20**: Standalone application with all new APIs
- **UI Framework**: Angular Material (MDC) + Tailwind CSS
- **Architecture**: 100% Standalone components with modern dependency injection
- **Forms**: Typed Reactive Forms + SurveyJS integration
- **State Management**: Signals + ComponentStore + RxJS 7+
- **Routing**: Standalone routing with `inject()` and lazy loading

### Development & Testing
- **Build Tool**: Angular CLI 17+ (with Vite-ready configuration)
- **Mocking**: MSW (Mock Service Worker) for realistic API simulation
- **Testing**: Vitest + @angular/testing + Component Harness + Playwright
- **i18n**: Built-in Angular i18n with ICU expressions
- **DevTools**: Angular DevTools + Redux DevTools for ComponentStore

### Specialized Libraries
- **SurveyJS**: Editor and Runner for advanced survey management
- **Storage**: LocalStorage + IndexedDB + potential API integration
- **Charts**: Chart.js for result visualization
- **Animations**: Angular animations + Framer Motion integration

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                           # Core services and utilities
│   │   ├── services/                   # Application services
│   │   ├── models/                     # TypeScript interfaces
│   │   ├── guards/                     # Route protection
│   │   └── utils/                      # Utility functions
│   ├── shared/                         # Reusable components
│   │   ├── ui/                         # Design system components
│   │   ├── pipes/                      # Custom pipes
│   │   └── directives/                 # Custom directives
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

## 🎨 Features

### 1. Survey Builder Module (Admin Panel)
- **Survey Editor**: Complete SurveyJS Creator integration
- **Survey List**: Virtual scrolling with search/filter
- **Real-time Preview**: Live preview with hot reload
- **Settings Panel**: Advanced survey properties configurator
- **Template Manager**: Predefined template management

### 2. Survey Runner Module (Public Interface)
- **Survey Display**: Responsive compilation interface
- **Progress Indicator**: Multi-step progress with animations
- **Results Page**: Thank you page with analytics
- **Embedded Mode**: Widget for external integration

### 3. Analytics Module
- **Charts Dashboard**: Result visualization with Chart.js
- **Reports Generator**: Customizable reports
- **Data Export**: Export in various formats
- **Real-time Analytics**: Live data updates

## ⚡ Modern Angular 17+ Features

- **Signals**: Reactive state management
- **Control Flow**: `@if`, `@for`, `@switch` syntax
- **Standalone Components**: Modern dependency injection
- **Typed Forms**: Strongly typed reactive forms
- **Performance**: OnPush strategy, trackBy functions
- **Testing**: Vitest + Component Harness + Playwright

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run e2e

# Test coverage
npm run test:coverage
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

## 📚 Documentation

For detailed documentation, see the [AI folder](./ai/) which contains:
- [Project Blueprint](./ai/cursor.prompt.md) - Complete project specification
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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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