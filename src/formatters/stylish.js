import _ from 'lodash';
import { NODE_TYPES } from '../constants/nodeTypes.js';

const tabSize = 4;
const makeIndent = (depth, tab = ' ') => tab.repeat(depth);

const stringify = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return node;
  }

  const indent = makeIndent(tabSize * depth);
  const unindent = makeIndent(tabSize * depth - tabSize);

  const result = Object.entries(node).flatMap(
    ([key, value]) => (
      `\n${indent}${key}: ${stringify(value, depth + 1)}`
    ),
  ).join('');

  return `{${result}\n${unindent}}`;
};

const renderDiff = (diff, depth = 1) => {
  const indent = makeIndent(tabSize * depth);
  const halfIndent = makeIndent(tabSize * depth - tabSize / 2);

  const mapping = {
    [NODE_TYPES.added]: ({ key, value }) => `${halfIndent}+ ${key}: ${stringify(value, depth + 1)}`,
    [NODE_TYPES.changed]: (data) => (
      [mapping[NODE_TYPES.removed](data), mapping[NODE_TYPES.added](data)]
    ),
    [NODE_TYPES.nested]: ({ key, children }) => `${indent}${key}: {\n${renderDiff(children, depth + 1)}\n${indent}}`,
    [NODE_TYPES.removed]: ({ key, removedValue }) => `${halfIndent}- ${key}: ${stringify(removedValue, depth + 1)}`,
    [NODE_TYPES.unchanged]: ({ key, value }) => `${indent}${key}: ${stringify(value, depth + 1)}`,
  };

  return diff.flatMap(({ type, ...data }) => mapping[type](data))
    .join('\n');
};

export const renderStylishDiff = (diff) => `{\n${renderDiff(diff)}\n}`;
