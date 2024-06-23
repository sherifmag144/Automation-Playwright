const { test, expect } = require('@playwright/test');

test('testframe', async ({ page }) => {
    await page.goto('https://outsystemsui.outsystems.com/live/web/BankingPreview?AllowInstall=true&Protocol=servicestudio');
    const frame = await page.frameLocator('iframe[title="Application preview frame"]');
    await frame.getByRole('button',{name:'Andrea McKenzie Continue as'}).click()
    await frame.getByPlaceholder('Search by description').click();
    await frame.getByPlaceholder('Search by description').fill('car');
    const title1 =  await frame.getByRole('gridcell', { name: 'Posting date' })
    const title2=  await frame.getByRole('gridcell', { name: 'Transaction date' })
    const title3=  await frame.getByRole('gridcell', { name: 'Description' })
    const expect1= await frame.getByText('/ 19 / 2024').first()
    const expect2= await frame.getByText('/ 19 / 2024').nth(1)
    await expect (title1).toBeVisible()
    await expect (title2).toBeVisible()
    await expect (title3).toBeVisible()
    await expect (expect1).toContainText('06 / 19 / 2024')
    await expect (expect2).toContainText('06 / 19 / 2024')
    const car = await frame.getByText('Savings for a new car')
    await expect (car).toContainText("Savings for a new car")
    const listnum = await frame.getByTestId('Pagination.RecordsNumber')
    await expect (listnum).toContainText("1");
    await page.waitForTimeout(5000)

});