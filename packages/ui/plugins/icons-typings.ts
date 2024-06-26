import fs from "node:fs";
import path from "node:path";

const ext = ".svg";

interface Icon {
  name: string;
  dir: string;
}

export function buildIcons(rootDir: string) {
  const icons = (fs.readdirSync(rootDir, { recursive: true }) as string[])
    .filter((name) => name.endsWith(ext))
    .map((originalPath) => {
      const fileName = path.basename(originalPath);
      const name = fileName.replace(ext, "");
      const dir = originalPath.replace(fileName, "");

      const icon: Icon = { name, dir };

      // Rename Figma-styled file from path "prop1=val1, prop2=val2, ..." to "val1-val2-..."
      if (icon.name.includes("=")) {
        const { name } = icon;
        const newName = name
          .split(/,\s*/gi)
          .map((prop) => prop.split("=")[1])
          .join("-")
          .toLowerCase()
          .replace(/\s+/gi, "-");

        const oldPath = path.join(rootDir, originalPath);
        const newPath = path.join(rootDir, dir, `${newName}${ext}`);
        if (fs.existsSync(newPath)) {
          console.info(`File ${newPath} already exists! File is deleted.`);
          fs.unlinkSync(oldPath);
          return null;
        }
        fs.renameSync(oldPath, newPath);
        icon.name = newName;
      }

      const fullPath = path.join(rootDir, icon.dir, `${icon.name}${ext}`);

      // Replace all stroke and fill attrs (except "none") with "currentColor" string
      const content = fs.readFileSync(fullPath, "utf-8");
      const newContent = content
        .replace(/stroke="(?!none).*?"/gi, 'stroke="currentColor"')
        .replace(/fill="(?!none).*?"/gi, 'fill="currentColor"')
        // Replace all stroke-width attrs with "var(--stroke-width, $1)" string if it's not started with "var"
        .replace(
          /stroke-width="(?!var)(.*?)"/gi,
          'stroke-width="var(--stroke-width, $1)"',
        )
        .replace(/clip-path="(?!none).*?"/gi, "");

      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent);
      }

      return icon;
    })
    .filter(Boolean) as Icon[];
  icons.sort((a, b) => a.name.localeCompare(b.name));

  /* Typings */

  const names = icons.map(({ name }) => name);

  const file = `// This file is generated by buildIconsTypings function
// Do not edit it manually!

export const iconNames = [
${names.map((name) => `  "${name}"`).join(",\n")},
] as const;

export type IconName = (typeof iconNames)[number];
`;
  fs.writeFileSync(`${rootDir}/icons.ts`, file);
}
