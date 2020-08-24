import { renderStylishDiff } from './stylish';

const formatters = {
  stylish: renderStylishDiff,
};

export const render = (diff, format) => formatters[format](diff);
