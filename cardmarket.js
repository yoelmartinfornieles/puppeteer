const puppeteer = require('puppeteer');

(async () => {
	//initialize the browser
	const browser = await puppeteer.launch({headless: true});
	//open a page
	const page = await browser.newPage();

	//go to a url
	await page.goto('http://www.cardmarket.com/');

	//click a button
	const button = await page.$('.btn.btn-secondary.btn-sm');
	await button.click();           
	//take a screenshot
	await page.screenshot({path: './testPics/cardmarketMain.jpg'})

	//click a part in the webpage
	const mtg = await page.$('.sprite-link.py-md-4');
	await mtg.click(); 
	await page.waitForTimeout(2000);
	await page.screenshot({path: './testPics/mtg.jpg'})

	//type a text in a form
	await page.type('#ProductSearchInput', 'lightning bolt');	
	await page.screenshot({path: './testPics/lightningboltsearch.jpg'})

	const searchBtn = await page.$('#search-btn');
	await searchBtn.click();
	await page.waitForTimeout(2000);
	await page.screenshot({path: './testPics/lightningboltsearchresults.jpg'}) 

	//click on a link
	const card = await page.$('#productRow556319 > div:nth-child(4) ');
	await card.click();
	await page.waitForTimeout(2000);
	await page.screenshot({path: './testPics/lightningboltcard.jpg'})

	//wait for a part of the page to load
	await page.waitForSelector('#image');

	await page.waitForSelector('[data-toggle=tooltip]')

	let cardData = {}

	cardData.name = await page.evaluate(() => {
		let element = document.querySelectorAll('.page-title-container.d-flex.align-items-center.text-break > div > h1')
		let title = element[0].innerHTML
		console.log(typeof title)
		return title.split('<')[0];
	})

	cardData.printedIn = await page.evaluate(() => {
		let element = document.querySelectorAll('.page-title-container.d-flex.align-items-center.text-break > div > h1 > span')
		return element[0].innerHTML;
	})

	cardData.cheapestPrice = await page.evaluate(() => {
		let element = document.querySelectorAll('#tabContent-info > div > div:nth-child(2) > div > div:nth-child(2) > dl > dd:nth-child(12)')
		return element[0].innerText;
	})

	cardData.futurePrice = await page.evaluate(() => {
		let element = document.querySelectorAll('#tabContent-info > div > div:nth-child(2) > div > div:nth-child(2) > dl > dd:nth-child(14)')
		return element[0].innerText;
	})

	cardData.averagePrice30 = await page.evaluate(() => {
		let element = document.querySelectorAll('#tabContent-info > div > div:nth-child(2) > div > div:nth-child(2) > dl > dd:nth-child(16)')
		return element[0].innerText;
	})

	cardData.averagePrice7 = await page.evaluate(() => {
		let element = document.querySelectorAll('#tabContent-info > div > div:nth-child(2) > div > div:nth-child(2) > dl > dd:nth-child(18)')
		return element[0].innerText;
	})

	cardData.averagePrice1 = await page.evaluate(() => {
		let element = document.querySelectorAll('#tabContent-info > div > div:nth-child(2) > div > div:nth-child(2) > dl > dd:nth-child(20)')
		return element[0].innerText;
	})
	

	console.log('cardData: ', cardData)

	await browser.close();
})();