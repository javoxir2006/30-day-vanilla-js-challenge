// elements
const video = document.querySelector('.video');
const big = document.querySelector('.big');
const controls = document.querySelector('.controls');
const procon = document.querySelector('.pro-con');
const playbtn = document.querySelector('.play');
const area = document.querySelector('.area');
const ranges = document.querySelectorAll('input');
const progressBar = document.querySelector('.progress');
const progressfill = document.querySelector('.filled');
const skips = document.querySelectorAll('.skip');
const expand = document.querySelector('.expand');

// functions
function playIt(){
    const method = video.paused ? 'play' : 'pause';
    video[`${method}`]();
}

function show(){
    if(showing){
        big.style.display = 'flex';
        procon.style.display = 'flex';
        procon.style.transform = 'translateY(-140%)';
    }else{
        big.style.display = 'none';
        procon.style.display = 'none';
        procon.style.transform = 'translateY(140%)';
    }
}

function changeIcon(){
    const icon = video.paused ? `<i class="fa-solid fa-play"></i>` : '<i class="fa-solid fa-pause"></i>';
    big.innerHTML = icon;
    playbtn.innerHTML = icon;
}

function handleRanges() {
    video[`${this.name}`] = this.value;
}

function handleProgress() {
    const progress = (video.currentTime / video.duration) * 100;
    progressfill.style.width = `${progress}%`;
}

function handleProClick(e){
    const path = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = parseFloat(path);
    console.log(progressBar.offsetWidth, e);
}

function skipIt(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function add(){
    area.classList.toggle('full');
}

// events
progressBar.addEventListener('click', handleProClick);
video.addEventListener('timeupdate', handleProgress);
playbtn.addEventListener('click', playIt);
playbtn.addEventListener('click', changeIcon);
big.addEventListener('click', playIt);
big.addEventListener('click', changeIcon);
skips.forEach(skip => skip.addEventListener('click', skipIt));

ranges.forEach(range => range.addEventListener('change', handleRanges));
ranges.forEach(range => range.addEventListener('mousemove', handleRanges));


let showing = true;
area.addEventListener('mouseover', () => {
    showing = true;
    show();
});
area.addEventListener('mouseout', () => {
    showing = false;
    show();
});

let moving = false;
progressBar.addEventListener('mousemove', (e) => {
    if(moving){
        handleProClick(e);
    }
});
progressBar.addEventListener('mousedown', () => moving = true);
progressBar.addEventListener('mouseup', () => moving = false);

expand.addEventListener('click', add);

