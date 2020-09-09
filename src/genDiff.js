import fs from 'fs';
import path from 'path';
import { parse } from './parsers.js';
import { render } from './formatters/index.js';
import { createAst } from './createAst.js';

const readFile = (filepath) => {
  const file = fs.readFileSync(filepath, 'utf-8');
  const fileExtension = path.extname(filepath).slice(1);

  return parse(file, fileExtension);
};

export const genDiff = (filepath1, filepath2, format) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const diff = createAst(file1, file2);

  return render(diff, format);
};
