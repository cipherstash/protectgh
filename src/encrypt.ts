import { protect, csTable, csColumn } from "@cipherstash/protect";
import * as fs from "fs";
import * as dotenv from "dotenv";

const schema = csTable("ci_secrets", {
  value: csColumn("value"),
});

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
export async function encryptSecrets(
  inputPath: string,
  outputPath: string,
  mode: EncryptMode = "file"
): Promise<EncryptResult> {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Plaintext secrets file not found: ${inputPath}`);
  }

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(inputPath, "utf-8");
  } catch (err) {
    throw new Error(`Failed to read input file ${inputPath}: ${err instanceof Error ? err.message : String(err)}`);
  }

  const client = await protect({ schemas: [schema] });

  if (mode === "file") {
    const result = await client.encrypt(fileContent, {
      table: schema,
      column: schema.value,
    });

    if (result.failure) {
      throw new Error(`Failed to encrypt: ${result.failure.message}`);
    }

    try {
      fs.writeFileSync(outputPath, JSON.stringify(result.data, null, 2) + "\n");
    } catch (err) {
      throw new Error(`Failed to write output file ${outputPath}: ${err instanceof Error ? err.message : String(err)}`);
    }

    // Count lines that look like KEY=value
    const env = dotenv.parse(fileContent);
    return { mode: "file", count: Object.keys(env).length };
  } else {
    const env = dotenv.parse(fileContent);
    const encrypted: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(env)) {
      const result = await client.encrypt(value, {
        table: schema,
        column: schema.value,
      });

      if (result.failure) {
        throw new Error(`Failed to encrypt ${key}: ${result.failure.message}`);
      }

      encrypted[key] = result.data;
    }

    try {
      fs.writeFileSync(outputPath, JSON.stringify(encrypted, null, 2) + "\n");
    } catch (err) {
      throw new Error(`Failed to write output file ${outputPath}: ${err instanceof Error ? err.message : String(err)}`);
    }
    return { mode: "vars", count: Object.keys(encrypted).length };
  }
}
