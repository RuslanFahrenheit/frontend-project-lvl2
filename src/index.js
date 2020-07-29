import commander from 'commander';

const program = () => {
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .parse(process.argv);
};

export default program;
