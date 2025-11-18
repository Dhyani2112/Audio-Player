const audio = document.getElementById("audio");
const fileInput = document.getElementById("fileInput");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const volumeSlider = document.getElementById("volumeSlider");
const playlistEl = document.getElementById("playlist");
const seekBar = document.getElementById("seekBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const back5 = document.getElementById("back5");
const forward5 = document.getElementById("forward5");

let playlist = [];
let currentTrack = 0;

//Visualizer setup
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioCtx.createAnalyser();
let gainNode = audioCtx.createGain();
let source;

fileInput.addEventListener("change", () => {
    playlist = Array.from(fileInput.files);
    playlistEl.innerHTML = "";

    playlist.forEach((file, index) => {
        let li = document.createElement("li");
        li.textContent = file.name;
        li.onclick = () => {
            currentTrack = index;
            loadTrack();
        };
        playlistEl.appendChild(li);
    });

    currentTrack = 0;
    loadTrack();
});

function loadTrack() {
    const file = playlist[currentTrack];
    const url = URL.createObjectURL(file);

    audio.src = url;
    audio.load();

    highlightPlaylist();
}

//Play button
playBtn.onclick = () => {
    audio.play();
    startVisualizer();

    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
};

//Pause button
pauseBtn.onclick = () => {
    audio.pause();

    pauseBtn.style.display = "none";
    playBtn.style.display = "inline";
};

prevBtn.onclick = () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack();
    audio.play();
};

nextBtn.onclick = () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack();
    audio.play();
};

back5.onclick = () => audio.currentTime -= 5;
forward5.onclick = () => audio.currentTime += 5;

//time seek
audio.onloadedmetadata = () => {
    seekBar.max = audio.duration;
    durationEl.textContent = formatTime(audio.duration);
};

audio.ontimeupdate = () => {
    seekBar.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);

    if (audio.currentTime >= audio.duration) {
        nextBtn.onclick();
    }
};

seekBar.oninput = () => audio.currentTime = seekBar.value;

//vol
volumeSlider.oninput = () => {
    let v = volumeSlider.value;
    gainNode.gain.value = Math.pow(v, 2);
};

//active song
function highlightPlaylist() {
    [...playlistEl.children].forEach((li, index) => {
        li.classList.toggle("active", index === currentTrack);
    });
}

function formatTime(sec) {
    let m = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
}

function startVisualizer() {
    if (!source) {
        source = audioCtx.createMediaElementSource(audio);

        source.connect(analyser);
        analyser.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        analyser.fftSize = 64;
    }
    visualize();
}

function visualize() {
    requestAnimationFrame(visualize);

    let buffer = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(buffer);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let barCount = buffer.length;
    let barWidth = canvas.width / barCount;

    for (let i = 0; i < barCount; i++) {
        let value = buffer[i];

        let minHeight = canvas.height * 0.15;
        let barHeight = minHeight + (value / 255) * (canvas.height - minHeight);

        let x = i * barWidth;
        let y = canvas.height - barHeight;

        let hue = 260 + (i / barCount) * 50;
        let saturation = 90;
        let lightness = 55;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(x, y, barWidth - 1, barHeight);
    }
}
