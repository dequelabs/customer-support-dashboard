import puppeteer from "puppeteer"; // 1
import { AttestPuppeteer } from '@deque/attest-puppeteer';
import rimraf from 'rimraf';
import AttestReporter from '@deque/attest-reporter';

let browser;
let page;
let attestReporter;

beforeAll(async () => {
    //remove previous attest output files
  rimraf.sync("../a11y_Results_Puppeteer/*.json");

  //launch attest reporter
  attestReporter = new AttestReporter('puppeteer', '../a11y_Results_Puppeteer');

  //launch web driver
  browser = await puppeteer.launch({
    headless: true
  });
  page = await browser.newPage();

  //launch browser page for testing
  await page.goto("http://localhost:4000/home");
});

test("navigates to make request then back to home", async () => {

  expect(page.url()).toBe("http://localhost:4000/home");

  // const axe340 = require('../axe-core-3.4.0');
  // const results1 = await new AttestPuppeteer(page, axe340).analyze();
  // attestReporter.logTestResult('Home Page 3.4.0', results1);

  await Promise.all([
    page.click('#requestbtn'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
  expect(page.url()).toBe("http://localhost:4000/request");

  await Promise.all([
    page.click('#CancelButton'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
  expect(page.url()).toBe("http://localhost:4000/home");
});

// test("should not submit empty form", async () => {

//   await Promise.all([
//     page.click('#requestbtn'),
//     page.waitForNavigation({ waitUntil: 'networkidle0' }),
//   ]);

//   expect(page.url()).toBe("http://localhost:4000/request");

//   const results = await new AttestPuppeteer(page).analyze();
//   attestReporter.logTestResult('Request Page', results);

//   await Promise.all([
//     page.click('#SubmitButton'),
//   ]);
//   expect(page.url()).toBe("http://localhost:4000/request");
// });

// test("form should be able to be filled out", async () => {

//   expect(page.url()).toBe("http://localhost:4000/request");

//   const results = await new AttestPuppeteer(page).analyze();
//   attestReporter.logTestResult('Request Page Error', results);

//   await page.type('#SummaryInput', 'puppeteer summary test');
//   await page.type('#DescriptionInput', 'puppeteer description test');
//   await page.type('#AdtlInfoInput', 'puppeteer additional test');

//   const summaryVal = await page.evaluate(() => document.querySelector('#SummaryInput').value);
//   const descVal = await page.evaluate(() => document.querySelector('#DescriptionInput').value);
//   const adtlVal = await page.evaluate(() => document.querySelector('#AdtlInfoInput').value);

//   expect(summaryVal).toBe('puppeteer summary test');
//   expect(descVal).toBe('puppeteer description test');
//   expect(adtlVal).toBe('puppeteer additional test');

// });

// test("submit form", async () => {

//   expect(page.url()).toBe("http://localhost:4000/request");

//   await Promise.all([
//     page.click('#SubmitButton'),
//     page.waitForNavigation({ waitUntil: 'networkidle0' }),
//   ]);
//   expect(page.url()).toBe("http://localhost:4000/home");
 
// });

// const escapeXpathString = str => {
//   const splitedQuotes = str.replace(/'/g, `', "'", '`);
//   return `concat('${splitedQuotes}', '')`;
// };

// const clickByText = async (page, text) => {
//   const escapedText = escapeXpathString(text);
//   const linkHandlers = await page.$x(`//a[contains(text(), ${escapedText})]`);
  
//   if (linkHandlers.length > 0) {
//     await linkHandlers[0].click();
//   } else {
//     throw new Error(`Link not found: ${text}`);
//   }
// };

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// test("view ticket", async () => {

//   expect(page.url()).toBe("http://localhost:4000/home");

//   jest.setTimeout(10000);
//   await sleep(5500);

//   await clickByText(page, `puppeteer summary test`);
//   await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
//   expect(page.url()).toContain("http://localhost:4000/detail/");

//   const results = await new AttestPuppeteer(page).analyze();
//   attestReporter.logTestResult('Detail Page', results);
// });

// test("wont make empty comment", async () => {

//   jest.setTimeout(10000);

//   expect(page.url()).toContain("http://localhost:4000/detail/");

//   await page.click('#SubmitCommentBtn');

//   const pageVal = (await page.content()).match("Can not submit empty comment.");

//   expect(pageVal).toContain("Can not submit empty comment.");

//   const results = await new AttestPuppeteer(page).analyze();
//   attestReporter.logTestResult('Detail Page Error', results);

//   //expect comments list length 0
//   //const commentsLength = await page.evaluate(() => document.querySelector('#CommentsList').length);
//   //expect(commentsLength).toBe(0);

// });

// test("enter comment", async () => {

//   expect(page.url()).toContain("http://localhost:4000/detail/");

//   await page.type('#CommentField', 'puppeteer comment test');

//   const commentVal = await page.evaluate(() => document.querySelector('#CommentField').value);

//   await expect(commentVal).toBe('puppeteer comment test');


//   // const numComments = await page.evaluate(() => document.querySelector('#CommentList'));

//   // console.log("before num comments:",numComments);
  
// });

// test("submit comment", async () => {

//   await page.click('#SubmitCommentBtn');

//   // const numComments = await page.evaluate(() => document.querySelector('#CommentsList').children.tags("LI"));

//   // console.log("after num comments:",numComments);
// });


afterAll(async () => {
  browser.close();
  await attestReporter.buildHTML('../a11y_Results_Puppeteer');
});




