const { test, expect } = require('@playwright/test');

let page
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://practice.expandtesting.com/');
    const JavaScriptDialogs = await page.locator("//a[normalize-space()='JavaScript Dialogs']");
    await JavaScriptDialogs.click()
    const frame1 = page.frameLocator('iframe[name="aswift_4"]').frameLocator('iframe[name="ad_iframe"]').getByLabel('Close ad')
    const frame2 = page.frameLocator('iframe[name="aswift_4"]').getByLabel('Close ad')
    const frame3 = page.frameLocator('iframe[name="ad_iframe"]').frameLocator('iframe[name="aswift_4"]').getByLabel('Close ad')
    const frame4 = page.frameLocator('iframe[name="ad_iframe"]').frameLocator('iframe[name="aswift_3"]').getByLabel('Close ad')
    const frame5 = page.frameLocator('iframe[name="ad_iframe"]').frameLocator('iframe[name="aswift_2"]').getByLabel('Close ad')
    const frame6 = page.frameLocator('iframe[name="ad_iframe"]').frameLocator('iframe[name="aswift_1"]').getByLabel('Close ad')
    if(await frame1.isVisible()){
     frame1.click()
   }else if (await frame2.isVisible()) {
    frame2.click()
   } else if (await frame3.isVisible()){
    frame3.click()
   } else if (await frame4.isVisible()){
    frame4.click()
   } else if (await frame5.isVisible()){
    frame5.click()
   }else if (await frame6.isVisible()){
    frame6.click()
   }
});


test('JS alert', async () => {
    await page.on('dialog', async dialog => {
        await expect(dialog.message()).toContain('I am a Js Alert')
        await dialog.accept(); // To accept the confirm dialog
    })
    await page.locator("#js-alert").click()
    const response = await page.locator("#dialog-response")
   await expect(response).toContainText("OK")
})

test('JS Confirm with Cancel', async () => {
    await page.on('dialog', async dialog => {
        await expect(dialog.message()).toContain('I am a Js Confirm')
        await dialog.dismiss(); // To Cancel dialog
    })
    await page.locator("#js-confirm").click()
    const response = await page.locator("#dialog-response")
    await expect(response).toContainText("Cancel")
})

test('JS Confirm with OK', async () => {
    await page.on('dialog', async dialog => {
        await expect(dialog.message()).toContain('I am a Js Confirm')
        await dialog.accept(); // To accept dialog
    })
    await page.locator("#js-confirm").click()
    const response = await page.locator("#dialog-response")
    await expect(response).toContainText("Ok")
})

test('JS Prompt', async () => {
    await page.on('dialog', async dialog => {
        await expect(dialog.message()).toContain('I am a Js prompt')
        await dialog.accept("Harry"); // To accept dialog
    })
    await page.locator("#js-prompt").click()
    const response = await page.locator("#dialog-response")
    await expect(response).toHaveText("Harry")
})





