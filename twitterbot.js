//2016-10-27 Updated to run sequentially rather than in random order.
console.log('Twitterbot starting up!');

var Twit = require('twit');
var config = require('./twitterConfig');
var timer = require('./timer');
var exec = require('child_process').exec;
var fs = require('fs');

var T = new Twit(config);

var iteration = 1;
var firstSketch = 1; // Start with this sketch
var numSketches = 12; // The number of different Processing sketches to choose between
var selecter = firstSketch; // Always start at the beginning

postTweet();
setInterval(postTweet, timer.milliseconds*timer.seconds*timer.minutes*timer.hours);

function postTweet() {

  console.log("Iteration: " + iteration + "  Selecter picks sketch nr. " + selecter);
  iteration ++;

  if      (selecter == 1)  {var cmd = '../p1600/p001/p001';}
  else if (selecter == 2)  {var cmd = '../p1600/p002/p002';}
  else if (selecter == 3)  {var cmd = '../p1600/p003/p003';}
  else if (selecter == 4)  {var cmd = '../p1600/p004/p004';}
  else if (selecter == 5)  {var cmd = '../p1600/p005/p005';}
  else if (selecter == 6)  {var cmd = '../p1600/p006/p006';}
  else if (selecter == 7)  {var cmd = '../p1600/p007/p007';}
  else if (selecter == 8)  {var cmd = '../p1600/p008/p008';}
  else if (selecter == 9)  {var cmd = '../p1600/p009/p009';}
  else if (selecter == 10) {var cmd = '../p1600/p010/p010';}
  else if (selecter == 11) {var cmd = '../p1600/p011/p011';}
  else                     {var cmd = '../p1600/p012/p012';}

  exec (cmd, processing);

  function processing() {
    console.log('Uploading media...');
    var filename = '../p1600/output.png';
  	var params = {
      encoding: 'base64'
  	}
    var b64 = fs.readFileSync(filename, params);

    T.post('media/upload', { media_data: b64 }, uploaded);

    function uploaded(err, data, response) {
      var id = data.media_id_string;
      console.log("id=" + id)
  	  var tweet = {status: 'Generated cellular life stories. #cellendipity', media_ids: [id]}
      T.post('statuses/update', tweet, tweeted);
    }

    function tweeted (err, data, response) {
      if (err) {
  	  	console.log("Something went wrong!");
  	  } else {
  	    console.log("It worked!");
  	  }
    }
  }
  selecter ++;
  if (selecter > numSketches) {
    selecter = firstSketch;
  }
}
