// Rendert index.html Bild für Bild und kodiert das Ergebnis mit ffmpeg zu einem MP4.
// Aufruf:  NODE_PATH=$(npm root -g) node render.cjs [ausgabe.mp4] [fps]
//          NODE_PATH=$(npm root -g) node render.cjs --stills 4,12,20   (einzelne PNG-Standbilder)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const url = 'file://' + path.join(__dirname, 'index.html') + '?render';
const executablePath = process.env.CHROMIUM_PATH || undefined;

(async () => {
  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);

  if (args[0] === '--stills') {
    for (const s of args[1].split(',').map(Number)) {
      await page.evaluate(t => window.seek(t), s);
      await page.screenshot({ path: path.join(args[2] || '.', `still_${String(s).padStart(5, '0')}.png`) });
    }
    await browser.close();
    return;
  }

  const out = args[0] || 'scape_el_nino.mp4';
  const fps = Number(args[1] || 30);
  const duration = await page.evaluate(() => window.DURATION);
  const frames = Math.round(duration * fps);

  const ff = spawn('ffmpeg', [
    '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', out,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });

  for (let i = 0; i < frames; i++) {
    await page.evaluate(t => window.seek(t), i / fps);
    const buf = await page.screenshot({ type: 'png' });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % (fps * 5) === 0) process.stderr.write(`Frame ${i}/${frames}\n`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('Fertig:', out);
})();
