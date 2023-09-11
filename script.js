console.log("Welcome to new musical era-Spotify");
let songindex = 0;

let masterplay = document.getElementById("masterplay");
let myprogressbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let name_song = document.getElementById("name_song");
let songitems = Array.from(document.getElementsByClassName("songitem"));
let display = document.getElementById("bottom_display");
let last = -1;



let songs = [
  {
    songname: "Kesariya",
    filepath: "audio/Kesariya.mp3",
    coverpath: "cover1.jpg",
  },
  {
    songname: "Yaar Anmule",
    filepath: "audio/Yaar.mp3",
    coverpath: "yaar.jpg",
  },
  {
    songname: "Titliaan",
    filepath: "audio/Titliaan.mp3",
    coverpath: "titlian.jpg",
  },
  {
    songname: "Excuses",
    filepath: "audio/Excuses.mp3",
    coverpath: "excuses.jpg",
  },
  { songname: "Qismat", filepath: "audio/Qismat.mp3", coverpath: "qismat.jpg" },
];

let audioelement = new Audio();
const makeallplay = () => {
  songitems.forEach((element) => {
    trgs = element.getElementsByTagName("i")[0];
    trgs.classList.add("fa-circle-play");
    trgs.classList.remove("fa-circle-pause");
  });
};

songitems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByTagName("span")[0].innerText = songs[i].songname;
  // ad=new Audio(songs[i].filepath);
  // x=parseInt(ad.duration);
 // ad.play();
  //console.log(x);
 // element.getElementsByClassName("timestamp")[0].innerText= parseInt(ad.duration);
  element.addEventListener("click", (e) => {
    console.log(e.target);

    songindex = element.id - 1;
    //makeallplay();
    trg = element.getElementsByTagName("i")[0];

    if (trg.classList.value == "far fa-circle-play") {
      console.log("YES");
      makeallplay();
      trg.classList.remove("fa-circle-play");
      trg.classList.add("fa-circle-pause");
      audioelement.src = songs[element.id - 1].filepath;
      audioelement.play();
      last = element.id;
      masterplay.classList.remove("fa-circle-play");
      masterplay.classList.add("fa-circle-pause");
      display.innerText = songs[element.id - 1].songname;
      gif.style.opacity = 1;
      name_song.style.opacity = 1;
      
    } else {
      // console.log("NO");
      // console.log(trg.classList.value);
      makeallplay();
      trg.classList.add("fa-circle-play");
      trg.classList.remove("fa-circle-pause");
      audioelement.pause();
      masterplay.classList.remove("fa-circle-pause");
      masterplay.classList.add("fa-circle-play");
      gif.style.opacity = 0;
    }
  });
});

// Handle Play pause
masterplay.addEventListener("click", () => {
  if (audioelement.currentTime <= 0) {
    alert("Please select a song");
  } else if (audioelement.paused) {
    audioelement.play();
    if (last != -1) {
      x = document.getElementById(last).getElementsByTagName("i")[0];
      x.classList.remove("fa-circle-play");
      x.classList.add("fa-circle-pause");
    }
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    name_song.style.opacity = 1;
  } else {
    audioelement.pause();
    x = document.getElementById(last).getElementsByTagName("i")[0];
    x.classList.add("fa-circle-play");
    x.classList.remove("fa-circle-pause");
    masterplay.classList.add("fa-circle-play");
    masterplay.classList.remove("fa-circle-pause");
    gif.style.opacity = 0;
  }
});

//Listen to events
audioelement.addEventListener("timeupdate", () => {
  //update Seekbar
  progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
  myprogressbar.value = progress;
});

myprogressbar.addEventListener("change", () => {
  audioelement.currentTime =
    (myprogressbar.value * audioelement.duration) / 100;
  console.log(audioelement.currentTime);
});

document.getElementById("forward").addEventListener("click", () => {
  console.log("fwd");
  songindex = (songindex + 1) % 5;
  last=songindex+1;
  makeallplay();

  chnage = document.getElementById(songindex + 1).getElementsByTagName("i")[0];
  chnage.classList.remove("fa-circle-play");
  chnage.classList.add("fa-circle-pause");

  audioelement.src = songs[songindex].filepath;
  audioelement.play();

  display.innerText = songs[songindex].songname;
});

document.getElementById("previous").addEventListener("click", () => {
  console.log("prev");
  songindex = (songindex - 1 + 5) % 5;
  last=songindex+1;
  console.log(songindex);
  makeallplay();

  chnage = document.getElementById(songindex + 1).getElementsByTagName("i")[0];
  chnage.classList.remove("fa-circle-play");
  chnage.classList.add("fa-circle-pause");

  audioelement.src = songs[songindex].filepath;
  audioelement.play();

  display.innerText = songs[songindex].songname;
});

let speed=document.getElementById('speed_inc');
let dec=document.getElementById('speed_dec');
let curr_speed=1.0;
speed.addEventListener('click',()=>{
  //increase_speed();
  curr_speed+= 0.2;
  audioelement.playbackRate=curr_speed;
  console.log(curr_speed);
})

dec.addEventListener('click',()=>{
  curr_speed-=0.2;
  audioelement.playbackRate=curr_speed;
  console.log(curr_speed);
})

