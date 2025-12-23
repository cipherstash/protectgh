# protectgh

GitHub Action to decrypt CipherStash-protected secrets and export them to `$GITHUB_ENV`.

## Usage

```yaml
- uses: cipherstash/protectgh@v1
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
# Install
npm install -g protectgh

# Encrypt (requires CS_* env vars)
protectgh encrypt
protectgh encrypt --vars  # per-variable mode
protectgh encrypt --input FILE --output FILE

# Decrypt to stdout (for testing)
protectgh decrypt
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
   protectgh encrypt
   ```

4. Commit the encrypted file:
   ```bash
   git add .github/secrets.env.encrypted
   git commit -m "chore: add encrypted secrets"
   ```

5. Use in workflow - secrets are available in subsequent steps.

## License

MIT
