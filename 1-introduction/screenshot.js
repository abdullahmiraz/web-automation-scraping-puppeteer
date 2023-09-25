const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://duckduckgo.com');
    await page.waitForSelector('#searchbox_input');
    await page.type('#searchbox_input', 'miraz');
    await page.click(`[aria-label='Search']`);
    await page.waitForSelector(".react-results--main");
    await page.screenshot({ path: 'search.png' });

    await browser.close();

})();
