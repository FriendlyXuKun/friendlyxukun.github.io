const musicPlayer = document.getElementById('musicPlayer');
const musicName = document.getElementById('musicName');
const timeDisplay = document.getElementById('timeDisplay');
const playButton = document.getElementById('playButton')
const progressBar = document.querySelector('.progress-bar')
const prograssBarMax = 1000;

const playlist = [
    { name: '久石譲 - Summer', src: '../Audio/久石譲 - Summer.mp3' },
    { name: '莫扎特 - B大调第13号钢琴奏鸣曲', src: '../Audio/莫扎特 - B大调第13号钢琴奏鸣曲.mp3' },
    { name: '徐梦圆 - China-A', src: '../Audio/徐梦圆 - China-A.mp3' },
    { name: 'Plum - Going On', src: '../Audio/Plum - Going On.flac'}
];

let currentTrackIndex = 0;

function playTrack(index) {
    console.log(index);
    playButton.src = "../Img/Icons/暂停.png";
    currentTrackIndex = index;
    musicPlayer.src = playlist[index].src;
    musicName.textContent = playlist[index].name;
    musicPlayer.play();
}

function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    playTrack(currentTrackIndex);
}

function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrack(currentTrackIndex);
}

function togglePlayPause() {
    console.log(playButton.src);
    if (musicPlayer.paused) {
        musicPlayer.play();
        playButton.src = "../Img/Icons/暂停.png";
    } else {
        musicPlayer.pause();
        playButton.src = "../Img/Icons/播放.png";
    }
}

musicPlayer.addEventListener('ended', function() {
    playNext();
})

musicPlayer.addEventListener('timeupdate', function() {
    const currentTime = musicPlayer.currentTime;
    const duration = musicPlayer.duration;

    musicPlayer.ontimeupdate = function () {
        progressBar.value = currentTime / duration * prograssBarMax;
    }

    handleProgressBar = function () {
        console.log('a');
        musicPlayer.currentTime = progressBar.value * duration / prograssBarMax;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    timeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / ${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
});

playTrack(currentTrackIndex);
playButton.src = "../Img/Icons/播放.png";