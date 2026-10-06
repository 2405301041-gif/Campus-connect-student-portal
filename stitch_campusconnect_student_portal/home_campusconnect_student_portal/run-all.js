import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm.cmd" : "npm";

console.log("==================================================");
console.log("🚀 Starting CampusConnect Full-Stack Application");
console.log("   - Backend (Node.js/Express): http://localhost:5000");
console.log("   - Frontend (React/Vite):    http://localhost:5173");
console.log("==================================================\n");

// Spawn Server
const server = spawn(npmCmd, ["run", "dev"], {
  cwd: path.join(__dirname, "server"),
  stdio: "inherit",
  shell: isWindows
});

// Spawn Client
const client = spawn(npmCmd, ["run", "dev"], {
  cwd: path.join(__dirname, "client"),
  stdio: "inherit",
  shell: isWindows
});

const cleanup = () => {
  console.log("\n🛑 Stopping CampusConnect services...");
  server.kill();
  client.kill();
  process.exit(0);
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
