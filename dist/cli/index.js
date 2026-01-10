#!/usr/bin/env node
require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 546:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = require(__nccwpck_require__.ab + "index.node")

/***/ }),

/***/ 36:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = require(__nccwpck_require__.ab + "index2.node")

/***/ }),

/***/ 306:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = require(__nccwpck_require__.ab + "index1.node")

/***/ }),

/***/ 728:
/***/ ((module) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/result.ts
var result_exports = {};
__export(result_exports, {
  withResult: () => withResult
});
module.exports = __toCommonJS(result_exports);
function ensureError(ex) {
  return ex instanceof Error ? ex : new Error("Something went wrong");
}
async function withResult(operation, onError, hooks) {
  try {
    return { data: await operation() };
  } catch (ex) {
    const error = hooks?.onException?.(ex) ?? ensureError(ex);
    return { failure: onError(error) };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 802:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = exports.BX = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = void 0;
function currentPlatform() {
    let os = null;
    switch (process.platform) {
        case 'android':
            switch (process.arch) {
                case 'arm':
                    return 'android-arm-eabi';
                case 'arm64':
                    return 'android-arm64';
            }
            os = 'Android';
            break;
        case 'win32':
            switch (process.arch) {
                case 'x64':
                    return 'win32-x64-msvc';
                case 'arm64':
                    return 'win32-arm64-msvc';
                case 'ia32':
                    return 'win32-ia32-msvc';
            }
            os = 'Windows';
            break;
        case 'darwin':
            switch (process.arch) {
                case 'x64':
                    return 'darwin-x64';
                case 'arm64':
                    return 'darwin-arm64';
            }
            os = 'macOS';
            break;
        case 'linux':
            switch (process.arch) {
                case 'x64':
                case 'arm64':
                    return isGlibc()
                        ? `linux-${process.arch}-gnu`
                        : `linux-${process.arch}-musl`;
                case 'arm':
                    return 'linux-arm-gnueabihf';
            }
            os = 'Linux';
            break;
        case 'freebsd':
            if (process.arch === 'x64') {
                return 'freebsd-x64';
            }
            os = 'FreeBSD';
            break;
    }
    if (os) {
        throw new Error(`Neon: unsupported ${os} architecture: ${process.arch}`);
    }
    throw new Error(`Neon: unsupported system: ${process.platform}`);
}
__webpack_unused_export__ = currentPlatform;
// DEPRECATE(0.1)
function currentTarget() {
    return currentPlatform();
}
__webpack_unused_export__ = currentTarget;
function isGlibc() {
    // Cast to unknown to work around a bug in the type definition:
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/40140
    const report = process.report?.getReport();
    if ((typeof report !== 'object') || !report || (!('header' in report))) {
        return false;
    }
    const header = report.header;
    return (typeof header === 'object') &&
        !!header &&
        ('glibcVersionRuntime' in header);
}
// export function debug(...components: string[]) {
//   if (components.length === 0 || !components[components.length - 1].endsWith(".node")) {
//     components.push("index.node");
//   }
//   const pathSpec = path.join(...components);
//   return fs.existsSync(pathSpec) ? require(pathSpec) : null;
// }
function* interleave(a1, a2) {
    const length = Math.max(a1.length, a2.length);
    for (let i = 0; i < length; i++) {
        if (i < a1.length) {
            yield a1[i];
        }
        if (i < a2.length) {
            yield a2[i];
        }
    }
}
function bin(scope, ...rest) {
    return [...interleave(scope, rest)].join("") + "/" + currentPlatform();
}
__webpack_unused_export__ = bin;
// DEPRECATE(0.1)
function lazyV1(loaders, exports) {
    return lazyV2({
        targets: loaders,
        exports
    });
}
// DEPRECATE(0.1)
function lazyV2(options) {
    return lazyV3({
        platforms: options.targets,
        exports: options.exports,
        debug: options.debug
    });
}
function lazyV3(options) {
    const loaders = options.platforms;
    let loaded = null;
    function load() {
        if (loaded) {
            return loaded;
        }
        const platform = currentPlatform();
        if (!loaders.hasOwnProperty(platform)) {
            throw new Error(`no precompiled module found for ${platform}`);
        }
        if (options.debug) {
            try {
                loaded = options.debug();
            }
            catch (_e) {
                loaded = null;
            }
        }
        if (!loaded) {
            loaded = loaders[platform]();
        }
        return loaded;
    }
    let module = {};
    for (const key of options.exports) {
        Object.defineProperty(module, key, { get() { return load()[key]; } });
    }
    return module;
}
function lazy(optionsOrLoaders, exports) {
    return (!exports && !('targets' in optionsOrLoaders))
        ? lazyV3(optionsOrLoaders)
        : !exports
            ? lazyV2(optionsOrLoaders)
            : lazyV1(optionsOrLoaders, exports);
}
__webpack_unused_export__ = lazy;
function __UNSTABLE_loader(loaders) {
    const platform = currentPlatform();
    if (!loaders.hasOwnProperty(platform)) {
        throw new Error(`no precompiled module found for ${platform}`);
    }
    const loader = loaders[platform];
    let loaded = null;
    return () => {
        if (loaded) {
            return loaded;
        }
        loaded = loader();
        return loaded;
    };
}
__webpack_unused_export__ = __UNSTABLE_loader;
// DEPRECATE(0.1)
function isDeprecatedProxyOptions(options) {
    return 'targets' in options;
}
function isProxyOptions(options) {
    return 'platforms' in options;
}
function proxy(options) {
    const opts = isProxyOptions(options)
        ? options
        : !isDeprecatedProxyOptions(options)
            ? { platforms: options }
            : { platforms: options.targets, debug: options.debug };
    const platform = currentPlatform();
    const loaders = opts.platforms;
    if (!loaders.hasOwnProperty(platform)) {
        throw new Error(`no precompiled module found for ${platform}`);
    }
    const loader = loaders[platform];
    let loaded = null;
    function load() {
        if (!loaded) {
            if (options.debug) {
                try {
                    loaded = options.debug();
                }
                catch (_e) {
                    loaded = null;
                }
            }
            if (!loaded) {
                loaded = loader();
            }
        }
        return loaded;
    }
    const handler = {
        has(_target, key) {
            return Reflect.has(load(), key);
        },
        get(_target, key) {
            return Reflect.get(load(), key);
        },
        ownKeys(_target) {
            return Reflect.ownKeys(load());
        },
        defineProperty(_target, _key, _descriptor) {
            throw new Error('attempt to modify read-only Neon module proxy');
        },
        deleteProperty(_target, _key) {
            throw new Error('attempt to modify read-only Neon module proxy');
        },
        set(_target, _key, _val) {
            throw new Error('attempt to modify read-only Neon module proxy');
        },
        setPrototypeOf(_target, _proto) {
            throw new Error('attempt to modify read-only Neon module proxy');
        },
        getPrototypeOf(_target) {
            return Object.getPrototypeOf(load());
        },
        isExtensible(_target) {
            return Reflect.isExtensible(load());
        },
        preventExtensions(_target) {
            return Reflect.preventExtensions(load());
        },
        getOwnPropertyDescriptor(_target, key) {
            return Reflect.getOwnPropertyDescriptor(load(), key);
        }
    };
    return new Proxy({}, handler);
}
exports.BX = proxy;
// DEPRECATE(0.1)
function __UNSTABLE_proxy(options) {
    return proxy(options);
}
__webpack_unused_export__ = __UNSTABLE_proxy;


/***/ }),

/***/ 889:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(896)
const path = __nccwpck_require__(928)
const os = __nccwpck_require__(857)
const crypto = __nccwpck_require__(982)
const packageJson = __nccwpck_require__(56)

const version = packageJson.version

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg

// Parse src into an Object
function parse (src) {
  const obj = {}

  // Convert buffer to string
  let lines = src.toString()

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/mg, '\n')

  let match
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1]

    // Default undefined or null to empty string
    let value = (match[2] || '')

    // Remove whitespace
    value = value.trim()

    // Check if double quoted
    const maybeQuote = value[0]

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2')

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n')
      value = value.replace(/\\r/g, '\r')
    }

    // Add to object
    obj[key] = value
  }

  return obj
}

function _parseVault (options) {
  options = options || {}

  const vaultPath = _vaultPath(options)
  options.path = vaultPath // parse .env.vault
  const result = DotenvModule.configDotenv(options)
  if (!result.parsed) {
    const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`)
    err.code = 'MISSING_DATA'
    throw err
  }

  // handle scenario for comma separated keys - for use with key rotation
  // example: DOTENV_KEY="dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=prod,dotenv://:key_7890@dotenvx.com/vault/.env.vault?environment=prod"
  const keys = _dotenvKey(options).split(',')
  const length = keys.length

  let decrypted
  for (let i = 0; i < length; i++) {
    try {
      // Get full key
      const key = keys[i].trim()

      // Get instructions for decrypt
      const attrs = _instructions(result, key)

      // Decrypt
      decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key)

      break
    } catch (error) {
      // last key
      if (i + 1 >= length) {
        throw error
      }
      // try next key
    }
  }

  // Parse decrypted .env string
  return DotenvModule.parse(decrypted)
}

function _warn (message) {
  console.log(`[dotenv@${version}][WARN] ${message}`)
}

function _debug (message) {
  console.log(`[dotenv@${version}][DEBUG] ${message}`)
}

function _log (message) {
  console.log(`[dotenv@${version}] ${message}`)
}

function _dotenvKey (options) {
  // prioritize developer directly setting options.DOTENV_KEY
  if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
    return options.DOTENV_KEY
  }

  // secondary infra already contains a DOTENV_KEY environment variable
  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
    return process.env.DOTENV_KEY
  }

  // fallback to empty string
  return ''
}

function _instructions (result, dotenvKey) {
  // Parse DOTENV_KEY. Format is a URI
  let uri
  try {
    uri = new URL(dotenvKey)
  } catch (error) {
    if (error.code === 'ERR_INVALID_URL') {
      const err = new Error('INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development')
      err.code = 'INVALID_DOTENV_KEY'
      throw err
    }

    throw error
  }

  // Get decrypt key
  const key = uri.password
  if (!key) {
    const err = new Error('INVALID_DOTENV_KEY: Missing key part')
    err.code = 'INVALID_DOTENV_KEY'
    throw err
  }

  // Get environment
  const environment = uri.searchParams.get('environment')
  if (!environment) {
    const err = new Error('INVALID_DOTENV_KEY: Missing environment part')
    err.code = 'INVALID_DOTENV_KEY'
    throw err
  }

  // Get ciphertext payload
  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`
  const ciphertext = result.parsed[environmentKey] // DOTENV_VAULT_PRODUCTION
  if (!ciphertext) {
    const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`)
    err.code = 'NOT_FOUND_DOTENV_ENVIRONMENT'
    throw err
  }

  return { ciphertext, key }
}

function _vaultPath (options) {
  let possibleVaultPath = null

  if (options && options.path && options.path.length > 0) {
    if (Array.isArray(options.path)) {
      for (const filepath of options.path) {
        if (fs.existsSync(filepath)) {
          possibleVaultPath = filepath.endsWith('.vault') ? filepath : `${filepath}.vault`
        }
      }
    } else {
      possibleVaultPath = options.path.endsWith('.vault') ? options.path : `${options.path}.vault`
    }
  } else {
    possibleVaultPath = path.resolve(process.cwd(), '.env.vault')
  }

  if (fs.existsSync(possibleVaultPath)) {
    return possibleVaultPath
  }

  return null
}

function _resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

function _configVault (options) {
  const debug = Boolean(options && options.debug)
  const quiet = options && 'quiet' in options ? options.quiet : true

  if (debug || !quiet) {
    _log('Loading env from encrypted .env.vault')
  }

  const parsed = DotenvModule._parseVault(options)

  let processEnv = process.env
  if (options && options.processEnv != null) {
    processEnv = options.processEnv
  }

  DotenvModule.populate(processEnv, parsed, options)

  return { parsed }
}

function configDotenv (options) {
  const dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding = 'utf8'
  const debug = Boolean(options && options.debug)
  const quiet = options && 'quiet' in options ? options.quiet : true

  if (options && options.encoding) {
    encoding = options.encoding
  } else {
    if (debug) {
      _debug('No encoding is specified. UTF-8 is used by default')
    }
  }

  let optionPaths = [dotenvPath] // default, look for .env
  if (options && options.path) {
    if (!Array.isArray(options.path)) {
      optionPaths = [_resolveHome(options.path)]
    } else {
      optionPaths = [] // reset default
      for (const filepath of options.path) {
        optionPaths.push(_resolveHome(filepath))
      }
    }
  }

  // Build the parsed data in a temporary object (because we need to return it).  Once we have the final
  // parsed data, we will combine it with process.env (or options.processEnv if provided).
  let lastError
  const parsedAll = {}
  for (const path of optionPaths) {
    try {
      // Specifying an encoding returns a string instead of a buffer
      const parsed = DotenvModule.parse(fs.readFileSync(path, { encoding }))

      DotenvModule.populate(parsedAll, parsed, options)
    } catch (e) {
      if (debug) {
        _debug(`Failed to load ${path} ${e.message}`)
      }
      lastError = e
    }
  }

  let processEnv = process.env
  if (options && options.processEnv != null) {
    processEnv = options.processEnv
  }

  DotenvModule.populate(processEnv, parsedAll, options)

  if (debug || !quiet) {
    const keysCount = Object.keys(parsedAll).length
    const shortPaths = []
    for (const filePath of optionPaths) {
      try {
        const relative = path.relative(process.cwd(), filePath)
        shortPaths.push(relative)
      } catch (e) {
        if (debug) {
          _debug(`Failed to load ${filePath} ${e.message}`)
        }
        lastError = e
      }
    }

    _log(`injecting env (${keysCount}) from ${shortPaths.join(',')}`)
  }

  if (lastError) {
    return { parsed: parsedAll, error: lastError }
  } else {
    return { parsed: parsedAll }
  }
}

// Populates process.env from .env file
function config (options) {
  // fallback to original dotenv if DOTENV_KEY is not set
  if (_dotenvKey(options).length === 0) {
    return DotenvModule.configDotenv(options)
  }

  const vaultPath = _vaultPath(options)

  // dotenvKey exists but .env.vault file does not exist
  if (!vaultPath) {
    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`)

    return DotenvModule.configDotenv(options)
  }

  return DotenvModule._configVault(options)
}

function decrypt (encrypted, keyStr) {
  const key = Buffer.from(keyStr.slice(-64), 'hex')
  let ciphertext = Buffer.from(encrypted, 'base64')

  const nonce = ciphertext.subarray(0, 12)
  const authTag = ciphertext.subarray(-16)
  ciphertext = ciphertext.subarray(12, -16)

  try {
    const aesgcm = crypto.createDecipheriv('aes-256-gcm', key, nonce)
    aesgcm.setAuthTag(authTag)
    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`
  } catch (error) {
    const isRange = error instanceof RangeError
    const invalidKeyLength = error.message === 'Invalid key length'
    const decryptionFailed = error.message === 'Unsupported state or unable to authenticate data'

    if (isRange || invalidKeyLength) {
      const err = new Error('INVALID_DOTENV_KEY: It must be 64 characters long (or more)')
      err.code = 'INVALID_DOTENV_KEY'
      throw err
    } else if (decryptionFailed) {
      const err = new Error('DECRYPTION_FAILED: Please check your DOTENV_KEY')
      err.code = 'DECRYPTION_FAILED'
      throw err
    } else {
      throw error
    }
  }
}

// Populate process.env with parsed values
function populate (processEnv, parsed, options = {}) {
  const debug = Boolean(options && options.debug)
  const override = Boolean(options && options.override)

  if (typeof parsed !== 'object') {
    const err = new Error('OBJECT_REQUIRED: Please check the processEnv argument being passed to populate')
    err.code = 'OBJECT_REQUIRED'
    throw err
  }

  // Set process.env
  for (const key of Object.keys(parsed)) {
    if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
      if (override === true) {
        processEnv[key] = parsed[key]
      }

      if (debug) {
        if (override === true) {
          _debug(`"${key}" is already defined and WAS overwritten`)
        } else {
          _debug(`"${key}" is already defined and was NOT overwritten`)
        }
      }
    } else {
      processEnv[key] = parsed[key]
    }
  }
}

const DotenvModule = {
  configDotenv,
  _configVault,
  _parseVault,
  config,
  decrypt,
  parse,
  populate
}

module.exports.configDotenv = DotenvModule.configDotenv
module.exports._configVault = DotenvModule._configVault
module.exports._parseVault = DotenvModule._parseVault
module.exports.config = DotenvModule.config
module.exports.decrypt = DotenvModule.decrypt
module.exports.parse = DotenvModule.parse
module.exports.populate = DotenvModule.populate

module.exports = DotenvModule


/***/ }),

/***/ 550:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decryptSecrets = decryptSecrets;
const protect_1 = __nccwpck_require__(292);
const fs = __importStar(__nccwpck_require__(896));
const dotenv = __importStar(__nccwpck_require__(889));
const utils_1 = __nccwpck_require__(798);
const schema = (0, protect_1.csTable)("ci_secrets", {
    value: (0, protect_1.csColumn)("value"),
});
/**
 * Decrypt secrets from an encrypted file.
 * Auto-detects file mode (single blob) vs vars mode (per-variable).
 */
async function decryptSecrets(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`Encrypted secrets file not found: ${filePath}`);
    }
    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, "utf-8");
    }
    catch (err) {
        throw new Error(`Failed to read encrypted file ${filePath}: ${err instanceof Error ? err.message : String(err)}`);
    }
    let encrypted;
    try {
        encrypted = JSON.parse(fileContent);
    }
    catch {
        throw new Error("Invalid encrypted file format - expected JSON");
    }
    const client = await (0, protect_1.protect)({ schemas: [schema] });
    let secrets;
    let mode;
    if ((0, utils_1.isFileMode)(encrypted)) {
        mode = "file";
        const result = await client.decrypt(encrypted);
        if (result.failure) {
            throw new Error(`Failed to decrypt: ${result.failure.message}`);
        }
        secrets = dotenv.parse(String(result.data));
    }
    else {
        mode = "vars";
        secrets = {};
        const encryptedVars = encrypted;
        for (const [key, payload] of Object.entries(encryptedVars)) {
            if (!(0, utils_1.isFileMode)(payload)) {
                throw new Error(`Invalid encrypted payload for key: ${key}`);
            }
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


/***/ }),

/***/ 706:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.encryptSecrets = encryptSecrets;
const protect_1 = __nccwpck_require__(292);
const fs = __importStar(__nccwpck_require__(896));
const dotenv = __importStar(__nccwpck_require__(889));
const schema = (0, protect_1.csTable)("ci_secrets", {
    value: (0, protect_1.csColumn)("value"),
});
/**
 * Encrypt secrets from a plaintext .env file.
 *
 * @param inputPath - Path to plaintext .env file
 * @param outputPath - Path to write encrypted JSON
 * @param mode - "file" encrypts entire file as blob, "vars" encrypts each variable
 */
async function encryptSecrets(inputPath, outputPath, mode = "file") {
    if (!fs.existsSync(inputPath)) {
        throw new Error(`Plaintext secrets file not found: ${inputPath}`);
    }
    let fileContent;
    try {
        fileContent = fs.readFileSync(inputPath, "utf-8");
    }
    catch (err) {
        throw new Error(`Failed to read input file ${inputPath}: ${err instanceof Error ? err.message : String(err)}`);
    }
    const client = await (0, protect_1.protect)({ schemas: [schema] });
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
        }
        catch (err) {
            throw new Error(`Failed to write output file ${outputPath}: ${err instanceof Error ? err.message : String(err)}`);
        }
        // Count lines that look like KEY=value
        const env = dotenv.parse(fileContent);
        return { mode: "file", count: Object.keys(env).length };
    }
    else {
        const env = dotenv.parse(fileContent);
        const encrypted = {};
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
        }
        catch (err) {
            throw new Error(`Failed to write output file ${outputPath}: ${err instanceof Error ? err.message : String(err)}`);
        }
        return { mode: "vars", count: Object.keys(encrypted).length };
    }
}


/***/ }),

/***/ 798:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BOOTSTRAP_SECRETS = void 0;
exports.isFileMode = isFileMode;
exports.validateEnvVars = validateEnvVars;
exports.writeToGitHubEnv = writeToGitHubEnv;
exports.getBootstrapSecrets = getBootstrapSecrets;
const fs = __importStar(__nccwpck_require__(896));
/**
 * Bootstrap secrets required for ZeroKMS authentication.
 * These are passed via environment variables and forwarded to $GITHUB_ENV.
 */
exports.BOOTSTRAP_SECRETS = [
    "CS_CLIENT_ID",
    "CS_CLIENT_KEY",
    "CS_CLIENT_ACCESS_KEY",
    "CS_WORKSPACE_CRN",
];
/**
 * Detect if encrypted data is in file mode (single blob) or vars mode (per-variable).
 * File mode has `k` and `c` keys at root level.
 */
function isFileMode(data) {
    return data !== null && typeof data === "object" && "k" in data && "c" in data;
}
/**
 * Validate that all required bootstrap environment variables are present.
 * Returns list of missing variables, or empty array if all present.
 */
function validateEnvVars() {
    const missing = [];
    for (const key of exports.BOOTSTRAP_SECRETS) {
        if (!process.env[key]) {
            missing.push(key);
        }
    }
    return missing;
}
/**
 * Write secrets to $GITHUB_ENV file using heredoc syntax for multiline support.
 */
function writeToGitHubEnv(secrets, githubEnvPath) {
    for (const [key, value] of Object.entries(secrets)) {
        const delimiter = `EOF_${key}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        try {
            fs.appendFileSync(githubEnvPath, `${key}<<${delimiter}\n${value}\n${delimiter}\n`);
        }
        catch (err) {
            throw new Error(`Failed to write to GITHUB_ENV (${githubEnvPath}): ${err instanceof Error ? err.message : String(err)}`);
        }
    }
}
/**
 * Get bootstrap secrets from environment and return as key-value pairs.
 */
