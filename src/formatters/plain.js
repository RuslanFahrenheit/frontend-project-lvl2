import _ from 'lodash';
import { NODE_TYPES } from '../constants/nodeTypes.js';

const getPropertyName = (acc, key) => [...acc, key].join('.');
const stringify = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const mapping = {
  [NODE_TYPES.added]: ({ key, value }, path) => `Property '${getPropertyName(path, key)}' was added with value: ${stringify(value)}`,
  [NODE_TYPES.changed]: ({ key, value, removedValue }, path) => {
    const name = getPropertyName(path, key);
    return `Property '${name}' was updated. From ${stringify(removedValue)} to ${stringify(value)}`;
  },
  [NODE_TYPES.nested]: ({ key, children }, path, iter) => iter(children, [...path, key]),
  [NODE_TYPES.removed]: ({ key }, path) => `Property '${getPropertyName(path, key)}' was removed`,
  [NODE_TYPES.unchanged]: () => [],
};

export const renderPlainDiff = (diff) => {
  const iter = (nodes, path) => nodes
    .flatMap((node) => mapping[node.type](node, path, iter));

  return iter(_.flatten(diff), []).join('\n');
};
