module.exports.errorHandler = async (error,page,browser) =>{
    await page.screenshot({ path: 'screenshots/step_failed.png', fullPage: true });
    await browser.close()
    throw new Error(error.toString())
}