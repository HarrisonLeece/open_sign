var video = document.getElementById('main_vid');
var source = document.createElement('source');



const d = new Date;
let hour = d.getHours();
console.info(hour)

//Make this into if statements based on the time the content was loaded
let count = 1;
if (hour <  4) {
  count = 6
  console.info(count)
} else if (hour < 8) {
  count = 1
  console.info(count)
} else if (hour < 12) {
  count = 2
  console.info(count)
} else if (hour < 16) {
  count = 3
  console.info(count)
} else if (hour < 20) {
  count = 4
  console.info(count)
} else {
  count = 5
  console.info(count)
}

source.setAttribute('src', 'vid' + count.toString() +'.webm');

video.appendChild(source);
video.play();

//Make logic to determine what the first timeout interval should be

let interval = 14400000 - ((hour%4)*60*60*1000 + (d.getMinutes())%60*60*1000 + (d.getSeconds()%60)*1000);
console.info("Interval until next animation change")
console.info(interval)
//for testing interval is 30 seconds
interval = 30000
//let interval = 14400000
setInterval(function() {
    //reset interval to what you actually want it to be, per new video
    interval = 30000
    console.info("interval function started");
    video.pause();

    if (count>6) {
      count=1;
    }
    source.setAttribute('src', 'vid' + count.toString()  + '.webm');

    video.load();
    video.play();
    count = count+1;
}, interval);
