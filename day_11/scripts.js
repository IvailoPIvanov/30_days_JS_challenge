const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const playStopButton = player.querySelector('.toggle');
const videoTime = player.querySelector('.progress__filled');
const videoProgress = player.querySelector('.progress');
const skipButton = player.querySelectorAll('[data-skip]');
const playerSliders = player.querySelectorAll('.player__slider');
//start,stop and button change
function playStop() {
  //start and  stop video
  let playS = video.paused ? 'play' : 'pause';
  video[playS]();
  //change button start stop
  let butt = video.paused ? '►' : '❚ ❚';
  playStopButton.textContent = butt;

}

//update time line
function updateTimeLine() {
  let duration = (video.currentTime / video.duration) * 100;
  videoTime.style.flexBasis = `${duration}%`;
}

//move on

function dragTimeLine(e) {
  // let moveTo = e.offsetX;
  // let test = videoProgress.offsetWidth;
  // console.log(moveTo, test);
  const moveTo = (e.offsetX / videoProgress.offsetWidth) * video.duration;
  video.currentTime = moveTo;
}

function skip (){
  var skipTime = this.dataset.skip;
  video.currentTime += parseFloat(skipTime);
  console.log(parseFloat(this.dataset.skip));
}

function rangeInput() {
  video[this.name] = this.value;
  console.log(this.name, this.value);
}

video.addEventListener('click', () => {
  playStop();
});

video.addEventListener('timeupdate', updateTimeLine);
videoProgress.addEventListener('click', dragTimeLine);

let checkIfMousedown = false;

videoProgress.addEventListener('mousemove', () => {
  if (checkIfMousedown) {
    dragTimeLine();
  }
});
videoProgress.addEventListener('mousedown', () => checkIfMousedown = true);
videoProgress.addEventListener('mouseup', () => checkIfMousedown = false);
skipButton.forEach(button => button.addEventListener('click',skip));
playerSliders.forEach(slide => slide.addEventListener('change',rangeInput));
// playerSliders.forEach(slide => slide.addEventListener('mousemove', rangeInput));