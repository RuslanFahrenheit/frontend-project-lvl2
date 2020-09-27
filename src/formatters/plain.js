import _ from 'lodash';
import { NODE_TYPES } from '../constants/nodeTypes.js';

const getPath = (acc, key) => [acc, key].filter((item) => item !== '').join('.');
const convert = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const buildStrByType = {
  [NODE_TYPES.added]: ({ key, value }, path) => `Property '${getPath(path, key)}' was added with value: ${convert(value)}`,
  [NODE_TYPES.changed]: ({ key, value, removedValue }, path) => (
    `Property '${getPath(path, key)}' was updated. From ${convert(removedValue)} to ${convert(value)}`
  ),
  [NODE_TYPES.nested]: ({ key, children }, path, renderPlainDiff) => (
    renderPlainDiff(children, getPath(path, key))
  ),
  [NODE_TYPES.removed]: ({ key }, path) => `Property '${getPath(path, key)}' was removed`,
  [NODE_TYPES.notChanged]: () => '',
};

export const renderPlainDiff = (diff, path = '') => _.sortBy(diff, ['key'])
  .flatMap(({ type, ...data }) => buildStrByType[type](data, path, renderPlainDiff))
  .filter((item) => item !== '')
  .join('\n');
