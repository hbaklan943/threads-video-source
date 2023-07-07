const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.static('dist'))
const puppeteer = require('puppeteer')
require("dotenv").config();


const getVideo = async url => {
  console.log(url);
  const browser = await puppeteer.launch({
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
  const page = await browser.newPage();

  await page.goto(url)

  await page.waitForSelector('video');

  const src = await page.evaluate(() => {
    const video = document.querySelector('video');
    return video.src;
  });

  await browser.close();
  console.log(src);
  return src;
};

app.post("/api/download", async (request, response) => {
  console.log("request coming in...");

  try {
    const videoLink = await getVideo(request.body.url);
    if (videoLink !== undefined) {
      response.json({ downloadLink: videoLink });
    } else {
      response.json({ error: "The link you have entered is invalid. " });
    }
  } catch (err) {
    response.json({
      error: "There is a problem with the link you have provided."
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports = app;