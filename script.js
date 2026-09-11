
const dialog = document.querySelector('#lightbox');
const image = document.querySelector('#lightbox-image');
const title = document.querySelector('#lightbox-title');

document.querySelectorAll('.sheet').forEach(sheet => {
  sheet.addEventListener('click', () => {
    image.src = sheet.dataset.src;
    image.alt = sheet.dataset.title;
    title.textContent = sheet.dataset.title;
    dialog.showModal();
  });
});

dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const links = [...document.querySelectorAll('.chapter-nav a')];
const chapters = [...document.querySelectorAll('.chapter')];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
  });
}, {rootMargin: '-25% 0px -62% 0px', threshold: 0});

chapters.forEach(chapter => observer.observe(chapter));
