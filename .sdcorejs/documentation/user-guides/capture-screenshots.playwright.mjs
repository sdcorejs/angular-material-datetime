import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

let chromium;

try {
  ({ chromium } = await import('playwright'));
} catch {
  throw new Error(
    'Playwright is not installed. Add it according to the workspace dependency policy before capturing screenshots.',
  );
}

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputDirectory = resolve(scriptDirectory, 'images');
const baseUrl = process.env.SHOWCASE_URL ?? process.argv[2] ?? 'http://localhost:4200';

const captures = [
  {
    name: 'showcase-hero',
    path: resolve(outputDirectory, 'showcase-hero.png'),
    selector: 'app-hero',
  },
  {
    name: 'showcase-examples',
    path: resolve(outputDirectory, 'showcase-examples.png'),
    selector: '#examples',
  },
  {
    name: 'showcase-picker-dialog',
    path: resolve(outputDirectory, 'showcase-picker-dialog.png'),
    selector: '[role="dialog"]',
    prepare: async (page) => {
      await page.getByRole('button', { name: /open interactive datetime picker/i }).click();
    },
  },
];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

try {
  for (const capture of captures) {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await capture.prepare?.(page);

    const target = page.locator(capture.selector);
    await target.waitFor({ state: 'visible' });
    await target.screenshot({ path: capture.path });
    console.log(`Captured ${capture.name}: ${capture.path}`);
  }
} finally {
  await browser.close();
}
