import fs from 'fs';
import {
  union,
  has,
} from 'lodash';
import { NODE_TYPES } from './constants/nodeTypes';
import { parse } from './parsers';
import { getFormat } from './utils';
import { render } from './formatters';

const createAst = (first, second) => {
  const all = union(Object.keys(first), Object.keys(second));

  const func = (key) => {
    const valueOfFirst = first[key];
    const valueOfSecond = second[key];

    if (valueOfFirst instanceof Object && valueOfSecond instanceof Object) {
      return {
        type: NODE_TYPES.nested,
        key,
        value: createAst(valueOfFirst, valueOfSecond),
      };
    }

    if (!has(second, key)) {
      return {
        type: NODE_TYPES.removed,
        key,
        removedValue: valueOfFirst,
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

  return all.map(func);
};

export const genDiff = (filepath1, filepath2, format) => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);
  const file1 = parse(fs.readFileSync(filepath1, 'utf-8'), format1);
  const file2 = parse(fs.readFileSync(filepath2, 'utf-8'), format2);
  const diff = createAst(file1, file2);

  return `{${render(diff, format)}\n}`;
};
