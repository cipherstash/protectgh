import { Encrypted } from "@cipherstash/protect";
import * as fs from "fs";

/**
 * Bootstrap secrets required for ZeroKMS authentication.
 * These are passed via environment variables and forwarded to $GITHUB_ENV.
 */
export const BOOTSTRAP_SECRETS = [
  "CS_CLIENT_ID",
  "CS_CLIENT_KEY",
  "CS_CLIENT_ACCESS_KEY",
  "CS_WORKSPACE_CRN",
] as const;

/**
 * Detect if encrypted data is in file mode (single blob) or vars mode (per-variable).
 * File mode has `k` and `c` keys at root level.
 */
export function isFileMode(data: unknown): data is Encrypted {
  return data !== null && typeof data === "object" && "k" in data && "c" in data;
}

/**
 * Validate that all required bootstrap environment variables are present.
 * Returns list of missing variables, or empty array if all present.
 */
export function validateEnvVars(): string[] {
  const missing: string[] = [];
  for (const key of BOOTSTRAP_SECRETS) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }
  return missing;
}

/**
 * Write secrets to $GITHUB_ENV file using heredoc syntax for multiline support.
 */
export function writeToGitHubEnv(
  secrets: Record<string, string>,
  githubEnvPath: string
): void {
  for (const [key, value] of Object.entries(secrets)) {
    const delimiter = `EOF_${key}_${Date.now()}`;
    fs.appendFileSync(
      githubEnvPath,
      `${key}<<${delimiter}\n${value}\n${delimiter}\n`
    );
  }
}

/**
 * Get bootstrap secrets from environment and return as key-value pairs.
 */
export function getBootstrapSecrets(): Record<string, string> {
  const secrets: Record<string, string> = {};
  for (const key of BOOTSTRAP_SECRETS) {
    const value = process.env[key];
    if (value) {
      secrets[key] = value;
    }
  }
  return secrets;
}
