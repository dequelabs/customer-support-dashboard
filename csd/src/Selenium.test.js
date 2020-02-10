const {Builder, By, Key, util} = require("selenium-webdriver");


let driver;

beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get("http://localhost:4000/home")
});

test("navigates to make request then back to home", async () => {

    //expect(driver.getCurrentUrl()).toBe("http://localhost:4000/home");
  
});