import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => {
  console.log('Поехали!');
});
