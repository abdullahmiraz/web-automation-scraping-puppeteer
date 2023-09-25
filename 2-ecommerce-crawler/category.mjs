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
 

const browser = await puppeteer.launch({
  headless: false,
  userDataDir: "/tmp/ecommerce-crawler",
});

const page = await browser.newPage(); 
    await page.goto("https://www.studioneat.com", { waitUntil: "networkidle2"});
    await page.waitForSelector(".product-title a");
    const productLinks = await page.evaluate(()=>{
      return [...document.querySelectorAll('.product-title a')].map((e)=>e.href );
    })

    console.log(productLinks);
    await page.close();
    await browser.close();
    
const myQueue = new Queue("product", { connection });

for (let productLink of productLinks) {
  myQueue.add(productLink, { url: productLink }, { jobId: productLink });
}
