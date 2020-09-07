import { renderStylishDiff } from './stylish.js';
import { renderPlainDiff } from './plain.js';
import { renderJsonDiff } from './json.js';

const formatters = {
  stylish: renderStylishDiff,
  plain: renderPlainDiff,
  json: renderJsonDiff,
};

export const render = (diff, format) => formatters[format](diff);
