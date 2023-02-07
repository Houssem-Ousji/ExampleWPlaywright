module.exports.errorHandler = async (error,page,browser,step) =>{
    await page.screenshot({ path: `screenshots/step_failed${step}.png`, fullPage: true });
    await browser.close()
    throw new Error(error.toString())
}
