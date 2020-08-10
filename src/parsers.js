import yaml from 'js-yaml';
import { EXTENSION_TYPES } from './constants/extensionTypes';

const parsers = {
  [EXTENSION_TYPES.json]: JSON.parse,
  [EXTENSION_TYPES.yml]: yaml.safeLoad,
};

export const parse = (data, format) => parsers[format](data);
