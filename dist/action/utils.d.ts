import { Encrypted } from "@cipherstash/protect";
/**
 * Bootstrap secrets required for ZeroKMS authentication.
 * These are passed via environment variables and forwarded to $GITHUB_ENV.
 */
export declare const BOOTSTRAP_SECRETS: readonly ["CS_CLIENT_ID", "CS_CLIENT_KEY", "CS_CLIENT_ACCESS_KEY", "CS_WORKSPACE_CRN"];
/**
 * Detect if encrypted data is in file mode (single blob) or vars mode (per-variable).
 * File mode has `k` and `c` keys at root level.
 */
export declare function isFileMode(data: unknown): data is Encrypted;
/**
 * Validate that all required bootstrap environment variables are present.
 * Returns list of missing variables, or empty array if all present.
 */
export declare function validateEnvVars(): string[];
/**
 * Write secrets to $GITHUB_ENV file using heredoc syntax for multiline support.
 */
export declare function writeToGitHubEnv(secrets: Record<string, string>, githubEnvPath: string): void;
/**
 * Get bootstrap secrets from environment and return as key-value pairs.
 */
export declare function getBootstrapSecrets(): Record<string, string>;
