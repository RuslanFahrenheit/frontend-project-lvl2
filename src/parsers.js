import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';
import { EXTENSION_TYPES } from './constants/extensionTypes.js';

/**
 * TODO: remove fixNumbersParse function
 * when the issue https://github.com/npm/ini/issues/75 is fixed
 */
const fixNumbersParse = (data) => _.mapValues(data, (value) => {
  if (_.isPlainObject(value)) {
    return fixNumbersParse(value);
  }

  if (!Number.isNaN(Number(value)) && !_.isBoolean(value)) {
    return Number(value);
  }

  return value;
});

export const parse = (data, format) => {
  switch (format) {
    case EXTENSION_TYPES.json:
      return JSON.parse(data);
    case EXTENSION_TYPES.yml:
      return yaml.safeLoad(data);
    case EXTENSION_TYPES.ini:
      return fixNumbersParse(ini.parse(data));
    default:
      throw new Error(`Unexpected file extension ${format}`);
  }
};
