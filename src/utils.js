import path from 'path';
import { EXTENSION_TYPES } from './constants/extensionTypes';

export const checkExtensionIsKnown = (extension) => (
  Object.keys(EXTENSION_TYPES).find((ext) => ext === extension)
);

export const getFormat = (filepath) => {
  const strAfterDot = /[^.]+$/;
  const extension = path.extname(filepath);
  const [extensionName] = strAfterDot.exec(extension);

  if (checkExtensionIsKnown(extensionName)) {
    return extensionName;
  }

  throw new Error(
    `Unknown extension. Please use one of the following extensions:
    ${Object.keys(EXTENSION_TYPES).join(', ')}.`,
  );
};
