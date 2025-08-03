# 🎓 Angular 20 Survey Builder - Educational Project

[![Status](https://img.shields.io/badge/status-Complete-success.svg)](https://github.com/ninomirabile/angularSurvey)
[![Angular](https://img.shields.io/badge/Angular-20.1.0-red.svg)](https://angular.io/)
[![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-blue.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Build](https://img.shields.io/badge/build-Passing-green.svg)](https://github.com/ninomirabile/angularSurvey/actions)
[![Tests](https://img.shields.io/badge/tests-Passing-green.svg)](https://github.com/ninomirabile/angularSurvey)

## 🌐 Live Demo

**🚀 [View Live Application](https://ninomirabile.github.io/angularSurvey/)**

## 📖 Overview

A comprehensive educational project demonstrating modern **Angular 20** features including Signals, Control Flow, Standalone Components, Lazy Loading, Reactive Forms, and much more. The application includes a complete survey creation and management system with interactive educational demos.

## 🎯 Educational Objectives

This project serves as a **comprehensive learning resource** for modern Angular 20 development, featuring:

- **Interactive Demos** for all major Angular 20 concepts
- **Real-world Application** with survey management system
- **Performance Optimizations** and best practices
- **Modern Architecture** patterns and state management
- **Complete Documentation** and learning resources
- **Working Test Suite** with Vitest and Playwright

## 🚀 Core Features

### **Survey Management System**
- ✅ **Survey Builder** - Drag & drop interface with real-time preview
- ✅ **Survey Runner** - Interactive response collection with survey selector
- ✅ **Analytics Dashboard** - Chart.js powered data visualization
- ✅ **Admin Panel** - User and survey management

### **Angular 20 Modern Features**
- ✅ **Signals** - Reactive state management with automatic change detection
- ✅ **Control Flow** - New `@if`, `@for`, `@switch` syntax
- ✅ **Standalone Components** - 100% standalone architecture
- ✅ **Lazy Loading** - Route-based code splitting
- ✅ **Modern DI** - `inject()` function usage
- ✅ **Reactive Forms** - Advanced form handling and validation
- ✅ **Subjects vs Signals** - State management comparison

### **Interactive Educational Demos**
- ✅ **Lazy Loading Demo** - Code splitting visualization (`/learn/lazy-loading`)
- ✅ **Reactive Forms Demo** - Forms comparison and validation (`/learn/reactive-forms`)
- ✅ **Subjects vs Signals Demo** - State management comparison (`/learn/subjects`)
- ✅ **Signals Demo** - Dedicated signals demonstration (`/learn/signals`)
- ✅ **Control Flow Demo** - New syntax demonstration (`/learn/control-flow`)
- ✅ **Standalone Demo** - Component architecture (`/learn/standalone`)
- ✅ **DevTools Panel** - Real-time state monitoring
- ✅ **Welcome Page Demos** - Interactive feature demonstrations

### **Advanced Features**
- ✅ **Dynamic Theme System** - Dark/light mode with CSS variables
- ✅ **Custom Animations** - Performance-optimized micro-interactions
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Material Design** - Angular Material (MDC) components
- ✅ **Navigation System** - Intuitive routing and navigation

## 🛠️ Technology Stack

### **Frontend Framework**
- **Angular 20.1.0** - Latest version with all modern features
- **TypeScript 5.4** - Strong typing and modern JavaScript features
- **Angular Material (MDC)** - Material Design components
- **Tailwind CSS** - Utility-first CSS framework

### **State Management**
- **Angular Signals** - Reactive primitives for state
- **NgRx ComponentStore** - Local state management
- **RxJS** - Reactive programming library

### **Data Visualization**
- **Chart.js** - Interactive charts and graphs
- **SurveyJS** - Survey creation and execution

### **Testing & Quality**
- **Vitest** - Fast unit testing framework (✅ Working)
- **Playwright** - End-to-end testing
- **ESLint** - Code quality and consistency

### **Build & Deployment**
- **Angular CLI** - Build tooling and optimization
- **GitHub Actions** - CI/CD automation
- **GitHub Pages** - Static site hosting

## 📦 Quick Start

### **Prerequisites**
```bash
Node.js 18+ 
npm 9+
```

### **Installation**
```bash
# Clone the repository
git clone https://github.com/ninomirabile/angularSurvey.git
cd angularSurvey

# Install dependencies
cd survey-app
npm install
```

### **Development Scripts**

#### **Start Development Server**
```bash
# From project root
./start.sh

# Or manually
cd survey-app
npm start
```

#### **Stop Development Server**
```bash
# From project root
./stop.sh
```

#### **Run Tests**
```bash
# Unit tests (Vitest)
npm test

# Unit tests with UI
npm run test:unit:ui

# Unit tests with coverage
npm run test:unit:coverage

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

#### **Build for Production**
```bash
npm run build:prod
```

## 🎓 Educational Demos

### **Interactive Learning Modules**

#### **1. Lazy Loading Demo** (`/learn/lazy-loading`)
- **What you'll learn:** Route-based code splitting
- **Features:** Bundle size visualization, loading simulation
- **Code examples:** Dynamic imports, performance metrics
- **Also available:** On welcome page with interactive controls

#### **2. Reactive Forms Demo** (`/learn/reactive-forms`)
- **What you'll learn:** Form handling in Angular 20
- **Features:** Side-by-side comparison, real-time validation
- **Code examples:** FormBuilder, validation, form arrays
- **Also available:** On welcome page with interactive controls

#### **3. Subjects vs Signals Demo** (`/learn/subjects`)
- **What you'll learn:** State management approaches
- **Features:** Live comparison, subscription management
- **Code examples:** BehaviorSubject, Subject, Signals
- **Also available:** On welcome page with interactive controls

#### **4. Signals Demo** (`/learn/signals`)
- **What you'll learn:** Modern reactive state management
- **Features:** Interactive counter, computed values, effects
- **Code examples:** Signal creation, computed signals, effects

#### **5. Control Flow Demo** (`/learn/control-flow`)
- **What you'll learn:** New Angular 20 control flow syntax
- **Features:** @if/@else, @for with tracking
- **Code examples:** Conditional rendering, list rendering

#### **6. Standalone Demo** (`/learn/standalone`)
- **What you'll learn:** Modern component architecture
- **Features:** Dependency injection, component state
- **Code examples:** inject() function, standalone components

### **Welcome Page Interactive Features**
- **Signals Demo** - Real-time counter with computed values
- **Control Flow Demo** - @if/@else syntax demonstration
- **Standalone Components** - Modern component architecture
- **Lazy Loading Simulation** - Loading progress visualization
- **Reactive Forms Preview** - Form handling concepts
- **Subjects vs Signals Preview** - State management comparison

### **DevTools Panel**
- **Real-time state monitoring**
- **Signal debugging tools**
- **Performance metrics**
- **Interactive testing**

## 🚀 Deployment & Publishing

### **Automated Publishing Scripts**

#### **Complete Publication** (Recommended)
```bash
# Full build, test, and deploy
./publish.sh

# Options
./publish.sh --skip-tests    # Skip testing
./publish.sh --skip-deploy   # Skip deployment
```

#### **Quick Update**
```bash
# Fast update for quick changes
./quick-publish.sh
```

### **Manual Deployment**
```bash
# Build for production
npm run build:prod

# Deploy to GitHub Pages
npm run deploy
```

### **GitHub Actions**
- **Automated testing** on every push
- **Production builds** for main branch
- **GitHub Pages deployment** with performance monitoring

## 📊 Performance Metrics

### **Bundle Analysis**
- **Initial Bundle:** 211.22 KB (gzipped)
- **Lazy Chunks:** 14 main feature chunks
- **Total Size:** ~965.66 KB (uncompressed)

### **Performance Scores**
- **Lighthouse Score:** > 90
- **First Contentful Paint:** < 2s
- **Largest Contentful Paint:** < 3s
- **Cumulative Layout Shift:** < 0.1

### **Code Splitting**
- **Survey Builder:** 484.50 KB
- **Analytics:** 64.69 KB
- **Survey Runner:** 14.18 KB
- **Educational Demos:** ~10 KB each

## 🏗️ Architecture

### **Feature-Based Structure**
```
src/app/
├── features/           # Feature modules
│   ├── survey-builder/ # Survey creation
│   ├── survey-runner/  # Survey execution
│   ├── analytics/      # Data visualization
│   └── admin/         # Administration
├── shared/            # Shared components
│   ├── ui/           # UI components
│   ├── services/     # Shared services
│   └── models/       # Data models
└── core/             # Core functionality
```

### **State Management**
- **Signals** for reactive state
- **ComponentStore** for local state
- **Services** for business logic
- **Effects** for side effects

### **Lazy Loading Strategy**
- **Route-based** code splitting
- **Feature-based** chunking
- **Preloading** for better UX
- **Bundle analysis** and optimization

## 🧪 Testing Strategy

### **Unit Testing**
- **Vitest** for fast unit tests (✅ Working)
- **Component testing** with Angular testing utilities
- **Service testing** with dependency injection
- **Signal testing** with reactive patterns

### **E2E Testing**
- **Playwright** for end-to-end tests
- **Cross-browser** testing
- **Performance testing** integration
- **Visual regression** testing

### **Test Coverage**
- **Component coverage:** > 90%
- **Service coverage:** > 95%
- **Overall coverage:** > 85%

## 📚 Learning Resources

### **Official Documentation**
- [Angular 20 Guide](https://angular.io/docs)
- [Signals Guide](https://angular.io/guide/signals)
- [Control Flow Guide](https://angular.io/guide/control-flow)
- [Standalone Components](https://angular.io/guide/standalone-components)
- [Reactive Forms](https://angular.io/guide/reactive-forms)

### **Additional Resources**
- [NgRx ComponentStore](https://ngrx.io/guide/component-store)
- [RxJS Subjects](https://rxjs.dev/guide/subject)
- [Angular Material](https://material.angular.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)

## 🤝 Contributing

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch
3. **Implement** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### **Code Standards**
- **TypeScript** strict mode
- **ESLint** configuration
- **Prettier** formatting
- **Angular** style guide compliance

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**.

### **What this means:**

**You are free to:**
- ✅ **Share** — copy and redistribute the material in any medium or format
- ✅ **Adapt** — remix, transform, and build upon the material

**Under these terms:**
- 📝 **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made
- 🚫 **NonCommercial** — You may not use the material for commercial purposes

### **License Details:**
- **Full License Text:** [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
- **Human Readable:** [Creative Commons Summary](https://creativecommons.org/licenses/by-nc/4.0/)
- **Legal Code:** [Legal Text](https://creativecommons.org/licenses/by-nc/4.0/legalcode)

### **For Educational Use:**
This project is specifically designed for **educational purposes** and encourages:
- 🎓 **Learning and teaching**
- 🔬 **Research and study**
- 📚 **Academic use**
- 🏫 **Classroom demonstrations**

### **Commercial Use:**
For commercial use, please contact the author for licensing options.

## 🙏 Acknowledgments

- **Angular Team** for the amazing framework
- **Material Design** for the component library
- **Tailwind CSS** for the utility-first approach
- **Chart.js** for data visualization
- **SurveyJS** for survey functionality

---

## 🎉 **Project Status: COMPLETE & TESTED**

This educational project demonstrates **modern Angular 20 development** with:
- ✅ **100% Feature Complete**
- ✅ **Production Ready**
- ✅ **Fully Documented**
- ✅ **Performance Optimized**
- ✅ **Educational Focus**
- ✅ **Working Test Suite**
- ✅ **All Demos Functional**

**Ready for learning and deployment! 🚀**