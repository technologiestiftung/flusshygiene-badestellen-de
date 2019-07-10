import { replaceExtension } from './replace-extension';
import Papa from 'papaparse';
import fs from 'fs';
import util from 'util';
var Iconv  = require('iconv').Iconv;
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
var iconv = new Iconv('CP850', 'UTF-8');


/**
 * Groups elements by type
 * taken from here
 * http://www.nikpro.com.au/how-to-group-an-array-of-objects-based-on-an-a-property-value-using-reduce/
 *
 */
export const groupBy = (arr: any[], prop: string) => {

  return arr.reduce((accumulator, obj)=>{
    const key = obj[prop];
    if(!accumulator[key]){
      accumulator[key] = [];
    }
    accumulator[key].push(obj);
    return accumulator;
  },{});
}



/**
 * Main function
 * @param inFilePath
 * @param outFilePath
 * @returns a filepath
 */
export const main: (inFilePath: string, outFilePath: string|undefined) => Promise<string> = async (inFilePath, outFilePath) => {
  try {
    // const ext = path.extname(inFilePath);
    outFilePath = outFilePath === undefined ? replaceExtension(inFilePath, '.json') : outFilePath;
    const contentBuffer = await readFileAsync(inFilePath);
    const buffer = iconv.convert(contentBuffer);// .convert(contentBuffer);
    const content: string = buffer.toString('utf8');
    const json = Papa.parse(content, {
      header: true,
      dynamicTyping: true
    });

    const grouped = groupBy(json.data, 'BWID');
    // console.log(grouped[0]);
    await writeFileAsync(outFilePath, JSON.stringify(grouped));
    return `${outFilePath}`;
  } catch (error) {
    throw error;
  }
}
