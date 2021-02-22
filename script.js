const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')


const music = document.querySelector('audio')
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
    music.play()
}

// Pause 
function pauseSong(){
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
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


// Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)