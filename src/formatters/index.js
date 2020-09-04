import { renderStylishDiff } from './stylish';
import { renderPlainDiff } from './plain';

const formatters = {
  stylish: renderStylishDiff,
  plain: renderPlainDiff,
};

export const render = (diff, format) => formatters[format](diff);
