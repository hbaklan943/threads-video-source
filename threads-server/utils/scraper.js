const puppeteer = require("puppeteer");

const getVideo = async (url) => {
  const browser = await puppeteer.launch({
    //headless: "new",
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  console.log(url);
  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForSelector("video");
  const src = await page.evaluate(() => {
    const video = document.querySelector("video");
    return video.src;
  });
  await browser.close();
  console.log(src);
  return src;
};

module.exports = getVideo;
