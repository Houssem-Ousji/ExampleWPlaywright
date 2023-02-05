const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { Browser, chromium, Page } = require("playwright");
const { expect } = require("@playwright/test");

let browser = Browser;
let page = Page;
async function navigate() {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://www.demoblaze.com/");
  console.log(`captured site title as ${await page.title()}`);
}

Given("I am on {string} page", async function (expectedTitle) {
  await navigate();
  const title = await page.locator("#nava").textContent();
  expect(expectedTitle).toEqual(title.trim());
});
When("I click categories link", async function () {
  const categories_button = await page.locator("#cat").click();
});
Then(
  "I see {string} , {string} and {string} under categories",
  async function (string,string1,string2) {
    const phones = await page.getByRole('link',{ name: 'Phones' }).textContent();
    const laptops = await page.getByRole('link',{ name: 'Laptops' }).textContent();
    const monitoring = await page.getByRole('link',{ name: 'Monitors' }).textContent();
    expect(string).toEqual(phones.trim());
    expect(string1).toEqual(laptops.trim());
    expect(string2).toEqual(monitoring.trim());
  }
);
