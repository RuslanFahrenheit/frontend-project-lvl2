import {
  union,
  has,
} from 'lodash';
import { NODE_TYPES } from './constants/nodeTypes';
import { parse } from './parsers';
import {
  getFormat,
  readFile,
} from './utils';
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
  const file1 = readFile(filepath1);
  const data1 = parse(file1, format1);

  const format2 = getFormat(filepath2);
  const file2 = readFile(filepath2);
  const data2 = parse(file2, format2);

  const diff = createAst(data1, data2);

  return render(diff, format);
};
