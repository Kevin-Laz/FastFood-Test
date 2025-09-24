import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dataPath = join(__dirname, "../../data");

export function readJSON<T>(fileName: string): T {
  const filePath = join(dataPath, fileName);
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T;
}

export function writeJSON<T>(fileName: string, data: T): void {
  const filePath = join(dataPath, fileName);
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
