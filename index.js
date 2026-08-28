const fs = require('fs');
const readline = require('readline');

function readLogs() {
  console.log('\n[TrueForge Tool]: Fetching incident logs...');
  return fs.readFileSync('incident_log.txt', 'utf8');
}

function applyRemedy(action) {
  console.log(`\n[Execution Executed]: ${action}`);
  return 'Status: System restored successfully.';
}

async function runAgent() {
  console.log("=== TrueForge Agent Harness Execution Started ===");
  
  const logs = readLogs();
  console.log("--- Log Contents ---");
  console.log(logs);

  const diagnosis = "Database connection bottleneck leading to memory overload.";
  const fixCommand = "Restart Database Service & Clear Socket Caches";

  console.log(`\n[Agent Diagnosis]: ${diagnosis}`);
  console.log(`[Proposed Remedy]: ${fixCommand}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\n[TrueForge Safety Gate]: Do you approve executing this remedy? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      const output = applyRemedy(fixCommand);
      console.log(output);
    } else {
      console.log('\n[TrueForge Safety Gate]: Execution cancelled by user.');
    }
    rl.close();
  });
}

runAgent();
