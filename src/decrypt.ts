import { protect, csTable, csColumn, Encrypted } from "@cipherstash/protect";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { isFileMode } from "./utils";

const schema = csTable("ci_secrets", {
  value: csColumn("value"),
});

export interface DecryptResult {
  secrets: Record<string, string>;
  mode: "file" | "vars";
  count: number;
}

/**
 * Decrypt secrets from an encrypted file.
 * Auto-detects file mode (single blob) vs vars mode (per-variable).
 */
export async function decryptSecrets(filePath: string): Promise<DecryptResult> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Encrypted secrets file not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  let encrypted: unknown;

  try {
    encrypted = JSON.parse(fileContent);
  } catch {
    throw new Error("Invalid encrypted file format - expected JSON");
  }

  const client = await protect({ schemas: [schema] });
  let secrets: Record<string, string>;
  let mode: "file" | "vars";

  if (isFileMode(encrypted)) {
    mode = "file";
    const result = await client.decrypt(encrypted);
    if (result.failure) {
      throw new Error(`Failed to decrypt: ${result.failure.message}`);
    }
    secrets = dotenv.parse(String(result.data));
  } else {
    mode = "vars";
    secrets = {};
    const encryptedVars = encrypted as Record<string, Encrypted>;

    for (const [key, payload] of Object.entries(encryptedVars)) {
      const result = await client.decrypt(payload);
      if (result.failure) {
        throw new Error(`Failed to decrypt ${key}: ${result.failure.message}`);
      }
      secrets[key] = String(result.data);
    }
  }

  return {
    secrets,
    mode,
    count: Object.keys(secrets).length,
  };
}
