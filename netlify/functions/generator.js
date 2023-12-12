const puppeteer = require('puppeteer-core')

exports.handler = async function (event, context) {
    const cloudPuppeteerToken = process.env.CLOUD_PUPPETEER_TOKEN;
    
    // Launch Chrome.
    const browser = await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${cloudPuppeteerToken}`,
    })
    
    const page = await browser.newPage()
    await page.setViewport({ width: 2560, height: 1440 })

    await page.goto(`https://wrapped.schrodinger-hat.it/wrapped/${event.queryStringParameters?.username}?social=true`, {
        waitUntil: 'networkidle0',
    })
    const element = await page.$('.wrapped__wrap');

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 's-maxage=86400',
        },
        body: (await element.screenshot()).toString('base64'),
        isBase64Encoded: true,
    }
}