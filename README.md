# TechWeek Website [![Build Status](https://travis-ci.org/redbrick/techweek.dcu.ie.svg?branch=master)](https://travis-ci.org/redbrick/techweek.dcu.ie)
This repository contains the Techweek website
The website was written to have the Google Material Design look and feel. MaterializeCSS was used to speed up the process.  

## Deployment

To deploy to a server just run from the parent of of the folder you want to deploy too.
_ example writen assuming folder deployed is techweek_
```
git clone https://github.com/redbrick/techweek.dcu.ie.git techweek
cd techweek
npm install
gulp
```

## How it works

The events.json contains a JSON object containing all events (duh). The schema was just made up on the spot and seemed most appropiate. `js/main.js` is it main JavaScript file that is responsible for loading the content.
It uses jQuery (because I don't like XHR) to load the events from the JSON. It then gets populated to appropriate tables.  

The `main.js` file is also responsible for displaying the countdown and loading the video feed. Also, it changes colour of the header and individual days, depending on the amount of times you have visited the page.

---

## Development

### Local Development
* When running the files locally, run it using a web server or you will have problems with Same-origin policy.
A simple solution is to run `gulp dev` which will compile the less, watch it and start a webserver at techweek.dev:8000

### CSS
All the css is compiled from less in the less directory.
Run `gulp dev` to have gulp watch the less directory and compile all the less in to `dist/css`.
Run `gulp` to compile the less to css in `dist/css`
