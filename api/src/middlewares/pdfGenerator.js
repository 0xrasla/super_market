import fs from 'fs';
import path from 'path';
import util from 'util';
import puppeteer from 'puppeteer';
import hb from 'handlebars';

const readFile = util.promisify(fs.readFile);

async function getTemplateHtml() {
  console.log("Loading template file in memory");
  try {
    const invoicePath = path.resolve("./views/invoice.html");
    return await readFile(invoicePath, 'utf8');
  } catch (err) {
    throw new Error("Could not load html template");
  }
}

async function generatePdf() {
  let data = {}; // Add your data if needed

  try {
    const res = await getTemplateHtml();
    console.log("Compiling the template with handlebars");
    const template = hb.compile(res, { strict: true });
    const result = template(data);
    const html = result;

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setContent(html);

    await page.pdf({ path: './output/invoice.pdf', format: 'A4' });

    await browser.close();
    console.log("PDF Generated");
  } catch (err) {
    console.error(err);
    throw new Error("Error generating PDF");
  }
}

export { generatePdf };
