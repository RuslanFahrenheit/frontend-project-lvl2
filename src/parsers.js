import yaml from 'js-yaml';
import ini from 'ini';
import { EXTENSION_TYPES } from './constants/extensionTypes.js';

export const parse = (data, format) => {
  switch (format) {
    case EXTENSION_TYPES.json:
      return JSON.parse(data);
    case EXTENSION_TYPES.yml:
      return yaml.safeLoad(data);
    case EXTENSION_TYPES.ini:
      return ini.parse(data);
    default:
      throw new Error(`Unexpected file extension ${format}`);
  }
};
