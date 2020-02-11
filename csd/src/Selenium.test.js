// const {Builder, By} = require("selenium-webdriver");

// let driver;

// beforeAll(async () => {
//     driver = await new Builder().forBrowser('chrome').build();
//     await driver.get("http://localhost:4000/home")
// });

// test("navigates to make request then back to home", async () => {

//     expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/home");

//     await driver.findElement(By.css(".RequestLink")).click()
    
//     expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/request");

//     await driver.findElement(By.id("CancelButton")).click()
    
//     expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/home");
// });

// test("should not submit empty form", async () => {

//     await driver.findElement(By.css(".RequestLink")).click()
    
//     expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/request");

//     await driver.findElement(By.id("SubmitButton")).click()

//     expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/request");

// });

// test("form should be able to be filled out", async () => {

//     await driver.findElement(By.id('SummaryInput')).sendKeys('summary test');
//     await driver.findElement(By.id('DescriptionInput')).sendKeys('description test');
//     await driver.findElement(By.id('AdtlInfoInput')).sendKeys('additional test');

//     expect(await driver.findElement(By.id('SummaryInput')).getAttribute("value")).toBe("summary test");
//     expect(await driver.findElement(By.id('DescriptionInput')).getAttribute("value")).toBe("description test");
//     expect(await driver.findElement(By.id('AdtlInfoInput')).getAttribute("value")).toBe("additional test");

// });

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// test("submit button should submit ticket", async () => {

//     await driver.findElement(By.id("SubmitButton")).click();

//     await sleep(2000);
    
//     expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/home");

// });

// test("view ticket", async () => {
//     await sleep(2000);
//     await driver.findElement(By.linkText('summary test')).click();
//     await sleep(2000);
//     expect(await driver.getCurrentUrl()).toContain("http://localhost:4000/detail/");

// });

// // test("wont make empty comment", async () => {

// //     //click comment button
// //     //check for empty comment warning

// // });

// // test("make comment", async () => {

// //     //find comment field
// //     //type comment
// //     //click submit button
// //     //verify comment

// // });

// afterAll(async () => {
//     //driver.quit();
// });