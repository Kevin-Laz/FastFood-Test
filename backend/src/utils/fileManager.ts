import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dataPath = join(__dirname, "../../data");

const BIN_IDS: Record<string, string> = {
  "menu.json": "68d5a6dcae596e708ffbcbf1",
  "orders.json": "68d5a71bae596e708ffbcc2c",
  "users.json": "68d5a724d0ea881f408b027e",
};

const API_URL = "https://api.jsonbin.io/v3/b";

//En producción se usa jsonbin y en local json de /data
function isProduction() {
  return process.env.VERCEL === "1" ||
          process.env.NODE_ENV === "production" ||
          process.env.FORCE_JSONBIN === "true";
}

// Elige header correcto según lo que tengas en .env
function authHeader() {
  const master = (process.env.JSONBIN_KEY ?? "").trim();
  const access = (process.env.JSONBIN_ACCESS_KEY ?? "").trim();

  if (master) return { headerName: "X-Master-Key", key: master };
  if (access) return { headerName: "X-Access-Key", key: access };

  throw new Error("Falta JSONBIN_KEY o JSONBIN_ACCESS_KEY en el entorno");
}

export async function readJSON<T>(fileName: string): Promise<T> {
  if (!isProduction()) {
    const filePath = join(dataPath, fileName);
    const content = readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  }

  const binId = BIN_IDS[fileName];
  if (!binId) throw new Error(`Bin no configurado para ${fileName}`);

  const { headerName, key } = authHeader();

  const res = await fetch(`${API_URL}/${binId}/latest`, {
    headers: {
      [headerName]: key,
      "X-Bin-Meta": "false",
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Error leyendo bin ${fileName}: ${res.status} ${res.statusText} → ${body}`);
  }

  const data = await res.json();
  return data;
}

export async function writeJSON<T>(fileName: string, data: T): Promise<void> {
  if (!isProduction()) {
    const filePath = join(dataPath, fileName);
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return;
  }

  const binId = BIN_IDS[fileName];
  if (!binId) throw new Error(`Bin no configurado para ${fileName}`);

  const { headerName, key } = authHeader();

  const res = await fetch(`${API_URL}/${binId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      [headerName]: key,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Error escribiendo bin ${fileName}: ${res.status} ${res.statusText} → ${body}`);
  }
}
