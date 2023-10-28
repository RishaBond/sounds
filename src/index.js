import './style.css';
import rainBgUrl from './public/assets/rainy-bg.jpg';
import summerBgUrl from './public/assets/summer-bg.jpg';
import winterBgUrl from './public/assets/winter-bg.jpg';
import rainAudioUrl from './public/assets/sounds/rain.mp3';
import summerAudioUrl from './public/assets/sounds/summer.mp3';
import winterAudioUrl from './public/assets/sounds/winter.mp3';

function Background(url) {
  const item = document.createElement('img');
  item.src = url;
  item.style.height = '100vh';
  item.style.width = '100vw';
  item.style.objectFit = 'cover';
  item.style.position = 'absolute';
  item.style.zIndex = 0;
  item.style.pointerEvents = 'none';
  item.style.filter = 'blur(5px)';

  return {
    element: item,
    setImage: (url) => {
      item.src = url;
    },
  };
}

function Audio(url) {
  const item = document.createElement('audio');
  item.src = url;
  // item.controls = "true";
  item.loop = true;

  return {
    element: item,
    setAudio: (url) => {
      item.src = url;
    },
  };
}

const bg = new Background(rainBgUrl);
const audioController = new Audio('');
document.body.appendChild(bg.element);
document.body.appendChild(audioController.element);

const typeMap = {
  rain: {
    bgUrl: rainBgUrl,
    audioUrl: rainAudioUrl,
  },
  summer: {
    bgUrl: summerBgUrl,
    audioUrl: summerAudioUrl,
  },
  winter: {
    bgUrl: winterBgUrl,
    audioUrl: winterAudioUrl,
  },
};

function Player(type) {
  let activeType;
  let isPaused = false;

  return {
    active: activeType,
    selectMood: (type) => {
      console.log(type);
      if (type === activeType) {
        if (isPaused) {
          audioController.element.play();
          isPaused = false;
        } else {
          audioController.element.pause();
          isPaused = true;
        }
      } else {
        activeType = type;
        bg.setImage(typeMap[type].bgUrl);
        audioController.setAudio(typeMap[type].audioUrl);
        audioController.element.play();
      }
    },
    setVolume: (volume) => {
      audioController.element.volume = volume;
    },
  };
}

const moodPlayer = new Player('rain');

const rainBtn = document.getElementById('rainBtn');
const summerBtn = document.getElementById('summerBtn');
const winterBtn = document.getElementById('winterBtn');
const volumeRange = document.getElementById('volumeRange');
// rainBtn.style.backgroundImage = `url(${rainBgUrl})`;
// summerBtn.style.backgroundImage = `url(${summerBgUrl})`;
// winterBtn.style.backgroundImage = `url(${winterBgUrl})`;

rainBtn.addEventListener('click', () => moodPlayer.selectMood('rain'));
summerBtn.addEventListener('click', () => moodPlayer.selectMood('summer'));
winterBtn.addEventListener('click', () => moodPlayer.selectMood('winter'));
volumeRange.addEventListener('input', (event) => moodPlayer.setVolume(event.target.value));
