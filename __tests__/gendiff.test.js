import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { genDiff } from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');
const getResult = (format) => readFile(`result-${format}.txt`);

const extensions = ['json', 'ini', 'yml'];
const formats = ['json', 'plain', 'stylish'];

describe.each(extensions)('test difference between %s files', (ext) => {
  test.each(formats)('--format %s', (format) => {
    const before = getFixturePath(`before.${ext}`);
    const after = getFixturePath(`after.${ext}`);
    const result = getResult(format);

    expect(genDiff(before, after, format)).toEqual(result);
  });
});
