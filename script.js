const wrapperPageEl = document.querySelector('.pageWrapper');
const leftPanelEl = document.querySelector('.leftPanel');
const closeBtn = document.querySelector('.leftPanel .closeBtn');
const menuBtn = document.querySelector('.menu');
const tabEls = document.querySelectorAll('.leftPanel .tab');
const accordionBtns = document.querySelectorAll('.accordion .accordionTitle');
const accordionContent = document.querySelectorAll('.accordion .wrapAccordionContent');
const upBtn = document.querySelector('.upBtn');
const homeBtn = document.querySelector('.logo');

document.querySelectorAll('.carousel').forEach(carousel => {
  const slidesContainer = carousel.querySelector('.slides');
  const slides = carousel.querySelectorAll('.slide');
  const prevBtn = carousel.querySelector('.prevBtn');
  const nextBtn = carousel.querySelector('.nextBtn');

  if (slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoPlayInterval;

  function goToSlide(slideIndex) {
    if (slideIndex < 0) slideIndex = totalSlides - 1;
    if (slideIndex >= totalSlides) slideIndex = 0;
    currentSlide = slideIndex;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateIndicators();
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 10000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });

  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  let startX = 0;
  carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    stopAutoPlay();
  });

  carousel.addEventListener('touchend', e => {
    const diffX = startX - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 50) diffX > 0 ? nextSlide() : prevSlide();
    startAutoPlay();
  });

  // === Індикатори ===
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'slide-indicators';
  indicatorsContainer.style.cssText = `
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 1;
  `;

  const indicators = [];
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    indicator.style.cssText = `
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: background 0.3s ease;
    `;
    indicator.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(i);
      startAutoPlay();
    });
    indicators.push(indicator);
    indicatorsContainer.appendChild(indicator);
  }
  carousel.appendChild(indicatorsContainer);

  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      indicator.style.background = index === currentSlide
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(255, 255, 255, 0.5)';
    });
  }

  goToSlide(0);
  startAutoPlay();
});

//Відкриття/закриття лівої панельки
function closeLeftPanel(){
  leftPanelEl.classList.add('closedPanel');
  wrapperPageEl.classList.remove('overlay');
}

wrapperPageEl.addEventListener('click', (e)=>{
  if(e.target !== leftPanelEl && !leftPanelEl.contains(e.target) && !e.currentTarget.classList.contains('closedPanel')){
    closeLeftPanel();
  }
})

closeBtn.addEventListener('click', (e)=>{
  closeLeftPanel();
})

window.addEventListener('scroll', () => {
  if (!leftPanelEl.classList.contains('closedPanel')) {
    closeLeftPanel();
  }
});

menuBtn.addEventListener('click', (e)=>{
  e.stopPropagation();
  leftPanelEl.classList.remove('closedPanel');
  wrapperPageEl.classList.add('overlay');

})
tabEls.forEach(tab =>{
  tab.addEventListener('click', (e)=>{
    e.preventDefault();
    leftPanelEl.classList.add('closedPanel');
    const id = (e.currentTarget.href.split('#'))[1];
    const el = document.getElementById(id);
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
    wrapperPageEl.classList.remove('overlay');
    console.log(tab);
  })
  
})

accordionBtns.forEach(accordionBtn =>{
  accordionBtn.addEventListener('click', (e)=>{
      e.currentTarget.nextElementSibling.classList.toggle('open');
      const icon = e.currentTarget.querySelector('.icon');
      icon.classList.toggle('opened');
  })
})

//кнопка підйому вгору//
upBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  const el = document.getElementById('home');
  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  })
})

homeBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  const el = document.getElementById('home');
  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  })
})

window.addEventListener('scroll', () => {
  if (window.scrollY > 900 && !upBtn.classList.contains('visible')) { // після 900px вниз показуємо кнопку скрола
    upBtn.classList.add('visible');
  } else if(window.scrollY < 900 && upBtn.classList.contains('visible')) {
    upBtn.classList.remove('visible');
  }
});