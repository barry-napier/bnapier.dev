# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public issue
2. Email security concerns directly
3. Include details about the vulnerability
4. Allow reasonable time for response

## Security Measures

This site implements:

- Content Security Policy headers
- HTML sanitization for RSS feeds
- No user authentication or data storage
- Static site generation (no server-side vulnerabilities)

## Dependencies

Dependencies are reviewed regularly. We use:

- `npm audit` for vulnerability scanning
- Dependabot for automated updates
