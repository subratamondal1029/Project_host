let audios;
let isReady = false
let isFirst = true
fetch('audio.json')
.then((data) => data.json())
.then((data) => {
    audios = data
    isReady = true
    setAudio(0)
    setCurrentNum(1)
})

const playBtn = document.getElementById('play');
const audioField = document.querySelector('audio');
const audioImageField = document.getElementById('audioImaige');
const audioImage = audioImageField.children[0];
const audioTitle = document.getElementById('audioTitle')
const progress = document.getElementById('progress')


function setAudio(index){
    const title = audios[index].name
    const img = audios[index].img
    const audio = audios[index].music

    audioField.src = `audio/${audio}`
    audioImage.src = img
    audioTitle.textContent = title

    if(!isFirst) {
        playAudio()
        // printTotalTime()
    }
}

function playAudio(){
    audioField.play();
            playBtn.setAttribute('status', "playing")
            playBtn.innerHTML = `<img src="images/pause.svg" alt="">`
        audioImageField.style.animationPlayState = "running";
}

function pauseAudio(){
    audioField.pause();
            playBtn.setAttribute('status', "paused");
            playBtn.innerHTML = `<img src="images/play.svg" alt="">`
        audioImageField.style.animationPlayState = "paused";
}


audioField.onplaying = () =>{
 const playingTrack = setInterval(() => {
        const totalDuration = audioField.duration
        const playedDuration = audioField.currentTime
    
        const leftDurationInPar = (playedDuration / totalDuration) * 100
        progress.style.width = leftDurationInPar + "%"

        if (leftDurationInPar === 100) {
            changeAudio('next')
        }
        
        printCurrentTime(playedDuration/60)

        if (audioField.paused) clearInterval(playingTrack)
    }, 700);
}

const buttons = document.querySelectorAll('.btn')
buttons.forEach((btn) =>{
    btn.addEventListener('click', () =>{
        if(btn.id == "play"){
            const status = btn.getAttribute('status')
            if(status === "paused"){
                playAudio()
            }else{
                pauseAudio()
            }
        }else if(btn.id == "next"){
            changeAudio('next')
        }else{
            changeAudio('prev')
        }

    })
})

function changeAudio(direction){
    isFirst = false
    if (isReady) {
        let Musics = []
        audios.map((audio) => Musics.push(audio.music.toLowerCase()))
        const currentAudioSrc = audioField.src.split('/').reverse()[0].toLowerCase().replaceAll('%20', " ")
        const currentIndex = Musics.indexOf(currentAudioSrc)

        let index
        if(direction === "next"){
            if (currentIndex !== audios.length-1) {
             index = currentIndex+1
            }else index = 0

            setAudio(index)
        }else{
            if (currentIndex !== 0) {
                index = currentIndex-1
            }else index = audios.length-1
            setAudio(index)
        }

        setCurrentNum(index+1)

    }else return
}


function setCurrentNum(currentNum){
    document.getElementById('currentSong').textContent = currentNum
    document.getElementById('totalSong').textContent = audios.length
}

function printCurrentTime(current){
    current = current.toFixed(2)    
    const [minute, second] = current.split('.')
        document.getElementById('currentTime').textContent = `${minute}:${second}`
}

audioField.addEventListener('loadedmetadata', printTotalTime)

function printTotalTime(){
        let totalDuration = audioField.duration/60
        totalDuration = totalDuration.toFixed(2)

        const [minute, second] = totalDuration.split('.')
        document.getElementById('totalDuration').textContent = `${minute}:${second}`
}

window.addEventListener('keyup', (e) =>{
    if (e.key === 'ArrowRight') {
        changeAudio('next')
    }else if(e.key === 'ArrowLeft'){
        changeAudio('prev');
    }else if(e.key === " "){
       const status = playBtn.getAttribute('status')
       status === "paused" ? playAudio() : pauseAudio()
    }
})


document.getElementById('progressBar').addEventListener('click', (e) =>{
    let progressBar = e.target.parentElement
    if(e.target.id == "progressBar") progressBar = e.target

    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const width = (x / rect.width) * 100;
    const audioDuration = Math.round((audioField.duration * width) / 100)
    audioField.currentTime = audioDuration

    playAudio()
})

