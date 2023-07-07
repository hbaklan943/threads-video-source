const downloadRouter = require("express").Router();
const getVideo = require("../utils/scraper");

downloadRouter.post("/", async (request, response) => {
  console.log("request coming in...");

  const videoLink = await getVideo(request.body.url);
  if (videoLink !== undefined) {
    response.json({ downloadLink: videoLink });
  } else {
    response.json({ error: "The link you have entered is invalid. " });
  }
});

module.exports = downloadRouter;