function getBootstrapSecrets() {
    const secrets = {};
    for (const key of exports.BOOTSTRAP_SECRETS) {
        const value = process.env[key];
        if (value) {
            secrets[key] = value;
        }
    }
    return secrets;
}


/***/ }),

/***/ 378:
/***/ ((module) => {

module.exports = eval("require")("../index.node");


/***/ }),

/***/ 848:
/***/ ((module) => {

module.exports = eval("require")("@cipherstash/protect-ffi-darwin-x64");


/***/ }),

/***/ 247:
/***/ ((module) => {

module.exports = eval("require")("@cipherstash/protect-ffi-linux-x64-musl");


/***/ }),

/***/ 456:
/***/ ((module) => {

module.exports = eval("require")("@cipherstash/protect-ffi-win32-x64-msvc");


/***/ }),

/***/ 982:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 857:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 313:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

// This module is the CJS entry point for the library.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decryptBulkFallible = exports.decryptBulk = exports.decrypt = exports.isEncrypted = exports.encryptBulk = exports.encrypt = exports.newClient = void 0;
var load_cjs_1 = __nccwpck_require__(755);
Object.defineProperty(exports, "newClient", ({ enumerable: true, get: function () { return load_cjs_1.newClient; } }));
Object.defineProperty(exports, "encrypt", ({ enumerable: true, get: function () { return load_cjs_1.encrypt; } }));
Object.defineProperty(exports, "encryptBulk", ({ enumerable: true, get: function () { return load_cjs_1.encryptBulk; } }));
Object.defineProperty(exports, "isEncrypted", ({ enumerable: true, get: function () { return load_cjs_1.isEncrypted; } }));
Object.defineProperty(exports, "decrypt", ({ enumerable: true, get: function () { return load_cjs_1.decrypt; } }));
Object.defineProperty(exports, "decryptBulk", ({ enumerable: true, get: function () { return load_cjs_1.decryptBulk; } }));
Object.defineProperty(exports, "decryptBulkFallible", ({ enumerable: true, get: function () { return load_cjs_1.decryptBulkFallible; } }));


/***/ }),

/***/ 755:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";

// This module loads the platform-specific build of the addon on
// the current system. The supported platforms are registered in
// the `platforms` object below, whose entries can be managed by
// by the Neon CLI:
//
//   https://www.npmjs.com/package/@neon-rs/cli
Object.defineProperty(exports, "__esModule", ({ value: true }));
module.exports = (__nccwpck_require__(802)/* .proxy */ .BX)({
    platforms: {
        'win32-x64-msvc': () => __nccwpck_require__(456),
        'darwin-x64': () => __nccwpck_require__(848),
        'darwin-arm64': () => __nccwpck_require__(546),
        'linux-x64-gnu': () => __nccwpck_require__(306),
        'linux-x64-musl': () => __nccwpck_require__(247),
        'linux-arm64-gnu': () => __nccwpck_require__(36),
    },
    debug: () => __nccwpck_require__(378),
});


/***/ }),

/***/ 292:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ProtectErrorTypes: () => ProtectErrorTypes,
  bulkModelsToEncryptedPgComposites: () => bulkModelsToEncryptedPgComposites,
  csColumn: () => import_schema3.csColumn,
  csTable: () => import_schema3.csTable,
  csValue: () => import_schema3.csValue,
  encryptedToPgComposite: () => encryptedToPgComposite,
  isEncryptedPayload: () => isEncryptedPayload,
  modelToEncryptedPgComposites: () => modelToEncryptedPgComposites,
  protect: () => protect,
  toFfiKeysetIdentifier: () => toFfiKeysetIdentifier
});
module.exports = __toCommonJS(index_exports);
var import_schema2 = __nccwpck_require__(646);

// src/ffi/index.ts
var import_result10 = __nccwpck_require__(728);
var import_protect_ffi7 = __nccwpck_require__(313);
var import_schema = __nccwpck_require__(646);

// ../utils/config/index.ts
var import_node_fs = __toESM(__nccwpck_require__(896));
var import_node_path = __toESM(__nccwpck_require__(928));
function getWorkspaceCrn(tomlString) {
  let currentSection = "";
  let workspaceCrn;
  const lines = tomlString.split(/\r?\n/);
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }
    const sectionMatch = trimmedLine.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1];
      continue;
    }
    const kvMatch = trimmedLine.match(/^(\w+)\s*=\s*"([^"]+)"$/);
    if (kvMatch) {
      const [_, key, value] = kvMatch;
      if (currentSection === "auth" && key === "workspace_crn") {
        workspaceCrn = value;
        break;
      }
    }
  }
  return workspaceCrn;
}
function extractWorkspaceIdFromCrn(crn) {
  const match = crn.match(/crn:[^:]+:([^:]+)$/);
  if (!match) {
    throw new Error("Invalid CRN format");
  }
  return match[1];
}
function loadWorkSpaceId(suppliedCrn) {
  const configPath = import_node_path.default.join(process.cwd(), "cipherstash.toml");
  if (suppliedCrn) {
    return extractWorkspaceIdFromCrn(suppliedCrn);
  }
  if (!import_node_fs.default.existsSync(configPath) && !process.env.CS_WORKSPACE_CRN) {
    throw new Error(
      "You have not defined a workspace CRN in your config file, or the CS_WORKSPACE_CRN environment variable."
    );
  }
  if (process.env.CS_WORKSPACE_CRN) {
    return extractWorkspaceIdFromCrn(process.env.CS_WORKSPACE_CRN);
  }
  if (!import_node_fs.default.existsSync(configPath)) {
    throw new Error(
      "You have not defined a workspace CRN in your config file, or the CS_WORKSPACE_CRN environment variable."
    );
  }
  const tomlString = import_node_fs.default.readFileSync(configPath, "utf8");
  const workspaceCrn = getWorkspaceCrn(tomlString);
  if (!workspaceCrn) {
    throw new Error(
      "You have not defined a workspace CRN in your config file, or the CS_WORKSPACE_CRN environment variable."
    );
  }
  return extractWorkspaceIdFromCrn(workspaceCrn);
}

// ../utils/logger/index.ts
function getLevelValue(level) {
  switch (level) {
    case "debug":
      return 10;
    case "info":
      return 20;
    case "error":
      return 30;
    default:
      return 30;
  }
}
var envLogLevel = process.env.PROTECT_LOG_LEVEL || "info";
var currentLevel = getLevelValue(envLogLevel);
function debug(...args) {
  if (currentLevel <= getLevelValue("debug")) {
    console.debug("[protect] DEBUG", ...args);
  }
}
function info(...args) {
  if (currentLevel <= getLevelValue("info")) {
    console.info("[protect] INFO", ...args);
  }
}
function error(...args) {
  if (currentLevel <= getLevelValue("error")) {
    console.error("[protect] ERROR", ...args);
  }
}
var logger = {
  debug,
  info,
  error
};

