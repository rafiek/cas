const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: true
    });
    const page = await browser.newPage();
    await page.goto("https://localhost:8443/cas/login");

    await page.type('#username', "mustchangepswd");
    await page.type('#password', "mustchangepswd");
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    const header = await page.$eval('#pwdmain h3', el => el.innerText)
    console.log(header)
    assert(header === "You must change your password.")

    let pwddesc = await page.$eval('#pwddesc', el => el.innerText)
    console.log(pwddesc)
    assert(pwddesc === "Please change your password.")
    
    await browser.close();
})();
