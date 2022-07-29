import { openModal } from './modal';
import { UI_ELEMENTS } from './view';

export async function formSend(e) {
  e.preventDefault();

  let error = formValidate(form);

  let formData = new FormData(UI_ELEMENTS.FORM);

  if (error === 0) {
    UI_ELEMENTS.FORM.classList.add('--sending');
    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      let result = await response.json();
      openModal(result.message);
      UI_ELEMENTS.FORM.reset();
      UI_ELEMENTS.FORM.classList.remove('--sending');
    } else {
      openModal('Ошибка. Попробуйте снова.');
      UI_ELEMENTS.FORM.classList.remove('--sending');
    }
  } else {
    openModal('Заполните все поля');
  }
}

function formValidate(form) {
  let error = 0;
  let formReq = document.querySelectorAll('.--req');

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index];
    formRemoveError(input);

    const isContains = input.classList.contains('contacts__form-input--email');

    if (isContains) {
      if (emailTest(input)) {
        formAddError(input);
        error++;
      }
    } else if (input.value === '') {
      formAddError(input);
      error++;
    }
  }
  return error;
}

function formAddError(input) {
  input.classList.add('--error');
}
function formRemoveError(input) {
  input.classList.remove('--error');
}
function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
