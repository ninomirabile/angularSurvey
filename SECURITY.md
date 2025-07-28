# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Angular 20 Survey Builder seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Reporting Process

1. **Do not create a public GitHub issue** for the vulnerability
2. **Email the details** to: [INSERT SECURITY EMAIL]
3. **Include the following information**:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Initial Response**: Within 48 hours
- **Assessment**: We will assess the reported vulnerability
- **Fix Timeline**: Based on severity and complexity
- **Disclosure**: Coordinated disclosure after fix is available

### Security Best Practices

Since this is an educational project, we also encourage contributors to follow these security best practices:

#### Frontend Security

- **Input Validation**: Always validate and sanitize user inputs
- **XSS Prevention**: Use Angular's built-in XSS protection
- **Content Security Policy**: Implement CSP headers
- **HTTPS**: Always use HTTPS in production
- **Dependency Updates**: Keep dependencies updated

#### Code Security

```typescript
// ✅ Good: Sanitize user input
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

getSafeHtml(userInput: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(userInput);
}

// ❌ Bad: Direct DOM manipulation
element.innerHTML = userInput; // Dangerous!
```

#### Storage Security

```typescript
// ✅ Good: Validate data before storage
interface SurveyData {
  id: string;
  title: string;
  questions: Question[];
}

saveSurvey(data: unknown): void {
  if (this.isValidSurveyData(data)) {
    this.storage.setItem('survey', data);
  }
}

private isValidSurveyData(data: unknown): data is SurveyData {
  // Implement validation logic
  return true;
}
```

### Security Checklist

Before submitting code, ensure:

- [ ] No sensitive data in logs or console
- [ ] Input validation implemented
- [ ] XSS protection in place
- [ ] No hardcoded secrets
- [ ] Dependencies are up to date
- [ ] Error messages don't leak sensitive info

### Responsible Disclosure

We follow responsible disclosure practices:

1. **Private Reporting**: Report vulnerabilities privately
2. **Timely Response**: We respond within 48 hours
3. **Coordinated Fix**: Fix and test before disclosure
4. **Public Disclosure**: After fix is available
5. **Credit**: Proper credit to reporters

### Security Updates

Security updates will be:

- **Prioritized**: Over other development work
- **Tested**: Thoroughly before release
- **Documented**: With clear changelog entries
- **Communicated**: Through GitHub releases

### Contact Information

For security-related issues:

- **Email**: [INSERT SECURITY EMAIL]
- **PGP Key**: [INSERT PGP KEY IF AVAILABLE]
- **Response Time**: Within 48 hours

### Acknowledgments

We thank security researchers and contributors who help keep our project secure through responsible disclosure.

---

**Note**: This is an educational project. While we take security seriously, the primary focus is on learning Angular 20 patterns and best practices. 