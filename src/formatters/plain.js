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
  const func = ({
    key,
    removedValue,
    type,
    value,
    children,
  }) => {
    const diffPath = getPath(path, key);

    const mapping = {
      [NODE_TYPES.added]: () => `Property '${diffPath}' was added with value: ${convert(value)}`,
      [NODE_TYPES.changed]: () => `Property '${diffPath}' was updated. From ${convert(removedValue)} to ${convert(value)}`,
      [NODE_TYPES.nested]: () => renderPlainDiff(children, diffPath),
      [NODE_TYPES.removed]: () => `Property '${diffPath}' was removed`,
      [NODE_TYPES.notChanged]: () => '',
    };

    return mapping[type]();
  };

  return _.sortBy(diff, ['key']).flatMap(func).filter((item) => item !== '').join('\n');
};
