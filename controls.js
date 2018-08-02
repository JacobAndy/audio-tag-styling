let myTrack = document.getElementById("myTrack");
// myTrack.play();
// myTrack.pause();
let playButton = document.getElementById("playButton");
let muteButton = document.getElementById("muteButton");
let currentTime = document.getElementById("currentTime");
let duration = document.getElementById("fullDuration");
let barSize = 640;
let bar = document.getElementById("defaultBar");
let progressBar = document.getElementById("progressBar");
// let minutes = parseInt(myTrack.duration / 60);
// let seconds = parseInt(myTrack.duration % 60);
// duration.innerHTML = `${minutes}:${seconds}`;
// console.log(myTrack);
// duration.innerHTML = minutes + ":" + seconds;
myTrack.addEventListener(
  "loadedmetadata",
  function() {
    var minutes = parseInt(myTrack.duration / 60);
    var seconds = pad(parseInt(myTrack.duration % 60));
    duration.innerHTML = minutes + ":" + seconds;
  },
  true
);
playButton.addEventListener("click", playOrPause, false);
muteButton.addEventListener("click", muteOrUnmute, false);
bar.addEventListener("click", clickedBar, false);

function playOrPause() {
  if (!myTrack.paused && !myTrack.ended) {
    myTrack.pause();

    playButton.style.backgroundImage = "url(./images/play-solid.svg)";
    window.clearInterval(update);
  } else {
    myTrack.play();
    playButton.style.backgroundImage = "url(./images/pause-solid.svg)";
    updateTime = setInterval(update, 500);
  }
}
function muteOrUnmute() {
  if (myTrack.muted == true) {
    myTrack.muted = false;
    muteButton.style.backgroundImage = "url(./images/volume-up-solid.svg)";
  } else {
    myTrack.muted = true;
    muteButton.style.backgroundImage = "url(./images/volume-off-solid.svg)";
  }
}
function update() {
  if (!myTrack.ended) {
    let playedMinutes = parseInt(myTrack.currentTime / 60);

    let playedSeconds = pad(parseInt(myTrack.currentTime % 60));

    let size = parseInt((myTrack.currentTime * barSize) / myTrack.duration);

    progressBar.style.width = `${size}px`;

    currentTime.innerHTML = `${playedMinutes}:${playedSeconds}`;
  } else {
    currentTime.innerHTML = "0.00";

    playButton.style.backgroundImage = "url(./images/play-solid.svg)";

    progressBar.style.width = "0px";
    window.clearInterval(update);
  }
}
function clickedBar(e) {
  if (!myTrack.ended) {
    let mouseX = e.pageX - bar.offsetLeft;
    let newTime = (mouseX * myTrack.duration) / barSize;
    myTrack.currentTime = newTime;
    progressBar.style.width = `${mouseX}px`;
  }
}
function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}
