# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 2.0.x   | ✅        |
| 1.x.x   | ❌ (EOL)  |

## Reporting a Vulnerability

We take the security of Cinema24 seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **Do NOT** open a public issue for security vulnerabilities
2. Send an email to the maintainer: **klajdimurataj@gmail.com**
3. Include detailed information about the vulnerability
4. Provide steps to reproduce the issue if possible

### What to Include

Please provide the following information:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any suggested fixes or mitigations
- Your contact information for follow-up

### Response Timeline

- **Initial Response**: We aim to acknowledge receipt within 48 hours
- **Investigation**: Security reports will be investigated within 5 business days
- **Fix Timeline**: Critical vulnerabilities will be addressed within 7 days, other issues within 30 days
- **Disclosure**: We follow responsible disclosure practices and will coordinate with you on timing

### Scope

This security policy applies to the following components:

- Cinema24 web application (client-side Angular app)
- OMDB API integration (public API key)
- User input handling and validation
- Client-side security measures (CSP, XSS prevention)
- LocalStorage usage for watchlist persistence
- Content Security Policy in index.html

### Out of Scope

The following are generally considered out of scope:

- Issues in third-party dependencies (report to the respective maintainers)
- Social engineering attacks
- Physical security issues
- Issues requiring physical access to user devices
- Vulnerabilities in the OMDB API service itself

### Security Architecture

Cinema24 is a client-side application with the following security posture:

- **No authentication**: The app does not handle user accounts or authentication data
- **Public API**: Uses the OMDB API with a public API key (no sensitive data)
- **LocalStorage**: Watchlist data is stored locally on the user's device only
- **Content Security Policy**: Enforced via meta tag in index.html
- **HTTPS Required**: All API calls and external resources must be served over HTTPS

### Security Best Practices

When using Cinema24:

1. Keep your dependencies up to date
2. Use HTTPS in production environments
3. Sanitize any user inputs if you modify the application
4. Follow Angular security best practices
5. Regularly update to the latest version
6. Review the Content Security Policy in index.html before deployment

### Recognition

We appreciate the security research community's efforts in keeping our project safe. Security researchers who responsibly disclose vulnerabilities will be:

- Acknowledged in our security advisories (with permission)
- Listed in our CONTRIBUTORS.md file (if desired)
- Given credit for their findings

Thank you for helping keep Cinema24 and our users safe!
