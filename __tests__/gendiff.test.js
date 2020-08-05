import fs from 'fs';
import path from 'path';
import { genDiff } from '../src/index';

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test('compare plain JSONs', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  const result = readFile('result-json.txt');

  expect(genDiff(before, after)).toEqual(result);
});
