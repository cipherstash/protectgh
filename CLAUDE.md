# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

protectgh is a GitHub Action and CLI tool for encrypting/decrypting secrets using CipherStash's Protect library. It integrates with CipherStash ZeroKMS for key management.

## Commands

```bash
npm run build          # Build both action and CLI (bundles with ncc into dist/)
npm run build:action   # Build only the GitHub Action
npm run build:cli      # Build only the CLI
npm run typecheck      # TypeScript type checking
npm test               # Run unit tests (Node.js test runner via tsx)
```

## Architecture

**Entry Points:**
- `src/action.ts` - GitHub Action: decrypts secrets file and exports to `$GITHUB_ENV`
- `src/cli.ts` - CLI tool: `encrypt` and `decrypt` commands with `--file`/`--vars` modes

**Core Modules:**
- `src/encrypt.ts` - Two encryption modes: file (entire .env as single blob) or vars (per-variable)
- `src/decrypt.ts` - Auto-detects encryption mode and decrypts accordingly
- `src/utils.ts` - Validation, GitHub env writing, bootstrap secret handling

**Tests:**
- `src/utils.test.ts` - Unit tests using Node.js built-in test runner
- `src/fixtures/` - Test fixtures for file-mode and vars-mode encrypted data

**Build Output:**
- `dist/action/` - Bundled GitHub Action (committed to repo for Actions to consume)
- `dist/cli/` - Bundled CLI tool

## Key Patterns

**Bootstrap Secrets:** The CipherStash credentials (`CS_CLIENT_ID`, `CS_CLIENT_KEY`, `CS_WORKSPACE_CRN`, `CS_CLIENT_ACCESS_KEY`) are required for encryption/decryption and are re-exported to GitHub env alongside decrypted secrets.

**Encryption Modes:**
- File mode (default): Encrypts entire `.env` content as a single encrypted blob
- Vars mode: Encrypts each variable individually, stored as separate entries

**Mode Detection:** `isFileMode()` utility checks if the encrypted data has `k` and `c` properties at root level (file mode = single encrypted blob) vs a dictionary mapping variable names to encrypted objects (vars mode).

**GitHub Env Writing:** Uses heredoc syntax to handle multiline secret values when writing to `$GITHUB_ENV`.

## License

MIT License - see [LICENSE.md](LICENSE.md)
