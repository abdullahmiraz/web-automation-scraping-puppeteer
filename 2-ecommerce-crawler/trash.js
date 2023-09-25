import puppeteer from 'puppeteer';
import { Page } from 'puppeteer';
import { setTimeout } from 'timers/promises';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { config } from 'process';
const db = new Low(new JSONFile("ecommerce.json"), {});
await db.read();

const saveToDB = async (id, productData) => {
    db.data[id] = productData;
    await db.write();
}

const browser = await puppeteer.launch({
    executablePath: '/bin/chromium-browser',
    headless: false
});

const page = await browser.newPage();

await page.goto('https://www.studioneat.com/', { waitUntil: 'networkidle2' });
// click event 
await page.waitForSelector('.needsclick.klaviyo-close-form.kl-private-reset-css-Xuajs1', { visible: true, clickable: true });
await page.click('.needsclick.klaviyo-close-form.kl-private-reset-css-Xuajs1');

await page.waitForSelector('.product-title a');

// console.log("successfull");

const productLinks = await page.evaluate(() => {
    return [...document.querySelectorAll('.product-title a')].map(e => (e.href));
})
console.log(productLinks);
await page.close();


const extractText = (page, selector) => {
    return page.evaluate(() => {
        return document.querySelector(selector)?.innerHTML;
    }, selector)
}
let cnt = 0;
for (let productLink of productLinks) {
    // for debugging
    cnt++;
    if (cnt == 5) break;
    // skipping item if already saved in db
    if (db.data[productLink]) {
        console.log("Item already exists")
        continue;
    }

    let title2;

    const page = await browser.newPage();
    await page.goto(productLink, { waitUntil: 'networkidle2', timeout: 50000 });

    await page.waitForSelector('.ecomm-container h1');
    const title = await extractText(page, '.ecomm-container h1');
    const tagline = await extractText(page, '.product-tagline');
    const price = await extractText(page, '#productPrice');
    const description = await extractText(page, '.product-desc');

    console.log({ title, price });
    await saveToDB(productLink, { productLink, title, price, description });
    title2 = title;

    await page.close();
}


await browser.close();




// random
document.querySelector('.price-box.price-final_price').innerText


import puppeteer from 'puppeteer';
import { Page } from 'puppeteer';
import { setTimeout } from 'timers/promises';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { config } from 'process';
const db = new Low(new JSONFile("ecommerce.json"), {});
await db.read();

const saveToDB = async (id, productData) => {
    db.data[id] = productData;
    await db.write();
}

const browser = await puppeteer.launch({
    executablePath: '/bin/chromium-browser',
    headless: false
});

const page = await browser.newPage();

await page.goto('https://www.studioneat.com/', { waitUntil: 'networkidle2' });
// click event 
await page.waitForSelector('.needsclick.klaviyo-close-form.kl-private-reset-css-Xuajs1', { visible: true, clickable: true });
await page.click('.needsclick.klaviyo-close-form.kl-private-reset-css-Xuajs1');

await page.waitForSelector('.product-title a');

// console.log("successfull");

const productLinks = await page.evaluate(() => {
    return [...document.querySelectorAll('.product-title a')].map(e => (e.href));
})
console.log(productLinks);
await page.close();


const extractText = (page, selector) => {
    return page.evaluate(() => {
        return document.querySelector(selector)?.innerHTML;
    }, selector)
}
let cnt = 0;
for (let productLink of productLinks) {
    // for debugging
    cnt++;
    if (cnt == 5) break;
    // skipping item if already saved in db
    if (db.data[productLink]) {
        console.log("Item already exists")
        continue;
    }

    let title2;

    const page = await browser.newPage();
    await page.goto(productLink, { waitUntil: 'networkidle2', timeout: 50000 });

    await page.waitForSelector('.ecomm-container h1');
    const title = await extractText(page, '.ecomm-container h1');
    const tagline = await extractText(page, '.product-tagline');
    const price = await extractText(page, '#productPrice');
    const description = await extractText(page, '.product-desc');

    console.log({ title, price });
    await saveToDB(productLink, { productLink, title, price, description });
    title2 = title;

    await page.close();
}


await browser.close();
//------------
import puppeteer from "puppeteer";
import { Page } from "puppeteer";
import { setTimeOut } from 'timers/promises';

import { Low } from "lowdb/lib";
import { JSONFile } from "lowdb/node"

const db = new Low(new JSONFile("ecommerce.json"), {});
await db.read();


const saveToDB = async (id, productData) => {
    db.data[id] = productData;
    await db.write();
}

const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "/tmp/ecommerce-crawler",
});
const page = await browser.newPage();
await page.goto("https://www.studioneat.com/", { waitUntil: "networkidle2" });
await page.waitForSelector(".product-title a");
const productLinks = await page.evaluate(() => {
    return [...document.querySelectorAll(".product-title a")].map((e) => e.href);
});

console.log(productLinks)
await page.close();