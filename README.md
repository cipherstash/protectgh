# CipherStash Secrets Action

GitHub Action to decrypt CipherStash-protected secrets and export them to `$GITHUB_ENV`.

## Usage

```yaml
- uses: cipherstash/secrets-action@v1
  env:
    CS_CLIENT_ID: ${{ secrets.CS_CLIENT_ID }}
    CS_CLIENT_KEY: ${{ secrets.CS_CLIENT_KEY }}
    CS_CLIENT_ACCESS_KEY: ${{ secrets.CS_CLIENT_ACCESS_KEY }}
    CS_WORKSPACE_CRN: ${{ secrets.CS_WORKSPACE_CRN }}
```

### Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `secrets-file` | Path to encrypted secrets file | `.github/secrets.env.encrypted` |

### Outputs

| Output | Description |
|--------|-------------|
| `count` | Number of secrets exported |

## CLI Tool

For local encryption/decryption:

```bash
# Install (from npm if published, or locally from repo)
npm install -g @cipherstash/secrets-action  # from npm registry
npm install -g .                             # from local repo

# Show help
secrets-action --help

# Encrypt (requires CS_* env vars)
secrets-action encrypt                              # file mode (default)
secrets-action encrypt --file                       # explicit file mode
secrets-action encrypt --vars                       # per-variable mode
secrets-action encrypt -i FILE -o FILE              # custom input/output paths
secrets-action encrypt --input FILE --output FILE   # long form

# Decrypt to stdout (for testing)
secrets-action decrypt
secrets-action decrypt --input FILE                 # decrypt specific file
```

## Setup

1. Configure CipherStash credentials as GitHub secrets:
   - `CS_CLIENT_ID`
   - `CS_CLIENT_KEY`
   - `CS_CLIENT_ACCESS_KEY`
   - `CS_WORKSPACE_CRN`

2. Create your plaintext secrets file locally:
   ```
   # .github/secrets.env.plaintext (gitignored)
   API_KEY=secret123
   DATABASE_URL=postgres://...
   ```

3. Encrypt with CLI:
   ```bash
   export CS_CLIENT_ID=...
   export CS_CLIENT_KEY=...
   export CS_CLIENT_ACCESS_KEY=...
   export CS_WORKSPACE_CRN=...
   secrets-action encrypt
   ```

4. Commit the encrypted file:
   ```bash
   git add .github/secrets.env.encrypted
   git commit -m "chore: add encrypted secrets"
   ```

5. Use in workflow - secrets are available in subsequent steps:
   ```yaml
   - name: Use decrypted secrets
     run: |
       echo "Connecting to database..."
       # Secrets are now environment variables
     env:
       DATABASE_URL: ${{ env.DATABASE_URL }}
       API_KEY: ${{ env.API_KEY }}
   ```

## License

[MIT License](LICENSE.md)
