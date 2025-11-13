const song1= new Audio ('Us,Again.mp3')
const song2= new Audio ('Event Horizon.mp3')
const song3= new Audio ('SpringDay.mp3')


// global variables
let songPlaying = false
let currentTrack = 1

function playpauseSong(){
    if (currentTrack === 1) {
        if (songPlaying === false) {
            // play song
            console.log('song1 playing...')
            song1.play()
            // change songPlaying to true
            songPlaying = true
            // change btn
            document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
            document.querySelector('.albumcover').innerHTML = `
            <img src="usagain.png"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Us, again
        `
        document.querySelector('.artist').innerHTML = `
            Seventeen
        `
        var url ="usagain.png"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        



        } else if (songPlaying === true) {
            // pause song
            console.log('song1 paused...')
            song1.pause()
            // change songPlaying to false
            songPlaying = false
            // change btn
            document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-play-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
            document.querySelector('.albumcover').innerHTML = `
            <img src="usagain.png"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Us, again
        `
        document.querySelector('.artist').innerHTML = `
            Seventeen
        `
        var url ="usagain.png"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        }
    }    
    if (currentTrack === 2) {
        if (songPlaying === true) {
            // pause song
            console.log('song2 paused...')
            song2.pause()
            // change songPlaying to false
            songPlaying = false
            // change btn
            document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-play-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
            document.querySelector('.albumcover').innerHTML = `
            <img src="eventhorizon.jpeg"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Event Horizon
        `
        document.querySelector('.artist').innerHTML = `
        Younha
        `
        var url ="eventhorizon.jpeg"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        } else if (songPlaying === false) {
            // play song
            console.log('song2 playing...')
            song2.play()
            // change songPlaying to true
            songPlaying = true
            // change btn
            document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
            document.querySelector('.albumcover').innerHTML = `
            <img src="eventhorizon.jpeg"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Event Horizon
        `
        document.querySelector('.artist').innerHTML = `
        Younha
        `
        var url ="eventhorizon.jpeg"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        }
    }    
    if (currentTrack === 3) {
        if (songPlaying === true) {
            // pause song
            console.log('song3 paused...')
            song3.pause()
            // change songPlaying to false
            songPlaying = false
            // change btn
            document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-play-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
            document.querySelector('.albumcover').innerHTML = `
            <img src="springday.jpeg"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Spring Day
        `
        document.querySelector('.artist').innerHTML = `
        BTS
        `
        var url ="springday.jpeg"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        } else if (songPlaying === false) {
            // play song
            console.log('song3 playing...')
            song3.play()
            // change songPlaying to true
            songPlaying = true
            // change btn
            document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
            document.querySelector('.albumcover').innerHTML = `
            <img src="springday.jpeg"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Spring Day
        `
        document.querySelector('.artist').innerHTML = `
        BTS
        `
        var url ="springday.jpeg"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        }
    }    
}

function nextSong() {
    if (currentTrack ===3){
        console.log('playing song1...')
        song1.load()
        song3.pause()
        song1.play()
        document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
        document.querySelector('.albumcover').innerHTML = `
            <img src="usagain.png"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Us, again
        `
        document.querySelector('.artist').innerHTML = `
            Seventeen
        `

        var url ="usagain.png"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        currentTrack = 1
    } else{
        currentTrack++
    }
    // show the track
    if (currentTrack === 2) {
        console.log('playing song2...')
        song2.load()
        song1.pause()
        song2.play()
        document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
        document.querySelector('.albumcover').innerHTML = `
            <img src="eventhorizon.jpeg"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Event Horizon
        `
        document.querySelector('.artist').innerHTML = `
            Younha
        `
        var url ="eventhorizon.jpeg"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        
    }
    else if (currentTrack === 3) {
        console.log('playing song3...')
       song3.load()
        song2.pause()
        song3.play()
        document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
        document.querySelector('.albumcover').innerHTML = `
            <img src="springday.jpeg"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Spring Day
        `
        document.querySelector('.artist').innerHTML = `
            BTS
        `
        var url ="springday.jpeg"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
    }
    }
    // if current track is 3
    // change track to 1
    // else
    // change track to + 1
    


