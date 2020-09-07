import yaml from 'js-yaml';
import ini from 'ini';
import { EXTENSION_TYPES } from './constants/extensionTypes.js';

const parsers = {
  [EXTENSION_TYPES.json]: JSON.parse,
  [EXTENSION_TYPES.yml]: yaml.safeLoad,
  [EXTENSION_TYPES.ini]: ini.parse,
};

export const parse = (data, format) => parsers[format](data);
