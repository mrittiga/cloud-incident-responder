const fs = require('fs');
const readline = require('readline');

// Day 2 Guardrail Rules: Block dangerous shell execution patterns
const BLOCKED_PATTERNS = [/rm -rf/i, /drop table/i, /shutdown -h/i, /format/i];

function validateSafetyPolicy(command) {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(command)) {
      return { safe: false, reason: `Command contains restricted pattern: ${pattern}` };
    }
  }
  return { safe: true };
}

function readLogs() {
  console.log('\n[TrueForge Tool]: Fetching incident logs...');
  return fs.readFileSync('incident_log.txt', 'utf8');
}

function applyRemedy(action) {
  console.log(`\n[Execution Executed]: ${action}`);
  return 'Status: System restored successfully.';
}

async function runAgent() {
  const startTime = Date.now();
  console.log("=== TrueForge Agent Harness (Day 2: Guardrails & Metrics) ===");
  
  const logs = readLogs();
  console.log("--- Log Contents ---");
  console.log(logs);

  const diagnosis = "Database connection bottleneck leading to memory overload.";
  const fixCommand = "Restart Database Service & Clear Socket Caches";

  console.log(`\n[Agent Diagnosis]: ${diagnosis}`);
  console.log(`[Proposed Remedy]: ${fixCommand}`);

  // Automated Guardrail Validation Check
  console.log('\n[TrueForge Guardrail]: Running pre-execution safety policy check...');
  const policyCheck = validateSafetyPolicy(fixCommand);

  if (!policyCheck.safe) {
    console.log(`[TrueForge Guardrail ALERT]: Command BLOCKED by policy! Reason: ${policyCheck.reason}`);
    console.log(`[Metrics Logged]: Execution Latency: ${Date.now() - startTime}ms | Status: Blocked`);
    return;
  }

  console.log('[TrueForge Guardrail]: Command PASSED policy inspection.');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\n[TrueForge Safety Gate]: Do you approve executing this remedy? (y/n): ', (answer) => {
    const isApproved = answer.toLowerCase() === 'y';
    if (isApproved) {
      const output = applyRemedy(fixCommand);
      console.log(output);
    } else {
      console.log('\n[TrueForge Safety Gate]: Execution cancelled by user.');
    }

    // Day 2 Metric Summary Logging
    console.log('\n=== TrueForge Evaluation Metrics ===');
    console.log(`- Policy Check: PASSED`);
    console.log(`- Human Approval: ${isApproved ? 'GRANTED' : 'DENIED'}`);
    console.log(`- Total Execution Latency: ${Date.now() - startTime}ms`);
    
    rl.close();
  });
}

runAgent();
