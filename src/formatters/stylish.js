import _ from 'lodash';
import { NODE_TYPES } from '../constants/nodeTypes.js';

const tab = ' ';
const tabSize = 4;
const makeIndent = (depth) => tab.repeat(depth);

const buildDiffItem = (item, depth = 0) => {
  const iter = (node, currentDepth) => {
    if (!_.isPlainObject(node)) {
      return node;
    }

    const indent = makeIndent(tabSize * currentDepth);
    const unindent = tab.repeat(tabSize * currentDepth - tabSize);

    const result = Object.entries(node).flatMap(
      ([key, value]) => (
        `\n${indent}${key}: ${iter(value, currentDepth + 1)}`
      ),
    ).join('');

    return `{${result}\n${unindent}}`;
  };

  return iter(item, depth);
};

const renderDiff = (diff, depth = 1) => {
  const indent = makeIndent(tabSize * depth);
  const halfIndent = tab.repeat(tabSize * depth - tabSize / 2);

  const mapping = {
    [NODE_TYPES.added]: ({ key, value }) => `${halfIndent}+ ${key}: ${buildDiffItem(value, depth + 1)}`,
    [NODE_TYPES.changed]: (data) => (
      [mapping[NODE_TYPES.removed](data), mapping[NODE_TYPES.added](data)]
    ),
    [NODE_TYPES.nested]: ({ key, children }) => `${indent}${key}: {\n${renderDiff(children, depth + 1)}\n${indent}}`,
    [NODE_TYPES.removed]: ({ key, removedValue }) => `${halfIndent}- ${key}: ${buildDiffItem(removedValue, depth + 1)}`,
    [NODE_TYPES.notChanged]: ({ key, value }) => `${indent}${key}: ${buildDiffItem(value, depth + 1)}`,
  };

  return _.sortBy(diff, ['key'])
    .flatMap(({ type, ...data }) => mapping[type](data))
    .join('\n');
};

export const renderStylishDiff = (diff) => `{\n${renderDiff(diff)}\n}`;
