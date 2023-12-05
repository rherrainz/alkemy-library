import fs from "fs/promises";
import path from "path";

const logFile = path.join(process.cwd(), "logs.log");

const log = async (message) => {
  const timestamp = new Date().toLocaleString();
  const logMessage = `[${timestamp}] ${message}\n`;

  try {
    await fs.appendFile(logFile, logMessage);
  } catch (error) {
    console.log("Error writing to the log file: ", error);
  }
};

const info = (email, message) => {
  log(`INFO: [${email}] ${message}`);
};

const error = (message) => {
  log(`ERROR: ${message}`);
};

export { info, error };
