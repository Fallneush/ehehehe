// PAGE SWITCH
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let noScale = 1;
let yesScale = 1;

noBtn.addEventListener("click", function(){
    noScale -= 0.2;
    yesScale += 0.2;

    noBtn.style.transform = `scale(${noScale})`;
    yesBtn.style.transform = `scale(${yesScale})`;

    if(noScale <= 0){
        noBtn.style.display = "none";
    }
});

yesBtn.addEventListener("click", function(){
    page1.style.display = "none";
    page2.style.display = "flex";
});

// MUSIC PLAYER
const vinyl = document.getElementById("vinyl");
const music = document.getElementById("music");
const playBtn = document.getElementById("playBtn");
const powerBtn = document.getElementById("powerBtn");
const stopBtn = document.getElementById("stopBtn");
const musicUpload = document.getElementById("musicUpload");
const tonearm = document.getElementById("tonearm");
const surpriseOverlay = document.getElementById("surpriseOverlay");
const boomSound = document.getElementById("boomSound");
const overlay = document.getElementById("surpriseOverlay");

let powerOn = false;
let playing = false;

// Upload
musicUpload.addEventListener("change", function(e){
    const file = e.target.files[0];
    if(file){
        music.src = URL.createObjectURL(file);
    }
});

// Power
powerBtn.addEventListener("click", function(){
    powerOn = !powerOn;
    powerBtn.style.background = powerOn ? "green" : "";

    if(!powerOn){
        music.pause();
        music.currentTime = 0;
        vinyl.classList.remove("spin");
        tonearm.classList.remove("playing");
        playBtn.innerText = "▶";
        playing = false;
    }
});

// Play
playBtn.addEventListener("click", function(){

    if(!powerOn){
        alert("Turn on power first 🔘");
        return;
    }

    if(!music.src){
        alert("Upload music dulu 🎵");
        return;
    }

    if(!playing){
        music.play();
        vinyl.classList.add("spin");
        tonearm.classList.add("playing");
        playBtn.innerText = "⏸";
        playing = true;
    } else {
        music.pause();
        vinyl.classList.remove("spin");
        tonearm.classList.remove("playing");
        playBtn.innerText = "▶";
        playing = false;
    }
});

// Stop
stopBtn.addEventListener("click", function(){
    music.pause();
    music.currentTime = 0;
    vinyl.classList.remove("spin");
    tonearm.classList.remove("playing");
    playBtn.innerText = "▶";
    playing = false;
});

yesBtn.addEventListener("click", function(){
    page1.style.display = "none";
    page2.style.display = "flex";

    spawnHeartsContinuously(); // start hearts animation
    
    surpriseOverlay.classList.add("show");

    // 🔊 Play sound
    boomSound.currentTime = 0;
    boomSound.play();

    // 💥 Buat partikel
    for(let i = 0; i < 25; i++){
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const x = (Math.random() - 0.5) * 400 + "px";
        const y = (Math.random() - 0.5) * 400 + "px";

        particle.style.setProperty("--x", x);
        particle.style.setProperty("--y", y);

        surpriseOverlay.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }

    // hilang setelah 5 detik
    setTimeout(() => {
        surpriseOverlay.classList.remove("show");
    }, 5000);
});

function startSurprise() {
overlay.classList.add("active");
    sound.play();

    // Setelah 5 detik, tutup overlay dan tampilkan valentine
    setTimeout(() => {
        overlay.classList.remove("active");
        showValentine();
    }, 5000);
};

function showValentine() {
    const valentine = document.getElementById("valentineText");
    valentine.classList.add("active");

    // Heart rain
    for(let i = 0; i < 30; i++) {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "💖";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (2 + Math.random() * 3) + "s";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
};

function createBackgroundHearts() {
    for(let i = 0; i < 20; i++){
        const heart = document.createElement("div");
        heart.classList.add("heart-bg");
        heart.innerHTML = "💖";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = Math.random() * 80 + "vh";
        heart.style.fontSize = (20 + Math.random()*30) + "px";
        heart.style.opacity = Math.random() * 0.6 + 0.4;
        document.getElementById("page2").appendChild(heart);
    }
}

function spawnHeartsContinuously() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart-bg");
        heart.innerHTML = "💖";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = Math.random() * 80 + "vh";
        heart.style.fontSize = (15 + Math.random() * 25) + "px";
        heart.style.opacity = Math.random() * 0.6 + 0.4;

        document.getElementById("page2").appendChild(heart);

        setTimeout(() => heart.remove(), 10000);
    }, 500);
}

const noteBtn = document.getElementById("noteBtn");
const noteBox = document.getElementById("noteBox");

// toggle note dengan tombol
noteBtn.addEventListener("click", function(e){
    e.stopPropagation(); // supaya klik tombol tidak langsung menutup note
    if(noteBox.style.display === "none" || noteBox.style.display === ""){
        noteBox.style.display = "block";
    } else {
        noteBox.style.display = "none";
    }
});

// klik di luar noteBox untuk menutup
document.addEventListener("click", function(e){
    if(noteBox.style.display === "block" && !noteBox.contains(e.target) && e.target !== noteBtn){
        noteBox.style.display = "none";
    }
});