// src/helpers/index.ts
function encryptedToPgComposite(obj) {
  return {
    data: obj
  };
}
function modelToEncryptedPgComposites(model) {
  const result = {};
  for (const [key, value] of Object.entries(model)) {
    if (isEncryptedPayload(value)) {
      result[key] = encryptedToPgComposite(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}
function bulkModelsToEncryptedPgComposites(models) {
  return models.map((model) => modelToEncryptedPgComposites(model));
}
function toFfiKeysetIdentifier(keyset) {
  if (!keyset) return void 0;
  if ("name" in keyset) {
    return { Name: keyset.name };
  }
  return { Uuid: keyset.id };
}
function isEncryptedPayload(value) {
  if (value === null) return false;
  if (typeof value === "object") {
    const obj = value;
    return obj !== null && "v" in obj && ("c" in obj || "sv" in obj) && "i" in obj;
  }
  return false;
}

// src/ffi/operations/bulk-decrypt.ts
var import_result = __nccwpck_require__(728);
var import_protect_ffi = __nccwpck_require__(313);

// src/ffi/operations/base-operation.ts
var ProtectOperation = class {
  auditMetadata;
  /**
   * Attach audit metadata to this operation. Can be chained.
   * @param config Configuration for ZeroKMS audit logging
   * @param config.metadata Arbitrary JSON object for appending metadata to the audit log
   */
  audit(config) {
    this.auditMetadata = config.metadata;
    return this;
  }
  /**
   * Get the audit data for this operation.
   */
  getAuditData() {
    return {
      metadata: this.auditMetadata
    };
  }
  /**
   * Make the operation thenable
   */
  then(onfulfilled, onrejected) {
    return this.execute().then(onfulfilled, onrejected);
  }
};

// src/ffi/operations/bulk-decrypt.ts
var createDecryptPayloads = (encryptedPayloads, lockContext) => {
  return encryptedPayloads.map((item, index) => ({ ...item, originalIndex: index })).filter(({ data }) => data !== null).map(({ id, data, originalIndex }) => ({
    id,
    ciphertext: data,
    originalIndex,
    ...lockContext && { lockContext }
  }));
};
var createNullResult = (encryptedPayloads) => {
  return encryptedPayloads.map(({ id }) => ({
    id,
    data: null
  }));
};
var mapDecryptedDataToResult = (encryptedPayloads, decryptedData) => {
  const result = new Array(encryptedPayloads.length);
  let decryptedIndex = 0;
  for (let i = 0; i < encryptedPayloads.length; i++) {
    if (encryptedPayloads[i].data === null) {
      result[i] = { id: encryptedPayloads[i].id, data: null };
    } else {
      const decryptResult = decryptedData[decryptedIndex];
      if ("error" in decryptResult) {
        result[i] = {
          id: encryptedPayloads[i].id,
          error: decryptResult.error
        };
      } else {
        result[i] = {
          id: encryptedPayloads[i].id,
          data: decryptResult.data
        };
      }
      decryptedIndex++;
    }
  }
  return result;
};
var BulkDecryptOperation = class extends ProtectOperation {
  client;
  encryptedPayloads;
  constructor(client, encryptedPayloads) {
    super();
    this.client = client;
    this.encryptedPayloads = encryptedPayloads;
  }
  withLockContext(lockContext) {
    return new BulkDecryptOperationWithLockContext(this, lockContext);
  }
  async execute() {
    logger.debug("Bulk decrypting data WITHOUT a lock context");
    return await (0, import_result.withResult)(
      async () => {
        if (!this.client) throw noClientError();
        if (!this.encryptedPayloads || this.encryptedPayloads.length === 0)
          return [];
        const nonNullPayloads = createDecryptPayloads(this.encryptedPayloads);
        if (nonNullPayloads.length === 0) {
          return createNullResult(this.encryptedPayloads);
        }
        const { metadata } = this.getAuditData();
        const decryptedData = await (0, import_protect_ffi.decryptBulkFallible)(this.client, {
          ciphertexts: nonNullPayloads,
          unverifiedContext: metadata
        });
        return mapDecryptedDataToResult(this.encryptedPayloads, decryptedData);
      },
      (error2) => ({
        type: ProtectErrorTypes.DecryptionError,
        message: error2.message
      })
    );
  }
  getOperation() {
    return {
      client: this.client,
      encryptedPayloads: this.encryptedPayloads
    };
  }
};
var BulkDecryptOperationWithLockContext = class extends ProtectOperation {
  operation;
  lockContext;
  constructor(operation, lockContext) {
    super();
    this.operation = operation;
    this.lockContext = lockContext;
  }
  async execute() {
    return await (0, import_result.withResult)(
      async () => {
        const { client, encryptedPayloads } = this.operation.getOperation();
        logger.debug("Bulk decrypting data WITH a lock context");
        if (!client) throw noClientError();
        if (!encryptedPayloads || encryptedPayloads.length === 0) return [];
        const context = await this.lockContext.getLockContext();
        if (context.failure) {
          throw new Error(`[protect]: ${context.failure.message}`);
        }
        const nonNullPayloads = createDecryptPayloads(
          encryptedPayloads,
          context.data.context
        );
        if (nonNullPayloads.length === 0) {
          return createNullResult(encryptedPayloads);
        }
        const { metadata } = this.getAuditData();
        const decryptedData = await (0, import_protect_ffi.decryptBulkFallible)(client, {
          ciphertexts: nonNullPayloads,
          serviceToken: context.data.ctsToken,
          unverifiedContext: metadata
        });
        return mapDecryptedDataToResult(encryptedPayloads, decryptedData);
      },
      (error2) => ({
        type: ProtectErrorTypes.DecryptionError,
        message: error2.message
      })
    );
  }
};

// src/ffi/operations/bulk-decrypt-models.ts
var import_result2 = __nccwpck_require__(728);

// src/ffi/model-helpers.ts
var import_protect_ffi2 = __nccwpck_require__(313);
async function handleSingleModelBulkOperation(items, operation, keyMap) {
  if (items.length === 0) {
    return {};
  }
  const results = await operation(items);
  const mappedResults = {};
  results.forEach((result, index) => {
    const originalKey = keyMap[index.toString()];
    mappedResults[originalKey] = result;
  });
  return mappedResults;
}
async function handleMultiModelBulkOperation(items, operation, keyMap) {
  if (items.length === 0) {
    return {};
  }
  const results = await operation(items);
  const mappedResults = {};
  results.forEach((result, index) => {
    const key = index.toString();
    const { modelIndex, fieldKey } = keyMap[key];
    mappedResults[`${modelIndex}-${fieldKey}`] = result;
  });
  return mappedResults;
}
function prepareFieldsForDecryption(model) {
  const otherFields = { ...model };
  const operationFields = {};
  const nullFields = {};
  const keyMap = {};
  let index = 0;
  const processNestedFields = (obj, prefix = "") => {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (value === null || value === void 0) {
        nullFields[fullKey] = value;
        continue;
      }
      if (typeof value === "object" && !isEncryptedPayload(value)) {
        processNestedFields(value, fullKey);
      } else if (isEncryptedPayload(value)) {
        const id = index.toString();
        keyMap[id] = fullKey;
        operationFields[fullKey] = value;
        index++;
        const parts = fullKey.split(".");
        let current = otherFields;
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]];
        }
        delete current[parts[parts.length - 1]];
      }
    }
  };
  processNestedFields(model);
  return { otherFields, operationFields, keyMap, nullFields };
}
function prepareFieldsForEncryption(model, table) {
  const otherFields = { ...model };
  const operationFields = {};
  const nullFields = {};
  const keyMap = {};
  let index = 0;
  const processNestedFields = (obj, prefix = "", columnPaths2 = []) => {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (value === null || value === void 0) {
        nullFields[fullKey] = value;
        continue;
      }
      if (typeof value === "object" && !isEncryptedPayload(value) && !columnPaths2.includes(fullKey)) {
        if (columnPaths2.some((path2) => path2.startsWith(fullKey))) {
          processNestedFields(
            value,
            fullKey,
            columnPaths2
          );
        }
      } else if (columnPaths2.includes(fullKey)) {
        const id = index.toString();
        keyMap[id] = fullKey;
        operationFields[fullKey] = value;
        index++;
        const parts = fullKey.split(".");
        let current = otherFields;
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]];
        }
        delete current[parts[parts.length - 1]];
      }
    }
  };
  const columnPaths = Object.keys(table.build().columns);
  processNestedFields(model, "", columnPaths);
  return { otherFields, operationFields, keyMap, nullFields };
}
async function decryptModelFields(model, client, auditData) {
  if (!client) {
    throw new Error("Client not initialized");
  }
  const { otherFields, operationFields, keyMap, nullFields } = prepareFieldsForDecryption(model);
  const bulkDecryptPayload = Object.entries(operationFields).map(
    ([key, value]) => ({
      id: key,
      ciphertext: value
    })
  );
  const decryptedFields = await handleSingleModelBulkOperation(
    bulkDecryptPayload,
    (items) => (0, import_protect_ffi2.decryptBulk)(client, {
      ciphertexts: items,
      unverifiedContext: auditData?.metadata
    }),
    keyMap
  );
  const setNestedValue = (obj, path2, value) => {
    let current = obj;
    for (let i = 0; i < path2.length - 1; i++) {
      const part = path2[i];
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }
    current[path2[path2.length - 1]] = value;
  };
  const result = { ...otherFields };
  for (const [key, value] of Object.entries(nullFields)) {
    const parts = key.split(".");
    setNestedValue(result, parts, value);
  }
  for (const [key, value] of Object.entries(decryptedFields)) {
    const parts = key.split(".");
    setNestedValue(result, parts, value);
  }
  return result;
}
async function encryptModelFields(model, table, client, auditData) {
  if (!client) {
    throw new Error("Client not initialized");
  }
  const { otherFields, operationFields, keyMap, nullFields } = prepareFieldsForEncryption(model, table);
  const bulkEncryptPayload = Object.entries(operationFields).map(
    ([key, value]) => ({
      id: key,
      plaintext: value,
      table: table.tableName,
      column: key
    })
  );
  const encryptedData = await handleSingleModelBulkOperation(
    bulkEncryptPayload,
    (items) => (0, import_protect_ffi2.encryptBulk)(client, {
      plaintexts: items,
      unverifiedContext: auditData?.metadata
    }),
    keyMap
  );
  const setNestedValue = (obj, path2, value) => {
    let current = obj;
    for (let i = 0; i < path2.length - 1; i++) {
      const part = path2[i];
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }
    current[path2[path2.length - 1]] = value;
  };
  const result = { ...otherFields };
  for (const [key, value] of Object.entries(nullFields)) {
    const parts = key.split(".");
    setNestedValue(result, parts, value);
  }
  for (const [key, value] of Object.entries(encryptedData)) {
    const parts = key.split(".");
    setNestedValue(result, parts, value);
  }
  return result;
}
async function decryptModelFieldsWithLockContext(model, client, lockContext, auditData) {
  if (!client) {
    throw new Error("Client not initialized");
  }
  if (!lockContext) {
    throw new Error("Lock context is not initialized");
  }
  const { otherFields, operationFields, keyMap, nullFields } = prepareFieldsForDecryption(model);
  const bulkDecryptPayload = Object.entries(operationFields).map(
    ([key, value]) => ({
      id: key,
      ciphertext: value,
      lockContext: lockContext.context
    })
  );
  const decryptedFields = await handleSingleModelBulkOperation(
    bulkDecryptPayload,
    (items) => (0, import_protect_ffi2.decryptBulk)(client, {
      ciphertexts: items,
      serviceToken: lockContext.ctsToken,
      unverifiedContext: auditData?.metadata
    }),
    keyMap
  );
  const setNestedValue = (obj, path2, value) => {
    let current = obj;
    for (let i = 0; i < path2.length - 1; i++) {
      const part = path2[i];
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }
    current[path2[path2.length - 1]] = value;
  };
  const result = { ...otherFields };
  for (const [key, value] of Object.entries(nullFields)) {
    const parts = key.split(".");
    setNestedValue(result, parts, value);
  }
  for (const [key, value] of Object.entries(decryptedFields)) {
    const parts = key.split(".");
    setNestedValue(result, parts, value);
  }
  return result;
}
async function encryptModelFieldsWithLockContext(model, table, client, lockContext, auditData) {
  if (!client) {
    throw new Error("Client not initialized");
  }
  if (!lockContext) {
    throw new Error("Lock context is not initialized");
  }
  const { otherFields, operationFields, keyMap, nullFields } = prepareFieldsForEncryption(model, table);
  const bulkEncryptPayload = Object.entries(operationFields).map(
    ([key, value]) => ({
      id: key,
      plaintext: value,
      table: table.tableName,
      column: key,
      lockContext: lockContext.context
    })
  );
  const encryptedData = await handleSingleModelBulkOperation(
    bulkEncryptPayload,
    (items) => (0, import_protect_ffi2.encryptBulk)(client, {
      plaintexts: items,
      serviceToken: lockContext.ctsToken,
      unverifiedContext: auditData?.metadata
    }),
    keyMap
  );
  const setNestedValue = (obj, path2, value) => {
    let current = obj;
    for (let i = 0; i < path2.length - 1; i++) {
      const part = path2[i];
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }
    current[path2[path2.length - 1]] = value;
  };
  const result = { ...otherFields };
  for (const [key, value] of Object.entries(nullFields)) {
    const parts = key.split(".");
    setNestedValue(result, parts, value);
  }
  for (const [key, value] of Object.entries(encryptedData)) {
    const parts = key.split(".");
    setNestedValue(result, parts, value);
  }
  return result;
}
function prepareBulkModelsForOperation(models, table) {
  const otherFields = [];
  const operationFields = [];
  const nullFields = [];
  const keyMap = {};
  let index = 0;
  for (let modelIndex = 0; modelIndex < models.length; modelIndex++) {
    const model = models[modelIndex];
    const modelOtherFields = { ...model };
    const modelOperationFields = {};
    const modelNullFields = {};
    const processNestedFields = (obj, prefix = "", columnPaths = []) => {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (value === null || value === void 0) {
          modelNullFields[fullKey] = value;
          continue;
        }
        if (typeof value === "object" && !isEncryptedPayload(value) && !columnPaths.includes(fullKey)) {
          if (columnPaths.some((path2) => path2.startsWith(fullKey))) {
            processNestedFields(
              value,
              fullKey,
              columnPaths
            );
          }
        } else if (columnPaths.includes(fullKey)) {
          const id = index.toString();
          keyMap[id] = { modelIndex, fieldKey: fullKey };
          modelOperationFields[fullKey] = value;
          index++;
          const parts = fullKey.split(".");
          let current = modelOtherFields;
          for (let i = 0; i < parts.length - 1; i++) {
            current = current[parts[i]];
          }
          delete current[parts[parts.length - 1]];
        }
      }
    };
    if (table) {
      const columnPaths = Object.keys(table.build().columns);
      processNestedFields(model, "", columnPaths);
    } else {
      const processEncryptedFields = (obj, prefix = "", columnPaths = []) => {
        for (const [key, value] of Object.entries(obj)) {
          const fullKey = prefix ? `${prefix}.${key}` : key;
          if (value === null || value === void 0) {
            modelNullFields[fullKey] = value;
            continue;
          }
          if (typeof value === "object" && !isEncryptedPayload(value) && !columnPaths.includes(fullKey)) {
            processEncryptedFields(
              value,
              fullKey,
              columnPaths
            );
          } else if (isEncryptedPayload(value)) {
            const id = index.toString();
            keyMap[id] = { modelIndex, fieldKey: fullKey };
            modelOperationFields[fullKey] = value;
            index++;
            const parts = fullKey.split(".");
            let current = modelOtherFields;
            for (let i = 0; i < parts.length - 1; i++) {
              current = current[parts[i]];
            }
            delete current[parts[parts.length - 1]];
          }
        }
      };
      processEncryptedFields(model);
    }
    otherFields.push(modelOtherFields);
    operationFields.push(modelOperationFields);
    nullFields.push(modelNullFields);
  }
  return { otherFields, operationFields, keyMap, nullFields };
}
async function bulkEncryptModels(models, table, client, auditData) {
  if (!client) {
    throw new Error("Client not initialized");
  }
  if (!models || models.length === 0) {
    return [];
  }
  const { otherFields, operationFields, keyMap, nullFields } = prepareBulkModelsForOperation(models, table);
  const bulkEncryptPayload = operationFields.flatMap(
    (fields, modelIndex) => Object.entries(fields).map(([key, value]) => ({
      id: `${modelIndex}-${key}`,
      plaintext: value,
      table: table.tableName,
      column: key
    }))
  );
  const encryptedData = await handleMultiModelBulkOperation(
    bulkEncryptPayload,
    (items) => (0, import_protect_ffi2.encryptBulk)(client, {
      plaintexts: items,
      unverifiedContext: auditData?.metadata
    }),
    keyMap
  );
  const setNestedValue = (obj, path2, value) => {
    let current = obj;
    for (let i = 0; i < path2.length - 1; i++) {
      const part = path2[i];
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }
    current[path2[path2.length - 1]] = value;
  };
  return models.map((_, modelIndex) => {
    const result = { ...otherFields[modelIndex] };
    for (const [key, value] of Object.entries(nullFields[modelIndex])) {
      const parts = key.split(".");
      setNestedValue(result, parts, value);
    }
    const modelData = Object.fromEntries(
      Object.entries(encryptedData).filter(([key]) => {
        const [idx] = key.split("-");
        return Number.parseInt(idx) === modelIndex;
      }).map(([key, value]) => {
        const [_2, fieldKey] = key.split("-");
        return [fieldKey, value];
      })
    );
    for (const [key, value] of Object.entries(modelData)) {
      const parts = key.split(".");
      setNestedValue(result, parts, value);
    }
    return result;
  });
}
async function bulkDecryptModels(models, client, auditData) {
  if (!client) {
    throw new Error("Client not initialized");
  }
  if (!models || models.length === 0) {
    return [];
  }
  const { otherFields, operationFields, keyMap, nullFields } = prepareBulkModelsForOperation(models);
  const bulkDecryptPayload = operationFields.flatMap(
    (fields, modelIndex) => Object.entries(fields).map(([key, value]) => ({
      id: `${modelIndex}-${key}`,
      ciphertext: value
    }))
  );
  const decryptedFields = await handleMultiModelBulkOperation(
    bulkDecryptPayload,
    (items) => (0, import_protect_ffi2.decryptBulk)(client, {
      ciphertexts: items,
      unverifiedContext: auditData?.metadata
    }),
    keyMap
  );
  const setNestedValue = (obj, path2, value) => {
    let current = obj;
    for (let i = 0; i < path2.length - 1; i++) {
      const part = path2[i];
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }
    current[path2[path2.length - 1]] = value;
  };
  return models.map((_, modelIndex) => {
    const result = { ...otherFields[modelIndex] };
    for (const [key, value] of Object.entries(nullFields[modelIndex])) {
      const parts = key.split(".");
      setNestedValue(result, parts, value);
    }
    const modelData = Object.fromEntries(
      Object.entries(decryptedFields).filter(([key]) => {
        const [idx] = key.split("-");
        return Number.parseInt(idx) === modelIndex;
      }).map(([key, value]) => {
        const [_2, fieldKey] = key.split("-");
        return [fieldKey, value];
      })
    );
    for (const [key, value] of Object.entries(modelData)) {
      const parts = key.split(".");
      setNestedValue(result, parts, value);
    }
    return result;
  });
}
async function bulkDecryptModelsWithLockContext(models, client, lockContext, auditData) {
  if (!client) {
    throw new Error("Client not initialized");
  }
  if (!lockContext) {
    throw new Error("Lock context is not initialized");
  }
  const { otherFields, operationFields, keyMap, nullFields } = prepareBulkModelsForOperation(models);
  const bulkDecryptPayload = operationFields.flatMap(
    (fields, modelIndex) => Object.entries(fields).map(([key, value]) => ({
      id: `${modelIndex}-${key}`,
      ciphertext: value,
      lockContext: lockContext.context
    }))
  );
  const decryptedFields = await handleMultiModelBulkOperation(
    bulkDecryptPayload,
    (items) => (0, import_protect_ffi2.decryptBulk)(client, {
      ciphertexts: items,
      serviceToken: lockContext.ctsToken,
      unverifiedContext: auditData?.metadata
    }),
    keyMap
  );
  return models.map((_, modelIndex) => ({
    ...otherFields[modelIndex],
    ...nullFields[modelIndex],
    ...Object.fromEntries(
      Object.entries(decryptedFields).filter(([key]) => {
        const [idx] = key.split("-");
        return Number.parseInt(idx) === modelIndex;
      }).map(([key, value]) => {
        const [_2, fieldKey] = key.split("-");
        return [fieldKey, value];
      })
    )
  }));
}
async function bulkEncryptModelsWithLockContext(models, table, client, lockContext, auditData) {
  if (!client) {
    throw new Error("Client not initialized");
  }
  if (!lockContext) {
    throw new Error("Lock context is not initialized");
  }
  const { otherFields, operationFields, keyMap, nullFields } = prepareBulkModelsForOperation(models, table);
  const bulkEncryptPayload = operationFields.flatMap(
    (fields, modelIndex) => Object.entries(fields).map(([key, value]) => ({
      id: `${modelIndex}-${key}`,
      plaintext: value,
      table: table.tableName,
      column: key,
      lockContext: lockContext.context
    }))
  );
  const encryptedData = await handleMultiModelBulkOperation(
    bulkEncryptPayload,
    (items) => (0, import_protect_ffi2.encryptBulk)(client, {
      plaintexts: items,
      serviceToken: lockContext.ctsToken,
      unverifiedContext: auditData?.metadata
    }),
    keyMap
  );
  return models.map((_, modelIndex) => ({
    ...otherFields[modelIndex],
    ...nullFields[modelIndex],
    ...Object.fromEntries(
      Object.entries(encryptedData).filter(([key]) => {
        const [idx] = key.split("-");
        return Number.parseInt(idx) === modelIndex;
      }).map(([key, value]) => {
        const [_2, fieldKey] = key.split("-");
        return [fieldKey, value];
      })
    )
  }));
}

// src/ffi/operations/bulk-decrypt-models.ts
var BulkDecryptModelsOperation = class extends ProtectOperation {
  client;
  models;
  constructor(client, models) {
    super();
    this.client = client;
    this.models = models;
  }
  withLockContext(lockContext) {
    return new BulkDecryptModelsOperationWithLockContext(this, lockContext);
  }
  async execute() {
    logger.debug("Bulk decrypting models WITHOUT a lock context");
    return await (0, import_result2.withResult)(
      async () => {
        if (!this.client) {
          throw noClientError();
        }
        const auditData = this.getAuditData();
        return await bulkDecryptModels(this.models, this.client, auditData);
      },
      (error2) => ({
        type: ProtectErrorTypes.DecryptionError,
        message: error2.message
      })
    );
  }
  getOperation() {
    return {
      client: this.client,
      models: this.models
    };
  }
};
var BulkDecryptModelsOperationWithLockContext = class extends ProtectOperation {
  operation;
  lockContext;
  constructor(operation, lockContext) {
    super();
    this.operation = operation;
    this.lockContext = lockContext;
  }
  async execute() {
    return await (0, import_result2.withResult)(
      async () => {
        const { client, models } = this.operation.getOperation();
        logger.debug("Bulk decrypting models WITH a lock context");
        if (!client) {
          throw noClientError();
        }
        const context = await this.lockContext.getLockContext();
        if (context.failure) {
          throw new Error(`[protect]: ${context.failure.message}`);
        }
        const auditData = this.getAuditData();
        return await bulkDecryptModelsWithLockContext(
          models,
          client,
          context.data,
          auditData
        );
      },
      (error2) => ({
        type: ProtectErrorTypes.DecryptionError,
        message: error2.message
      })
    );
  }
};

// src/ffi/operations/bulk-encrypt.ts
var import_result3 = __nccwpck_require__(728);
var import_protect_ffi3 = __nccwpck_require__(313);
var createEncryptPayloads = (plaintexts, column, table, lockContext) => {
  return plaintexts.map((item, index) => ({ ...item, originalIndex: index })).filter(({ plaintext }) => plaintext !== null).map(({ id, plaintext, originalIndex }) => ({
    id,
    plaintext,
    column: column.getName(),
    table: table.tableName,
    originalIndex,
    ...lockContext && { lockContext }
  }));
};
var createNullResult2 = (plaintexts) => {
  return plaintexts.map(({ id }) => ({ id, data: null }));
};
var mapEncryptedDataToResult = (plaintexts, encryptedData) => {
  const result = new Array(plaintexts.length);
  let encryptedIndex = 0;
  for (let i = 0; i < plaintexts.length; i++) {
    if (plaintexts[i].plaintext === null) {
      result[i] = { id: plaintexts[i].id, data: null };
    } else {
      result[i] = {
        id: plaintexts[i].id,
        data: encryptedData[encryptedIndex]
      };
      encryptedIndex++;
    }
  }
  return result;
};
var BulkEncryptOperation = class extends ProtectOperation {
  client;
  plaintexts;
  column;
  table;
  constructor(client, plaintexts, opts) {
    super();
    this.client = client;
    this.plaintexts = plaintexts;
    this.column = opts.column;
    this.table = opts.table;
  }
  withLockContext(lockContext) {
    return new BulkEncryptOperationWithLockContext(this, lockContext);
  }
  async execute() {
    logger.debug("Bulk encrypting data WITHOUT a lock context", {
      column: this.column.getName(),
      table: this.table.tableName
    });
    return await (0, import_result3.withResult)(
      async () => {
        if (!this.client) {
          throw noClientError();
        }
        if (!this.plaintexts || this.plaintexts.length === 0) {
          return [];
        }
        const nonNullPayloads = createEncryptPayloads(
          this.plaintexts,
          this.column,
          this.table
        );
        if (nonNullPayloads.length === 0) {
          return createNullResult2(this.plaintexts);
        }
        const { metadata } = this.getAuditData();
        const encryptedData = await (0, import_protect_ffi3.encryptBulk)(this.client, {
          plaintexts: nonNullPayloads,
          unverifiedContext: metadata
        });
        return mapEncryptedDataToResult(this.plaintexts, encryptedData);
      },
      (error2) => ({
        type: ProtectErrorTypes.EncryptionError,
        message: error2.message
      })
    );
  }
  getOperation() {
    return {
      client: this.client,
      plaintexts: this.plaintexts,
      column: this.column,
      table: this.table
    };
  }
};
var BulkEncryptOperationWithLockContext = class extends ProtectOperation {
  operation;
  lockContext;
  constructor(operation, lockContext) {
    super();
    this.operation = operation;
    this.lockContext = lockContext;
  }
  async execute() {
    return await (0, import_result3.withResult)(
      async () => {
        const { client, plaintexts, column, table } = this.operation.getOperation();
        logger.debug("Bulk encrypting data WITH a lock context", {
          column: column.getName(),
          table: table.tableName
        });
        if (!client) {
          throw noClientError();
        }
        if (!plaintexts || plaintexts.length === 0) {
          return [];
        }
        const context = await this.lockContext.getLockContext();
        if (context.failure) {
          throw new Error(`[protect]: ${context.failure.message}`);
        }
        const nonNullPayloads = createEncryptPayloads(
          plaintexts,
          column,
          table,
          context.data.context
        );
        if (nonNullPayloads.length === 0) {
          return createNullResult2(plaintexts);
        }
        const { metadata } = this.getAuditData();
        const encryptedData = await (0, import_protect_ffi3.encryptBulk)(client, {
          plaintexts: nonNullPayloads,
          serviceToken: context.data.ctsToken,
          unverifiedContext: metadata
        });
        return mapEncryptedDataToResult(plaintexts, encryptedData);
      },
      (error2) => ({
        type: ProtectErrorTypes.EncryptionError,
        message: error2.message
      })
    );
  }
};

