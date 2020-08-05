import fs from 'fs';
import { union, sortBy, has } from 'lodash';
import { NODE_TYPES } from './nodeTypes';

const getDiff = (first, second) => {
  const all = union(Object.keys(first), Object.keys(second));

  const buildDiff = (key) => {
    const valueOfFirst = first[key];
    const valueOfSecond = second[key];

    if (!has(second, key)) {
      return { type: NODE_TYPES.removed, key, value: valueOfFirst };
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

const renderDiff = (diff) => (
  sortBy(diff, ['key'])
    .reduce((acc, {
      type,
      key,
      value,
      removedValue,
    }) => {
      const tab = '  ';

      if (type === NODE_TYPES.changed) {
        return `${acc}\n${tab}- ${key}: ${removedValue}\n${tab}+ ${key}: ${value}`;
      }

      if (type === NODE_TYPES.added) {
        return `${acc}\n${tab}+ ${key}: ${value}`;
      }

      if (type === NODE_TYPES.removed) {
        return `${acc}\n${tab}- ${key}: ${value}`;
      }

      return `${acc}\n${tab}${tab}${key}: ${value}`;
    }, '')
);

export const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(filepath1));
  const file2 = JSON.parse(fs.readFileSync(filepath2));
  const diff = getDiff(file1, file2);

  return `{${renderDiff(diff)}\n}`;
};
