const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");

const tempHome = fs.readFileSync(
  `${__dirname}/templates/template-home.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/home") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempHome.replace("{%CARDS%}", cardsHtml);

    res.end(output);
  } else if (pathname === "/fruit") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const fruitData = dataObj[query.id];
    const output = replaceTemplate(tempOverview, fruitData);

    res.end(output);
  } else if (pathname === "/api") {
    res.end(data);
  } else if (/\.(jpg|jpeg|css|png|gif)$/i.test(pathname)) {
    fs.readFile(`${__dirname}/${pathname}`, (err, data) => {
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {});
