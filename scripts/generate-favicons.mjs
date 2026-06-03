import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "assets/rooted-logo-source.png");
const appDir = path.join(root, "app");

async function main() {
  if (!fs.existsSync(source)) {
    throw new Error(`Source image not found: ${source}`);
  }

  const icon512 = await sharp(source)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const apple180 = await sharp(source)
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(source)
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
    )
  );

  const ico = await toIco(pngBuffers);

  fs.writeFileSync(path.join(appDir, "favicon.ico"), ico);
  fs.writeFileSync(path.join(appDir, "icon.png"), icon512);
  fs.writeFileSync(path.join(appDir, "apple-icon.png"), apple180);

  console.log("Generated app/favicon.ico, app/icon.png, app/apple-icon.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
