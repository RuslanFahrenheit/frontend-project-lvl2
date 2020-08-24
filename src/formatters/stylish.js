import { sortBy } from 'lodash';

const tab = ' ';
const tabSize = 4;
const makeIndent = (depth) => tab.repeat(depth);

const buildDiffItem = (item, depth = 0) => {
  const iter = (node, currentDepth) => {
    if (!(node instanceof Object)) {
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

export const renderStylishDiff = (diff, depth = 1) => {
  const func = ({
    key,
    removedValue,
    type,
    value,
  }) => {
    const indent = makeIndent(tabSize * depth);
    const halfIndent = tab.repeat(tabSize * depth - tabSize / 2);

    const mapping = {
      added: () => `\n${halfIndent}+ ${key}: ${buildDiffItem(value, depth + 1)}`,
      changed: () => [mapping.removed(), mapping.added()],
      nested: () => `\n${indent}${key}: {${renderStylishDiff(value, depth + 1)}\n${indent}}`,
      removed: () => `\n${halfIndent}- ${key}: ${buildDiffItem(removedValue, depth + 1)}`,
      same: () => `\n${indent}${key}: ${buildDiffItem(value, depth + 1)}`,
    };

    return mapping[type]();
  };

  return sortBy(diff, ['key']).flatMap(func).join('');
};
