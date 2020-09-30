const fs = require('fs');
const Parser = require("rss-parser");
const fsPromises = fs.promises;

const parser = new Parser();

const LATES_ARTICLE_PLACEHOLDER = '%{{latest_youtube}}%';

function YouTubeHtml(link, id, title) {
  let idRecovered = id.slice(9);

  return `
  <a href='${link}' target='_blank'>
    <img width='30%' src='https://img.youtube.com/vi/${idRecovered}/mqdefault.jpg' alt='${title}' />
  </a>`
}

(async () => {

  const markdownTemplate = await fsPromises.readFile('./README.md.tpl', { encoding: 'utf-8' })
  const { items } = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UC0actK4-vYEXDyV7J_4vGrw")
  // acsedemos al primer elementod e nuestroa array, y sacamos el id y el link
  // const [{ title, id, link }] = items;

  let stringYotutubeHtml1 = YouTubeHtml(items[0].link, items[0].id, items[0].title);
  let stringYotutubeHtml2 = YouTubeHtml(items[1].link, items[1].id, items[1].title);
  let stringYotutubeHtml3 = YouTubeHtml(items[2].link, items[2].id, items[2].title);

  let lastesArticleMarkdown = stringYotutubeHtml1 + stringYotutubeHtml2 + stringYotutubeHtml3;

  const newMarkdown = markdownTemplate.replace(LATES_ARTICLE_PLACEHOLDER, lastesArticleMarkdown);

  await fsPromises.writeFile('./README.md', newMarkdown);

})()

// ![Diego fco luna lopez](https://github-readme-stats.vercel.app/api?username=Diego-Luna&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)
