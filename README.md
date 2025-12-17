# Audio-Player

Audio Player is a modern, browser-based audio player developed using HTML, CSS, and JavaScript. The application supports playlist-based playback, advanced audio controls, and a real-time visualizer powered by the Web Audio API. The project demonstrates strong front-end engineering practices, multimedia handling, and UI/UX design principles.

---

## Features

### Audio Playback
- Play and pause controls using custom icon-based buttons  
- Next and previous track navigation  
- 5-second forward and backward skip functionality  
- Playlist support with click-to-play interaction  
- Automatic playback of the next track  

### Audio Control
- Smooth and precise volume control using GainNode  
- Real-time seek bar with accurate time tracking  
- Display of current playback time and total duration  

### Visual Interface
- Real-time audio visualizer synchronized with music  
- Canvas-based frequency bar animation  
- Minimum bar height to ensure continuous visual feedback  
- Gradient-based color scheme aligned with the UI theme  
- Responsive layout optimized for various screen sizes  

---

## Project Structure
```
Audio-Player/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── script.js           # Player logic and audio processing
├── icons/              # Custom control button icons
│   ├── icons8-back-64.png
│   ├── icons8-previous-64.png
│   ├── icons8-play-64.png
│   ├── icons8-pause-64.png
│   ├── icons8-forward-64.png
│   └── icons8-fast-forward-64.png
└── README.md           # Project documentation

```
---

## Technologies Used

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Web Audio API  
- Canvas API  

---

## Audio Processing Pipeline

```
HTMLAudioElement → AnalyserNode → GainNode → Audio Output
```


This pipeline enables accurate frequency analysis for visualization and smooth volume control without interfering with playback quality.

---

## Setup and Usage

1. Clone or download the repository  
2. Ensure the folder structure is preserved  
3. Open `index.html` in a modern web browser  
4. Load audio files using the file input  
5. Use the playback controls to manage music  

No external dependencies or build tools are required.

---

## Design and Engineering Highlights

- Modular and maintainable JavaScript architecture  
- Clean separation of UI, audio logic, and visualization  
- Efficient event handling for responsive interactions  
- User-centric UI/UX design with visual feedback and animations  

---

## Author

Dhyani Thakkar  
This project was developed as part of hands-on learning in front-end development and multimedia systems.


