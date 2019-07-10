import path from 'path';
/**
 * Tries to replace the extesion of a file path. If no "." is on the extension string it will add it.
 */
export const replaceExtension: (fpath: string, newExt: string) => string = (fpath, newExt) =>{
  const ext = path.extname(fpath);
  newExt = newExt.startsWith('.', 0) === true ? newExt : `.${newExt}`;
  return fpath.replace(ext, newExt);
}