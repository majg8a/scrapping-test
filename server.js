const puppeteer = require("puppeteer");
const randomUseragent = require("random-useragent");

const init = async () => {
  const header = randomUseragent.getRandom();
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROME_BIN || null,
    args: [
      process.env.CHROME_BIN ? "--no-sandbox" : "",
      "--headless",
      //   "--disable-gpu",
      //   "--disable-dev-shm-usage",
    ],
  });

  const page = await browser.newPage();
  await page.setUserAgent(header);
  await page.setViewport({ width: 1920, height: 1080 });
  const url = "https://www.youtube.com/";
  await page.goto(url);
  await page.screenshot({ path: "step1.png" });
  const onNavegationStopped = await browser.close();
};
init();
