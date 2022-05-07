import { UI_ELEMENTS } from './view';

export function openModal(text) {
  document.body.style.overflow = 'hidden';
  UI_ELEMENTS.MODAL_TEXT_FIELD.textContent = text;
  UI_ELEMENTS.MODAL_WINDOW.classList.add('modal--show');
}

export function closeModal() {
  document.body.style.overflow = '';
  UI_ELEMENTS.MODAL_WINDOW.classList.remove('modal--show');
}
