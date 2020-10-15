import _ from 'lodash';
import { NODE_TYPES } from './constants/nodeTypes.js';

export const createAst = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: NODE_TYPES.added, key, value: data2[key] };
    }

    if (!_.has(data2, key)) {
      return {
        type: NODE_TYPES.removed,
        key,
        removedValue: data1[key],
      };
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        type: NODE_TYPES.nested,
        key,
        children: createAst(data1[key], data2[key]),
      };
    }

    if (!_.isEqual(data2[key], data1[key])) {
      return {
        type: NODE_TYPES.changed,
        key,
        removedValue: data1[key],
        value: data2[key],
      };
    }

    return { type: NODE_TYPES.unchanged, key, value: data1[key] };
  });
};
