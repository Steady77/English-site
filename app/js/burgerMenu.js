import { UI_ELEMENTS } from './view';

export function hideBurgerMenu() {
  UI_ELEMENTS.MENU_LIST.classList.remove('menu__list--active');
  UI_ELEMENTS.MENU_BUTTON.classList.remove('menu-btn--active');
  document.body.classList.remove('--lock');
}

export function toggleBurgerMenu() {
  UI_ELEMENTS.MENU_LIST.classList.toggle('menu__list--active');
  UI_ELEMENTS.MENU_BUTTON.classList.toggle('menu-btn--active');
  document.body.classList.toggle('--lock');
}
