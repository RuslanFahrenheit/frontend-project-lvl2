import { renderStylishDiff } from './stylish.js';
import { renderPlainDiff } from './plain.js';
import { renderJsonDiff } from './json.js';

export const render = (diff, format) => {
  switch (format) {
    case 'stylish':
      return renderStylishDiff(diff);
    case 'plain':
      return renderPlainDiff(diff);
    case 'json':
      return renderJsonDiff(diff, null, 2);
    default:
      throw new Error(`Unexpected format ${format}`);
  }
};
