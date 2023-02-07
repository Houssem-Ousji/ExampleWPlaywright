const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { Browser, chromium, Page } = require("playwright");
const { expect } = require("@playwright/test");
const { errorHandler } = require("../../errorHandling");


let browser = Browser;
let page = Page;
async function navigate() {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://www.demoblaze.com/");
  console.log(`captured site title as ${await page.title()}`);
}
async function close() {
  await browser.close()
}
Given("I am on {string} page", async function (expectedTitle) {
  try {
    await navigate();
    const title = await page.locator("#nava").textContent();
    expect(expectedTitle).toEqual(title.trim());
    await page.screenshot({ path: 'screenshots/first_step.png', fullPage: true });
  } catch (error) {
    await errorHandler(error, page, browser,"1")
  }
});
When("I click categories link", async function () {
  try {
    const categories_button = await page.locator("#cat").click();
    await page.screenshot({ path: 'screenshots/second_step.png', fullPage: true });
  } catch (error) {
    await errorHandler(error, page, browser,"2")
  }
});
Then(
  "I see {string} , {string} and {string} under categories",
  async function (string, string1, string2) {
    try {
      const phones = await page.getByRole('link', { name: 'Phones' }).textContent();
      const laptops = await page.getByRole('link', { name: 'Laptops' }).textContent();
      const monitoring = await page.getByRole('link', { name: 'Monitors' }).textContent();
      expect(string).toEqual(phones.trim());
      expect(string1).toEqual(laptops.trim());
      expect(string2).toEqual(monitoring.trim());
      await page.screenshot({ path: 'screenshots/third_step.png', fullPage: true });
      await close();
    } catch (error) {
      await errorHandler(error, page, browser,"3")
    }
  }
);
