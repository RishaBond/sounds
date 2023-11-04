import './style.css';
import rainBgUrl from './public/assets/rainy-bg.jpg';
import summerBgUrl from './public/assets/summer-bg.jpg';
import winterBgUrl from './public/assets/winter-bg.jpg';
import rainAudioUrl from './public/assets/sounds/rain.mp3';
import summerAudioUrl from './public/assets/sounds/summer.mp3';
import winterAudioUrl from './public/assets/sounds/winter.mp3';

function createBtn(name) {
	const element = document.createElement('div');
	element.classList.add('button');
	console.log(name, typeMap[name]);
	element.innerHTML = `<img src="${typeMap[name].iconUrl}" width="70" height="70" alt="" >`;
	element.style.background = `url("${typeMap[name].bgUrl}")`;
	element.style.backgroundSize = 'cover';
	return element;
}

function createRange() {
	const element = document.createElement('input');
	element.classList.add('volumeRange');
	element.setAttribute('min', '0');
	element.setAttribute('max', '1');
	element.setAttribute('step', '0.01');
	element.setAttribute('type', 'range');

	return element;
}

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
		render: (el) => {
			el.appendChild(item);
		},
		setImage: (url) => {
			item.src = url;
		},
	};
}

function Audio(url) {
	const item = document.createElement('audio');
	item.src = url;
	item.loop = true;
	let isPaused = false;

	return {
		render: (el) => {
			el.appendChild(item);
		},
		setAudio: (url) => {
			item.src = url;
		},
		setVolume: (value) => {
			item.volume = value;
		},
		play: () => {
			isPaused = false;
			item.play();
		},
		pause: () => {
			isPaused = true;
			item.pause();
		},
		getIsPaused: () => {
			return isPaused;
		},
	};
}

const typeMap = {
	rain: {
		iconUrl: './assets/icons/cloud-rain.svg',
		bgUrl: rainBgUrl,
		audioUrl: rainAudioUrl,
	},
	summer: {
		iconUrl: './assets/icons/sun.svg',
		bgUrl: summerBgUrl,
		audioUrl: summerAudioUrl,
	},
	winter: {
		iconUrl: './assets/icons/cloud-snow.svg',
		bgUrl: winterBgUrl,
		audioUrl: winterAudioUrl,
	},
};
const pauseIconUrl = './assets/icons/pause.svg';

function Controls() {
	const volumeRange = createRange();

	const buttonsGroup = document.createElement('div');
	buttonsGroup.classList.add('buttonsGroup');

	const buttons = {
		rain: createBtn('rain'),
		summer: createBtn('summer'),
		winter: createBtn('winter'),
	};

	Object.values(buttons).forEach((button) => {
		buttonsGroup.appendChild(button);
	});

	return {
		render: () => {
			document.body.appendChild(buttonsGroup);
			document.body.appendChild(volumeRange);
		},
		init: (setVolume, onClick) => {
			volumeRange.addEventListener('input', (event) =>
				setVolume(event.target.value)
			);
			Object.entries(buttons).forEach(([type, button]) => {
				button.addEventListener('click', () => onClick(type));
			});
		},
		changeButtonIcon: (type, icon) => {
			console.log(type);
			buttons[
				type
			].innerHTML = `<img src="${icon}" width="70" height="70" alt="" >`;
		},
	};
}

class Player {
	#audio;
	#bg;
	#controls;
	#activeMood = null;

	constructor(bg, audio, controls) {
		this.#bg = bg;
		this.#audio = audio;
		this.#controls = controls;
	}

	setVolume(value) {
		this.#audio.setVolume(value);
	}

	run() {
		this.toggle('summer');
	}

	toggle(type) {
		if (type === this.#activeMood && !this.#audio.getIsPaused()) {
			this.#pause();
		} else {
			this.#play(type);
		}
	}

	#play(type) {
		const mood = this.#getMood(type);
		this.#bg.setImage(mood.bgUrl);
		this.#audio.setAudio(mood.audioUrl);
		this.#audio.play();
		if (this.#activeMood) {
			this.#controls.changeButtonIcon(
				this.#activeMood,
				this.#getMood(this.#activeMood).iconUrl
			);
		}
		this.#activeMood = type;
	}

	#pause() {
		this.#controls.changeButtonIcon(this.#activeMood, pauseIconUrl);
		this.#audio.pause();
	}

	#getMood(type) {
		const mood = typeMap[type];
		if (!mood) {
			throw new Error(`Unknown mood: ${type}`);
		}
		return mood;
	}
}

const bg = new Background(rainBgUrl);
const audioController = new Audio('');
const controls = new Controls();
const player = new Player(bg, audioController, controls);
controls.init(
	(v) => player.setVolume(v),
	(type) => player.toggle(type)
);

bg.render(document.body);
audioController.render(document.body);
controls.render(document.body);

player.run();
