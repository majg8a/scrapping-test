const puppeteer = require("puppeteer");
const randomUseragent = require("random-useragent");

const init = async () => {
  const header = randomUseragent.getRandom(
    (ua) => parseFloat(ua.browserVersion) >= 50 && ua.browserName === "Firefox"
  );
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
  await page.screenshot({ path: `./images/${new Date().valueOf()}.png` });

  await page.waitForSelector("#video-title-link");
  const videoList = await page.$$("#video-title-link");
  const videoUrls = [];
  for (const item of videoList) {
    const videoUrl = await page.evaluate((a) => a.getAttribute("href"), item);
    videoUrls.push(`${url.slice(0,-1)}${videoUrl}`);
  }
  console.log(videoUrls);

  const onNavegationStopped = await browser.close();
};
init();
