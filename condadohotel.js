const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch ({headless: false})
	const page = await browser.newPage();

	await page.goto('https://www.condadohotel.com/')
	await page.screenshot ({path: './testPics/test.jpg'})

	await page.$eval('#datein', el => el.value = '25/11/2021');	
	await page.screenshot ({path: './testPics/datein.jpg'})

	await page.$eval('#dateout', el => el.value = '10/12/2021');	
 	await page.screenshot ({path: './testPics/dateout.jpg'})

	await page.type('#adults','2')
 	await page.screenshot ({path: './testPics/adults.jpg'})

/* 	await page.click('#bookingBtn')
	await page.screenshot ({path: './testPics/bookingBtn.jpg'}) */


/* 	const pageTarget = page.target()

	const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget)

	const newPage = await newTarget.page()
	await newPage.bringToFront()

    await newPage.waitForTimeout (4000) */

	await page.waitForSelector('#bookingBtn');            // wait object load
	const link = await page.$('#bookingBtn');             // declare object

	const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));    // declare promise
	await link.click();                             // click, a new tab opens
	const newPage = await newPagePromise;           // open new tab /window, now you can work with it
	await newPage.waitForTimeout (4000)
	await newPage.bringToFront();                          // close it, for example

	await newPage.screenshot ({path: './testPics/newTab.jpg'})


	console.log ('page loaded')


	await browser.close(); 
})();