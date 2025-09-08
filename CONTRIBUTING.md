# Contributing to Cinema24 🎬

First off, thank you for considering contributing to Cinema24! It's people like you that make Cinema24 such a great tool for movie enthusiasts.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, browser, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the concept**
- **Describe the current behavior and explain the behavior you expected**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Add or update tests as necessary
5. Ensure all tests pass: `npm test`
6. Update documentation if needed
7. Commit your changes using descriptive commit messages
8. Push to your fork: `git push origin feature/your-feature-name`
9. Create a Pull Request

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/your-username/Cinema24.git
cd Cinema24
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open `http://localhost:4200` in your browser

## Development Guidelines

### Code Style

- Follow the existing code style and conventions
- Use TypeScript for all new code
- Use Angular and TypeScript best practices
- Run `ng lint` to check for linting errors
- Use meaningful variable and function names
- Add comments for complex logic

### Testing

- Write unit tests for new features
- Ensure all existing tests pass: `npm test`
- Aim for good test coverage
- Use descriptive test names

### Commit Messages

Follow conventional commit format:

```
type(scope): description

body (optional)

footer (optional)
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
- `feat(search): add advanced search filters`
- `fix(movie): resolve poster image loading issue`
- `docs(readme): update installation instructions`

### Angular Specific Guidelines

- Follow Angular style guide
- Use OnPush change detection strategy where appropriate
- Implement proper error handling
- Use reactive forms for form handling
- Follow the single responsibility principle
- Use Angular Material components when possible
- Maintain responsive design with Tailwind CSS

## Project Structure

```
src/
├── app/
│   ├── models/           # TypeScript interfaces and models
│   ├── pages/            # Page components (feature components)
│   ├── services/         # Angular services for API calls
│   ├── shared/           # Shared components, directives, pipes
│   └── app.module.ts     # Root module
├── assets/               # Static assets (images, icons, etc.)
├── environments/         # Environment-specific configuration
└── styles.css           # Global styles
```

## API Guidelines

- The project uses the OMDB API
- Keep API keys secure and use environment variables
- Handle API errors gracefully
- Implement proper loading states
- Add retry logic for failed requests

## What to Contribute

### Good First Issues

- Bug fixes
- UI/UX improvements
- Documentation updates
- Adding tests
- Performance optimizations

### Intermediate Issues

- New features (advanced search, favorites, etc.)
- Accessibility improvements
- Mobile responsiveness enhancements
- API integration improvements

### Advanced Issues

- Architecture improvements
- Performance optimizations
- Complex new features
- Integration with additional APIs

## Questions?

Don't hesitate to ask questions by creating an issue with the `question` label. We're here to help!

## Recognition

Contributors will be recognized in our README.md file and release notes.

Thank you for contributing to Cinema24! 🎉
