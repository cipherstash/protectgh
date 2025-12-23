import * as core from "@actions/core";
import { decryptSecrets } from "./decrypt";
import {
  validateEnvVars,
  writeToGitHubEnv,
  getBootstrapSecrets,
} from "./utils";

async function run(): Promise<void> {
  try {
    // Validate required environment variables
    const missing = validateEnvVars();
    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variable(s): ${missing.join(", ")}`
      );
    }

    // Get input
    const secretsFile = core.getInput("secrets-file");
    core.info(`Decrypting secrets from: ${secretsFile}`);

    // Decrypt
    const result = await decryptSecrets(secretsFile);
    core.info(`Detected ${result.mode} mode encryption`);

    // Combine decrypted secrets with bootstrap secrets
    const allSecrets = {
      ...result.secrets,
      ...getBootstrapSecrets(),
    };

    // Write to GITHUB_ENV
    const githubEnvPath = process.env.GITHUB_ENV;
    if (!githubEnvPath) {
      throw new Error("GITHUB_ENV not set - are you running in GitHub Actions?");
    }

    writeToGitHubEnv(allSecrets, githubEnvPath);

    const totalCount = Object.keys(allSecrets).length;
    core.info(`Exported ${totalCount} secrets to GITHUB_ENV`);
    core.setOutput("count", totalCount.toString());
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unexpected error occurred");
    }
  }
}

run();
