import AOS from 'aos';
import { hideBurgerMenu, toggleBurgerMenu } from './burgerMenu';
import { formSend } from './form';
import { closeModal } from './modal';
import { quiz } from './quiz';
import { smoothScroll } from './smoothScroll';
import { initSwiper } from './swiperSettings';
import { UI_ELEMENTS } from './view';

AOS.init({
  once: true,
});

initSwiper();
quiz();

if (UI_ELEMENTS.MENU_BUTTON) {
  UI_ELEMENTS.MENU_BUTTON.addEventListener('click', toggleBurgerMenu);
}

UI_ELEMENTS.MENU_LINKS.forEach((menuLink) => {
  menuLink.addEventListener('click', smoothScroll);
});

UI_ELEMENTS.MODAL_WINDOW.addEventListener('click', (e) => {
  if (e.target) {
    closeModal();
  }
});

UI_ELEMENTS.FORM.addEventListener('submit', formSend);

document.body.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeModal();
  }
});

document.body.addEventListener('click', (e) => {
  const target = e.target;

  if (!target.closest('.menu')) {
    hideBurgerMenu();
  }
});
