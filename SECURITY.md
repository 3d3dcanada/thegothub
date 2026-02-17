# Security Policy

## Supported Versions

We currently support the latest release of OpenSource Hub. We recommend always using the most recent version.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ Currently Active |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email the maintainer directly at: [Your email here]
3. Or use GitHub's private vulnerability reporting:
   - Go to the repository's "Security" tab
   - Click "Report a vulnerability"
   - Fill out the vulnerability report form

### What to Include

Please include as much of the following as possible:

- Type of vulnerability (e.g., XSS, SQL injection, etc.)
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact assessment of the vulnerability

### Response Timeline

- We will acknowledge receipt of your vulnerability report within 48 hours
- We will provide a more detailed response within 7 days with our assessment and expected timeline for a fix
- We will keep you informed of the progress towards a fix

## Security Best Practices

When deploying OpenSource Hub, follow these security guidelines:

### Environment Variables

- Never commit `.env.local` or `.env.production.local` to version control
- Use Vercel's Environment Variables feature for production secrets
- Rotate API tokens periodically

### Database

- Use strong passwords for database connections
- Enable SSL/TLS for database connections in production
- Follow the principle of least privilege for database users

### GitHub API

- Create a GitHub Personal Access Token with minimal scopes
- Avoid storing tokens in client-side code
- Rotate tokens if you suspect they have been compromised

### Dependencies

- Keep dependencies up to date
- Run `npm audit` regularly to check for vulnerabilities
- Review security advisories for your dependencies

## Security Updates

Security updates will be released as patch versions and documented in the CHANGELOG.

Thank you for helping keep OpenSource Hub secure!
