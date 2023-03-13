const audio = document.querySelector('.audio');
let isPlay = false;
let playBtn = document.querySelector('.play-btn');
let player = document.querySelector('.player');
let artist = document.querySelector('.artist');
let songName = document.querySelector('.song-name');
//let currentSong = new Audio(`./assets/audio/beyonce.mp3`);
let fullTime = document.querySelector('.full-time');
let currentTime = document.querySelector('.current-time');
let container = document.querySelector('.container');

let songs =[
  {track: 'beyonce.mp3',
   name:'Beyonce',
   song: "Don't Hurt Yourself" ,
   background: './assets/img/lemonade.png',
   image: './assets/img/lemonade.png',
}, 
{ track: 'assets_audio_dontstartnow.mp3',
  name: 'Dua Lipa',
  song : "Don't Start Now",
  background: './assets/img/dontstartnow.png',
  image: './assets/img/dontstartnow.png',
}
];

audio.addEventListener('loadeddata', function(){
let d = new Date(audio.duration * 1000);
fullTime.innerHTML = d.getUTCMinutes() + ':' + d.getUTCSeconds();
});

//currentSong.addEventListener('progress', console.log(currentSong.progress));


function changeSong(song){
  audio.src = `./assets/audio/${song.track}`;
  playAudio();
}



let timer;
let progressBar = document.querySelector('.progress-bar');

function playAudio() {
timer = setInterval(function (){
progressBar.value = 100 / audio.duration * audio.currentTime; // движение ползунка
let time = new Date(audio.currentTime * 1000);
currentTime.innerHTML = time.getUTCMinutes() + ':' + time.getUTCSeconds()
}, 10); 
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
}



audio.addEventListener('loadedmetadata', function(e){
console.log(e);
});


function pauseAudio() {
  audio.pause();
  isPlay = false;
  clearInterval(timer);
}


function play() {
  if (!isPlay) {
    playAudio();
  } else {
   pauseAudio();
  }
}


function togglePlay (){
  playBtn.classList.toggle('pause');
}
// запускает аудио и ставит на паузу
playBtn.addEventListener('click', function () {play(); togglePlay();}); 


// playBtn.addEventListener('click', togglePlay);


let playNum = 0;


//let songs = ['beyonce.mp3', 'assets_audio_dontstartnow.mp3'];
let forward = document.querySelector('.forward');
let backward = document.querySelector('.backward');


function playNext() {
    
  if (playNum >= songs.length-1){
        playNum = 0;
  } else {
  playNum += 1;
  }
    changeSong(songs[playNum]);
    changeImg(songs[playNum]);
}


function playPrev() {
  
    if (playNum <= 0){
      playNum = songs.length - 1;  
    } else {
      playNum -= 1;
    }
    changeSong(songs[playNum]);
    changeImg(songs[playNum]);
}

forward.addEventListener('click', playNext);
backward.addEventListener('click', playPrev);


//смена времени проигрывания, если потянуть ползунок
const timeline = player.querySelector('.progress-bar');
timeline.addEventListener('click', e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, 
false);


let bg = document.querySelector('.bg');
function changeImg(track) {
  
    bg.src = track.background;
    artist.innerHTML = track.name;
    songName.innerHTML = track.song;
    container.style.background = `url(${track.image})`;
 
}

