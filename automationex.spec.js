const { test, expect } = require('@playwright/test');
import { ContactForm } from '../Pages/contactform.js';
const { chromium } = require('playwright');

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('https://automationexercise.com/');
  await page.locator("a[href='/login']").click();
  await expect(page.locator('body')).toBeVisible();
  await page.waitForTimeout(2000);
  await page.getByPlaceholder("Name").fill("Sherif automation")
  await page.locator("input[data-qa='signup-email']").fill("sherifautomation122@gmail.com")
  await page.locator("button[data-qa='signup-button']").click()
  await page.waitForTimeout(4000);
  const messageEmail = page.locator("body > section:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > form:nth-child(2) > p:nth-child(5)")
  if( await messageEmail.isVisible()){
await page.locator ("input[data-qa='login-email']").fill("sherifautomation122@gmail.com")
await page.locator("input[placeholder='Password']").fill("102030Ss")
await page.locator ("button[data-qa='login-button']").click()

  }else{
  await page.locator("#id_gender1").check()
  await page.locator("#password").fill("102030Ss")
  await page.selectOption("#days", "14")
  await page.selectOption("#months", "7")
  await page.selectOption("#years", "1994")
  await page.locator("#optin").check()
  await page.locator("#first_name").fill("sherif")
  await page.locator("#last_name").fill("magdy")
  await page.locator("#address1").fill("Haram district")
  await page.selectOption("#country", "Canada")
  await page.locator("#state").fill("giza")
  await page.locator("#city").fill("Giza")
  await page.locator("#zipcode").fill("11111")
  await page.locator("#mobile_number").fill("01203378899")
  await page.locator("button[data-qa='create-account']").click()
  await page.waitForTimeout(4000);
  }
});

test.only('verify Home Page is visible', async () => {
  const HomePage = await page.locator(".header-middle")
  await expect(HomePage).toBeVisible();
});

test.only('contact us form', async () => {
  await page.locator("a[href='/contact_us']").click()
  const getintouch = await page.locator("div[class='contact-form'] h2[class='title text-center']")
  await expect(getintouch).toBeVisible();
  const form = new ContactForm(page)
  await form.fillingForm("Sherif automation","sherifautomation122@gmail.com","automationExercise","abc")
  await page.waitForTimeout (3000) ;
  await form.uploadfile('demo.txt')
  await page.waitForTimeout (3000) ;



});

test('add products to cart',async()=> {
await page.goto("https://automationexercise.com/products")
  await page.locator("body > section:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)").hover();
  await page.locator("body > section:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(3)").click()
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  const Prod =  await page.locator("td[class='cart_description'] p") 
  await expect (Prod).toBeVisible
 
});













