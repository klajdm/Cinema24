# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ |

## Reporting a Vulnerability

We take the security of Cinema24 seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **Do NOT** open a public issue for security vulnerabilities
2. Send an email to the maintainer directly via GitHub
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

- Cinema24 web application
- API integrations (OMDB API usage)
- User input handling and validation
- Client-side security measures

### Out of Scope

The following are generally considered out of scope:

- Issues in third-party dependencies (report to the respective maintainers)
- Social engineering attacks
- Physical security issues
- Issues requiring physical access to user devices

### Security Best Practices

When using Cinema24:

1. Keep your dependencies up to date
2. Use HTTPS in production environments
3. Sanitize any user inputs if you modify the application
4. Follow Angular security best practices
5. Regularly update to the latest version

### Recognition

We appreciate the security research community's efforts in keeping our project safe. Security researchers who responsibly disclose vulnerabilities will be:

- Acknowledged in our security advisories (with permission)
- Listed in our CONTRIBUTORS.md file (if desired)
- Given credit for their findings

Thank you for helping keep Cinema24 and our users safe!
