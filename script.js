/* NAMA TAMU */
const params = new URLSearchParams(window.location.search);
const guest = params.get('to') || 'Tamu Undangan';
document.getElementById('guest').innerText = guest;

/* BUKA UNDANGAN */
function openInvitation(){
    document.querySelector(".hero").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    const first = document.getElementById("musicFirst");
    const wedding = document.getElementById("musicWedding");

    first.volume = 0.5;
    wedding.volume = 0.5;

    first.play();

    first.onended = function(){
        wedding.loop = true;
        wedding.play();
    };
}

/* ANIMASI SCROLL */
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
});


document.querySelectorAll('.slide-left, .slide-right, .fade-up, .fade-soft')
.forEach(el=>{
    observer.observe(el);
});

/* COUNTDOWN */
const target = new Date("June 3, 2026 00:00:00").getTime();

setInterval(()=>{
    const now = new Date().getTime();
    const diff = target - now;

    const d = Math.floor(diff/(1000*60*60*24));
    const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const m = Math.floor((diff%(1000*60*60))/(1000*60));

    document.getElementById("day").innerText = d;
    document.getElementById("hour").innerText = h;
    document.getElementById("minute").innerText = m;

},1000);

/* FLOWER EFFECT */
setInterval(()=>{
    const el = document.createElement('div');
    el.classList.add('fall');

    const items = ["🌸","💜","❤️","🌺"];
    el.innerHTML = items[Math.floor(Math.random()*items.length)];

    el.style.left = Math.random()*100 + "vw";
    el.style.fontSize = (15 + Math.random()*20) + "px";
    el.style.animationDuration = (4 + Math.random()*6) + "s";

    document.body.appendChild(el);

    setTimeout(()=>el.remove(),10000);
},300);

// FADE SOFT
document.querySelectorAll('.fade-up, .slide-left, .fade-soft')
.forEach(el=>{
    observer.observe(el);
});
document.querySelectorAll('.reveal-text').forEach(el=>{
    const spans = el.querySelectorAll('span');
    spans.forEach((span, i)=>{
        span.style.animationDelay = (i * 0.08) + "s";
    });
});
document.querySelectorAll('.reveal-text').forEach(el=>{
    observer.observe(el);
});
document.querySelectorAll('.ayat span').forEach((s,i)=>{
    s.style.animationDelay = (i * 0.1)+"s";
});

document.querySelectorAll('.arti span').forEach((s,i)=>{
    s.style.animationDelay = (i * 0.06)+"s";
});

function splitText(el){
    const words = el.innerText.split(" ");
    el.innerHTML = words.map(word => `<span>${word}</span>`).join(" ");
}

document.querySelectorAll('.reveal-text').forEach(el=>{
    splitText(el);
});

// STORY TELLING FIXED
document.addEventListener("DOMContentLoaded", function(){

    let currentSlide = 0;

    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");

    if(slides.length === 0){
        console.log("Slide tidak ketemu bro!");
        return;
    }

    /* BUAT DOTS */
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");

        if(i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            currentSlide = i;
            showSlide(currentSlide);
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showSlide(index){
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));

        slides[index].classList.add("active");
        dots[index].classList.add("active");
    }

    setInterval(() => {
        currentSlide++;
        if(currentSlide >= slides.length){
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 4000);

});

// GALERY
document.querySelectorAll('.gallery img').forEach(el=>{
    observer.observe(el);
});

//music
function openInvitation(){
    document.querySelector(".hero").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    const first = document.getElementById("musicFirst");
    const wedding = document.getElementById("musicWedding");

    first.volume = 0.5;
    wedding.volume = 0.5;

    first.play();

    first.onended = function(){
        wedding.loop = true;
        wedding.play();
    };
}