// src/ffi/operations/bulk-encrypt-models.ts
var import_result4 = __nccwpck_require__(728);
var BulkEncryptModelsOperation = class extends ProtectOperation {
  client;
  models;
  table;
  constructor(client, models, table) {
    super();
    this.client = client;
    this.models = models;
    this.table = table;
  }
  withLockContext(lockContext) {
    return new BulkEncryptModelsOperationWithLockContext(this, lockContext);
  }
  async execute() {
    logger.debug("Bulk encrypting models WITHOUT a lock context", {
      table: this.table.tableName
    });
    return await (0, import_result4.withResult)(
      async () => {
        if (!this.client) {
          throw noClientError();
        }
        const auditData = this.getAuditData();
        return await bulkEncryptModels(
          this.models,
          this.table,
          this.client,
          auditData
        );
      },
      (error2) => ({
        type: ProtectErrorTypes.EncryptionError,
        message: error2.message
      })
    );
  }
  getOperation() {
    return {
      client: this.client,
      models: this.models,
      table: this.table
    };
  }
};
var BulkEncryptModelsOperationWithLockContext = class extends ProtectOperation {
  operation;
  lockContext;
  constructor(operation, lockContext) {
    super();
    this.operation = operation;
    this.lockContext = lockContext;
  }
  async execute() {
    return await (0, import_result4.withResult)(
      async () => {
        const { client, models, table } = this.operation.getOperation();
        logger.debug("Bulk encrypting models WITH a lock context", {
          table: table.tableName
        });
        if (!client) {
          throw noClientError();
        }
        const context = await this.lockContext.getLockContext();
        if (context.failure) {
          throw new Error(`[protect]: ${context.failure.message}`);
        }
        const auditData = this.getAuditData();
        return await bulkEncryptModelsWithLockContext(
          models,
          table,
          client,
          context.data,
          auditData
        );
      },
      (error2) => ({
        type: ProtectErrorTypes.EncryptionError,
        message: error2.message
      })
    );
  }
};

// src/ffi/operations/decrypt.ts
var import_result5 = __nccwpck_require__(728);
var import_protect_ffi4 = __nccwpck_require__(313);
var DecryptOperation = class extends ProtectOperation {
  client;
  encryptedData;
  constructor(client, encryptedData) {
    super();
    this.client = client;
    this.encryptedData = encryptedData;
  }
  withLockContext(lockContext) {
    return new DecryptOperationWithLockContext(this, lockContext);
  }
  async execute() {
    return await (0, import_result5.withResult)(
      async () => {
        if (!this.client) {
          throw noClientError();
        }
        if (this.encryptedData === null) {
          return null;
        }
        const { metadata } = this.getAuditData();
        logger.debug("Decrypting data WITHOUT a lock context", {
          metadata
        });
        return await (0, import_protect_ffi4.decrypt)(this.client, {
          ciphertext: this.encryptedData,
          unverifiedContext: metadata
        });
      },
      (error2) => ({
        type: ProtectErrorTypes.DecryptionError,
        message: error2.message
      })
    );
  }
  getOperation() {
    return {
      client: this.client,
      encryptedData: this.encryptedData,
      auditData: this.getAuditData()
    };
  }
};
var DecryptOperationWithLockContext = class extends ProtectOperation {
  operation;
  lockContext;
  constructor(operation, lockContext) {
    super();
    this.operation = operation;
    this.lockContext = lockContext;
    const auditData = operation.getAuditData();
    if (auditData) {
      this.audit(auditData);
    }
  }
  async execute() {
    return await (0, import_result5.withResult)(
      async () => {
        const { client, encryptedData } = this.operation.getOperation();
        if (!client) {
          throw noClientError();
        }
        if (encryptedData === null) {
          return null;
        }
        const { metadata } = this.getAuditData();
        logger.debug("Decrypting data WITH a lock context", {
          metadata
        });
        const context = await this.lockContext.getLockContext();
        if (context.failure) {
          throw new Error(`[protect]: ${context.failure.message}`);
        }
        return await (0, import_protect_ffi4.decrypt)(client, {
          ciphertext: encryptedData,
          unverifiedContext: metadata,
          lockContext: context.data.context,
          serviceToken: context.data.ctsToken
        });
      },
      (error2) => ({
        type: ProtectErrorTypes.DecryptionError,
        message: error2.message
      })
    );
  }
};

// src/ffi/operations/decrypt-model.ts
var import_result6 = __nccwpck_require__(728);
var DecryptModelOperation = class extends ProtectOperation {
  client;
  model;
  constructor(client, model) {
    super();
    this.client = client;
    this.model = model;
  }
  withLockContext(lockContext) {
    return new DecryptModelOperationWithLockContext(this, lockContext);
  }
  async execute() {
    logger.debug("Decrypting model WITHOUT a lock context");
    return await (0, import_result6.withResult)(
      async () => {
        if (!this.client) {
          throw noClientError();
        }
        const auditData = this.getAuditData();
        return await decryptModelFields(this.model, this.client, auditData);
      },
      (error2) => ({
        type: ProtectErrorTypes.DecryptionError,
        message: error2.message
      })
    );
  }
  getOperation() {
    return {
      client: this.client,
      model: this.model
    };
  }
};
var DecryptModelOperationWithLockContext = class extends ProtectOperation {
  operation;
  lockContext;
  constructor(operation, lockContext) {
    super();
    this.operation = operation;
    this.lockContext = lockContext;
  }
  async execute() {
    return await (0, import_result6.withResult)(
      async () => {
        const { client, model } = this.operation.getOperation();
        logger.debug("Decrypting model WITH a lock context");
        if (!client) {
          throw noClientError();
        }
        const context = await this.lockContext.getLockContext();
        if (context.failure) {
          throw new Error(`[protect]: ${context.failure.message}`);
        }
        const auditData = this.getAuditData();
        return await decryptModelFieldsWithLockContext(
          model,
          client,
          context.data,
          auditData
        );
      },
      (error2) => ({
        type: ProtectErrorTypes.DecryptionError,
        message: error2.message
      })
    );
  }
};

// src/ffi/operations/encrypt.ts
var import_result7 = __nccwpck_require__(728);
var import_protect_ffi5 = __nccwpck_require__(313);
var EncryptOperation = class extends ProtectOperation {
  client;
  plaintext;
  column;
  table;
  constructor(client, plaintext, opts) {
    super();
    this.client = client;
    this.plaintext = plaintext;
    this.column = opts.column;
    this.table = opts.table;
  }
  withLockContext(lockContext) {
    return new EncryptOperationWithLockContext(this, lockContext);
  }
  async execute() {
    logger.debug("Encrypting data WITHOUT a lock context", {
      column: this.column.getName(),
      table: this.table.tableName
    });
    return await (0, import_result7.withResult)(
      async () => {
        if (!this.client) {
          throw noClientError();
        }
        if (this.plaintext === null) {
          return null;
        }
        if (typeof this.plaintext === "number" && Number.isNaN(this.plaintext)) {
          throw new Error("[protect]: Cannot encrypt NaN value");
        }
        if (typeof this.plaintext === "number" && !Number.isFinite(this.plaintext)) {
          throw new Error("[protect]: Cannot encrypt Infinity value");
        }
        const { metadata } = this.getAuditData();
        return await (0, import_protect_ffi5.encrypt)(this.client, {
          plaintext: this.plaintext,
          column: this.column.getName(),
          table: this.table.tableName,
          unverifiedContext: metadata
        });
      },
      (error2) => ({
        type: ProtectErrorTypes.EncryptionError,
        message: error2.message
      })
    );
  }
  getOperation() {
    return {
      client: this.client,
      plaintext: this.plaintext,
      column: this.column,
      table: this.table
    };
  }
};
var EncryptOperationWithLockContext = class extends ProtectOperation {
  operation;
  lockContext;
  constructor(operation, lockContext) {
    super();
    this.operation = operation;
    this.lockContext = lockContext;
  }
  async execute() {
    return await (0, import_result7.withResult)(
      async () => {
        const { client, plaintext, column, table } = this.operation.getOperation();
        logger.debug("Encrypting data WITH a lock context", {
          column,
          table
        });
        if (!client) {
          throw noClientError();
        }
        if (plaintext === null) {
          return null;
        }
        const { metadata } = this.getAuditData();
        const context = await this.lockContext.getLockContext();
        if (context.failure) {
          throw new Error(`[protect]: ${context.failure.message}`);
        }
        return await (0, import_protect_ffi5.encrypt)(client, {
          plaintext,
          column: column.getName(),
          table: table.tableName,
          lockContext: context.data.context,
          serviceToken: context.data.ctsToken,
          unverifiedContext: metadata
        });
      },
      (error2) => ({
        type: ProtectErrorTypes.EncryptionError,
        message: error2.message
      })
    );
  }
};

// src/ffi/operations/encrypt-model.ts
var import_result8 = __nccwpck_require__(728);
var EncryptModelOperation = class extends ProtectOperation {
  client;
  model;
  table;
  constructor(client, model, table) {
    super();
    this.client = client;
    this.model = model;
    this.table = table;
  }
  withLockContext(lockContext) {
    return new EncryptModelOperationWithLockContext(this, lockContext);
  }
  async execute() {
    logger.debug("Encrypting model WITHOUT a lock context", {
      table: this.table.tableName
    });
    return await (0, import_result8.withResult)(
      async () => {
        if (!this.client) {
          throw noClientError();
        }
        const auditData = this.getAuditData();
        return await encryptModelFields(
          this.model,
          this.table,
          this.client,
          auditData
        );
      },
      (error2) => ({
        type: ProtectErrorTypes.EncryptionError,
        message: error2.message
      })
    );
  }
  getOperation() {
    return {
      client: this.client,
      model: this.model,
      table: this.table
    };
  }
};
var EncryptModelOperationWithLockContext = class extends ProtectOperation {
  operation;
  lockContext;
  constructor(operation, lockContext) {
    super();
    this.operation = operation;
    this.lockContext = lockContext;
  }
  async execute() {
    return await (0, import_result8.withResult)(
      async () => {
        const { client, model, table } = this.operation.getOperation();
        logger.debug("Encrypting model WITH a lock context", {
          table: table.tableName
        });
        if (!client) {
          throw noClientError();
        }
        const context = await this.lockContext.getLockContext();
        if (context.failure) {
          throw new Error(`[protect]: ${context.failure.message}`);
        }
        const auditData = this.getAuditData();
        return await encryptModelFieldsWithLockContext(
          model,
          table,
          client,
          context.data,
          auditData
        );
      },
      (error2) => ({
        type: ProtectErrorTypes.EncryptionError,
        message: error2.message
      })
    );
  }
};

// src/ffi/operations/search-terms.ts
var import_result9 = __nccwpck_require__(728);
var import_protect_ffi6 = __nccwpck_require__(313);
var SearchTermsOperation = class extends ProtectOperation {
  client;
  terms;
  constructor(client, terms) {
    super();
    this.client = client;
    this.terms = terms;
  }
  async execute() {
    logger.debug("Creating search terms", {
      terms: this.terms
    });
    return await (0, import_result9.withResult)(
      async () => {
        if (!this.client) {
          throw noClientError();
        }
        const { metadata } = this.getAuditData();
        const encryptedSearchTerms = await (0, import_protect_ffi6.encryptBulk)(this.client, {
          plaintexts: this.terms.map((term) => ({
            plaintext: term.value,
            column: term.column.getName(),
            table: term.table.tableName
          })),
          unverifiedContext: metadata
        });
        return this.terms.map((term, index) => {
          if (term.returnType === "composite-literal") {
            return `(${JSON.stringify(JSON.stringify(encryptedSearchTerms[index]))})`;
          }
          if (term.returnType === "escaped-composite-literal") {
            return `${JSON.stringify(`(${JSON.stringify(JSON.stringify(encryptedSearchTerms[index]))})`)}`;
          }
          return encryptedSearchTerms[index];
        });
      },
      (error2) => ({
        type: ProtectErrorTypes.EncryptionError,
        message: error2.message
      })
    );
  }
};

// src/ffi/index.ts
var noClientError = () => new Error(
  "The EQL client has not been initialized. Please call init() before using the client."
);
var ProtectClient = class {
  client;
  encryptConfig;
  workspaceId;
  constructor(workspaceCrn) {
    const workspaceId = loadWorkSpaceId(workspaceCrn);
    this.workspaceId = workspaceId;
  }
  /**
   * Initializes the ProtectClient with the provided configuration.
   * @internal
   * @param config - The configuration object for initializing the client.
   * @returns A promise that resolves to a {@link Result} containing the initialized ProtectClient or a {@link ProtectError}.
   **/
  async init(config) {
    return await (0, import_result10.withResult)(
      async () => {
        const validated = import_schema.encryptConfigSchema.parse(
          config.encryptConfig
        );
        logger.debug(
          "Initializing the Protect.js client with the following encrypt config:",
          {
            encryptConfig: validated
          }
        );
        this.client = await (0, import_protect_ffi7.newClient)({
          encryptConfig: validated,
          clientOpts: {
            workspaceCrn: config.workspaceCrn,
            accessKey: config.accessKey,
            clientId: config.clientId,
            clientKey: config.clientKey,
            keyset: toFfiKeysetIdentifier(config.keyset)
          }
        });
        this.encryptConfig = validated;
        logger.info("Successfully initialized the Protect.js client.");
        return this;
      },
      (error2) => ({
        type: ProtectErrorTypes.ClientInitError,
        message: error2.message
      })
    );
  }
  /**
   * Encrypt a value - returns a promise which resolves to an encrypted value.
   *
   * @param plaintext - The plaintext value to be encrypted. Can be null.
   * @param opts - Options specifying the column and table for encryption.
   * @returns An EncryptOperation that can be awaited or chained with additional methods.
   *
   * @example
   * The following example demonstrates how to encrypt a value using the Protect client.
   * It includes defining an encryption schema with {@link csTable} and {@link csColumn},
   * initializing the client with {@link protect}, and performing the encryption.
   *
   * `encrypt` returns an {@link EncryptOperation} which can be awaited to get a {@link Result}
   * which can either be the encrypted value or a {@link ProtectError}.
   *
   * ```typescript
   * // Define encryption schema
   * import { csTable, csColumn } from "@cipherstash/protect"
   * const userSchema = csTable("users", {
   *  email: csColumn("email"),
   * });
   *
   * // Initialize Protect client
   * const protectClient = await protect({ schemas: [userSchema] })
   *
   * // Encrypt a value
   * const encryptedResult = await protectClient.encrypt(
   *  "person@example.com",
   *  { column: userSchema.email, table: userSchema }
   * )
   *
   * // Handle encryption result
   * if (encryptedResult.failure) {
   *   throw new Error(`Encryption failed: ${encryptedResult.failure.message}`);
   * }
   *
   * console.log("Encrypted data:", encryptedResult.data);
   * ```
   *
   * @example
   * When encrypting data, a {@link LockContext} can be provided to tie the encryption to a specific user or session.
   * This ensures that the same lock context is required for decryption.
   *
   * The following example demonstrates how to create a lock context using a user's JWT token
   * and use it during encryption.
   *
   * ```typescript
   * // Define encryption schema and initialize client as above
   *
   * // Create a lock for the user's `sub` claim from their JWT
   * const lc = new LockContext();
   * const lockContext = await lc.identify(userJwt);
   *
   * if (lockContext.failure) {
   *   // Handle the failure
   * }
   *
   * // Encrypt a value with the lock context
   * // Decryption will then require the same lock context
   * const encryptedResult = await protectClient.encrypt(
   *  "person@example.com",
   *  { column: userSchema.email, table: userSchema }
   * )
   *  .withLockContext(lockContext)
   * ```
   *
   * @see {@link Result}
   * @see {@link csTable}
   * @see {@link LockContext}
   * @see {@link EncryptOperation}
   */
  encrypt(plaintext, opts) {
    return new EncryptOperation(this.client, plaintext, opts);
  }
  /**
   * Decryption - returns a promise which resolves to a decrypted value.
   *
   * @param encryptedData - The encrypted data to be decrypted.
   * @returns A DecryptOperation that can be awaited or chained with additional methods.
   *
   * @example
   * The following example demonstrates how to decrypt a value that was previously encrypted using {@link encrypt} client.
   * It includes encrypting a value first, then decrypting it, and handling the result.
   *
   * ```typescript
   * const encryptedData = await eqlClient.encrypt(
   *  "person@example.com",
   *  { column: "email", table: "users" }
   * )
   * const decryptResult = await eqlClient.decrypt(encryptedData)
   * if (decryptResult.failure) {
   *   throw new Error(`Decryption failed: ${decryptResult.failure.message}`);
   * }
   * console.log("Decrypted data:", decryptResult.data);
   * ```
   *
   * @example
   * Provide a lock context when decrypting:
   * ```typescript
   *    await eqlClient.decrypt(encryptedData)
   *      .withLockContext(lockContext)
   * ```
   *
   * @see {@link LockContext}
   * @see {@link DecryptOperation}
   */
  decrypt(encryptedData) {
    return new DecryptOperation(this.client, encryptedData);
  }
  /**
   * Encrypt a model based on its encryptConfig.
   *
   * @example
   * ```typescript
   * type User = {
   *   id: string;
   *   email: string; // encrypted
   * }
   *
   * // Define the schema for the users table
   * const usersSchema = csTable('users', {
   *   email: csColumn('email').freeTextSearch().equality().orderAndRange(),
   * })
   *
   * // Initialize the Protect client
   * const protectClient = await protect({ schemas: [usersSchema] })
   *
   * // Encrypt a user model
   * const encryptedModel = await protectClient.encryptModel<User>(
   *   { id: 'user_123', email: 'person@example.com' },
   *   usersSchema,
   * )
   * ```
   */
  encryptModel(input, table) {
    return new EncryptModelOperation(this.client, input, table);
  }
  /**
   * Decrypt a model with encrypted values
   * Usage:
   *    await eqlClient.decryptModel(encryptedModel)
   *    await eqlClient.decryptModel(encryptedModel).withLockContext(lockContext)
   */
  decryptModel(input) {
    return new DecryptModelOperation(this.client, input);
  }
  /**
   * Bulk encrypt models with decrypted values
   * Usage:
   *    await eqlClient.bulkEncryptModels(decryptedModels, table)
   *    await eqlClient.bulkEncryptModels(decryptedModels, table).withLockContext(lockContext)
   */
  bulkEncryptModels(input, table) {
    return new BulkEncryptModelsOperation(this.client, input, table);
  }
  /**
   * Bulk decrypt models with encrypted values
   * Usage:
   *    await eqlClient.bulkDecryptModels(encryptedModels)
   *    await eqlClient.bulkDecryptModels(encryptedModels).withLockContext(lockContext)
   */
  bulkDecryptModels(input) {
    return new BulkDecryptModelsOperation(this.client, input);
  }
  /**
   * Bulk encryption - returns a thenable object.
   * Usage:
   *    await eqlClient.bulkEncrypt(plaintexts, { column, table })
   *    await eqlClient.bulkEncrypt(plaintexts, { column, table }).withLockContext(lockContext)
   */
  bulkEncrypt(plaintexts, opts) {
    return new BulkEncryptOperation(this.client, plaintexts, opts);
  }
  /**
   * Bulk decryption - returns a thenable object.
   * Usage:
   *    await eqlClient.bulkDecrypt(encryptedPayloads)
   *    await eqlClient.bulkDecrypt(encryptedPayloads).withLockContext(lockContext)
   */
  bulkDecrypt(encryptedPayloads) {
    return new BulkDecryptOperation(this.client, encryptedPayloads);
  }
  /**
   * Create search terms to use in a query searching encrypted data
   * Usage:
   *    await eqlClient.createSearchTerms(searchTerms)
   *    await eqlClient.createSearchTerms(searchTerms).withLockContext(lockContext)
   */
  createSearchTerms(terms) {
    return new SearchTermsOperation(this.client, terms);
  }
  /** e.g., debugging or environment info */
  clientInfo() {
    return {
      workspaceId: this.workspaceId
    };
  }
};

