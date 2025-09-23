// Script para generar environment dinámicamente con variables de entorno de vercel

import { writeFileSync } from 'fs';
import { join } from 'path';
const { NG_APP_API_URL } = process.env;

const targetPath = join(__dirname, './src/environments/environment.ts');

const apiUrl = NG_APP_API_URL || 'http://localhost:4000/api';

const envConfigFile = `
export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

writeFileSync(targetPath, envConfigFile);
