import _ from 'lodash';
import { NODE_TYPES } from '../constants/nodeTypes.js';

const tabSize = 2;
const indent = (depth, tab = '  ') => tab.repeat(depth);

const stringify = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return node;
  }

  const result = Object.entries(node).flatMap(
    ([key, value]) => (
      `\n${indent(tabSize * depth)}${key}: ${stringify(value, depth + 1)}`
    ),
  ).join('');

  return `{${result}\n${indent(tabSize * depth - tabSize)}}`;
};

const mapping = {
  [NODE_TYPES.added]: ({ key, value }, depth) => `${indent(tabSize * depth - 1)}+ ${key}: ${stringify(value, depth + 1)}`,
  [NODE_TYPES.changed]: (data, depth) => (
    [mapping[NODE_TYPES.removed](data, depth), mapping[NODE_TYPES.added](data, depth)]
  ),
  [NODE_TYPES.nested]: ({ key, children }, depth, iter) => `${indent(tabSize * depth)}${key}: {\n${iter(children, depth + 1)}\n${indent(tabSize * depth)}}`,
  [NODE_TYPES.removed]: ({ key, removedValue }, depth) => `${indent(tabSize * depth - 1)}- ${key}: ${stringify(removedValue, depth + 1)}`,
  [NODE_TYPES.unchanged]: ({ key, value }, depth) => `${indent(tabSize * depth)}${key}: ${stringify(value, depth + 1)}`,
};

const renderDiff = (diff) => {
  const iter = (nodes, depth) => (
    nodes.flatMap(({ type, ...data }) => mapping[type](data, depth, iter)).join('\n')
  );

  return iter(diff, 1);
};

export const renderStylishDiff = (diff) => `{\n${renderDiff(diff)}\n}`;
