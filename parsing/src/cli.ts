import meow from 'meow';
import path from 'path';
import fs from 'fs';
import { main } from './index';
import { transform } from './transformers';


const cli = meow(`
  ╦ ╦┌─┐┌─┐┌─┐┌─┐
  ║ ║└─┐├─┤│ ┬├┤
  ╚═╝└─┘┴ ┴└─┘└─┘

    node dist/cli.js ./relative/path/to/file.csv [./relative/path/to/outfile.json]

      If outFilePath is not defined it will use the infile and replace the extension

  ╔═╗┬  ┌─┐┌─┐┌─┐
  ╠╣ │  ├─┤│ ┬└─┐
  ╚  ┴─┘┴ ┴└─┘└─┘

    -h --help Show help

`, {
    flags: {
      jsonl: {
        alias: 'l',
        type: 'boolean',
        default: false
      }
    }
  });

if (cli.input.length === 0) {
  cli.showHelp();
}


const csvFilePath: string = path.resolve(process.cwd(), cli.input[0]);
const outFilePath: string | undefined = cli.input[1] !== undefined ? path.resolve(process.cwd(), cli.input[1]) : undefined;;
// console.log(csvFilePath);
if (fs.existsSync(csvFilePath) === false) {
  console.error(`The file under:\n\n"${csvFilePath}"\n\nDoes not exists.`);
  process.exit(1);
}

try {
  if (fs.lstatSync(csvFilePath).isDirectory() === true) {
    console.error(`The path\n\n${csvFilePath}\n\nis a directory`);
    process.exit(1);
  }
} catch (error) {
  // not a dir
}

main(csvFilePath, outFilePath)
  .then((res) => {
    console.info(`Wrote file "${res}"`);
    if(cli.flags.jsonl === true){
      console.info('Starting jsonl transform');
      transform.jsonl(res);
    }
  }).catch((err: Error) => {
    throw err;
  });
