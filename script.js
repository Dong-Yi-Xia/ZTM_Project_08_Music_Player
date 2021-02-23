const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')

const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')

const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')

const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')


//Music
const songs = [
    {
        name: 'Kirby',
        displayName: 'Kirby Theme Song',
        artist: 'Unknown'
    },
    {
        name: 'AOT',
        displayName: 'Feuerroter Pfeil und Bogen',
        artist: 'Linked Horizon'
    },
    {
        name: 'DemonSlayer',
        displayName: 'Gurenge',
        artist: 'LiSA'
    },
    {
        name: 'LoveWar',
        displayName: 'DADDY! DADDY! DO!',
        artist: 'Masayuki Suzuki'
    }
]


// Check if playing
let isPlaying = false

// Play 
function playSong(){
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()  //audio and video methods
}

// Pause 
function pauseSong(){
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause() //audio and video methods
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => { 
    isPlaying ? pauseSong() : playSong()
})



//Update the DOM
function loadSong(song){
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

//Current Song
let songIndex = 0


//Previous Song
function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

//Next Song
function nextSong(){
    songIndex++
    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// On Load - Select First Song
loadSong(songs[songIndex])


// Update Progress Bar and Time
function updateProgressBar(evt){
    if(isPlaying){
        const {duration, currentTime} = evt.srcElement  // destructuring on the music element 
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`

        // Calculate display for duration
        const durationMinutes = Math.floor( duration / 60)
        let durationSeconds = Math.floor( duration % 60)
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
     
        // Delay switching duration Element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

         // Calculate display for current duration
         const currentMinutes = Math.floor( currentTime / 60)
         let currentSeconds = Math.floor( currentTime % 60)
         if(currentSeconds < 10){
             currentSeconds = `0${currentSeconds}`
         }
         currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set Progress Bar
function setProgressBar(evt){
    // evt.srcElement points to the current element, can use THIS to point to itself
    const width = this.clientWidth
    const clickX = evt.offsetX
    const {duration} = music  // music === evt.srcElement 
    console.log(duration)
    console.log(clickX/width)
    console.log( (clickX/width) * duration )
    music.currentTime = (clickX/width) * duration  //audio and video Property

}



// Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('endeed', nextSong)
music.addEventListener('timeupdate', updateProgressBar) //audio and video Event Listener
progressContainer.addEventListener('click', setProgressBar)