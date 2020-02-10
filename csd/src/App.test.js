// import puppeteer from "puppeteer"; // 1
// import { ExpansionPanelActions } from "@material-ui/core";
// import SelectInput from "@material-ui/core/Select/SelectInput";

// let browser;
// let page;

test("navigates to make request then back to home", async () => {
console.log("puppeteer turned off")
});


// beforeAll(async () => {
//   browser = await puppeteer.launch({
//     //headless: false
//   });
//   page = await browser.newPage();
//   await page.goto("http://localhost:4000/home");
// });

// test("navigates to make request then back to home", async () => {

//   expect(page.url()).toBe("http://localhost:4000/home");

//   await Promise.all([
//     page.click('#requestbtn'),
//     page.waitForNavigation({ waitUntil: 'networkidle0' }),
//   ]);
//   expect(page.url()).toBe("http://localhost:4000/request");

//   await Promise.all([
//     page.click('#CancelButton'),
//     page.waitForNavigation({ waitUntil: 'networkidle0' }),
//   ]);
//   expect(page.url()).toBe("http://localhost:4000/home");
// });

// test("wont submit empty form", async () => {

//   expect(page.url()).toBe("http://localhost:4000/home");

//   await Promise.all([
//     page.click('#requestbtn'),
//     page.waitForNavigation({ waitUntil: 'networkidle0' }),
//   ]);
//   expect(page.url()).toBe("http://localhost:4000/request");

//   await Promise.all([
//     page.click('#SubmitButton'),
//   ]);
//   expect(page.url()).toBe("http://localhost:4000/request");

// });

// test("fill out form", async () => {

//   expect(page.url()).toBe("http://localhost:4000/request");

//   await page.type('#SummaryInput', 'summary test');
//   await page.type('#DescriptionInput', 'description test');
//   await page.type('#AdtlInfoInput', 'additional test');

//   const summaryVal = await page.evaluate(() => document.querySelector('#SummaryInput').value);
//   const descVal = await page.evaluate(() => document.querySelector('#DescriptionInput').value);
//   const adtlVal = await page.evaluate(() => document.querySelector('#AdtlInfoInput').value);

//   expect(summaryVal).toBe('summary test');
//   expect(descVal).toBe('description test');
//   expect(adtlVal).toBe('additional test');

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

//   await clickByText(page, `summary test`);
//   await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
//   expect(page.url()).toContain("http://localhost:4000/detail/");
// });

// test("wont make empty comment", async () => {

//   jest.setTimeout(10000);

//   expect(page.url()).toContain("http://localhost:4000/detail/");

//   await page.click('#SubmitCommentBtn');

//   const pageVal = (await page.content()).match("Can not submit empty comment.");

//   expect(pageVal).toContain("Can not submit empty comment.");

//   //expect comments list length 0
//   //const commentsLength = await page.evaluate(() => document.querySelector('#CommentsList').length);
//   //expect(commentsLength).toBe(0);

// });

// test("enter comment", async () => {

//   expect(page.url()).toContain("http://localhost:4000/detail/");

//   await page.type('#CommentField', 'comment test');

//   const commentVal = await page.evaluate(() => document.querySelector('#CommentField').value);

//   await expect(commentVal).toBe('comment test');


//   // const numComments = await page.evaluate(() => document.querySelector('#CommentList'));

//   // console.log("before num comments:",numComments);
  
// });

// test("submit comment", async () => {

//   expect(page.url()).toContain("http://localhost:4000/detail/");

//   await page.click('#SubmitCommentBtn');

//   // const numComments = await page.evaluate(() => document.querySelector('#CommentsList').children.tags("LI"));

//   // console.log("after num comments:",numComments);
// });

// afterAll(() => {
//   browser.close();
// });




