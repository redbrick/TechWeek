const Handlebars = require('handlebars');
const fs = require('fs');
const events = require(__dirname + '/../events.json');
const template = fs.readFileSync(__dirname + '/../template.handlebars',  "utf-8");

function render (source, events, url) {
  let template = Handlebars.compile(source);
  let output = template(events);
  if (!fs.existsSync(__dirname + '/../dist')) { fs.mkdirSync(__dirname + '/../dist'); }
  dir = __dirname + '/../dist';
  if (url) {
    dir = dir + '/' + url;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  }
  fs.writeFile(dir + '/index.html', output, 'utf8', (err) => { if (err) throw err; });
}

Handlebars.registerHelper('splitTitle', function(title) {
  let middle = Math.floor(title.length / 2);
  let s1 = title.substr(0, middle);
  let s2 = title.substr(middle);
  return s1 + "</span>" + s2;
});

for (let page of events) {
  let json = require(__dirname + '/../events/' + page.file);
  json.pages = events;
  render(template, json, page.url);
}
