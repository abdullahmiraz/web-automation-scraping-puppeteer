import puppeteer from "puppeteer";
import { Page } from "puppeteer";
import { setTimeout } from "timers/promises";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Job, Queue, Worker } from "bullmq";
import Redis from "ioredis";
import "dotenv/config";

const connection = new Redis(process.env.REDIS_PATH, {
  maxRetriesPerRequest: null,
});

const db = new Low(new JSONFile("ecommerce.json"), {});
await db.read();

const saveToDB = async (id, productData) => {
  db.data[id] = productData;
  await db.write();
};

const browser = await puppeteer.launch({
  headless: false,
  userDataDir: "/tmp/ecommerce-crawler",
});
 


const extractText = (page, selector) => {
  return page.evaluate((selector) => {
    return document.querySelector(selector)?.innerHTML;
  }, selector);
};

 

new Worker(
  "product",
  async (job) => {
    const productLink = job.data.url;
    console.log(productLink);

    const page = await browser.newPage();
    await page.goto(productLink, { waitUntil: "networkidle2", timeout: 60000 });
    await page.waitForSelector(".ecomm-container h1");

    const title = await extractText(page, ".ecomm-cotainer h1");
    const tagline = await extractText(page, ".product-tagline");
    const price = await extractText(page, "#productPrice");
    const description = await extractText(page, ".product-desc");

    const variants = await page.evaluate(() => {
      return [
        ...document.querySelectorAll(".single-option-selector option"),
      ].map((e) => e.value);
    });

    const variantData = [];

    for (let variant of variants) {
      await page.select(".single-option-selector", variant);
      await setTimeout(100);
      variantData.push({
        variant,
        price: await extractText(page, "#productPrice"),
      });
    }

    await saveToDB(productLink, {
      productLink,
      title,
      tagline,
      price,
      description,
      variants,
    });

    await page.close();
  },
  { connection }
);