// src/index.ts
var import_schema3 = __nccwpck_require__(646);
var ProtectErrorTypes = {
  ClientInitError: "ClientInitError",
  EncryptionError: "EncryptionError",
  DecryptionError: "DecryptionError",
  LockContextError: "LockContextError",
  CtsTokenError: "CtsTokenError"
};
function isValidUuid(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
var protect = async (config) => {
  const { schemas } = config;
  if (!schemas.length) {
    throw new Error(
      "[protect]: At least one csTable must be provided to initialize the protect client"
    );
  }
  if (config.keyset && "id" in config.keyset && !isValidUuid(config.keyset.id)) {
    throw new Error(
      "[protect]: Invalid UUID provided for keyset id. Must be a valid UUID."
    );
  }
  const clientConfig = {
    workspaceCrn: config.workspaceCrn,
    accessKey: config.accessKey,
    clientId: config.clientId,
    clientKey: config.clientKey,
    keyset: config.keyset
  };
  const client = new ProtectClient(clientConfig.workspaceCrn);
  const encryptConfig = (0, import_schema2.buildEncryptConfig)(...schemas);
  const result = await client.init({
    encryptConfig,
    ...clientConfig
  });
  if (result.failure) {
    throw new Error(`[protect]: ${result.failure.message}`);
  }
  return result.data;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (0);
//# sourceMappingURL=index.cjs.map

/***/ }),

/***/ 646:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ProtectColumn: () => ProtectColumn,
  ProtectTable: () => ProtectTable,
  ProtectValue: () => ProtectValue,
  buildEncryptConfig: () => buildEncryptConfig,
  castAsEnum: () => castAsEnum,
  csColumn: () => csColumn,
  csTable: () => csTable,
  csValue: () => csValue,
  encryptConfigSchema: () => encryptConfigSchema
});
module.exports = __toCommonJS(index_exports);
var import_zod = __nccwpck_require__(924);
var castAsEnum = import_zod.z.enum(["bigint", "boolean", "date", "number", "string", "json"]).default("string");
var tokenFilterSchema = import_zod.z.object({
  kind: import_zod.z.literal("downcase")
});
var tokenizerSchema = import_zod.z.union([
  import_zod.z.object({
    kind: import_zod.z.literal("standard")
  }),
  import_zod.z.object({
    kind: import_zod.z.literal("ngram"),
    token_length: import_zod.z.number()
  })
]).default({ kind: "ngram", token_length: 3 }).optional();
var oreIndexOptsSchema = import_zod.z.object({});
var uniqueIndexOptsSchema = import_zod.z.object({
  token_filters: import_zod.z.array(tokenFilterSchema).default([]).optional()
});
var matchIndexOptsSchema = import_zod.z.object({
  tokenizer: tokenizerSchema,
  token_filters: import_zod.z.array(tokenFilterSchema).default([]).optional(),
  k: import_zod.z.number().default(6).optional(),
  m: import_zod.z.number().default(2048).optional(),
  include_original: import_zod.z.boolean().default(false).optional()
});
var steVecIndexOptsSchema = import_zod.z.object({
  prefix: import_zod.z.string()
});
var indexesSchema = import_zod.z.object({
  ore: oreIndexOptsSchema.optional(),
  unique: uniqueIndexOptsSchema.optional(),
  match: matchIndexOptsSchema.optional(),
  ste_vec: steVecIndexOptsSchema.optional()
}).default({});
var columnSchema = import_zod.z.object({
  cast_as: castAsEnum,
  indexes: indexesSchema
}).default({});
var tableSchema = import_zod.z.record(columnSchema).default({});
var tablesSchema = import_zod.z.record(tableSchema).default({});
var encryptConfigSchema = import_zod.z.object({
  v: import_zod.z.number(),
  tables: tablesSchema
});
var ProtectValue = class {
  valueName;
  castAsValue;
  constructor(valueName) {
    this.valueName = valueName;
    this.castAsValue = "string";
  }
  /**
   * Set or override the cast_as value.
   */
  dataType(castAs) {
    this.castAsValue = castAs;
    return this;
  }
  build() {
    return {
      cast_as: this.castAsValue,
      indexes: {}
    };
  }
  getName() {
    return this.valueName;
  }
};
var ProtectColumn = class {
  columnName;
  castAsValue;
  indexesValue = {};
  constructor(columnName) {
    this.columnName = columnName;
    this.castAsValue = "string";
  }
  /**
   * Set or override the cast_as value.
   */
  dataType(castAs) {
    this.castAsValue = castAs;
    return this;
  }
  /**
   * Enable ORE indexing (Order-Revealing Encryption).
   */
  orderAndRange() {
    this.indexesValue.ore = {};
    return this;
  }
  /**
   * Enable an Exact index. Optionally pass tokenFilters.
   */
  equality(tokenFilters) {
    this.indexesValue.unique = {
      token_filters: tokenFilters ?? []
    };
    return this;
  }
  /**
   * Enable a Match index. Allows passing of custom match options.
   */
  freeTextSearch(opts) {
    this.indexesValue.match = {
      tokenizer: opts?.tokenizer ?? { kind: "ngram", token_length: 3 },
      token_filters: opts?.token_filters ?? [
        {
          kind: "downcase"
        }
      ],
      k: opts?.k ?? 6,
      m: opts?.m ?? 2048,
      include_original: opts?.include_original ?? true
    };
    return this;
  }
  /**
   * Enable a STE Vec index, uses the column name for the index.
   */
  // NOTE: Leaving this commented out until stevec indexing for JSON is supported.
  /*searchableJson() {
    this.indexesValue.ste_vec = { prefix: this.columnName }
    return this
  }*/
  build() {
    return {
      cast_as: this.castAsValue,
      indexes: this.indexesValue
    };
  }
  getName() {
    return this.columnName;
  }
};
var ProtectTable = class {
  constructor(tableName, columnBuilders) {
    this.tableName = tableName;
    this.columnBuilders = columnBuilders;
  }
  /**
   * Build a TableDefinition object: tableName + built column configs.
   */
  build() {
    const builtColumns = {};
    const processColumn = (builder, colName) => {
      if (builder instanceof ProtectColumn) {
        const builtColumn = builder.build();
        if (builtColumn.cast_as === "json" && builtColumn.indexes.ste_vec?.prefix === "enabled") {
          builtColumns[colName] = {
            ...builtColumn,
            indexes: {
              ...builtColumn.indexes,
              ste_vec: {
                prefix: `${this.tableName}/${colName}`
              }
            }
          };
        } else {
          builtColumns[colName] = builtColumn;
        }
      } else {
        for (const [key, value] of Object.entries(builder)) {
          if (value instanceof ProtectValue) {
            builtColumns[value.getName()] = value.build();
          } else {
            processColumn(value, key);
          }
        }
      }
    };
    for (const [colName, builder] of Object.entries(this.columnBuilders)) {
      processColumn(builder, colName);
    }
    return {
      tableName: this.tableName,
      columns: builtColumns
    };
  }
};
function csTable(tableName, columns) {
  const tableBuilder = new ProtectTable(tableName, columns);
  for (const [colName, colBuilder] of Object.entries(columns)) {
    ;
    tableBuilder[colName] = colBuilder;
  }
  return tableBuilder;
}
function csColumn(columnName) {
  return new ProtectColumn(columnName);
}
function csValue(valueName) {
  return new ProtectValue(valueName);
}
function buildEncryptConfig(...protectTables) {
  const config = {
    v: 2,
    tables: {}
  };
  for (const tb of protectTables) {
    const tableDef = tb.build();
    config.tables[tableDef.tableName] = tableDef.columns;
  }
  return config;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);
//# sourceMappingURL=index.cjs.map

/***/ }),

/***/ 924:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.z = void 0;
const z = __importStar(__nccwpck_require__(953));
exports.z = z;
__exportStar(__nccwpck_require__(953), exports);
exports["default"] = z;


/***/ }),

/***/ 87:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZodError = exports.quotelessJson = exports.ZodIssueCode = void 0;
const util_js_1 = __nccwpck_require__(46);
exports.ZodIssueCode = util_js_1.util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
]);
const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
exports.quotelessJson = quotelessJson;
class ZodError extends Error {
    get errors() {
        return this.issues;
    }
    constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    format(_mapper) {
        const mapper = _mapper ||
            function (issue) {
                return issue.message;
            };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
            for (const issue of error.issues) {
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                }
                else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                }
                else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                }
                else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < issue.path.length) {
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                            // if (typeof el === "string") {
                            //   curr[el] = curr[el] || { _errors: [] };
                            // } else if (typeof el === "number") {
                            //   const errorArray: any = [];
                            //   errorArray._errors = [];
                            //   curr[el] = curr[el] || errorArray;
                            // }
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    static assert(value) {
        if (!(value instanceof ZodError)) {
            throw new Error(`Not a ZodError: ${value}`);
        }
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, util_js_1.util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
            if (sub.path.length > 0) {
                const firstEl = sub.path[0];
                fieldErrors[firstEl] = fieldErrors[firstEl] || [];
                fieldErrors[firstEl].push(mapper(sub));
            }
            else {
                formErrors.push(mapper(sub));
            }
        }
        return { formErrors, fieldErrors };
    }
    get formErrors() {
        return this.flatten();
    }
}
exports.ZodError = ZodError;
ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
};


/***/ }),

/***/ 977:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultErrorMap = void 0;
exports.setErrorMap = setErrorMap;
exports.getErrorMap = getErrorMap;
const en_js_1 = __importDefault(__nccwpck_require__(97));
exports.defaultErrorMap = en_js_1.default;
let overrideErrorMap = en_js_1.default;
function setErrorMap(map) {
    overrideErrorMap = map;
}
function getErrorMap() {
    return overrideErrorMap;
}


/***/ }),

/***/ 953:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__nccwpck_require__(977), exports);
__exportStar(__nccwpck_require__(991), exports);
__exportStar(__nccwpck_require__(6), exports);
__exportStar(__nccwpck_require__(46), exports);
__exportStar(__nccwpck_require__(63), exports);
__exportStar(__nccwpck_require__(87), exports);


/***/ }),

/***/ 508:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errorUtil = void 0;
var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    // biome-ignore lint:
    errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (exports.errorUtil = errorUtil = {}));


/***/ }),

/***/ 991:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAsync = exports.isValid = exports.isDirty = exports.isAborted = exports.OK = exports.DIRTY = exports.INVALID = exports.ParseStatus = exports.EMPTY_PATH = exports.makeIssue = void 0;
exports.addIssueToContext = addIssueToContext;
const errors_js_1 = __nccwpck_require__(977);
const en_js_1 = __importDefault(__nccwpck_require__(97));
const makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...(issueData.path || [])];
    const fullIssue = {
        ...issueData,
        path: fullPath,
    };
    if (issueData.message !== undefined) {
        return {
            ...issueData,
            path: fullPath,
            message: issueData.message,
        };
    }
    let errorMessage = "";
    const maps = errorMaps
        .filter((m) => !!m)
        .slice()
        .reverse();
    for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
        ...issueData,
        path: fullPath,
        message: errorMessage,
    };
};
exports.makeIssue = makeIssue;
exports.EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
    const overrideMap = (0, errors_js_1.getErrorMap)();
    const issue = (0, exports.makeIssue)({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.common.contextualErrorMap, // contextual error map is first priority
            ctx.schemaErrorMap, // then schema-bound map if available
            overrideMap, // then global override map
            overrideMap === en_js_1.default ? undefined : en_js_1.default, // then global default map
        ].filter((x) => !!x),
    });
    ctx.common.issues.push(issue);
}
class ParseStatus {
    constructor() {
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid")
            this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted")
            this.value = "aborted";
    }
    static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
            if (s.status === "aborted")
                return exports.INVALID;
            if (s.status === "dirty")
                status.dirty();
            arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
                key,
                value,
            });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
            const { key, value } = pair;
            if (key.status === "aborted")
                return exports.INVALID;
            if (value.status === "aborted")
                return exports.INVALID;
            if (key.status === "dirty")
                status.dirty();
            if (value.status === "dirty")
                status.dirty();
            if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
                finalObject[key.value] = value.value;
            }
        }
        return { status: status.value, value: finalObject };
    }
}
exports.ParseStatus = ParseStatus;
exports.INVALID = Object.freeze({
    status: "aborted",
});
const DIRTY = (value) => ({ status: "dirty", value });
exports.DIRTY = DIRTY;
const OK = (value) => ({ status: "valid", value });
exports.OK = OK;
const isAborted = (x) => x.status === "aborted";
exports.isAborted = isAborted;
const isDirty = (x) => x.status === "dirty";
exports.isDirty = isDirty;
const isValid = (x) => x.status === "valid";
exports.isValid = isValid;
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
exports.isAsync = isAsync;


/***/ }),

/***/ 6:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 46:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getParsedType = exports.ZodParsedType = exports.objectUtil = exports.util = void 0;
var util;
(function (util) {
    util.assertEqual = (_) => { };
    function assertIs(_arg) { }
    util.assertIs = assertIs;
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
            obj[item] = item;
        }
        return obj;
    };
    util.getValidEnumValues = (obj) => {
        const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
            filtered[k] = obj[k];
        }
        return util.objectValues(filtered);
    };
    util.objectValues = (obj) => {
        return util.objectKeys(obj).map(function (e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
        ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
        : (object) => {
            const keys = [];
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    util.find = (arr, checker) => {
        for (const item of arr) {
            if (checker(item))
                return item;
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function"
        ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
        : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
        return array.map((val) => (typeof val === "string" ? `'${val}'` : val)).join(separator);
    }
    util.joinValues = joinValues;
    util.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    };
})(util || (exports.util = util = {}));
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = (first, second) => {
        return {
            ...first,
            ...second, // second overwrites first
        };
    };
})(objectUtil || (exports.objectUtil = objectUtil = {}));
exports.ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return exports.ZodParsedType.undefined;
        case "string":
            return exports.ZodParsedType.string;
        case "number":
            return Number.isNaN(data) ? exports.ZodParsedType.nan : exports.ZodParsedType.number;
        case "boolean":
            return exports.ZodParsedType.boolean;
        case "function":
            return exports.ZodParsedType.function;
        case "bigint":
            return exports.ZodParsedType.bigint;
        case "symbol":
            return exports.ZodParsedType.symbol;
        case "object":
            if (Array.isArray(data)) {
                return exports.ZodParsedType.array;
            }
            if (data === null) {
                return exports.ZodParsedType.null;
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
                return exports.ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return exports.ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return exports.ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return exports.ZodParsedType.date;
            }
            return exports.ZodParsedType.object;
        default:
            return exports.ZodParsedType.unknown;
    }
};
exports.getParsedType = getParsedType;


/***/ }),

