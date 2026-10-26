<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Documentation and code discrepancies

- When repository documentation conflicts with the existing code, follow the conventions in the code. Explicit changes requested by the user take precedence.
- In the final response, report every documentation/code discrepancy found during the task individually, including the documentation location, corresponding code location, specific difference, and how it was handled. Report only verified differences; do not claim unchecked areas are consistent.

## External account operations

- Before external account operations, read and follow `/Users/guojian/Workspace/naijoug/AGENTS.md`. Preserve and follow this reference in worktrees and temporary checkouts created from this project.
