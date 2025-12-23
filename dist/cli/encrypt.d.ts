export type EncryptMode = "file" | "vars";
export interface EncryptResult {
    mode: EncryptMode;
    count: number;
}
/**
 * Encrypt secrets from a plaintext .env file.
 *
 * @param inputPath - Path to plaintext .env file
 * @param outputPath - Path to write encrypted JSON
 * @param mode - "file" encrypts entire file as blob, "vars" encrypts each variable
 */
export declare function encryptSecrets(inputPath: string, outputPath: string, mode?: EncryptMode): Promise<EncryptResult>;
