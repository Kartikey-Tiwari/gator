import path from "path";
import fs from "fs";
import os from "os";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const CFG_FILE_NAME = ".gatorconfig.json";
const DB_URL = process.env.DB_URL;

type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(username: string) {
  const config = readConfig();
  config.currentUserName = username;
  writeConfig(config);
}

export function readConfig(): Config {
  const cfgPath = getConfigFilePath();
  const data = fs.readFileSync(cfgPath, "utf-8");
  const config = validateConfig(JSON.parse(data));
  return config;
}

function getConfigFilePath(): string {
  return path.join(os.homedir(), CFG_FILE_NAME);
}

function writeConfig(cfg: Config) {
  const cfgPath = getConfigFilePath();
  fs.writeFileSync(cfgPath, JSON.stringify(cfg));
}

function validateConfig(rawConfig: any): Config {
  const cfg: Config = {
    dbUrl: typeof rawConfig.dbUrl === "string" ? rawConfig.dbUrl : DB_URL,
    currentUserName:
      typeof rawConfig.currentUserName === "string"
        ? rawConfig.currentUserName
        : "",
  };

  return cfg;
}