function previousSong() {
    if (currentTrack===1){
        console.log('playing song3...')
    song3.load()
    song1.pause()
    song3.play()
    document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
    document.querySelector('.albumcover').innerHTML = `
        <img src="springday.jpeg"/>
    `
    document.querySelector('.nowplaying').innerHTML = `
        Spring Day
    `
    document.querySelector('.artist').innerHTML = `
        BTS
    `
    var url ="springday.jpeg"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
    
        currentTrack=3
    } else{
        currentTrack--
    }
    if (currentTrack === 2) {
    console.log('playing song2...')
    song2.load()
    song3.pause()
    song2.play()
    document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
    document.querySelector('.albumcover').innerHTML = `
        <img src="eventhorizon.jpeg"/>
    `
    document.querySelector('.nowplaying').innerHTML = `
        Event Horizon
    `
    document.querySelector('.artist').innerHTML = `
        Younha
    `
    var url ="eventhorizon.jpeg"
    var div = document.getElementById("songplayer");
    div.style.backgroundImage = `url(${url})`;
}
else if(currentTrack === 1) {
    console.log('playing song1...')
    song1.load()
    song2.pause()
    song1.play()
    document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
    document.querySelector('.albumcover').innerHTML = `
        <img src="usagain.png"/>
    `
    document.querySelector('.nowplaying').innerHTML = `
        Us, again
    `
    document.querySelector('.artist').innerHTML = `
        Seventeen
    ` 
    var url ="usagain.png"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        
}
}
function loadSong(){
    if (currentTrack === 1) {
        console.log('playing song1...')
        song1.load()
        song1.play()
        document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
        document.querySelector('.albumcover').innerHTML = `
            <img src="usagain.png"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Us, again
        `
        document.querySelector('.artist').innerHTML = `
            Seventeen
        `
        var url ="usagain.png"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        
        
    }
    else if (currentTrack === 2) {
        console.log('playing song2...')
        song2.load()
        song2.play()
        document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
        document.querySelector('.albumcover').innerHTML = `
            <img src="eventhorizon.jpeg"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Event Horizon
        `
        document.querySelector('.artist').innerHTML = `
            Younha
        `
        var url ="eventhorizon.jpeg"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        
    }
    else if (currentTrack === 3) {
        console.log('playing song3...')
        song3.load()
        song3.play()
        document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
        document.querySelector('.albumcover').innerHTML = `
            <img src="springday.jpeg"/>
        `
        document.querySelector('.nowplaying').innerHTML = `
            Spring Day
        `
        document.querySelector('.artist').innerHTML = `
            BTS
        `
        var url ="springday.jpeg"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
    }
}
song1.onended=function(){
    console.log('playing song2...')
    song2.load()
    song3.pause()
    song2.play()
    document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
    document.querySelector('.albumcover').innerHTML = `
        <img src="eventhorizon.jpeg"/>
    `
    document.querySelector('.nowplaying').innerHTML = `
        Event Horizon
    `
    document.querySelector('.artist').innerHTML = `
        Younha
    `
    var url ="eventhorizon.jpeg"
    var div = document.getElementById("songplayer");
    div.style.backgroundImage = `url(${url})`;
    currentTrack=2
}
song1.onended=function(){
    console.log('playing song2...')
    song2.load()
    song3.pause()
    song2.play()
    document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
    document.querySelector('.albumcover').innerHTML = `
        <img src="eventhorizon.jpeg"/>
    `
    document.querySelector('.nowplaying').innerHTML = `
        Event Horizon
    `
    document.querySelector('.artist').innerHTML = `
        Younha
    `
    var url ="eventhorizon.jpeg"
    var div = document.getElementById("songplayer");
    div.style.backgroundImage = `url(${url})`;
    currentTrack=2
}
song1.onended=function(){
    console.log('playing song2...')
    song2.load()
    song3.pause()
    song2.play()
    document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
    document.querySelector('.albumcover').innerHTML = `
        <img src="eventhorizon.jpeg"/>
    `
    document.querySelector('.nowplaying').innerHTML = `
        Event Horizon
    `
    document.querySelector('.artist').innerHTML = `
        Younha
    `
    var url ="eventhorizon.jpeg"
    var div = document.getElementById("songplayer");
    div.style.backgroundImage = `url(${url})`;
    currentTrack=2
}
song2.onended=function(){
    console.log('playing song3...')
    song3.load()
    song3.play()
    document.querySelector('.playpause').innerHTML = `
        <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
        `
    document.querySelector('.albumcover').innerHTML = `
        <img src="springday.jpeg"/>
    `
    document.querySelector('.nowplaying').innerHTML = `
        Spring Day
    `
    document.querySelector('.artist').innerHTML = `
        BTS
    `
    var url ="springday.jpeg"
    var div = document.getElementById("songplayer");
    div.style.backgroundImage = `url(${url})`;
}
song3.onended=function(){
    console.log('playing song1...')
    song1.load()
    song2.pause()
    song1.play()
    document.querySelector('.playpause').innerHTML = `
            <i class="fa-solid fa-pause-circle fa-4x" style="color: white;" onclick="playpauseSong()"></i>
            `
    document.querySelector('.albumcover').innerHTML = `
        <img src="usagain.png"/>
    `
    document.querySelector('.nowplaying').innerHTML = `
        Us, again
    `
    document.querySelector('.artist').innerHTML = `
        Seventeen
    ` 
    var url ="usagain.png"
        var div = document.getElementById("songplayer");
        div.style.backgroundImage = `url(${url})`;
        currentTrack=1
}

