import _ from 'lodash';
import { NODE_TYPES } from './constants/nodeTypes.js';

export const createAst = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { type: NODE_TYPES.added, key, value: value2 };
    }

    if (!_.has(data2, key)) {
      return {
        type: NODE_TYPES.removed,
        key,
        removedValue: value1,
      };
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

    return { type: NODE_TYPES.unchanged, key, value: value1 };
  });
};
