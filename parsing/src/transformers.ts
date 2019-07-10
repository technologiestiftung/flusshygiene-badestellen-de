import { replaceExtension } from './replace-extension';
import fs from 'fs';

const pipe = require('pipe-io');
var jsonl = require('jsonl')


export const transform = {

  jsonl: (inFilePath: string) => {
    const rstream = fs.createReadStream(inFilePath);
    const wstream = fs.createWriteStream(replaceExtension(inFilePath, '.jsonl'))
    pipe(
      [
        rstream,
        jsonl(),
        wstream
      ]
      , (err: Error) => {
        if (err) {
          throw err;
        }
        console.info('Done with conversion to jsonl');
      });
  }
}