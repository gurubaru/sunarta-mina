/* ======================
   NAMA TAMU
====================== */
const params = new URLSearchParams(window.location.search);
const guest = params.get('to') || 'Tamu Undangan';
document.getElementById('guest').innerText = guest;

/* ======================
   OPEN INVITATION
====================== */
let started = false;

function openInvitation(){
    if(started) return;
    started = true;

    document.querySelector(".hero").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    startCountdown();
    startFlower();
    loadComments();

    // Playlist musik
    const playlist = [
        document.getElementById("musicFirst"),
        document.getElementById("lyrics"),
        document.getElementById("dol"),
        document.getElementById("syl"),
        document.getElementById("musicWedding")
    ].filter(Boolean); // buang null kalau ada id yg ga ketemu

    if(playlist.length > 0){
        // set volume semua
        playlist.forEach(m => m.volume = 0.5);

        let index = 0;

        function playNext(){
            const current = playlist[index];
            if(!current) return;

            current.currentTime = 0;
            current.play().catch(()=>{});

            current.onended = function(){
                index++;
                if(index >= playlist.length){
                    index = 0; // balik ke awal
                }
                playNext();
            };
        }

        playNext();
    }
}
/* ======================
   SCROLL ANIMATION
====================== */
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // ⬅️ hemat performa
        }
    });
},{
    threshold:0.2
});

document.querySelectorAll('.fade-up, .fade-soft, .slide-left, .slide-right, .gallery img')
.forEach(el=>observer.observe(el));

/* ======================
   COUNTDOWN
====================== */
function startCountdown(){
    const target = new Date("June 3, 2026 00:00:00").getTime();

    setInterval(()=>{
        const now = new Date().getTime();
        const diff = target - now;

        if(diff <= 0) return;

        document.getElementById("day").innerText =
            Math.floor(diff/(1000*60*60*24));

        document.getElementById("hour").innerText =
            Math.floor((diff%(1000*60*60*24))/(1000*60*60));

        document.getElementById("minute").innerText =
            Math.floor((diff%(1000*60*60))/(1000*60));

    },1000);
}

/* ======================
   FLOWER EFFECT (RINGAN)
====================== */
function startFlower(){
    setInterval(()=>{
        if(document.hidden) return; // ⬅️ stop kalau tab gak aktif

        const el = document.createElement('div');
        el.className = 'fall';

        const items = ["🌸","💜"];
        el.innerHTML = items[Math.floor(Math.random()*items.length)];

        el.style.left = Math.random()*100 + "vw";
        el.style.fontSize = (12 + Math.random()*12) + "px";
        el.style.animationDuration = (6 + Math.random()*4) + "s";

        document.body.appendChild(el);

        setTimeout(()=>el.remove(),10000);

    },1000); // ⬅️ dari 300 → 1000 (lebih ringan)
}

/* ======================
   TEXT REVEAL FIX
====================== */
function splitText(el){
    const words = el.innerText.split(" ");
    el.innerHTML = words.map(word => `<span>${word}</span>`).join(" ");
}

document.querySelectorAll('.reveal-text').forEach(el=>{
    splitText(el);
    observer.observe(el);
});

/* ======================
   SLIDER
====================== */
document.addEventListener("DOMContentLoaded", function(){

    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");

    if(!slides.length) return;

    slides.forEach((_, i)=>{
        const dot = document.createElement("span");
        dot.className = "dot";
        if(i === 0) dot.classList.add("active");

        dot.onclick = ()=>{
            currentSlide = i;
            showSlide();
        };

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showSlide(){
        slides.forEach(s=>s.classList.remove("active"));
        dots.forEach(d=>d.classList.remove("active"));

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    setInterval(()=>{
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide();
    },4000);
});

/* ======================
   COPY REKENING
====================== */
function copyRek(id){
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    alert("Nomor rekening berhasil disalin");
}

/* ======================
   KOMENTAR
====================== */
const API_URL = "https://script.google.com/macros/s/AKfycbzesfbWIzUp6qEOrSTO5A5fbr5PuAaRToHRXRBpdx7ZeKS4Qg5CrlAVB4FiBl7oliIb/exec";

function addComment(){
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("commentStatus");

    if(!name || !message){
        alert("Isi dulu bro 😄");
        return;
    }

    status.innerText = "Mengirim ucapan";
    status.classList.add("loading");

    fetch(API_URL,{
        method:"POST",
        body: JSON.stringify({name, message})
    })
    .then(res=>res.json())
    .then(()=>{
        status.innerText = "Ucapan terkirim 💜";
        status.classList.remove("loading");

        document.getElementById("name").value = "";
        document.getElementById("message").value = "";

        loadComments();

        setTimeout(()=>status.innerText="",2000);
    })
    .catch(()=>{
        status.innerText = "Gagal mengirim 😢";
        status.classList.remove("loading");
    });
}

function loadComments(){
    fetch(API_URL)
    .then(res=>res.json())
    .then(data=>{
        const list = document.getElementById("commentList");
        list.innerHTML = "";

        data.reverse().forEach((c,i)=>{
            const div = document.createElement("div");
            div.className = "comment";

            const date = new Date(c.time).toLocaleString("id-ID");

            div.innerHTML = `
                <div class="comment-header">
                    <h4>${c.name}</h4>
                    <span class="time">${date}</span>
                </div>
                <p>${c.message}</p>
            `;

            list.appendChild(div);

            setTimeout(()=>div.classList.add("show"), i*100);
        });
    });
}
