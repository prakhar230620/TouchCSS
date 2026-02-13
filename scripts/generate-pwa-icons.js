const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_ICON = './public/icon.svg';
const ICONS_DIR = './public/icons';

// Ensure icons directory exists
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// Generate PWA icons
async function generateIcons() {
  try {
    // Generate main icons
    await sharp(INPUT_ICON)
      .resize(192, 192)
      .toFile(path.join(ICONS_DIR, 'icon-192x192.png'));

    await sharp(INPUT_ICON)
      .resize(512, 512)
      .toFile(path.join(ICONS_DIR, 'icon-512x512.png'));

    // Generate splash screens
    await sharp(INPUT_ICON)
      .resize(640, 1136)
      .toFile(path.join(ICONS_DIR, 'splash-640x1136.png'));

    await sharp(INPUT_ICON)
      .resize(750, 1334)
      .toFile(path.join(ICONS_DIR, 'splash-750x1334.png'));

    await sharp(INPUT_ICON)
      .resize(1242, 2208)
      .toFile(path.join(ICONS_DIR, 'splash-1242x2208.png'));

    await sharp(INPUT_ICON)
      .resize(1125, 2436)
      .toFile(path.join(ICONS_DIR, 'splash-1125x2436.png'));

    // Generate main logo.png for navbar/usage
    await sharp(INPUT_ICON)
      .resize(512, 512)
      .toFile('./public/logo.png');

    console.log('Main logo.png generated!');

    console.log('PWA icons generated successfully!');
  } catch (error) {
    console.error('Error generating PWA icons:', error);
  }
}

generateIcons();
