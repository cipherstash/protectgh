export interface DecryptResult {
    secrets: Record<string, string>;
    mode: "file" | "vars";
    count: number;
}
/**
 * Decrypt secrets from an encrypted file.
 * Auto-detects file mode (single blob) vs vars mode (per-variable).
 */
export declare function decryptSecrets(filePath: string): Promise<DecryptResult>;
