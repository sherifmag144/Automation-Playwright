const { test,expect } = require('@playwright/test');
import {TestData} from '../tests/search.json' ;


TestData.forEach((item,index) => {
test(`Searching Products : ${index +1 }` , async ({page}) => {
    await page.goto("https://automationexercise.com/products")
    await page.locator("#search_product").fill(TestData[index].key)
    await page.locator("#submit_search").click()
    const searchedprod = await page.locator(".left-sidebar")
    await expect (searchedprod).toBeVisible()
    const searchedprod1 = await page.locator(".title.text-center")
    await expect (searchedprod1).toContainText("Searched Products")
})
})

  
