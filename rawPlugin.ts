import fs from 'fs';

const fileContentsRegex = /const fileContents = ["']@raw["'];/;

function rawImportPlugin() {
  return {
    name: 'vite-plugin-raw-import',
    resolveId(source) {
      if (source === '@raw') {
        return 'virtual:@raw'; // A virtual id to prevent Vite from looking for an actual file.
      }
      return null;
    },
    load(id) {
      if (id === 'virtual:@raw') {
        // Return a module with a dummy default export.
        return 'export default null;';
      }
      return null;
    },
    transform(code, id) {
      if (fileContentsRegex.test(code) && id) {
        if (fs.existsSync(id) && fs.statSync(id).isFile()) {
          const fileContents = fs.readFileSync(id, 'utf-8');
            // Directly assign the raw content to the "fileContents" variable.
            const replacement = `const fileContents = ${JSON.stringify(fileContents)};`;
            return code.replace(fileContentsRegex, replacement);
          }
          this.error(`Cannot find file or the path points to a directory: ${id}`);
      }
      return null;
    }
  };
}

export default rawImportPlugin;
