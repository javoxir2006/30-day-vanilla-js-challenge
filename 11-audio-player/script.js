// ELEMENTS
const link = document.querySelector('input');
const listenBtn = document.querySelector('.link-btn');
const cover = document.querySelector('.cover');
const title = document.querySelector('.title');
const current = document.querySelector('.current');
const total = document.querySelector('.duration');
const progress = document.querySelector('.progress_filled');
const progressBar = document.querySelector('.progress_bar');
const skipBtns = document.querySelectorAll('.skip');
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const embedCon =document.querySelector('.embed');

// FETCH VARS
const API_KEY = 'here needed';

// FUNCTIONS
let videoId = '';
let img = '';

function gettingURL(){
    const val = link.value.trim();
    

    if(val.includes('https://youtu.be/')){
        videoId = val.replace('https://youtu.be/', '').split('?')[0];
    }else{
        window.alert('Enter a valid link');
    }

    const embed = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    embedCon.innerHTML = `<iframe id="player" src="${embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

     const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            title.textContent = data.items[0].snippet.title;
            console.log(data.items[0].snippet.thumbnails.maxres.url);
            img = data.items[0].snippet.thumbnails.maxres.url;
            cover.innerHTML = `<img src="${img}">`;
        });
    
    setTimeout(() => {
        player = new YT.Player('player', {
            events: {
                'onReady': onPlayerReady
            }
    });}, 500);
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onPlayerReady() {
    setInterval(() => {
        updateTime();
    }, 500);
    }

function updateTime(){
    if(player && player.getCurrentTime){
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();

        const percent = (currentTime / duration) * 100;
        progressBar.style.width = `${percent}%`;

        if(duration / 3600 >= 1){
            const h = Math.floor(duration / 3600);
            total.textContent = `${(h).toString()}:${(Math.floor(duration / 60 - h * 60)).toString().padStart(2, '0')}:${(Math.floor(duration % 60)).toString().padStart(2, '0')}`;
        }else{
            total.textContent = `${(Math.floor(duration / 60)).toString().padStart(2, '0')}:${(Math.floor(duration % 60)).toString().padStart(2, '0')}`;
        }

        if(currentTime / 3600 >= 1){
            const h = Math.floor(currentTime / 3600);
            current.textContent = `${h.toString()}:${(Math.floor(currentTime / 60 - h * 60)).toString().padStart(2, '0')}:${(Math.floor(currentTime % 60)).toString().padStart(2, '0')}`;
        } else{
            current.textContent = `${(Math.floor(currentTime / 60)).toString().padStart(2, '0')}:${(Math.floor(currentTime % 60)).toString().padStart(2, '0')}`;
        }
    }
}

function skipIt() {
    const amount = parseFloat(this.dataset.skip);
    player.seekTo(player.getCurrentTime() + amount);
}

function progressMove(e){
    const time = (e.offsetX / progress.offsetWidth) * player.getDuration();
    player.seekTo(time);
}



// EVENTS
listenBtn.addEventListener('click', gettingURL);
playBtn.addEventListener('click', () => {
    player.playVideo();
    pauseBtn.style.display = 'block';
    playBtn.style.display = 'none';
})
pauseBtn.addEventListener('click', () => {
    player.pauseVideo();
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';
})

skipBtns.forEach(ski => ski.addEventListener('click', skipIt));

let mouseDown = false;
progress.addEventListener('click', progressMove);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mouseout', () => mouseDown = false);
progress.addEventListener('mousemove', (e) => {
    if(mouseDown){
        progressMove(e);
    }
})
