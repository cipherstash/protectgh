#!/usr/bin/env node

import { decryptSecrets } from "./decrypt";
import { encryptSecrets, EncryptMode } from "./encrypt";
import { validateEnvVars, BOOTSTRAP_SECRETS } from "./utils";

const DEFAULT_PLAINTEXT = ".github/secrets.env.plaintext";
const DEFAULT_ENCRYPTED = ".github/secrets.env.encrypted";

interface CliArgs {
  command: "encrypt" | "decrypt" | "help";
  input: string;
  output: string;
  mode: EncryptMode;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const rawCommand = args[0];

  if (!rawCommand || rawCommand === "help" || rawCommand === "--help" || rawCommand === "-h") {
    return { command: "help", input: "", output: "", mode: "file" };
  }

  const command = rawCommand as "encrypt" | "decrypt";

  if (command !== "encrypt" && command !== "decrypt") {
    console.error(`Unknown command: ${command}`);
    console.error('Usage: secrets-action <encrypt|decrypt> [options]');
    process.exit(1);
  }

  let input = command === "encrypt" ? DEFAULT_PLAINTEXT : DEFAULT_ENCRYPTED;
  let output = DEFAULT_ENCRYPTED;
  let mode: EncryptMode = "file";

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--input" || arg === "-i") {
      input = args[++i];
    } else if (arg === "--output" || arg === "-o") {
      output = args[++i];
    } else if (arg === "--vars") {
      mode = "vars";
    } else if (arg === "--file") {
      mode = "file";
    }
  }

  return { command, input, output, mode };
}

function printHelp(): void {
  console.log(`
secrets-action - CipherStash secrets encryption for GitHub Actions

USAGE:
  secrets-action encrypt [options]    Encrypt plaintext secrets file
  secrets-action decrypt [options]    Decrypt secrets to stdout (for testing)

OPTIONS:
  --input, -i <file>    Input file path
                        encrypt default: ${DEFAULT_PLAINTEXT}
                        decrypt default: ${DEFAULT_ENCRYPTED}
  --output, -o <file>   Output file path (encrypt only)
                        default: ${DEFAULT_ENCRYPTED}
  --vars                Encrypt each variable individually
  --file                Encrypt entire file as single blob (default)

ENVIRONMENT:
  Required for both encrypt and decrypt:
    CS_CLIENT_ID
    CS_CLIENT_KEY
    CS_CLIENT_ACCESS_KEY
    CS_WORKSPACE_CRN

EXAMPLES:
  secrets-action encrypt
  secrets-action encrypt --vars
  secrets-action encrypt --input secrets.env --output secrets.encrypted
  secrets-action decrypt
`);
}

async function main(): Promise<void> {
  const args = parseArgs();

  if (args.command === "help") {
    printHelp();
    return;
  }

  // Validate environment
  const missing = validateEnvVars();
  if (missing.length > 0) {
    console.error(`Missing required environment variable(s): ${missing.join(", ")}`);
    process.exit(1);
  }

  if (args.command === "encrypt") {
    console.error(`Encrypting ${args.input} -> ${args.output} (${args.mode} mode)`);
    const result = await encryptSecrets(args.input, args.output, args.mode);
    console.error(`Encrypted ${result.count} secrets (${result.mode} mode)`);
  } else {
    console.error(`Decrypting ${args.input}`);
    const result = await decryptSecrets(args.input);
    console.error(`Detected ${result.mode} mode (${result.count} secrets)`);

    // Output to stdout (excluding bootstrap secrets which are already in env)
    for (const [key, value] of Object.entries(result.secrets)) {
      if (!BOOTSTRAP_SECRETS.includes(key as typeof BOOTSTRAP_SECRETS[number])) {
        console.log(`${key}=${value}`);
      }
    }
  }
}

main().catch((error) => {
  console.error("Error:", error instanceof Error ? error.message : error);
  process.exit(1);
});
