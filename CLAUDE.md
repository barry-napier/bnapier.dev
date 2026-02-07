# CLAUDE.md

## Workflow Requirements

- After completing work on a branch, you **must** create a pull request using `gh pr create`.
- The PR **must** pass all CI checks before it can be merged. If CI fails, investigate and fix the issues, then push again.
- The PR **must** pass the Vercel deployment check. If the Vercel build fails, investigate and fix the issues, then push again.
- Do not ask the user to merge a PR until CI and Vercel deployment are both green.
