const stages = [
  {
    number: "01",
    title: "Grundaufbau",
    text: "Grundplatte, erste Turmlagen und Eingang bilden die Basis für den gesamten Tower.",
    meta: "Schritte 1–4",
    image: "assets/steps-1-4.png",
    alt: "Grundaufbau des O2 Tower München"
  },
  {
    number: "02",
    title: "Turm bis Lage 19",
    text: "Muster A und B werden abwechselnd aufgebaut. Die Wiederholung macht den hohen Glasturm kompakt und stabil.",
    meta: "Lagen 3–19",
    image: "assets/step-5.png",
    alt: "O2 Tower München bis Lage 19"
  },
  {
    number: "03",
    title: "Blaue Lage & oberer Turm",
    text: "Die transparente hellblaue Lage 20 markiert den charakteristischen Farbakzent. Danach folgen die Lagen 21 bis 27.",
    meta: "Lage 20 · Lagen 21–27",
    image: "assets/steps-6-7.png",
    alt: "Blaue Lage und oberer Turm"
  },
  {
    number: "04",
    title: "Dach & Fertigstellung",
    text: "Zum Abschluss kommen das 8 × 8 Dach, Antennen, runde Dachdetails und die sechs Bäume auf die Grundplatte.",
    meta: "Schritte 8–10",
    image: "assets/steps-8-10.png",
    alt: "Dach und Fertigstellung des O2 Tower München"
  }
];

let current = 0;
const stageNumber = document.querySelector('#stageNumber');
const stageTitle = document.querySelector('#stageTitle');
const stageText = document.querySelector('#stageText');
const stageMeta = document.querySelector('#stageMeta');
const stageImage = document.querySelector('#stageImage');
const tabs = [...document.querySelectorAll('.stage-tab')];
const dots = document.querySelector('#stageDots');

stages.forEach((_, index) => {
  const dot = document.createElement('i');
  if (index === 0) dot.classList.add('active');
  dots.appendChild(dot);
});

function renderStage(index) {
  current = (index + stages.length) % stages.length;
  const stage = stages[current];
  stageImage.classList.add('switching');
  setTimeout(() => {
    stageNumber.textContent = stage.number;
    stageTitle.textContent = stage.title;
    stageText.textContent = stage.text;
    stageMeta.textContent = stage.meta;
    stageImage.src = stage.image;
    stageImage.alt = stage.alt;
    stageImage.classList.remove('switching');
  }, 150);

  tabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === current);
    tab.setAttribute('aria-selected', i === current ? 'true' : 'false');
  });
  [...dots.children].forEach((dot, i) => dot.classList.toggle('active', i === current));
}

tabs.forEach(tab => tab.addEventListener('click', () => renderStage(Number(tab.dataset.stage))));
document.querySelector('#prevStage').addEventListener('click', () => renderStage(current - 1));
document.querySelector('#nextStage').addEventListener('click', () => renderStage(current + 1));

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') renderStage(current - 1);
  if (event.key === 'ArrowRight') renderStage(current + 1);
});

document.querySelectorAll('[data-scroll]').forEach(button => {
  button.addEventListener('click', () => document.querySelector(button.dataset.scroll)?.scrollIntoView({behavior: 'smooth'}));
});

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const tilt = document.querySelector('.tilt-card');
if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  tilt.addEventListener('mousemove', e => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    tilt.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-3px)`;
  });
  tilt.addEventListener('mouseleave', () => tilt.style.transform = '');
}
