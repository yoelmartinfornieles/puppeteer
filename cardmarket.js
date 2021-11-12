const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();

	await page.goto('http://www.cardmarket.com/');

	const button = await page.$('.btn.btn-secondary.btn-sm');
	await button.click();           
	await page.screenshot({path: './testPics/cardmarketMain.jpg'})

	const mtg = await page.$('.sprite-link.py-md-4');
	await mtg.click(); 
	await page.waitForTimeout(2000);
	await page.screenshot({path: './testPics/mtg.jpg'})

	await page.type('#ProductSearchInput', 'lightning bolt');	
	await page.screenshot({path: './testPics/lightningboltsearch.jpg'})

	const searchBtn = await page.$('#search-btn');
	await searchBtn.click();
	await page.waitForTimeout(2000);
	await page.screenshot({path: './testPics/lightningboltsearchresults.jpg'}) 

	const card = await page.$('#productRow556319 > div:nth-child(4) ');
	await card.click();
	await page.waitForTimeout(2000);
	await page.screenshot({path: './testPics/lightningboltcard.jpg'})

/* 	await browser.close();
 */})();