const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const puppeteer = require('puppeteer')


const getVideo = async url => {
  console.log(url);
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser'
  })
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports = app;