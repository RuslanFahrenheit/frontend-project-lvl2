import { sortBy } from 'lodash';

const getPath = (acc, key) => [acc, key].filter((item) => item !== '').join('.');
const convert = (value) => ((value instanceof Object) ? '[complex value]' : value);

export const renderPlainDiff = (diff, path = '') => {
  const func = ({
    key,
    removedValue,
    type,
    value,
  }) => {
    const diffPath = getPath(path, key);

    const mapping = {
      added: () => `Property ${diffPath} was added with value: ${convert(value)}`,
      changed: () => `Property ${diffPath} was updated. From ${convert(removedValue)} to ${convert(value)}`,
      nested: () => renderPlainDiff(value, diffPath),
      removed: () => `Property ${diffPath} was removed`,
      same: () => '',
    };

    return mapping[type]();
  };

  return sortBy(diff, ['key']).flatMap(func).filter((item) => item !== '').join('\n');
};
