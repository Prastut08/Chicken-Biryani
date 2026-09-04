import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
const b64 = fs.readFileSync(logoPath).toString('base64');
const content = `export const LOGO_BASE64 = "data:image/png;base64,${b64}";\n`;
fs.writeFileSync(path.join(__dirname, '..', 'lib', 'logo-data.ts'), content);
console.log('Successfully written logo base64 data to lib/logo-data.ts');