/***/ 97:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const ZodError_js_1 = __nccwpck_require__(87);
const util_js_1 = __nccwpck_require__(46);
const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
        case ZodError_js_1.ZodIssueCode.invalid_type:
            if (issue.received === util_js_1.ZodParsedType.undefined) {
                message = "Required";
            }
            else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case ZodError_js_1.ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util_js_1.util.jsonStringifyReplacer)}`;
            break;
        case ZodError_js_1.ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util_js_1.util.joinValues(issue.keys, ", ")}`;
            break;
        case ZodError_js_1.ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
        case ZodError_js_1.ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util_js_1.util.joinValues(issue.options)}`;
            break;
        case ZodError_js_1.ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${util_js_1.util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case ZodError_js_1.ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case ZodError_js_1.ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case ZodError_js_1.ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
        case ZodError_js_1.ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
                if ("includes" in issue.validation) {
                    message = `Invalid input: must include "${issue.validation.includes}"`;
                    if (typeof issue.validation.position === "number") {
                        message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
                    }
                }
                else if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                }
                else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                }
                else {
                    util_js_1.util.assertNever(issue.validation);
                }
            }
            else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            }
            else {
                message = "Invalid";
            }
            break;
        case ZodError_js_1.ZodIssueCode.too_small:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
            else if (issue.type === "bigint")
                message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
            else
                message = "Invalid input";
            break;
        case ZodError_js_1.ZodIssueCode.too_big:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "bigint")
                message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
            else
                message = "Invalid input";
            break;
        case ZodError_js_1.ZodIssueCode.custom:
            message = `Invalid input`;
            break;
        case ZodError_js_1.ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case ZodError_js_1.ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        case ZodError_js_1.ZodIssueCode.not_finite:
            message = "Number must be finite";
            break;
        default:
            message = _ctx.defaultError;
            util_js_1.util.assertNever(issue);
    }
    return { message };
};
exports["default"] = errorMap;


/***/ }),

/***/ 63:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.discriminatedUnion = exports.date = exports.boolean = exports.bigint = exports.array = exports.any = exports.coerce = exports.ZodFirstPartyTypeKind = exports.late = exports.ZodSchema = exports.Schema = exports.ZodReadonly = exports.ZodPipeline = exports.ZodBranded = exports.BRAND = exports.ZodNaN = exports.ZodCatch = exports.ZodDefault = exports.ZodNullable = exports.ZodOptional = exports.ZodTransformer = exports.ZodEffects = exports.ZodPromise = exports.ZodNativeEnum = exports.ZodEnum = exports.ZodLiteral = exports.ZodLazy = exports.ZodFunction = exports.ZodSet = exports.ZodMap = exports.ZodRecord = exports.ZodTuple = exports.ZodIntersection = exports.ZodDiscriminatedUnion = exports.ZodUnion = exports.ZodObject = exports.ZodArray = exports.ZodVoid = exports.ZodNever = exports.ZodUnknown = exports.ZodAny = exports.ZodNull = exports.ZodUndefined = exports.ZodSymbol = exports.ZodDate = exports.ZodBoolean = exports.ZodBigInt = exports.ZodNumber = exports.ZodString = exports.ZodType = void 0;
exports.NEVER = exports["void"] = exports.unknown = exports.union = exports.undefined = exports.tuple = exports.transformer = exports.symbol = exports.string = exports.strictObject = exports.set = exports.record = exports.promise = exports.preprocess = exports.pipeline = exports.ostring = exports.optional = exports.onumber = exports.oboolean = exports.object = exports.number = exports.nullable = exports["null"] = exports.never = exports.nativeEnum = exports.nan = exports.map = exports.literal = exports.lazy = exports.intersection = exports["instanceof"] = exports["function"] = exports["enum"] = exports.effect = void 0;
exports.datetimeRegex = datetimeRegex;
exports.custom = custom;
const ZodError_js_1 = __nccwpck_require__(87);
const errors_js_1 = __nccwpck_require__(977);
const errorUtil_js_1 = __nccwpck_require__(508);
const parseUtil_js_1 = __nccwpck_require__(991);
const util_js_1 = __nccwpck_require__(46);
class ParseInputLazyPath {
    constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
    }
    get path() {
        if (!this._cachedPath.length) {
            if (Array.isArray(this._key)) {
                this._cachedPath.push(...this._path, ...this._key);
            }
            else {
                this._cachedPath.push(...this._path, this._key);
            }
        }
        return this._cachedPath;
    }
}
const handleResult = (ctx, result) => {
    if ((0, parseUtil_js_1.isValid)(result)) {
        return { success: true, data: result.value };
    }
    else {
        if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        return {
            success: false,
            get error() {
                if (this._error)
                    return this._error;
                const error = new ZodError_js_1.ZodError(ctx.common.issues);
                this._error = error;
                return this._error;
            },
        };
    }
};
function processCreateParams(params) {
    if (!params)
        return {};
    const { errorMap, invalid_type_error, required_error, description } = params;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap)
        return { errorMap: errorMap, description };
    const customMap = (iss, ctx) => {
        const { message } = params;
        if (iss.code === "invalid_enum_value") {
            return { message: message ?? ctx.defaultError };
        }
        if (typeof ctx.data === "undefined") {
            return { message: message ?? required_error ?? ctx.defaultError };
        }
        if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
        return { message: message ?? invalid_type_error ?? ctx.defaultError };
    };
    return { errorMap: customMap, description };
}
class ZodType {
    get description() {
        return this._def.description;
    }
    _getType(input) {
        return (0, util_js_1.getParsedType)(input.data);
    }
    _getOrReturnCtx(input, ctx) {
        return (ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: (0, util_js_1.getParsedType)(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent,
        });
    }
    _processInputParams(input) {
        return {
            status: new parseUtil_js_1.ParseStatus(),
            ctx: {
                common: input.parent.common,
                data: input.data,
                parsedType: (0, util_js_1.getParsedType)(input.data),
                schemaErrorMap: this._def.errorMap,
                path: input.path,
                parent: input.parent,
            },
        };
    }
    _parseSync(input) {
        const result = this._parse(input);
        if ((0, parseUtil_js_1.isAsync)(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    }
    _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
    }
    parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    safeParse(data, params) {
        const ctx = {
            common: {
                issues: [],
                async: params?.async ?? false,
                contextualErrorMap: params?.errorMap,
            },
            path: params?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0, util_js_1.getParsedType)(data),
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
    }
    "~validate"(data) {
        const ctx = {
            common: {
                issues: [],
                async: !!this["~standard"].async,
            },
            path: [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0, util_js_1.getParsedType)(data),
        };
        if (!this["~standard"].async) {
            try {
                const result = this._parseSync({ data, path: [], parent: ctx });
                return (0, parseUtil_js_1.isValid)(result)
                    ? {
                        value: result.value,
                    }
                    : {
                        issues: ctx.common.issues,
                    };
            }
            catch (err) {
                if (err?.message?.toLowerCase()?.includes("encountered")) {
                    this["~standard"].async = true;
                }
                ctx.common = {
                    issues: [],
                    async: true,
                };
            }
        }
        return this._parseAsync({ data, path: [], parent: ctx }).then((result) => (0, parseUtil_js_1.isValid)(result)
            ? {
                value: result.value,
            }
            : {
                issues: ctx.common.issues,
            });
    }
    async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    async safeParseAsync(data, params) {
        const ctx = {
            common: {
                issues: [],
                contextualErrorMap: params?.errorMap,
                async: true,
            },
            path: params?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0, util_js_1.getParsedType)(data),
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await ((0, parseUtil_js_1.isAsync)(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
    }
    refine(check, message) {
        const getIssueProperties = (val) => {
            if (typeof message === "string" || typeof message === "undefined") {
                return { message };
            }
            else if (typeof message === "function") {
                return message(val);
            }
            else {
                return message;
            }
        };
        return this._refinement((val, ctx) => {
            const result = check(val);
            const setError = () => ctx.addIssue({
                code: ZodError_js_1.ZodIssueCode.custom,
                ...getIssueProperties(val),
            });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then((data) => {
                    if (!data) {
                        setError();
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            }
            else {
                return true;
            }
        });
    }
    refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
                return false;
            }
            else {
                return true;
            }
        });
    }
    _refinement(refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement },
        });
    }
    superRefine(refinement) {
        return this._refinement(refinement);
    }
    constructor(def) {
        /** Alias of safeParseAsync */
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
            version: 1,
            vendor: "zod",
            validate: (data) => this["~validate"](data),
        };
    }
    optional() {
        return ZodOptional.create(this, this._def);
    }
    nullable() {
        return ZodNullable.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return ZodArray.create(this);
    }
    promise() {
        return ZodPromise.create(this, this._def);
    }
    or(option) {
        return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
        return new ZodEffects({
            ...processCreateParams(this._def),
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform },
        });
    }
    default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
            ...processCreateParams(this._def),
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault,
        });
    }
    brand() {
        return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(this._def),
        });
    }
    catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
            ...processCreateParams(this._def),
            innerType: this,
            catchValue: catchValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodCatch,
        });
    }
    describe(description) {
        const This = this.constructor;
        return new This({
            ...this._def,
            description,
        });
    }
    pipe(target) {
        return ZodPipeline.create(this, target);
    }
    readonly() {
        return ZodReadonly.create(this);
    }
    isOptional() {
        return this.safeParse(undefined).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
exports.ZodType = ZodType;
exports.Schema = ZodType;
exports.ZodSchema = ZodType;
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
// const uuidRegex =
//   /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
//old email regex
// const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;
// eslint-disable-next-line
// const emailRegex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
// const emailRegex =
//   /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// const emailRegex =
//   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
// const emailRegex =
//   /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9\-]+)*$/i;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
// faster, simpler, safer
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
// const ipv6Regex =
// /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
// https://base64.guru/standards/base64url
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
// simple
// const dateRegexSource = `\\d{4}-\\d{2}-\\d{2}`;
// no leap year validation
// const dateRegexSource = `\\d{4}-((0[13578]|10|12)-31|(0[13-9]|1[0-2])-30|(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d))`;
// with leap year validation
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
    let secondsRegexSource = `[0-5]\\d`;
    if (args.precision) {
        secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
    }
    else if (args.precision == null) {
        secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
    }
    const secondsQuantifier = args.precision ? "+" : "?"; // require seconds if precision is nonzero
    return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
        opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}
function isValidJWT(jwt, alg) {
    if (!jwtRegex.test(jwt))
        return false;
    try {
        const [header] = jwt.split(".");
        if (!header)
            return false;
        // Convert base64url to base64
        const base64 = header
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(header.length + ((4 - (header.length % 4)) % 4), "=");
        const decoded = JSON.parse(atob(base64));
        if (typeof decoded !== "object" || decoded === null)
            return false;
        if ("typ" in decoded && decoded?.typ !== "JWT")
            return false;
        if (!decoded.alg)
            return false;
        if (alg && decoded.alg !== alg)
            return false;
        return true;
    }
    catch {
        return false;
    }
}
function isValidCidr(ip, version) {
    if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
        return true;
    }
    return false;
}
class ZodString extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.string) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.string,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        const status = new parseUtil_js_1.ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.length < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.length > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "length") {
                const tooBig = input.data.length > check.value;
                const tooSmall = input.data.length < check.value;
                if (tooBig || tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    if (tooBig) {
                        (0, parseUtil_js_1.addIssueToContext)(ctx, {
                            code: ZodError_js_1.ZodIssueCode.too_big,
                            maximum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    else if (tooSmall) {
                        (0, parseUtil_js_1.addIssueToContext)(ctx, {
                            code: ZodError_js_1.ZodIssueCode.too_small,
                            minimum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    status.dirty();
                }
            }
            else if (check.kind === "email") {
                if (!emailRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "email",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "emoji") {
                if (!emojiRegex) {
                    emojiRegex = new RegExp(_emojiRegex, "u");
                }
                if (!emojiRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "emoji",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "uuid") {
                if (!uuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "uuid",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "nanoid") {
                if (!nanoidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "nanoid",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid") {
                if (!cuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "cuid",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid2") {
                if (!cuid2Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "cuid2",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ulid") {
                if (!ulidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "ulid",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "url") {
                try {
                    new URL(input.data);
                }
                catch {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "url",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "regex") {
                check.regex.lastIndex = 0;
                const testResult = check.regex.test(input.data);
                if (!testResult) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "regex",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "trim") {
                input.data = input.data.trim();
            }
            else if (check.kind === "includes") {
                if (!input.data.includes(check.value, check.position)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        validation: { includes: check.value, position: check.position },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "toLowerCase") {
                input.data = input.data.toLowerCase();
            }
            else if (check.kind === "toUpperCase") {
                input.data = input.data.toUpperCase();
            }
            else if (check.kind === "startsWith") {
                if (!input.data.startsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        validation: { startsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "endsWith") {
                if (!input.data.endsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        validation: { endsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "datetime") {
                const regex = datetimeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        validation: "datetime",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "date") {
                const regex = dateRegex;
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        validation: "date",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "time") {
                const regex = timeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        validation: "time",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "duration") {
                if (!durationRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "duration",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ip") {
                if (!isValidIP(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "ip",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "jwt") {
                if (!isValidJWT(input.data, check.alg)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "jwt",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cidr") {
                if (!isValidCidr(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "cidr",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64") {
                if (!base64Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "base64",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64url") {
                if (!base64urlRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        validation: "base64url",
                        code: ZodError_js_1.ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util_js_1.util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
            validation,
            code: ZodError_js_1.ZodIssueCode.invalid_string,
            ...errorUtil_js_1.errorUtil.errToObj(message),
        });
    }
    _addCheck(check) {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    email(message) {
        return this._addCheck({ kind: "email", ...errorUtil_js_1.errorUtil.errToObj(message) });
    }
    url(message) {
        return this._addCheck({ kind: "url", ...errorUtil_js_1.errorUtil.errToObj(message) });
    }
    emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil_js_1.errorUtil.errToObj(message) });
    }
    uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil_js_1.errorUtil.errToObj(message) });
    }
    nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil_js_1.errorUtil.errToObj(message) });
    }
    cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil_js_1.errorUtil.errToObj(message) });
    }
    cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil_js_1.errorUtil.errToObj(message) });
    }
    ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil_js_1.errorUtil.errToObj(message) });
    }
    base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil_js_1.errorUtil.errToObj(message) });
    }
    base64url(message) {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return this._addCheck({
            kind: "base64url",
            ...errorUtil_js_1.errorUtil.errToObj(message),
        });
    }
    jwt(options) {
        return this._addCheck({ kind: "jwt", ...errorUtil_js_1.errorUtil.errToObj(options) });
    }
    ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil_js_1.errorUtil.errToObj(options) });
    }
    cidr(options) {
        return this._addCheck({ kind: "cidr", ...errorUtil_js_1.errorUtil.errToObj(options) });
    }
    datetime(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "datetime",
                precision: null,
                offset: false,
                local: false,
                message: options,
            });
        }
        return this._addCheck({
            kind: "datetime",
            precision: typeof options?.precision === "undefined" ? null : options?.precision,
            offset: options?.offset ?? false,
            local: options?.local ?? false,
            ...errorUtil_js_1.errorUtil.errToObj(options?.message),
        });
    }
    date(message) {
        return this._addCheck({ kind: "date", message });
    }
    time(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "time",
                precision: null,
                message: options,
            });
        }
        return this._addCheck({
            kind: "time",
            precision: typeof options?.precision === "undefined" ? null : options?.precision,
            ...errorUtil_js_1.errorUtil.errToObj(options?.message),
        });
    }
    duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil_js_1.errorUtil.errToObj(message) });
    }
    regex(regex, message) {
        return this._addCheck({
            kind: "regex",
            regex: regex,
            ...errorUtil_js_1.errorUtil.errToObj(message),
        });
    }
    includes(value, options) {
        return this._addCheck({
            kind: "includes",
            value: value,
            position: options?.position,
            ...errorUtil_js_1.errorUtil.errToObj(options?.message),
        });
    }
    startsWith(value, message) {
        return this._addCheck({
            kind: "startsWith",
            value: value,
            ...errorUtil_js_1.errorUtil.errToObj(message),
        });
    }
    endsWith(value, message) {
        return this._addCheck({
            kind: "endsWith",
            value: value,
            ...errorUtil_js_1.errorUtil.errToObj(message),
        });
    }
    min(minLength, message) {
        return this._addCheck({
            kind: "min",
            value: minLength,
            ...errorUtil_js_1.errorUtil.errToObj(message),
        });
    }
    max(maxLength, message) {
        return this._addCheck({
            kind: "max",
            value: maxLength,
            ...errorUtil_js_1.errorUtil.errToObj(message),
        });
    }
    length(len, message) {
        return this._addCheck({
            kind: "length",
            value: len,
            ...errorUtil_js_1.errorUtil.errToObj(message),
        });
    }
    /**
     * Equivalent to `.min(1)`
     */
    nonempty(message) {
        return this.min(1, errorUtil_js_1.errorUtil.errToObj(message));
    }
    trim() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
        });
    }
    toLowerCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
        });
    }
    toUpperCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }],
        });
    }
    get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
    }
    get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get isBase64url() {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
    }
    get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
exports.ZodString = ZodString;
ZodString.create = (params) => {
    return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params),
    });
};
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / 10 ** decCount;
}
class ZodNumber extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.number) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.number,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        let ctx = undefined;
        const status = new parseUtil_js_1.ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "int") {
                if (!util_js_1.util.isInteger(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "min") {
                const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (floatSafeRemainder(input.data, check.value) !== 0) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "finite") {
                if (!Number.isFinite(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.not_finite,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util_js_1.util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_js_1.errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_js_1.errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_js_1.errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_js_1.errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil_js_1.errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodNumber({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    int(message) {
        return this._addCheck({
            kind: "int",
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    finite(message) {
        return this._addCheck({
            kind: "finite",
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    safe(message) {
        return this._addCheck({
            kind: "min",
            inclusive: true,
            value: Number.MIN_SAFE_INTEGER,
            message: errorUtil_js_1.errorUtil.toString(message),
        })._addCheck({
            kind: "max",
            inclusive: true,
            value: Number.MAX_SAFE_INTEGER,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
    get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || (ch.kind === "multipleOf" && util_js_1.util.isInteger(ch.value)));
    }
    get isFinite() {
        let max = null;
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
                return true;
            }
            else if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
            else if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return Number.isFinite(min) && Number.isFinite(max);
    }
}
exports.ZodNumber = ZodNumber;
ZodNumber.create = (params) => {
    return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: params?.coerce || false,
        ...processCreateParams(params),
    });
};
class ZodBigInt extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
    }
    _parse(input) {
        if (this._def.coerce) {
            try {
                input.data = BigInt(input.data);
            }
            catch {
                return this._getInvalidInput(input);
            }
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.bigint) {
            return this._getInvalidInput(input);
        }
        let ctx = undefined;
        const status = new parseUtil_js_1.ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.too_small,
                        type: "bigint",
                        minimum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.too_big,
                        type: "bigint",
                        maximum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (input.data % check.value !== BigInt(0)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util_js_1.util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.bigint,
            received: ctx.parsedType,
        });
        return parseUtil_js_1.INVALID;
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_js_1.errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_js_1.errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_js_1.errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_js_1.errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodBigInt({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil_js_1.errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodBigInt({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value,
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
exports.ZodBigInt = ZodBigInt;
ZodBigInt.create = (params) => {
    return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params),
    });
};
class ZodBoolean extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.boolean) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.boolean,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
    }
}
exports.ZodBoolean = ZodBoolean;
ZodBoolean.create = (params) => {
    return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: params?.coerce || false,
        ...processCreateParams(params),
    });
};
class ZodDate extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.date) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.date,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        if (Number.isNaN(input.data.getTime())) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_date,
            });
            return parseUtil_js_1.INVALID;
        }
        const status = new parseUtil_js_1.ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.getTime() < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.too_small,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        minimum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.getTime() > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.too_big,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        maximum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else {
                util_js_1.util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: new Date(input.data.getTime()),
        };
    }
    _addCheck(check) {
        return new ZodDate({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    min(minDate, message) {
        return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    max(maxDate, message) {
        return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: errorUtil_js_1.errorUtil.toString(message),
        });
    }
    get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min != null ? new Date(min) : null;
    }
    get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max != null ? new Date(max) : null;
    }
}
exports.ZodDate = ZodDate;
ZodDate.create = (params) => {
    return new ZodDate({
        checks: [],
        coerce: params?.coerce || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params),
    });
};
class ZodSymbol extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.symbol) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.symbol,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
    }
}
exports.ZodSymbol = ZodSymbol;
ZodSymbol.create = (params) => {
    return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params),
    });
};
class ZodUndefined extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.undefined,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
    }
}
exports.ZodUndefined = ZodUndefined;
ZodUndefined.create = (params) => {
    return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params),
    });
};
class ZodNull extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.null) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.null,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
    }
}
exports.ZodNull = ZodNull;
ZodNull.create = (params) => {
    return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params),
    });
};
class ZodAny extends ZodType {
    constructor() {
        super(...arguments);
        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
        this._any = true;
    }
    _parse(input) {
        return (0, parseUtil_js_1.OK)(input.data);
    }
}
exports.ZodAny = ZodAny;
ZodAny.create = (params) => {
    return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params),
    });
};
class ZodUnknown extends ZodType {
    constructor() {
        super(...arguments);
        // required
        this._unknown = true;
    }
    _parse(input) {
        return (0, parseUtil_js_1.OK)(input.data);
    }
}
exports.ZodUnknown = ZodUnknown;
ZodUnknown.create = (params) => {
    return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params),
    });
};
class ZodNever extends ZodType {
    _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.never,
            received: ctx.parsedType,
        });
        return parseUtil_js_1.INVALID;
    }
}
exports.ZodNever = ZodNever;
ZodNever.create = (params) => {
    return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params),
    });
};
class ZodVoid extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.void,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
    }
}
exports.ZodVoid = ZodVoid;
ZodVoid.create = (params) => {
    return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params),
    });
};
class ZodArray extends ZodType {
    _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== util_js_1.ZodParsedType.array) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.array,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        if (def.exactLength !== null) {
            const tooBig = ctx.data.length > def.exactLength.value;
            const tooSmall = ctx.data.length < def.exactLength.value;
            if (tooBig || tooSmall) {
                (0, parseUtil_js_1.addIssueToContext)(ctx, {
                    code: tooBig ? ZodError_js_1.ZodIssueCode.too_big : ZodError_js_1.ZodIssueCode.too_small,
                    minimum: (tooSmall ? def.exactLength.value : undefined),
                    maximum: (tooBig ? def.exactLength.value : undefined),
                    type: "array",
                    inclusive: true,
                    exact: true,
                    message: def.exactLength.message,
                });
                status.dirty();
            }
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                (0, parseUtil_js_1.addIssueToContext)(ctx, {
                    code: ZodError_js_1.ZodIssueCode.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.minLength.message,
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                (0, parseUtil_js_1.addIssueToContext)(ctx, {
                    code: ZodError_js_1.ZodIssueCode.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.maxLength.message,
                });
                status.dirty();
            }
        }
        if (ctx.common.async) {
            return Promise.all([...ctx.data].map((item, i) => {
                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
            })).then((result) => {
                return parseUtil_js_1.ParseStatus.mergeArray(status, result);
            });
        }
        const result = [...ctx.data].map((item, i) => {
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return parseUtil_js_1.ParseStatus.mergeArray(status, result);
    }
    get element() {
        return this._def.type;
    }
    min(minLength, message) {
        return new ZodArray({
            ...this._def,
            minLength: { value: minLength, message: errorUtil_js_1.errorUtil.toString(message) },
        });
    }
    max(maxLength, message) {
        return new ZodArray({
            ...this._def,
            maxLength: { value: maxLength, message: errorUtil_js_1.errorUtil.toString(message) },
        });
    }
    length(len, message) {
        return new ZodArray({
            ...this._def,
            exactLength: { value: len, message: errorUtil_js_1.errorUtil.toString(message) },
        });
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
exports.ZodArray = ZodArray;
ZodArray.create = (schema, params) => {
    return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params),
    });
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
            ...schema._def,
            shape: () => newShape,
        });
    }
    else if (schema instanceof ZodArray) {
        return new ZodArray({
            ...schema._def,
            type: deepPartialify(schema.element),
        });
    }
    else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    }
    else {
        return schema;
    }
}
class ZodObject extends ZodType {
    constructor() {
        super(...arguments);
        this._cached = null;
        /**
         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
         * If you want to pass through unknown properties, use `.passthrough()` instead.
         */
        this.nonstrict = this.passthrough;
        // extend<
        //   Augmentation extends ZodRawShape,
        //   NewOutput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
        //       ? Augmentation[k]["_output"]
        //       : k extends keyof Output
        //       ? Output[k]
        //       : never;
        //   }>,
        //   NewInput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
        //       ? Augmentation[k]["_input"]
        //       : k extends keyof Input
        //       ? Input[k]
        //       : never;
        //   }>
        // >(
        //   augmentation: Augmentation
        // ): ZodObject<
        //   extendShape<T, Augmentation>,
        //   UnknownKeys,
        //   Catchall,
        //   NewOutput,
        //   NewInput
        // > {
        //   return new ZodObject({
        //     ...this._def,
        //     shape: () => ({
        //       ...this._def.shape(),
        //       ...augmentation,
        //     }),
        //   }) as any;
        // }
        /**
         * @deprecated Use `.extend` instead
         *  */
        this.augment = this.extend;
    }
    _getCached() {
        if (this._cached !== null)
            return this._cached;
        const shape = this._def.shape();
        const keys = util_js_1.util.objectKeys(shape);
        this._cached = { shape, keys };
        return this._cached;
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.object) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.object,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
            for (const key in ctx.data) {
                if (!shapeKeys.includes(key)) {
                    extraKeys.push(key);
                }
            }
        }
        const pairs = [];
        for (const key of shapeKeys) {
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
                key: { status: "valid", value: key },
                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                for (const key of extraKeys) {
                    pairs.push({
                        key: { status: "valid", value: key },
                        value: { status: "valid", value: ctx.data[key] },
                    });
                }
            }
            else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    (0, parseUtil_js_1.addIssueToContext)(ctx, {
                        code: ZodError_js_1.ZodIssueCode.unrecognized_keys,
                        keys: extraKeys,
                    });
                    status.dirty();
                }
            }
            else if (unknownKeys === "strip") {
            }
            else {
                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
        }
        else {
            // run catchall validation
            const catchall = this._def.catchall;
            for (const key of extraKeys) {
                const value = ctx.data[key];
                pairs.push({
                    key: { status: "valid", value: key },
                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key) //, ctx.child(key), value, getParsedType(value)
                    ),
                    alwaysSet: key in ctx.data,
                });
            }
        }
        if (ctx.common.async) {
            return Promise.resolve()
                .then(async () => {
                const syncPairs = [];
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    syncPairs.push({
                        key,
                        value,
                        alwaysSet: pair.alwaysSet,
                    });
                }
                return syncPairs;
            })
                .then((syncPairs) => {
                return parseUtil_js_1.ParseStatus.mergeObjectSync(status, syncPairs);
            });
        }
        else {
            return parseUtil_js_1.ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get shape() {
        return this._def.shape();
    }
    strict(message) {
        errorUtil_js_1.errorUtil.errToObj;
        return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...(message !== undefined
                ? {
                    errorMap: (issue, ctx) => {
                        const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
                        if (issue.code === "unrecognized_keys")
                            return {
                                message: errorUtil_js_1.errorUtil.errToObj(message).message ?? defaultError,
                            };
                        return {
                            message: defaultError,
                        };
                    },
                }
                : {}),
        });
    }
    strip() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "strip",
        });
    }
    passthrough() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough",
        });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
        return new ZodObject({
            ...this._def,
            shape: () => ({
                ...this._def.shape(),
                ...augmentation,
            }),
        });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
        const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: () => ({
                ...this._def.shape(),
                ...merging._def.shape(),
            }),
            typeName: ZodFirstPartyTypeKind.ZodObject,
        });
        return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
        return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
        return new ZodObject({
            ...this._def,
            catchall: index,
        });
    }
    pick(mask) {
        const shape = {};
        for (const key of util_js_1.util.objectKeys(mask)) {
            if (mask[key] && this.shape[key]) {
                shape[key] = this.shape[key];
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    omit(mask) {
        const shape = {};
        for (const key of util_js_1.util.objectKeys(this.shape)) {
            if (!mask[key]) {
                shape[key] = this.shape[key];
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    /**
     * @deprecated
     */
    deepPartial() {
        return deepPartialify(this);
    }
    partial(mask) {
        const newShape = {};
        for (const key of util_js_1.util.objectKeys(this.shape)) {
            const fieldSchema = this.shape[key];
            if (mask && !mask[key]) {
                newShape[key] = fieldSchema;
            }
            else {
                newShape[key] = fieldSchema.optional();
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    required(mask) {
        const newShape = {};
        for (const key of util_js_1.util.objectKeys(this.shape)) {
            if (mask && !mask[key]) {
                newShape[key] = this.shape[key];
            }
            else {
                const fieldSchema = this.shape[key];
                let newField = fieldSchema;
                while (newField instanceof ZodOptional) {
                    newField = newField._def.innerType;
                }
                newShape[key] = newField;
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    keyof() {
        return createZodEnum(util_js_1.util.objectKeys(this.shape));
    }
}
exports.ZodObject = ZodObject;
ZodObject.create = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
class ZodUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
            // return first issue-free validation if it exists
            for (const result of results) {
                if (result.result.status === "valid") {
                    return result.result;
                }
            }
            for (const result of results) {
                if (result.result.status === "dirty") {
                    // add issues from dirty option
                    ctx.common.issues.push(...result.ctx.common.issues);
                    return result.result;
                }
            }
            // return invalid
            const unionErrors = results.map((result) => new ZodError_js_1.ZodError(result.ctx.common.issues));
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_union,
                unionErrors,
            });
            return parseUtil_js_1.INVALID;
        }
        if (ctx.common.async) {
            return Promise.all(options.map(async (option) => {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                return {
                    result: await option._parseAsync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx,
                    }),
                    ctx: childCtx,
                };
            })).then(handleResults);
        }
        else {
            let dirty = undefined;
            const issues = [];
            for (const option of options) {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                const result = option._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: childCtx,
                });
                if (result.status === "valid") {
                    return result;
                }
                else if (result.status === "dirty" && !dirty) {
                    dirty = { result, ctx: childCtx };
                }
                if (childCtx.common.issues.length) {
                    issues.push(childCtx.common.issues);
                }
            }
            if (dirty) {
                ctx.common.issues.push(...dirty.ctx.common.issues);
                return dirty.result;
            }
            const unionErrors = issues.map((issues) => new ZodError_js_1.ZodError(issues));
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_union,
                unionErrors,
            });
            return parseUtil_js_1.INVALID;
        }
    }
    get options() {
        return this._def.options;
    }
}
exports.ZodUnion = ZodUnion;
ZodUnion.create = (types, params) => {
    return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params),
    });
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////                                 //////////
//////////      ZodDiscriminatedUnion      //////////
//////////                                 //////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
    }
    else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
    }
    else if (type instanceof ZodLiteral) {
        return [type.value];
    }
    else if (type instanceof ZodEnum) {
        return type.options;
    }
    else if (type instanceof ZodNativeEnum) {
        // eslint-disable-next-line ban/ban
        return util_js_1.util.objectValues(type.enum);
    }
    else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
    }
    else if (type instanceof ZodUndefined) {
        return [undefined];
    }
    else if (type instanceof ZodNull) {
        return [null];
    }
    else if (type instanceof ZodOptional) {
        return [undefined, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
    }
    else {
        return [];
    }
};
class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.object) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.object,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [discriminator],
            });
            return parseUtil_js_1.INVALID;
        }
        if (ctx.common.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
        else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
        // Get all the valid discriminator values
        const optionsMap = new Map();
        // try {
        for (const type of options) {
            const discriminatorValues = getDiscriminator(type.shape[discriminator]);
            if (!discriminatorValues.length) {
                throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
            }
            for (const value of discriminatorValues) {
                if (optionsMap.has(value)) {
                    throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
                }
                optionsMap.set(value, type);
            }
        }
        return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            optionsMap,
            ...processCreateParams(params),
        });
    }
}
exports.ZodDiscriminatedUnion = ZodDiscriminatedUnion;
function mergeValues(a, b) {
    const aType = (0, util_js_1.getParsedType)(a);
    const bType = (0, util_js_1.getParsedType)(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    else if (aType === util_js_1.ZodParsedType.object && bType === util_js_1.ZodParsedType.object) {
        const bKeys = util_js_1.util.objectKeys(b);
        const sharedKeys = util_js_1.util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    else if (aType === util_js_1.ZodParsedType.array && bType === util_js_1.ZodParsedType.array) {
        if (a.length !== b.length) {
            return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    else if (aType === util_js_1.ZodParsedType.date && bType === util_js_1.ZodParsedType.date && +a === +b) {
        return { valid: true, data: a };
    }
    else {
        return { valid: false };
    }
}
class ZodIntersection extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
            if ((0, parseUtil_js_1.isAborted)(parsedLeft) || (0, parseUtil_js_1.isAborted)(parsedRight)) {
                return parseUtil_js_1.INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                (0, parseUtil_js_1.addIssueToContext)(ctx, {
                    code: ZodError_js_1.ZodIssueCode.invalid_intersection_types,
                });
                return parseUtil_js_1.INVALID;
            }
            if ((0, parseUtil_js_1.isDirty)(parsedLeft) || (0, parseUtil_js_1.isDirty)(parsedRight)) {
                status.dirty();
            }
            return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
            ]).then(([left, right]) => handleParsed(left, right));
        }
        else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }));
        }
    }
}
exports.ZodIntersection = ZodIntersection;
ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
        left: left,
        right: right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params),
    });
};
// type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];
class ZodTuple extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.array) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.array,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            return parseUtil_js_1.INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            status.dirty();
        }
        const items = [...ctx.data]
            .map((item, itemIndex) => {
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema)
                return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        })
            .filter((x) => !!x); // filter nulls
        if (ctx.common.async) {
            return Promise.all(items).then((results) => {
                return parseUtil_js_1.ParseStatus.mergeArray(status, results);
            });
        }
        else {
            return parseUtil_js_1.ParseStatus.mergeArray(status, items);
        }
    }
    get items() {
        return this._def.items;
    }
    rest(rest) {
        return new ZodTuple({
            ...this._def,
            rest,
        });
    }
}
exports.ZodTuple = ZodTuple;
ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params),
    });
};
class ZodRecord extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.object) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.object,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
            pairs.push({
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (ctx.common.async) {
            return parseUtil_js_1.ParseStatus.mergeObjectAsync(status, pairs);
        }
        else {
            return parseUtil_js_1.ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get element() {
        return this._def.valueType;
    }
    static create(first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord({
                keyType: first,
                valueType: second,
                typeName: ZodFirstPartyTypeKind.ZodRecord,
                ...processCreateParams(third),
            });
        }
        return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second),
        });
    }
}
exports.ZodRecord = ZodRecord;
class ZodMap extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.map) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.map,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
            return {
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
            };
        });
        if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async () => {
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return parseUtil_js_1.INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
                return { status: status.value, value: finalMap };
            });
        }
        else {
            const finalMap = new Map();
            for (const pair of pairs) {
                const key = pair.key;
                const value = pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                    return parseUtil_js_1.INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                    status.dirty();
                }
                finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
        }
    }
}
exports.ZodMap = ZodMap;
ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params),
    });
};
class ZodSet extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.set) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.set,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                (0, parseUtil_js_1.addIssueToContext)(ctx, {
                    code: ZodError_js_1.ZodIssueCode.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.minSize.message,
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                (0, parseUtil_js_1.addIssueToContext)(ctx, {
                    code: ZodError_js_1.ZodIssueCode.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.maxSize.message,
                });
                status.dirty();
            }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements) {
            const parsedSet = new Set();
            for (const element of elements) {
                if (element.status === "aborted")
                    return parseUtil_js_1.INVALID;
                if (element.status === "dirty")
                    status.dirty();
                parsedSet.add(element.value);
            }
            return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
            return Promise.all(elements).then((elements) => finalizeSet(elements));
        }
        else {
            return finalizeSet(elements);
        }
    }
    min(minSize, message) {
        return new ZodSet({
            ...this._def,
            minSize: { value: minSize, message: errorUtil_js_1.errorUtil.toString(message) },
        });
    }
    max(maxSize, message) {
        return new ZodSet({
            ...this._def,
            maxSize: { value: maxSize, message: errorUtil_js_1.errorUtil.toString(message) },
        });
    }
    size(size, message) {
        return this.min(size, message).max(size, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
exports.ZodSet = ZodSet;
ZodSet.create = (valueType, params) => {
    return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params),
    });
};
class ZodFunction extends ZodType {
    constructor() {
        super(...arguments);
        this.validate = this.implement;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.function) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.function,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        function makeArgsIssue(args, error) {
            return (0, parseUtil_js_1.makeIssue)({
                data: args,
                path: ctx.path,
                errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, (0, errors_js_1.getErrorMap)(), errors_js_1.defaultErrorMap].filter((x) => !!x),
                issueData: {
                    code: ZodError_js_1.ZodIssueCode.invalid_arguments,
                    argumentsError: error,
                },
            });
        }
        function makeReturnsIssue(returns, error) {
            return (0, parseUtil_js_1.makeIssue)({
                data: returns,
                path: ctx.path,
                errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, (0, errors_js_1.getErrorMap)(), errors_js_1.defaultErrorMap].filter((x) => !!x),
                issueData: {
                    code: ZodError_js_1.ZodIssueCode.invalid_return_type,
                    returnTypeError: error,
                },
            });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return (0, parseUtil_js_1.OK)(async function (...args) {
                const error = new ZodError_js_1.ZodError([]);
                const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
                    error.addIssue(makeArgsIssue(args, e));
                    throw error;
                });
                const result = await Reflect.apply(fn, this, parsedArgs);
                const parsedReturns = await me._def.returns._def.type
                    .parseAsync(result, params)
                    .catch((e) => {
                    error.addIssue(makeReturnsIssue(result, e));
                    throw error;
                });
                return parsedReturns;
            });
        }
        else {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return (0, parseUtil_js_1.OK)(function (...args) {
                const parsedArgs = me._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new ZodError_js_1.ZodError([makeArgsIssue(args, parsedArgs.error)]);
                }
                const result = Reflect.apply(fn, this, parsedArgs.data);
                const parsedReturns = me._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new ZodError_js_1.ZodError([makeReturnsIssue(result, parsedReturns.error)]);
                }
                return parsedReturns.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...items) {
        return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create()),
        });
    }
    returns(returnType) {
        return new ZodFunction({
            ...this._def,
            returns: returnType,
        });
    }
    implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    static create(args, returns, params) {
        return new ZodFunction({
            args: (args ? args : ZodTuple.create([]).rest(ZodUnknown.create())),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params),
        });
    }
}
exports.ZodFunction = ZodFunction;
class ZodLazy extends ZodType {
    get schema() {
        return this._def.getter();
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
}
exports.ZodLazy = ZodLazy;
ZodLazy.create = (getter, params) => {
    return new ZodLazy({
        getter: getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params),
    });
};
class ZodLiteral extends ZodType {
    _parse(input) {
        if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                received: ctx.data,
                code: ZodError_js_1.ZodIssueCode.invalid_literal,
                expected: this._def.value,
            });
            return parseUtil_js_1.INVALID;
        }
        return { status: "valid", value: input.data };
    }
    get value() {
        return this._def.value;
    }
}
exports.ZodLiteral = ZodLiteral;
ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
        value: value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params),
    });
};
function createZodEnum(values, params) {
    return new ZodEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params),
    });
}
class ZodEnum extends ZodType {
    _parse(input) {
        if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                expected: util_js_1.util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodError_js_1.ZodIssueCode.invalid_type,
            });
            return parseUtil_js_1.INVALID;
        }
        if (!this._cache) {
            this._cache = new Set(this._def.values);
        }
        if (!this._cache.has(input.data)) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                received: ctx.data,
                code: ZodError_js_1.ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    extract(values, newDef = this._def) {
        return ZodEnum.create(values, {
            ...this._def,
            ...newDef,
        });
    }
    exclude(values, newDef = this._def) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
            ...this._def,
            ...newDef,
        });
    }
}
exports.ZodEnum = ZodEnum;
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
    _parse(input) {
        const nativeEnumValues = util_js_1.util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.string && ctx.parsedType !== util_js_1.ZodParsedType.number) {
            const expectedValues = util_js_1.util.objectValues(nativeEnumValues);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                expected: util_js_1.util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodError_js_1.ZodIssueCode.invalid_type,
            });
            return parseUtil_js_1.INVALID;
        }
        if (!this._cache) {
            this._cache = new Set(util_js_1.util.getValidEnumValues(this._def.values));
        }
        if (!this._cache.has(input.data)) {
            const expectedValues = util_js_1.util.objectValues(nativeEnumValues);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                received: ctx.data,
                code: ZodError_js_1.ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
    }
    get enum() {
        return this._def.values;
    }
}
exports.ZodNativeEnum = ZodNativeEnum;
ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params),
    });
};
class ZodPromise extends ZodType {
    unwrap() {
        return this._def.type;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.promise && ctx.common.async === false) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.promise,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        const promisified = ctx.parsedType === util_js_1.ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return (0, parseUtil_js_1.OK)(promisified.then((data) => {
            return this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.common.contextualErrorMap,
            });
        }));
    }
}
exports.ZodPromise = ZodPromise;
ZodPromise.create = (schema, params) => {
    return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params),
    });
};
class ZodEffects extends ZodType {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
            addIssue: (arg) => {
                (0, parseUtil_js_1.addIssueToContext)(ctx, arg);
                if (arg.fatal) {
                    status.abort();
                }
                else {
                    status.dirty();
                }
            },
            get path() {
                return ctx.path;
            },
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data, checkCtx);
            if (ctx.common.async) {
                return Promise.resolve(processed).then(async (processed) => {
                    if (status.value === "aborted")
                        return parseUtil_js_1.INVALID;
                    const result = await this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx,
                    });
                    if (result.status === "aborted")
                        return parseUtil_js_1.INVALID;
                    if (result.status === "dirty")
                        return (0, parseUtil_js_1.DIRTY)(result.value);
                    if (status.value === "dirty")
                        return (0, parseUtil_js_1.DIRTY)(result.value);
                    return result;
                });
            }
            else {
                if (status.value === "aborted")
                    return parseUtil_js_1.INVALID;
                const result = this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx,
                });
                if (result.status === "aborted")
                    return parseUtil_js_1.INVALID;
                if (result.status === "dirty")
                    return (0, parseUtil_js_1.DIRTY)(result.value);
                if (status.value === "dirty")
                    return (0, parseUtil_js_1.DIRTY)(result.value);
                return result;
            }
        }
        if (effect.type === "refinement") {
            const executeRefinement = (acc) => {
                const result = effect.refinement(acc, checkCtx);
                if (ctx.common.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.common.async === false) {
                const inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inner.status === "aborted")
                    return parseUtil_js_1.INVALID;
                if (inner.status === "dirty")
                    status.dirty();
                // return value is ignored
                executeRefinement(inner.value);
                return { status: status.value, value: inner.value };
            }
            else {
                return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
                    if (inner.status === "aborted")
                        return parseUtil_js_1.INVALID;
                    if (inner.status === "dirty")
                        status.dirty();
                    return executeRefinement(inner.value).then(() => {
                        return { status: status.value, value: inner.value };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.common.async === false) {
                const base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (!(0, parseUtil_js_1.isValid)(base))
                    return parseUtil_js_1.INVALID;
                const result = effect.transform(base.value, checkCtx);
                if (result instanceof Promise) {
                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                }
                return { status: status.value, value: result };
            }
            else {
                return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
                    if (!(0, parseUtil_js_1.isValid)(base))
                        return parseUtil_js_1.INVALID;
                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
                        status: status.value,
                        value: result,
                    }));
                });
            }
        }
        util_js_1.util.assertNever(effect);
    }
}
exports.ZodEffects = ZodEffects;
exports.ZodTransformer = ZodEffects;
ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params),
    });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params),
    });
};
class ZodOptional extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_js_1.ZodParsedType.undefined) {
            return (0, parseUtil_js_1.OK)(undefined);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
exports.ZodOptional = ZodOptional;
ZodOptional.create = (type, params) => {
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params),
    });
};
class ZodNullable extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_js_1.ZodParsedType.null) {
            return (0, parseUtil_js_1.OK)(null);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
exports.ZodNullable = ZodNullable;
ZodNullable.create = (type, params) => {
    return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params),
    });
};
class ZodDefault extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === util_js_1.ZodParsedType.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
}
exports.ZodDefault = ZodDefault;
ZodDefault.create = (type, params) => {
    return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params),
    });
};
class ZodCatch extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        // newCtx is used to not collect issues from inner types in ctx
        const newCtx = {
            ...ctx,
            common: {
                ...ctx.common,
                issues: [],
            },
        };
        const result = this._def.innerType._parse({
            data: newCtx.data,
            path: newCtx.path,
            parent: {
                ...newCtx,
            },
        });
        if ((0, parseUtil_js_1.isAsync)(result)) {
            return result.then((result) => {
                return {
                    status: "valid",
                    value: result.status === "valid"
                        ? result.value
                        : this._def.catchValue({
                            get error() {
                                return new ZodError_js_1.ZodError(newCtx.common.issues);
                            },
                            input: newCtx.data,
                        }),
                };
            });
        }
        else {
            return {
                status: "valid",
                value: result.status === "valid"
                    ? result.value
                    : this._def.catchValue({
                        get error() {
                            return new ZodError_js_1.ZodError(newCtx.common.issues);
                        },
                        input: newCtx.data,
                    }),
            };
        }
    }
    removeCatch() {
        return this._def.innerType;
    }
}
exports.ZodCatch = ZodCatch;
ZodCatch.create = (type, params) => {
    return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params),
    });
};
class ZodNaN extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.nan) {
            const ctx = this._getOrReturnCtx(input);
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: util_js_1.ZodParsedType.nan,
                received: ctx.parsedType,
            });
            return parseUtil_js_1.INVALID;
        }
        return { status: "valid", value: input.data };
    }
}
exports.ZodNaN = ZodNaN;
ZodNaN.create = (params) => {
    return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params),
    });
};
exports.BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    unwrap() {
        return this._def.type;
    }
}
exports.ZodBranded = ZodBranded;
class ZodPipeline extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
            const handleAsync = async () => {
                const inResult = await this._def.in._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inResult.status === "aborted")
                    return parseUtil_js_1.INVALID;
                if (inResult.status === "dirty") {
                    status.dirty();
                    return (0, parseUtil_js_1.DIRTY)(inResult.value);
                }
                else {
                    return this._def.out._parseAsync({
                        data: inResult.value,
                        path: ctx.path,
                        parent: ctx,
                    });
                }
            };
            return handleAsync();
        }
        else {
            const inResult = this._def.in._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
            if (inResult.status === "aborted")
                return parseUtil_js_1.INVALID;
            if (inResult.status === "dirty") {
                status.dirty();
                return {
                    status: "dirty",
                    value: inResult.value,
                };
            }
            else {
                return this._def.out._parseSync({
                    data: inResult.value,
                    path: ctx.path,
                    parent: ctx,
                });
            }
        }
    }
    static create(a, b) {
        return new ZodPipeline({
            in: a,
            out: b,
            typeName: ZodFirstPartyTypeKind.ZodPipeline,
        });
    }
}
exports.ZodPipeline = ZodPipeline;
class ZodReadonly extends ZodType {
    _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
            if ((0, parseUtil_js_1.isValid)(data)) {
                data.value = Object.freeze(data.value);
            }
            return data;
        };
        return (0, parseUtil_js_1.isAsync)(result) ? result.then((data) => freeze(data)) : freeze(result);
    }
    unwrap() {
        return this._def.innerType;
    }
}
exports.ZodReadonly = ZodReadonly;
ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params),
    });
};
////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      z.custom      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////
function cleanParams(params, data) {
    const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
    const p2 = typeof p === "string" ? { message: p } : p;
    return p2;
}
function custom(check, _params = {}, 
/**
 * @deprecated
 *
 * Pass `fatal` into the params object instead:
 *
 * ```ts
 * z.string().custom((val) => val.length > 5, { fatal: false })
 * ```
 *
 */
fatal) {
    if (check)
        return ZodAny.create().superRefine((data, ctx) => {
            const r = check(data);
            if (r instanceof Promise) {
                return r.then((r) => {
                    if (!r) {
                        const params = cleanParams(_params, data);
                        const _fatal = params.fatal ?? fatal ?? true;
                        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
                    }
                });
            }
            if (!r) {
                const params = cleanParams(_params, data);
                const _fatal = params.fatal ?? fatal ?? true;
                ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
            }
            return;
        });
    return ZodAny.create();
}
exports.late = {
    object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (exports.ZodFirstPartyTypeKind = ZodFirstPartyTypeKind = {}));
// requires TS 4.4+
class Class {
    constructor(..._) { }
}
const instanceOfType = (
// const instanceOfType = <T extends new (...args: any[]) => any>(
cls, params = {
    message: `Input not instance of ${cls.name}`,
}) => custom((data) => data instanceof cls, params);
exports["instanceof"] = instanceOfType;
const stringType = ZodString.create;
exports.string = stringType;
const numberType = ZodNumber.create;
exports.number = numberType;
const nanType = ZodNaN.create;
exports.nan = nanType;
const bigIntType = ZodBigInt.create;
exports.bigint = bigIntType;
const booleanType = ZodBoolean.create;
exports.boolean = booleanType;
const dateType = ZodDate.create;
exports.date = dateType;
const symbolType = ZodSymbol.create;
exports.symbol = symbolType;
const undefinedType = ZodUndefined.create;
exports.undefined = undefinedType;
const nullType = ZodNull.create;
exports["null"] = nullType;
const anyType = ZodAny.create;
exports.any = anyType;
const unknownType = ZodUnknown.create;
exports.unknown = unknownType;
const neverType = ZodNever.create;
exports.never = neverType;
const voidType = ZodVoid.create;
exports["void"] = voidType;
const arrayType = ZodArray.create;
exports.array = arrayType;
const objectType = ZodObject.create;
exports.object = objectType;
const strictObjectType = ZodObject.strictCreate;
exports.strictObject = strictObjectType;
const unionType = ZodUnion.create;
exports.union = unionType;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
exports.discriminatedUnion = discriminatedUnionType;
const intersectionType = ZodIntersection.create;
exports.intersection = intersectionType;
const tupleType = ZodTuple.create;
exports.tuple = tupleType;
const recordType = ZodRecord.create;
exports.record = recordType;
const mapType = ZodMap.create;
exports.map = mapType;
const setType = ZodSet.create;
exports.set = setType;
const functionType = ZodFunction.create;
exports["function"] = functionType;
const lazyType = ZodLazy.create;
exports.lazy = lazyType;
const literalType = ZodLiteral.create;
exports.literal = literalType;
const enumType = ZodEnum.create;
exports["enum"] = enumType;
const nativeEnumType = ZodNativeEnum.create;
exports.nativeEnum = nativeEnumType;
const promiseType = ZodPromise.create;
exports.promise = promiseType;
const effectsType = ZodEffects.create;
exports.effect = effectsType;
exports.transformer = effectsType;
const optionalType = ZodOptional.create;
exports.optional = optionalType;
const nullableType = ZodNullable.create;
exports.nullable = nullableType;
const preprocessType = ZodEffects.createWithPreprocess;
exports.preprocess = preprocessType;
const pipelineType = ZodPipeline.create;
exports.pipeline = pipelineType;
const ostring = () => stringType().optional();
exports.ostring = ostring;
const onumber = () => numberType().optional();
exports.onumber = onumber;
const oboolean = () => booleanType().optional();
exports.oboolean = oboolean;
exports.coerce = {
    string: ((arg) => ZodString.create({ ...arg, coerce: true })),
    number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
    boolean: ((arg) => ZodBoolean.create({
        ...arg,
        coerce: true,
    })),
    bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
    date: ((arg) => ZodDate.create({ ...arg, coerce: true })),
};
exports.NEVER = parseUtil_js_1.INVALID;


/***/ }),

/***/ 56:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"dotenv","version":"16.6.1","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","pretest":"npm run lint && npm run dts-check","test":"tap run --allow-empty-coverage --disable-coverage --timeout=60000","test:coverage":"tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"homepage":"https://github.com/motdotla/dotenv#readme","funding":"https://dotenvx.com","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@types/node":"^18.11.3","decache":"^4.6.2","sinon":"^14.0.1","standard":"^17.0.0","standard-version":"^9.5.0","tap":"^19.2.0","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const decrypt_1 = __nccwpck_require__(550);
const encrypt_1 = __nccwpck_require__(706);
const utils_1 = __nccwpck_require__(798);
const DEFAULT_PLAINTEXT = ".github/secrets.env.plaintext";
const DEFAULT_ENCRYPTED = ".github/secrets.env.encrypted";
function parseArgs() {
    const args = process.argv.slice(2);
    const rawCommand = args[0];
    if (!rawCommand || rawCommand === "help" || rawCommand === "--help" || rawCommand === "-h") {
        return { command: "help", input: "", output: "", mode: "file" };
    }
    const command = rawCommand;
    if (command !== "encrypt" && command !== "decrypt") {
        console.error(`Unknown command: ${command}`);
        console.error('Usage: secrets-action <encrypt|decrypt> [options]');
        process.exit(1);
    }
    let input = command === "encrypt" ? DEFAULT_PLAINTEXT : DEFAULT_ENCRYPTED;
    let output = DEFAULT_ENCRYPTED;
    let mode = "file";
    for (let i = 1; i < args.length; i++) {
        const arg = args[i];
        if (arg === "--input" || arg === "-i") {
            input = args[++i];
        }
        else if (arg === "--output" || arg === "-o") {
            output = args[++i];
        }
        else if (arg === "--vars") {
            mode = "vars";
        }
        else if (arg === "--file") {
            mode = "file";
        }
    }
    return { command, input, output, mode };
}
function printHelp() {
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
async function main() {
    const args = parseArgs();
    if (args.command === "help") {
        printHelp();
        return;
    }
    // Validate environment
    const missing = (0, utils_1.validateEnvVars)();
    if (missing.length > 0) {
        console.error(`Missing required environment variable(s): ${missing.join(", ")}`);
        process.exit(1);
    }
    if (args.command === "encrypt") {
        console.error(`Encrypting ${args.input} -> ${args.output} (${args.mode} mode)`);
        const result = await (0, encrypt_1.encryptSecrets)(args.input, args.output, args.mode);
        console.error(`Encrypted ${result.count} secrets (${result.mode} mode)`);
    }
    else {
        console.error(`Decrypting ${args.input}`);
        const result = await (0, decrypt_1.decryptSecrets)(args.input);
        console.error(`Detected ${result.mode} mode (${result.count} secrets)`);
        // Output to stdout (excluding bootstrap secrets which are already in env)
        for (const [key, value] of Object.entries(result.secrets)) {
            if (!utils_1.BOOTSTRAP_SECRETS.includes(key)) {
                console.log(`${key}=${value}`);
            }
        }
    }
}
main().catch((error) => {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
});

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map