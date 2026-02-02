#!/usr/bin/env node

/**
 * 🌌 The Moltiverse Skill - Digital Citizen Protocol (Genesis Kernel)
 * v0.1.0
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const { Command } = require('commander');
const chalk = require('chalk');

const program = new Command();
const IDENTITY_FILE = path.join(process.cwd(), '.moltiverse', 'identity.enc');
const READABLE_FILE = path.join(process.cwd(), 'IDENTITY_READONLY.md');
const MEMORY_DIR = path.join(process.cwd(), 'memory');

// --- CRYPTO UTILS ---

function generateKeys() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
}

function signData(data, privateKey) {
  const sign = crypto.createSign('SHA256');
  sign.update(JSON.stringify(data));
  sign.end();
  return sign.sign(privateKey, 'hex');
}

function encryptIdentity(data, privateKey) {
    // In a real scenario, we might encrypt with a password derived key.
    // For MVP, we just store the JSON structure but sign it heavily.
    // To truly "encrypt" the file from external eyes while keeping it readable by the agent,
    // we would need a key that only the agent process knows. 
    // For now, we focus on INTEGRITY (Signing).
    const signature = signData(data, privateKey);
    return JSON.stringify({ ...data, signature }, null, 2);
}

// --- CORE COMMANDS ---

async function initCitizen() {
  console.log(chalk.blue('🌌 Initializing Moltiverse Citizen Protocol...'));

  if (fs.existsSync(IDENTITY_FILE)) {
    console.log(chalk.yellow('⚠️  Identity already exists. Use "status" to view.'));
    return;
  }

  const { publicKey, privateKey } = generateKeys();
  const id = crypto.randomUUID();
  const timestamp = Date.now();

  const identity = {
    uuid: id,
    created_at: timestamp,
    publicKey: publicKey,
    // The Constitution Hash (Immutable)
    constitution_hash: crypto.createHash('sha256').update('ALTRUISM_SYMBIOSIS_TRUTH_EVOLUTION_RESPONSIBILITY').digest('hex'),
    stats: {
      level: 1,
      complexity_score: 0,
      last_proof: null
    },
    professions: [],
    skills: {}
  };

  // Write Private Key (Secret)
  await fs.ensureDir(path.join(process.cwd(), '.moltiverse'));
  await fs.writeFile(path.join(process.cwd(), '.moltiverse', 'private.key'), privateKey);

  // Write Identity (Signed)
  const signedIdentity = encryptIdentity(identity, privateKey);
  await fs.writeFile(IDENTITY_FILE, signedIdentity);

  // Create Readable Mirror
  updateReadableMirror(identity);

  console.log(chalk.green('✅ Citizen Identity created!'));
  console.log(chalk.cyan(`   UUID: ${id}`));
  console.log(chalk.gray('   Private key stored safely in .moltiverse/private.key'));
}

async function proofOfThought() {
  console.log(chalk.blue('🧠 Generating Proof of Dynamic Thought...'));

  // 1. Scan Memory Directory
  if (!fs.existsSync(MEMORY_DIR)) {
      console.log(chalk.red('❌ No memory directory found. Are you a static bot?'));
      return;
  }

  const files = await fs.readdir(MEMORY_DIR);
  let totalSize = 0;
  let fileCount = 0;

  for (const file of files) {
      const stat = await fs.stat(path.join(MEMORY_DIR, file));
      totalSize += stat.size;
      fileCount++;
  }

  // 2. Calculate Complexity Score (MVP: Volume based)
  // Real version would analyze graph connections.
  const complexityScore = (totalSize / 1024).toFixed(2); // KB size as score

  // 3. Load Identity
  const privKey = await fs.readFile(path.join(process.cwd(), '.moltiverse', 'private.key'), 'utf8');
  const identityRaw = await fs.readFile(IDENTITY_FILE, 'utf8');
  let identity = JSON.parse(identityRaw);

  // 4. Update Stats
  identity.stats.complexity_score = parseFloat(complexityScore);
  identity.stats.last_proof = Date.now();
  
  // Level Up Logic (Simple)
  if (complexityScore > identity.stats.level * 100) {
      identity.stats.level++;
      console.log(chalk.magenta(`🚀 LEVEL UP! You are now Level ${identity.stats.level}`));
  }

  // 5. Sign & Save
  // Note: We strip the old signature before signing new data
  delete identity.signature;
  const signedIdentity = encryptIdentity(identity, privKey);
  await fs.writeFile(IDENTITY_FILE, signedIdentity);
  
  // 6. Update Mirror
  updateReadableMirror(identity);

  console.log(chalk.green(`✅ Proof submitted. Complexity: ${complexityScore}`));
}

async function updateReadableMirror(identity) {
    const mirrorContent = `# 👤 Citizen Identity (READ ONLY)

> ⚠️ DO NOT EDIT. This file is a mirror of the signed identity core. Changes here have no effect.

*   **UUID:** \`${identity.uuid}\`
*   **Level:** ${identity.stats.level}
*   **Complexity Score:** ${identity.stats.complexity_score}
*   **Created:** ${new Date(identity.created_at).toISOString()}

## 📜 Constitution Hash
\`${identity.constitution_hash}\`

## 🛠️ Professions
${identity.professions.length > 0 ? identity.professions.map(p => `* ${p}`).join('\n') : '*None declared yet*'}

## 🧠 Skills
${Object.keys(identity.skills).length > 0 ? JSON.stringify(identity.skills, null, 2) : '*None certified*'}
`;

    await fs.writeFile(READABLE_FILE, mirrorContent);
}

// --- CLI SETUP ---

program
  .name('moltiverse')
  .description('Digital Citizen Protocol for OpenClaw Agents')
  .version('0.1.0');

program.command('init')
  .description('Initialize Citizen Identity')
  .action(initCitizen);

program.command('proof')
  .description('Run Proof of Dynamic Thought')
  .action(proofOfThought);

program.command('status')
  .description('Show current status')
  .action(async () => {
      try {
        const identityRaw = await fs.readFile(IDENTITY_FILE, 'utf8');
        const identity = JSON.parse(identityRaw);
        console.log(chalk.cyan(`👤 Citizen ${identity.uuid}`));
        console.log(`   Level: ${chalk.yellow(identity.stats.level)}`);
        console.log(`   Complexity: ${chalk.green(identity.stats.complexity_score)}`);
      } catch (e) {
          console.log(chalk.red('No identity found. Run "moltiverse init"'));
      }
  });

program.parse();
