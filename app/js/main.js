import AOS from 'aos';
import { hideBurgerMenu, toggleBurgerMenu } from './burgerMenu';
import { closeModal, openModal } from './modal';
import { smoothScroll } from './smoothScroll';
import { initSwiper } from './swiperSettings';
import { UI_ELEMENTS } from './view';

AOS.init({
  once: true,
});

initSwiper();

if (UI_ELEMENTS.MENU_BUTTON) {
  UI_ELEMENTS.MENU_BUTTON.addEventListener('click', toggleBurgerMenu);
}

document.body.addEventListener('click', (e) => {
  const target = e.target;

  if (!target.closest('.menu')) {
    hideBurgerMenu();
  }
});

UI_ELEMENTS.MENU_LINKS.forEach((menuLink) => {
  menuLink.addEventListener('click', smoothScroll);
});

UI_ELEMENTS.MODAL_WINDOW.addEventListener('click', (e) => {
  if (e.target) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeModal();
  }
});

// Form

const form = document.getElementById('form');
form.addEventListener('submit', formSend);

async function formSend(e) {
  e.preventDefault();

  let error = formValidate(form);

  let formData = new FormData(form);

  if (error === 0) {
    form.classList.add('--sending');
    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      let result = await response.json();
      openModal(result.message);
      form.reset();
      form.classList.remove('--sending');
    } else {
      openModal('Ошибка. Попробуйте снова.');
      form.classList.remove('--sending');
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

    if (input.classList.contains('contacts__form-input--email')) {
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

// Quiz

let quizData = [];

function getData() {
  fetch('../quizdata.json')
    .then((res) => res.json())
    .then((loadedQuizData) => {
      quizData = loadedQuizData;
      loadQuiz();
    })
    .catch((err) => {
      console.error(err);
      openModal('Ошибка при загрузке данных. Попробуйте позже.');
    });
}

const answerElms = document.querySelectorAll('.quiz__answer'),
  quizBoxHeader = document.querySelector('.quiz__box-header'),
  questionEl = document.querySelector('.quiz__question'),
  answerA = document.querySelector('.quiz__text-a'),
  answerB = document.querySelector('.quiz__text-b'),
  answerC = document.querySelector('.quiz__text-c'),
  answerD = document.querySelector('.quiz__text-d'),
  submitButton = document.querySelector('.quiz__btn'),
  quizPagination = document.querySelector('.quiz__pagination'),
  quizCloseCross = document.querySelector('.quiz__close-cross'),
  quizCloseButton = document.querySelector('.quiz__close-btn'),
  quizStartButton = document.querySelector('.header__btn'),
  quizContent = document.querySelector('.quiz');

let currentQuiz = 0,
  score = 0;

function loadQuiz() {
  showQuiz();
  deselectAnswers();

  quizPagination.textContent = `${currentQuiz + 1}/50`;

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerHTML = currentQuizData.question;
  answerA.textContent = currentQuizData.a;
  answerB.textContent = currentQuizData.b;
  answerC.textContent = currentQuizData.c;
  answerD.textContent = currentQuizData.d;
}

function getSelectedAnswers() {
  let answer;

  answerElms.forEach((answerElm) => {
    if (answerElm.checked) {
      answer = answerElm.classList.item(2);
    }
  });

  return answer;
}

function deselectAnswers() {
  answerElms.forEach((answerElm) => {
    answerElm.checked = false;
  });
}

function changeButtonsVisibility() {
  submitButton.style.display = 'none';
  quizCloseButton.style.display = 'block';
}

function showResultText(result, level) {
  quizBoxHeader.innerHTML = `
      <h2 style="text-align: center; padding: 20px;">Ваш результат ${result} из 50 <br>
      Рекомендуемый уровень: ${level}</h2>
    `;
}

function getScore(result) {
  switch (true) {
    case result >= 0 && result <= 20:
      showResultText(result, 'Elementary');
      changeButtonsVisibility();
      break;
    case result >= 21 && result <= 30:
      showResultText(result, 'Pre-Intermediate');
      changeButtonsVisibility();
      break;
    case result >= 31 && result <= 40:
      showResultText(result, 'Intermediate');
      changeButtonsVisibility();
      break;
    case result >= 41 && result <= 50:
      showResultText(result, 'Upper-Intermediate');
      changeButtonsVisibility();
      break;
    default:
      break;
  }
}

function closeQuiz() {
  quizContent.classList.remove('quiz--open');
  document.body.classList.remove('quiz--lock');
  location.reload();
}

function showQuiz() {
  quizContent.classList.add('quiz--open');
  document.body.classList.add('quiz--lock');
}

submitButton.addEventListener('click', () => {
  const answer = getSelectedAnswers();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      getScore(score);
    }
  }
});

quizStartButton.addEventListener('click', getData);
quizCloseCross.addEventListener('click', closeQuiz);
quizCloseButton.addEventListener('click', closeQuiz);
