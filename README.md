# Flusshygiene Badestellen DE

Small toolset to parse a `.csv` with lots of data into `.json` and `.jsonl` for better handling.

The following transformations take place (folder `parsing`):

- Convert CSV encoding from CP850 to UTF8
- Convert CSV to JSON
- Group content by Spot ID (BWID)
- Write to JSON
- Create JSONL (each line is a valid json object)
- Write JSONL

```bash
cd parsing
npm install 
npm run build
node dist/cli.js ./data/badegewaesser.csv -jsonl=true
```

Use the script in folder `inspect` to read the file line by line (currently only the first line is printed to console).

```bash
cd inspect
npm install 
npm run build
node dist/cli.js ../parsing/data/badegewaesser.csv
```

## License

MIT License

Copyright (c) 2019 Technologie Stiftung Berlin & Fabian Morón Zirfas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
