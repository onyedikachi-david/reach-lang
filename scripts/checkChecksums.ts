import { execSync } from "child_process";
import { dirname, join } from "path";
import { exit } from "process";

const a: string[] = execSync(
  "grep -Rw docs/src/ -A 1 -e 'load:' | sed -E 's/--//'"
).toString().split('\n').filter(line => line !== '');

let errorString: string = '';

let index: number = 0;
while (index < a.length) {
  const currentLine: string = a[index];
  const docsFile: string = currentLine.split(':')[0];
  const r1: RegExpMatchArray | null = currentLine.match(
    /load: (.+)/
  );
  if (r1) {
    const [ _fullMatch, programPath ] = r1;
    const nextLine: string = a[index + 1];
    const r2: RegExpMatchArray | null = nextLine.match(
      /md5: (.+)/
    );
    if (r2) {
      const topDir: string = dirname(dirname(__filename));
      const actualMD5WithNewline: string = execSync(`md5sum ${
        join(topDir, programPath)
      } | awk '{print $1}'`).toString();
      const actualMD5: string = actualMD5WithNewline.slice(0, -1);
      const [ _fullMatch, md5InDocs ] = r2;
      if (actualMD5 !== md5InDocs) {
        errorString += programPath + '\n';
        errorString += 'has an actual MD5 of\n';
        errorString += actualMD5 + '\n';
        errorString += 'but\n';
        errorString += docsFile + '\n';
        errorString += 'says it has an MD5 of\n';
        errorString += md5InDocs + '\n\n';
      }
      index += 2;
    } else {
      errorString += "There doesn't appear to be\n";
      errorString += 'a matching MD5 for\n';
      errorString += programPath + '\n';
      errorString += 'in\n';
      errorString += docsFile + '\n\n';
      index += 1;
    }
  } else {
    // This line doesn't contain a 'load: '.
    index += 1;
  }
}

if (errorString) {
  const errStrWithoutExtraNewlines: string =
    errorString.slice(0, -2);
  console.error(errStrWithoutExtraNewlines);
  exit(1);
} else {
  console.info('No issues detected with MD5s!');
  exit(0);
}
