import fs from 'fs';

export const readFile = filename => fs.readFileSync(filename).toString().trim();
export const lines = buffer => buffer.split(/\r?\n/);
export const readFileLines = filename => lines(readFile(filename));
export const readFileLinesAsNumbers = filename => readFileLines(filename).map(s => 1*s);
