// Import request to make HTP requests
// Import fs to save images to disk
// Import chalk to highlight terminal output

const request = require("request");
const fs = require('fs');
const chalk = require('chalk');

// Define first and last image
let paintingNoStart = 1; //first image
let paintingNoEnd = 412; //last image

// Define base URL
let baseURL = `https://www.twoinchbrush.com/images/painting${paintingNoStart}.png`;

// Define scraping function for each image at URL
const getImage = async (url, filename) => {
  try {
    request.get({
        url: url,
      })
      .on("error", function (error) {
        console.log(error);
      })
      .on('response', function (res) {
        res.pipe(fs.createWriteStream(`images/${filename}.` + res.headers['content-type'].split('/')[1]));
        console.log(chalk.yellow(`Image downloaded: ${filename}`));
      });

  } catch (error) {
    console.error(error)
    console.error(chalk.red(`Error at: ${url}`))
  }
}

// Scrape images from all URLs
for (let i = paintingNoStart; i < paintingNoEnd; i++) {
  baseURL = `https://www.twoinchbrush.com/images/painting${paintingNoStart}.png`;
  let filename = `image${paintingNoStart}`
  getImage(baseURL, filename);
  paintingNoStart++;
}