import commander from 'commander';
import { genDiff } from './index';

export const program = () => {
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f --format [type]', 'output format [format]', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const diff = genDiff(filepath1, filepath2, commander.format);
      console.log(diff);
    })
    .parse(process.argv);
};
