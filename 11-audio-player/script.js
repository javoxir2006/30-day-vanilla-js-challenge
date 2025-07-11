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
const API_KEY = 'AIzaSyC_ax4z_P5GWdzBkB33OfCqsrhz1F6BBLs';

// FUNCTIONS
let videoId = '';
let titles = '';
let img = '';

function gettingURL(){
    const val = link.value.trim();
    

    if(val.includes('https://youtu.be/')){
        videoId = val.replace('https://youtu.be/', '').split('?')[0];
        console.log(videoId);
    }else{
        console.log('fauled');
    }
    const embed = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    embedCon.innerHTML = `<iframe id="ytplayer" src="${embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;


     const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}
`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            title.textContent = data.items[0].snippet.title;
            console.log(data.items[0].snippet.thumbnails.maxres.url);
            img = data.items[0].snippet.thumbnails.maxres.url;
            cover.innerHTML = `<img src="${img}">`;
        });

    setTimeout(() => {
        player = new YT.Player('ytplayer', {
            events: {
                'onReady': onPlayerReady
            }
        });
    }, 500); // Wait a moment to ensure iframe is in DOM

}





var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



    function onPlayerReady() {
        setInterval(updateTimeDisplay, 500); // Update every 0.5s
    }

  function updateTimeDisplay() {
    if (player && player.getCurrentTime) {
      const first = Math.floor(player.getCurrentTime());
      const second = Math.floor(player.getDuration());
      
      current.textContent = `${Math.floor(first / 60).toString().padStart(2, '0')}:${Math.floor(first % 60).toString().padStart(2, '0')}`;
      total.textContent = `${Math.floor(second / 60).toString().padStart(2, '0')}:${Math.floor(second % 60).toString().padStart(2, '0')}`;

      const percent = (first / second) * 100;
      progressBar.style.width = `${percent}%`;
      console.log(percent, first, second);
    }

  }

function skipIT(){
    const currentt = player.getCurrentTime();
    player.seekTo(currentt + parseFloat(this.dataset.skip));
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

skipBtns.forEach(ski => ski.addEventListener('click', skipIT));
