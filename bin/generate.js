#!/usr/bin/env node
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const fm = require('json-front-matter');
const marked = require('marked');
const config = require(path.join(process.cwd(), 'config.json'));
const source = path.join(process.cwd(), config.source || 'source');
const outputDir = path.join(process.cwd(), config.output || 'public');

function render (template, page, url) {
  template = `${template}.hbs`;
  const output = Handlebars.compile(
    fs.readFileSync(path.join(process.cwd(), 'templates', template), 'utf-8')
  )(page);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  let dir = outputDir;
  if (url !== 'index') {
    dir = path.join(dir, url);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
  fs.writeFile(path.join(dir, 'index.html'), output, 'utf8', err => {
    if (err) throw err;
  });
}

Handlebars.registerHelper('splitTitle', title => {
  const middle = Math.floor(title.length / 2);
  const s1 = title.substr(0, middle);
  const s2 = title.substr(middle);
  return `${s1}</span>${s2}`;
});

fs.readdir(source, (err, pages) => {
  if (err) throw err;
  for (const page of pages) {
    const url = path.parse(page).name;
    fs.readFile(path.join(source, page), 'utf-8', (err, data) => {
      if (err) throw err;
      const file = fm.parse(data);
      const json = file.attributes;
      json.site = config;
      json.body = marked(file.body);
      render(json.template, json, url);
    });
  }
});
