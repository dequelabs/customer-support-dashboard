const {Builder, By} = require("selenium-webdriver");
const attestNode = require('@deque/attest-node');
const AttestBuilder = require('@deque/attest-webdriverjs'), WebDriver = require('selenium-webdriver');
import rimraf from 'rimraf';

let driver;
let reporter;

beforeAll(async () => {

    jest.setTimeout(30000);

    //remove previous attest output files
    rimraf.sync('../a11y_Results_Selenium/*.json');

    //launch attest reporter
    await attestNode.buildAttestSource('wcag2');
    reporter = await attestNode.report('selenium', '../a11y_Results_Selenium');

    //launch web driver
    driver = await new Builder().forBrowser('chrome').build();

    //launch browser page for testing
    await driver.get("http://localhost:4000/home");
});

test("navigates to make request then back to home", async () => {

    expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/home");

    await sleep(2000);

    const results = await new AttestBuilder(driver).analyze();
    reporter.logTestResult('Home Page', results)


    await driver.findElement(By.css(".RequestLink")).click()
    
    expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/request");

    await driver.findElement(By.id("CancelButton")).click()
    
    expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/home");
});

test("should not submit empty form", async () => {

    await driver.findElement(By.css(".RequestLink")).click()
    
    expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/request");

    const results = await new AttestBuilder(driver).analyze();
    reporter.logTestResult('Request Page', results)

    await driver.findElement(By.id("SubmitButton")).click()

    expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/request");
});

test("form should be able to be filled out", async () => {

    const results = await new AttestBuilder(driver).analyze();
    reporter.logTestResult('Request Page Error', results)

    await driver.findElement(By.id('SummaryInput')).sendKeys('selenium summary test');
    await driver.findElement(By.id('DescriptionInput')).sendKeys('selenium description test');
    await driver.findElement(By.id('AdtlInfoInput')).sendKeys('selenium additional test');

    expect(await driver.findElement(By.id('SummaryInput')).getAttribute("value")).toBe("selenium summary test");
    expect(await driver.findElement(By.id('DescriptionInput')).getAttribute("value")).toBe("selenium description test");
    expect(await driver.findElement(By.id('AdtlInfoInput')).getAttribute("value")).toBe("selenium additional test");

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test("submit button should submit ticket", async () => {

    await driver.findElement(By.id("SubmitButton")).click();

    await sleep(2000);
    
    expect(await driver.getCurrentUrl()).toBe("http://localhost:4000/home");

});

test("view ticket", async () => {
    await sleep(2000);
    await driver.findElement(By.linkText('selenium summary test')).click();
    await sleep(2000);
    expect(await driver.getCurrentUrl()).toContain("http://localhost:4000/detail/");
    
    const results = await new AttestBuilder(driver).analyze();
    reporter.logTestResult('Detail Page', results)
});

test("wont make empty comment", async () => {

    await driver.findElement(By.id("SubmitCommentBtn")).click()

    //check for empty comment warning

    const results = await new AttestBuilder(driver).analyze();
    reporter.logTestResult('Detail Page Error', results)
});

test("enter comment", async () => {

    await driver.findElement(By.id('CommentField')).sendKeys('selenium comment test');

    expect(await driver.findElement(By.id('CommentField')).getAttribute("value")).toBe("selenium comment test");
    
});

test("submit comment", async () => { 
    await driver.findElement(By.id("SubmitCommentBtn")).click()
});

afterAll(async () => {
    await driver.quit();
    await reporter.buildHTML('../a11y_Results_Selenium');
});