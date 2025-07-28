# Contributing to Angular 20 Survey Builder

First off, thank you for considering contributing to Angular 20 Survey Builder! 🎉

## 📋 Project Information

This is an **educational project** created for studying and experimenting with Angular 20 patterns and best practices. All contributions should be focused on learning and demonstrating modern Angular development techniques.

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs

- Use the GitHub issue tracker
- Include a clear and descriptive title
- Provide detailed steps to reproduce the bug
- Include browser/OS information
- Add screenshots if applicable

### 💡 Suggesting Enhancements

- Use the GitHub issue tracker with the "enhancement" label
- Describe the feature and its benefits
- Explain how it fits into the educational goals of the project
- Provide examples or mockups if possible

### 🔧 Code Contributions

#### Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+
- Basic knowledge of Angular 20 features

#### Development Setup

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/angularSurvey.git
   cd angularSurvey
   ```

3. **Install dependencies**
   ```bash
   cd survey-app
   npm install
   ```

4. **Start the development server**
   ```bash
   ./start.sh
   ```

#### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow the coding standards**
   - Use TypeScript strict mode
   - Follow Angular style guide
   - Use standalone components
   - Implement modern Angular 20 patterns (Signals, Control Flow, etc.)

3. **Write tests**
   - Unit tests with Vitest
   - Component tests with Component Harness
   - E2E tests with Playwright (for user flows)

4. **Update documentation**
   - Update README.md if needed
   - Add comments to complex code
   - Update the AI documentation if adding new features

#### Commit Guidelines

Use conventional commits format:

```
type(scope): description

feat(survey-builder): add undo/redo functionality
fix(storage): resolve IndexedDB initialization issue
docs(readme): update installation instructions
test(analytics): add unit tests for chart components
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Pull Request Process

1. **Update the README.md** with details of changes if applicable
2. **Update the AI documentation** if adding new features
3. **Ensure all tests pass**
4. **Ensure the build is successful**
5. **Add screenshots** for UI changes
6. **Link to relevant issues**

## 🎨 Code Style Guidelines

### Angular 20 Best Practices

- **Use Standalone Components**: No NgModules
- **Leverage Signals**: For reactive state management
- **Use Control Flow**: `@if`, `@for`, `@switch` instead of `*ngIf`, `*ngFor`
- **Typed Forms**: Use strongly typed reactive forms
- **OnPush Strategy**: Use OnPush change detection
- **Modern DI**: Use `inject()` function

### TypeScript Guidelines

- Use strict mode
- Prefer interfaces over types for objects
- Use union types for better type safety
- Avoid `any` type
- Use generic types where appropriate

### Component Guidelines

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isLoading()) {
      <app-loading-spinner />
    } @else {
      <div class="content">
        @for (item of items(); track item.id) {
          <app-item-card [item]="item" />
        }
      </div>
    }
  `
})
export class ExampleComponent {
  private readonly store = inject(ExampleStore);
  
  readonly isLoading = this.store.isLoading;
  readonly items = this.store.items;
}
```

### Service Guidelines

```typescript
@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  private readonly http = inject(HttpClient);
  
  getData(): Observable<Data[]> {
    return this.http.get<Data[]>('/api/data').pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
```

## 🧪 Testing Guidelines

### Unit Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        {
          provide: ExampleStore,
          useValue: {
            isLoading: signal(false),
            items: signal([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### E2E Tests

```typescript
import { test, expect } from '@playwright/test';

test('should display items correctly', async ({ page }) => {
  await page.goto('/example');
  
  await expect(page.locator('.item-card')).toHaveCount(3);
  await expect(page.locator('.loading-spinner')).not.toBeVisible();
});
```

## 📚 Documentation Guidelines

### Code Comments

- Comment complex business logic
- Explain why, not what
- Use JSDoc for public APIs
- Keep comments up to date

### README Updates

- Update installation instructions if dependencies change
- Add new features to the features list
- Update screenshots for UI changes
- Keep the quick start section current

## 🚫 What Not to Contribute

- **Commercial features**: This is an educational project
- **Backend APIs**: Focus on frontend Angular patterns
- **Complex business logic**: Keep it simple for learning
- **Third-party integrations**: Unless they demonstrate Angular patterns

## 🤝 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and discussions
- **Documentation**: Check the AI folder for detailed specs

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License with the commercial use restriction.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes

Thank you for contributing to the Angular 20 learning community! 🚀 