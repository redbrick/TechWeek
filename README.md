# TechWeek Website [![CircleCI](https://circleci.com/gh/redbrick/TechWeek.svg?style=svg)](https://circleci.com/gh/redbrick/TechWeek)
This repository contains the Techweek website
The website was written to have the Google Material Design look and feel. MaterializeCSS was used to speed up the process.  

## Deployment

To deploy to a server just run from the parent of of the folder you want to deploy too.  
_example writen assuming folder deployed is techweek/dist_
```
git clone https://github.com/redbrick/techweek.git
cd techweek
npm install

```

## How it works

The events.json contains a JSON object containing all events pages.
All the pages themselves are stored in events folder. Each page is a json file with all the details about that years talks.
The Json is used to fill a mustache template since all the pages are the same format and layout and output to dist. The page called Home in the `events.json` will be set as the main page.


The `main.js` file is responsible for displaying the countdown and loading the video feed. Also, it changes colour of the header and individual days, depending on the amount of times you have visited the page. It also handles the #Day so a specific day can be linked to.
Gulp concats this with materilize and minifies it to `dist/js`

---

## Development

### Local Development
* When running the files locally, run it using a web server or you will have problems with Same-origin policy. _no longer true as site is regenerated_
A simple solution is to run `gulp dev` which will compile the less, watch it and start a webserver at techweek.dev:8000

### CSS
All the css is compiled from less in the less directory.
Run `gulp dev` to have gulp watch the less directory and compile all the less in to `dist/css`.
Run `gulp` to compile the sass to css in `dist/css`
