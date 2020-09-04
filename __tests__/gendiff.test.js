import fs from 'fs';
import path from 'path';
import { genDiff } from '../src/index';

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

const resultStylish = readFile('result-stylish.txt');
const resultPlain = readFile('result-plain.txt');
const resultJson = readFile('result-json.txt');

test('compare JSONs', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');

  expect(genDiff(before, after, 'stylish')).toEqual(resultStylish);
});

test('compare YMLs', () => {
  const before = getFixturePath('before.yml');
  const after = getFixturePath('after.yml');

  expect(genDiff(before, after, 'stylish')).toEqual(resultStylish);
});

test('compare INIs', () => {
  const before = getFixturePath('before.ini');
  const after = getFixturePath('after.ini');

  expect(genDiff(before, after, 'stylish')).toEqual(resultStylish);
});

test('compare files displaying difference in plain format', () => {
  const before = getFixturePath('before.ini');
  const after = getFixturePath('after.ini');

  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
});

test('compare files displaying difference in JSON format', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');

  expect(genDiff(before, after, 'json')).toEqual(resultJson);
});
