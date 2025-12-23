import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import * as fs from "fs";
import * as path from "path";
import {
  isFileMode,
  validateEnvVars,
  writeToGitHubEnv,
  getBootstrapSecrets,
  BOOTSTRAP_SECRETS,
} from "./utils";

// Load fixtures
const fixturesDir = path.join(__dirname, "fixtures");
const fileModeFixture = JSON.parse(
  fs.readFileSync(path.join(fixturesDir, "file-mode.json"), "utf-8")
);
const varsModeFixture = JSON.parse(
  fs.readFileSync(path.join(fixturesDir, "vars-mode.json"), "utf-8")
);

describe("isFileMode", () => {
  it("returns true for file-mode encrypted data", () => {
    assert.strictEqual(isFileMode(fileModeFixture), true);
  });

  it("returns false for vars-mode encrypted data", () => {
    assert.strictEqual(isFileMode(varsModeFixture), false);
  });

  it("returns false for null", () => {
    assert.strictEqual(isFileMode(null), false);
  });

  it("returns false for non-object", () => {
    assert.strictEqual(isFileMode("string"), false);
    assert.strictEqual(isFileMode(123), false);
  });

  it("returns false for object missing k key", () => {
    assert.strictEqual(isFileMode({ c: "value" }), false);
  });

  it("returns false for object missing c key", () => {
    assert.strictEqual(isFileMode({ k: "value" }), false);
  });
});

describe("validateEnvVars", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Clear all bootstrap secrets
    for (const key of BOOTSTRAP_SECRETS) {
      delete process.env[key];
    }
  });

  afterEach(() => {
    // Restore original env
    process.env = { ...originalEnv };
  });

  it("returns all missing vars when none are set", () => {
    const missing = validateEnvVars();
    assert.deepStrictEqual(missing, [...BOOTSTRAP_SECRETS]);
  });

  it("returns empty array when all vars are set", () => {
    for (const key of BOOTSTRAP_SECRETS) {
      process.env[key] = "test-value";
    }
    const missing = validateEnvVars();
    assert.deepStrictEqual(missing, []);
  });

  it("returns only the missing vars", () => {
    process.env.CS_CLIENT_ID = "test";
    process.env.CS_CLIENT_KEY = "test";
    const missing = validateEnvVars();
    assert.deepStrictEqual(missing, ["CS_CLIENT_ACCESS_KEY", "CS_WORKSPACE_CRN"]);
  });
});

describe("getBootstrapSecrets", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    for (const key of BOOTSTRAP_SECRETS) {
      delete process.env[key];
    }
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns empty object when no vars are set", () => {
    const secrets = getBootstrapSecrets();
    assert.deepStrictEqual(secrets, {});
  });

  it("returns only set vars", () => {
    process.env.CS_CLIENT_ID = "id-value";
    process.env.CS_CLIENT_KEY = "key-value";
    const secrets = getBootstrapSecrets();
    assert.deepStrictEqual(secrets, {
      CS_CLIENT_ID: "id-value",
      CS_CLIENT_KEY: "key-value",
    });
  });
});

describe("writeToGitHubEnv", () => {
  const testEnvFile = "/tmp/test-github-env";

  beforeEach(() => {
    if (fs.existsSync(testEnvFile)) {
      fs.unlinkSync(testEnvFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testEnvFile)) {
      fs.unlinkSync(testEnvFile);
    }
  });

  it("writes secrets in heredoc format", () => {
    writeToGitHubEnv({ API_KEY: "secret123" }, testEnvFile);
    const content = fs.readFileSync(testEnvFile, "utf-8");

    // Should contain key, delimiter, value, delimiter pattern
    assert.ok(content.includes("API_KEY<<EOF_API_KEY_"));
    assert.ok(content.includes("secret123"));
  });

  it("handles multiline values", () => {
    writeToGitHubEnv({ MULTILINE: "line1\nline2\nline3" }, testEnvFile);
    const content = fs.readFileSync(testEnvFile, "utf-8");

    assert.ok(content.includes("line1\nline2\nline3"));
  });

  it("appends multiple secrets", () => {
    writeToGitHubEnv({ KEY1: "val1", KEY2: "val2" }, testEnvFile);
    const content = fs.readFileSync(testEnvFile, "utf-8");

    assert.ok(content.includes("KEY1<<EOF_KEY1_"));
    assert.ok(content.includes("KEY2<<EOF_KEY2_"));
  });
});
