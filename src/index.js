import fs from 'fs';
import {
  union,
  sortBy,
  has,
  flatten,
} from 'lodash';
import { NODE_TYPES } from './constants/nodeTypes';
import { parse } from './parsers';
import { getFormat } from './utils';

const getDiff = (first, second) => {
  const all = union(Object.keys(first), Object.keys(second));

  const buildDiff = (key) => {
    const valueOfFirst = first[key];
    const valueOfSecond = second[key];

    if (!has(second, key)) {
      return {
        type: NODE_TYPES.removed,
        key,
        removedValue: valueOfFirst,
        value: valueOfSecond,
      };
    }

    if (!has(first, key) && has(second, key)) {
      return { type: NODE_TYPES.added, key, value: valueOfSecond };
    }

    if (has(second, key) && has(first, key) && valueOfSecond !== valueOfFirst) {
      return {
        type: NODE_TYPES.changed,
        key,
        removedValue: valueOfFirst,
        value: valueOfSecond,
      };
    }

    return { type: NODE_TYPES.same, key, value: valueOfFirst };
  };

  return all.map(buildDiff);
};

const renderDiff = (diff) => {
  const func = ({
    key,
    removedValue,
    type,
    value,
  }) => {
    const tab = '  ';

    const mapping = {
      added: () => `\n${tab}+ ${key}: ${value}`,
      changed: () => [mapping.removed(), mapping.added()],
      removed: () => `\n${tab}- ${key}: ${removedValue}`,
      same: () => `\n${tab}${tab}${key}: ${value}`,
    };

    return mapping[type]();
  };

  return flatten(sortBy(diff, ['key']).map(func)).join('');
};

export const genDiff = (filepath1, filepath2) => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);
  const file1 = parse(fs.readFileSync(filepath1), format1);
  const file2 = parse(fs.readFileSync(filepath2), format2);
  const diff = getDiff(file1, file2);

  return `{${renderDiff(diff)}\n}`;
};
