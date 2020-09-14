import _ from 'lodash';
import { NODE_TYPES } from './constants/nodeTypes.js';

export const createAst = (first, second) => {
  const keys = _.union(Object.keys(first), Object.keys(second));

  return keys.map((key) => {
    const value1 = first[key];
    const value2 = second[key];

    if (!_.has(second, key)) {
      return {
        type: NODE_TYPES.removed,
        key,
        removedValue: value1,
      };
    }

    if (!_.has(first, key)) {
      return { type: NODE_TYPES.added, key, value: value2 };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        type: NODE_TYPES.nested,
        key,
        children: createAst(value1, value2),
      };
    }

    if (value2 !== value1) {
      return {
        type: NODE_TYPES.changed,
        key,
        removedValue: value1,
        value: value2,
      };
    }

    return { type: NODE_TYPES.notChanged, key, value: value1 };
  });
};
