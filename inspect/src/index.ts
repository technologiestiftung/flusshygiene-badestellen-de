import fs from 'fs';
import readline from 'readline';



export const jsonLparser: (inFilePath: string) => Promise<string> = async (inFilePath) => {
  try {
    const rstream = fs.createReadStream(inFilePath);
    const lineReader = readline.createInterface(rstream);
    let counter = 0;
    lineReader.on('line', (line)=>{
      if(counter === 0){
        console.log(JSON.parse(line));
      }
      counter++;
    });
    lineReader.on('close', ()=>{
      console.log(`we have ${counter} lines`);
    });
    return 'done';
  } catch (error) {
    throw error;
  }
}
