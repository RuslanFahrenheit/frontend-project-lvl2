import _ from 'lodash';
import { NODE_TYPES } from '../constants/nodeTypes.js';

const getPath = (acc, key) => [acc, key].filter((item) => item !== '').join('.');
const convert = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return (_.isPlainObject(value)) ? '[complex value]' : value;
};

export const renderPlainDiff = (diff, path = '') => {
  const mapping = {
    [NODE_TYPES.added]: ({ key, value }) => `Property '${getPath(path, key)}' was added with value: ${convert(value)}`,
    [NODE_TYPES.changed]: ({ key, value, removedValue }) => `Property '${getPath(path, key)}' was updated. From ${convert(removedValue)} to ${convert(value)}`,
    [NODE_TYPES.nested]: ({ key, children }) => renderPlainDiff(children, getPath(path, key)),
    [NODE_TYPES.removed]: ({ key }) => `Property '${getPath(path, key)}' was removed`,
    [NODE_TYPES.notChanged]: () => '',
  };

  return _.sortBy(diff, ['key'])
    .flatMap(({ type, ...data }) => mapping[type](data))
    .filter((item) => item !== '')
    .join('\n');
};
