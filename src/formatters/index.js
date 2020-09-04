import { renderStylishDiff } from './stylish';
import { renderPlainDiff } from './plain';
import { renderJsonDiff } from './json';

const formatters = {
  stylish: renderStylishDiff,
  plain: renderPlainDiff,
  json: renderJsonDiff,
};

export const render = (diff, format) => formatters[format](diff);
