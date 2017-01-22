// We wait for the document to finish loading
$(document).ready( function() {
  const currHash = getHash();
  $('h5').each( function( c ) {
    $(this).css({color: colors[(v+c) % 5]});
  });
  $('.collapsible').collapsible();
  // Change the color of the header based on the amount of times you visited the page
  $('header h1 span').css({color: colors[(v+3) % 5]});

  if (typeof(currHash) !== 'boolean') {
    $('li[data-hash="' + currHash + '"] > div').trigger('click');
  }

  $('.card-container__events > li').on('click', function () {
    const hash = $(this).attr('data-hash');
    setHash(hash);
  });
});

// This is a conditional (Ternary) Operator. It assigns a value based on some other value
// It is much shorter to write than if-else.
// How it works:
// 		localStorage allows you to store values in the client side. Its like cookies
//		but they don't get send to the server
//		1. If 'visited' is already defined:
//			a. get the 'visited' and convert it to a number (+) since
//			   localStorage stores it as a string
//			b. Add +1 to it
//		2. If 'visited' is not defined (null), set it to 1, since you are on the website
//	   	   right now.
//		3. Assign the value you chose back to the 'visited' in localStorage
localStorage['visited'] = localStorage['visited'] ? +localStorage['visited']+1 : 1;

// Assign 'visited' to variable v, because its shorter to write, and will not require
// I/O every time you use it, the above was aleady consuming...
const v = +localStorage['visited'];

// Define an array of colours, based on Material Design Color recommendations
const colors = ['#f44336', '#009688', '#4caf50', '#ffc107', '#e91e63'];

// Get the current time and the time TechWeek starts at;
let now = (new Date()).getTime();
let liveActive = false;
let liveShown = false;

// Set the constants for the amount of time in each time period
const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;

// setInterval allows you to do certain action every period of time (like cronjob)
setInterval(function() {

  // Check is current time + 10 minutes smaller than the starting time
  if(now+1000*60*10 < start) {
    // If it is, show the box and start counting down
    $('.countdown').show(400);
  } else {
    liveActive = true;
    // Otherwise, show the livestream and abjust the height of it to be in
    // 19:6 aspect ratio
    // When done hiding the countdown show the livestream, make it take 400ms so there is a smooth transition
    if(liveActive) {
      showLive();
    }
  }
  now += 1000;

  const dist = start - now;
  const days = Math.floor(dist / _day);
  const hours = Math.floor( (dist % _day) / _hour );
  const mins = Math.floor( (dist % _hour) / _minute );
  const secs = Math.floor( (dist % _minute) / _second );

  let str  = 	(days > 0) 		? '<span>' + days + ' Days</span>' 		: '';
  str +=		(hours > 0) 	? '<span>' + hours + ' Hours</span>'	: '';
  str +=		(mins > 0) 		? '<span>' + mins + ' Minutes</span>'	: '';
  str +=		'<span>' + secs + ' Seconds</span>';

  $('.countdown .countdown__counter').html(str);
}, 1000); // Set the time of the interval, in ms, so 1000 (1s)

// Show the livefeed
function showLive() {
  if(!liveShown){
    $('.countdown').hide(400, function() {
      $('.livestream').show(0, function() {
        $('video').height(0);
        $('video').animate({height: $('video').width() * (9 / 16), display: 'block'}, 1000);
      });
    });
    liveShown = true;
  }
}

function getHash() {
  const currHash = window.location.hash;
  return (currHash !== '') ? currHash : false;
}

function setHash(hash) {
  window.location.hash = hash;
}
