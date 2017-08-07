$(document).ready(load());
localStorage.visited = localStorage.visited ? +localStorage.visited + 1 : 1;
const views = +localStorage.visited;
// Define an array of colours, based on Material Design Color recommendations
const colors = ['#f44336', '#009688', '#4caf50', '#ffc107', '#e91e63'];
let now = new Date().getTime();
let liveShown = false;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

setInterval(() => {
  if ((now + (minute * 10)) < start) {
    $('.countdown').show(400);
  } else {
    showLive();
  }
  now += 1000;

  const dist = start - now;
  const days = Math.floor(dist / day);
  const hours = Math.floor((dist % day) / hour);
  const mins = Math.floor((dist % hour) / minute);
  const secs = Math.floor((dist % minute) / second);

  let str = days > 0 ? `<span>${days} Days</span>` : '';
  str += hours > 0 ? `<span>${hours} Hours</span>` : '';
  str += mins > 0 ? `<span>${mins} Minutes</span>` : '';
  str += `<span>${secs} Seconds</span>`;

  $('.countdown .countdown__counter').html(str);
}, 1000);

function showLive() {
  if (!liveShown) {
    $('.countdown').hide(400, () => {
      $('.livestream').show(0, () => {
        $('video').height(0);
        $('video').animate(
          {
            height : $('video').width() * (9 / 16),
            display: 'block',
          },
          1000,
        );
      });
    });
    liveShown = true;
  }
}

function getHash() {
  const currHash = window.location.hash;
  return currHash !== '' ? currHash : false;
}

function setHash(hash) {
  window.location.hash = hash;
}

function load() {
  const currHash = getHash();
  $('h5').each(function color(c) {
    $(this).css({ color: colors[(views + c) % 5] });
  });
  $('.collapsible').collapsible();
  $('header h1 span').css({ color: colors[(views + 3) % 5] });

  if (typeof currHash !== 'boolean') {
    $(`li[data-hash="${currHash}"] > div`).trigger('click');
  }

  $('.card-container__events > li').on('click', function setUrl() {
    const hash = $(this).attr('data-hash');
    setHash(hash);
  });
}
