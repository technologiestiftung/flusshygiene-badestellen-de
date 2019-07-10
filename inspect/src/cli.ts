import meow from 'meow';
import path from 'path';
import fs from 'fs';
import { jsonLparser } from '.';


const cli = meow(`
  ╦ ╦┌─┐┌─┐┌─┐┌─┐
  ║ ║└─┐├─┤│ ┬├┤
  ╚═╝└─┘┴ ┴└─┘└─┘

    node dist/cli.js ./relative/path/to/file.json

  ╔═╗┬  ┌─┐┌─┐┌─┐
  ╠╣ │  ├─┤│ ┬└─┐
  ╚  ┴─┘┴ ┴└─┘└─┘

    -h --help Show help

`, {});

if (cli.input.length === 0) {
  cli.showHelp();
}

const jsonFilePath: string = path.resolve(process.cwd(), cli.input[0]);
// const outFilePath: string | undefined = cli.input[1] !== undefined ? path.resolve(process.cwd(), cli.input[1]) : undefined;
// console.log(csvFilePath);
if (fs.existsSync(jsonFilePath) === false) {
  console.error(`The file under:\n\n"${jsonFilePath}"\n\nDoes not exists.`);
  process.exit(1);
}

try {
  if (fs.lstatSync(jsonFilePath).isDirectory() === true) {
    console.error(`The path\n\n${jsonFilePath}\n\nis a directory`);
    process.exit(1);
  }
} catch (error) {
  // not a dir
}

jsonLparser(jsonFilePath)
  .then((res) => {
    console.info(res);
  }).catch((err: Error) => {
    throw err;
  }).finally(() => {
    console.info('Done');
  })
