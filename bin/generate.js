const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const config = require(__dirname + '/../config.json');
const template = fs.readFileSync(__dirname + '/../template.handlebars',  "utf-8");

let pages = path.join(__dirname, '..', 'pages');
if(config.folder) {
  pages = path.join(__dirname, '..', config.folder);
}

let outputDir = path.join(__dirname, '..', 'dist')
if (config.output) {
  outputDir = path.join(__dirname, '..', config.output);
}

function render (template, page, url) {
  let output = (Handlebars.compile(template))(page);
  if (!fs.existsSync(outputDir)) { fs.mkdirSync(outputDir); }
  let dir = outputDir
  if (url) {
    dir = path.join(dir, url);
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  }
  fs.writeFile(path.join(dir, 'index.html'), output, 'utf8', (err) => { if (err) throw err; });
}

Handlebars.registerHelper('splitTitle', function(title) {
  let middle = Math.floor(title.length / 2);
  let s1 = title.substr(0, middle);
  let s2 = title.substr(middle);
  return s1 + "</span>" + s2;
});

for (let page of config.pages) {
  let json = require(path.join(pages, page.file));
  json.pages = config.pages;
  json.title = config.title;
  render(template, json, page.url);
}
