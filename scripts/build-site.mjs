import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(project, "dist");
const photosSource = path.join(project, "族谱照片");
const photosOutput = path.join(output, "族谱照片");

rmSync(output, { recursive: true, force: true });
mkdirSync(photosOutput, { recursive: true });
copyFileSync(
  path.join(project, "彭氏族谱关系图.html"),
  path.join(output, "index.html"),
);

const availablePhotos = new Set(readdirSync(photosSource));
for (let page = 0; page <= 48; page += 1) {
  const filename = `${page}.jpg`;
  if (!availablePhotos.has(filename)) {
    throw new Error(`缺少谱页照片：族谱照片/${filename}`);
  }
  copyFileSync(path.join(photosSource, filename), path.join(photosOutput, filename));
}

console.log(`已构建网页和 49 张谱页照片：${output}`);
