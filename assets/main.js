
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')});}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
const slides=[...document.querySelectorAll('.hero-slide')], dots=[...document.querySelectorAll('.slider-dot')];
let current=0, timer;
function showSlide(n){if(!slides.length)return;current=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===current));dots.forEach((d,i)=>d.classList.toggle('active',i===current));}
function restart(){clearInterval(timer);if(slides.length>1)timer=setInterval(()=>showSlide(current+1),5500);}
dots.forEach((d,i)=>d.addEventListener('click',()=>{showSlide(i);restart()}));if(slides.length){showSlide(0);restart();}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const quoteForm=document.querySelector('#quoteForm');
if(quoteForm){quoteForm.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(quoteForm);const body=[...data.entries()].map(([k,v])=>`${k}: ${v}`).join('%0A');const subject=encodeURIComponent('Website quote request - AGOER');window.location.href=`mailto:info@agoerplumbingsolutions.com?subject=${subject}&body=${body}`;document.querySelector('#formMessage').textContent='Your email app should open with the request details. Please review and send the email.';});}
