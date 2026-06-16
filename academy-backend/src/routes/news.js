const express = require("express");
const Parser = require("rss-parser");

const router = express.Router();
const parser = new Parser();

router.get("/", async (req, res) => {
  try {
    const feed = await parser.parseURL(
      "https://news.google.com/rss/search?q=education&hl=en-IN&gl=IN&ceid=IN:en"
    );

    const news = feed.items.slice(0, 12).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      content: item.contentSnippet || ""
    }));

    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch news"
    });
  }
});

module.exports = router;