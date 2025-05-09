import { readdir, readFile, writeFile, stat } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// ESM ⛽️ to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🛠️ Core function
async function replaceInFiles(dirPath, regexToMatch, stringToReplace) {
  const files = await readdir(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      await replaceInFiles(fullPath, regexToMatch, stringToReplace);
    } else if (file.endsWith(".js")) {
      let content = await readFile(fullPath, "utf8");
      if (regexToMatch.test(content)) {
        const newContent = content.replace(regexToMatch, stringToReplace);
        await writeFile(fullPath, newContent, "utf8");
        console.log(`🔧 Updated: ${fullPath}`);
      }
    }
  }
}

// Example usage ✨
const regexToMatch = /^import\s+React\s+from\s+'react'\s*;?\s*$/gm;
const stringToReplace = "";
await replaceInFiles(
  path.join(__dirname, "src"),
  regexToMatch,
  stringToReplace
);

console.log(`\n✅ Replacement complete! 🚀`);
