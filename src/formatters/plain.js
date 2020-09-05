import { sortBy } from 'lodash';
import { NODE_TYPES } from '../constants/nodeTypes';

const getPath = (acc, key) => [acc, key].filter((item) => item !== '').join('.');
const convert = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return (value instanceof Object) ? '[complex value]' : value;
};

export const renderPlainDiff = (diff, path = '') => {
  const func = ({
    key,
    removedValue,
    type,
    value,
  }) => {
    const diffPath = getPath(path, key);

    const mapping = {
      [NODE_TYPES.added]: () => `Property '${diffPath}' was added with value: ${convert(value)}`,
      [NODE_TYPES.changed]: () => `Property '${diffPath}' was updated. From ${convert(removedValue)} to ${convert(value)}`,
      [NODE_TYPES.nested]: () => renderPlainDiff(value, diffPath),
      [NODE_TYPES.removed]: () => `Property '${diffPath}' was removed`,
      [NODE_TYPES.same]: () => '',
    };

    return mapping[type]();
  };

  return sortBy(diff, ['key']).flatMap(func).filter((item) => item !== '').join('\n');
};
