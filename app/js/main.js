'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Animation

  AOS.init({
    once: true,
  });

  // Burger Menu

  const menuButton = document.querySelector('.menu-btn');
  const menuList = document.querySelector('.menu__list');
  const speed = 0.2; //Scroll Speed
  const menuLinks = document.querySelectorAll('.menu__list-link');

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      menuList.classList.toggle('menu__list--active');
      menuButton.classList.toggle('menu-btn--active');
      document.body.classList.toggle('--lock');
    });
  }

  document.body.addEventListener('click', e => {
    let target = e.target;
    if (!target.closest('.menu')) {
      menuList.classList.remove('menu__list--active');
      menuButton.classList.remove('menu-btn--active');
      document.body.classList.remove('--lock');
    }
  });

  // Swiper

  const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    }
  });

  // Smoth scroll

  function scroll(event) {
    (event).preventDefault();
    let target = event.target;

    if (target.matches('.menu__list-link')) {
      let start = 0;
      const pageY = window.pageYOffset;
      const targetAttribute = target.getAttribute('href');
      const elemCoord = document.querySelector(targetAttribute).getBoundingClientRect().top;

      const step = time => {
        if (!start) start = time;
        const progress = time - start;
        const r = (elemCoord < 0 ?
          Math.max(pageY - progress / speed, pageY + elemCoord) :
          Math.min(pageY + progress / speed, pageY + elemCoord));
        window.scrollTo(0, r);
        if (r < pageY + elemCoord || r > pageY + elemCoord) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    }

    menuList.classList.remove('menu__list--active');
    menuButton.classList.remove('menu-btn--active');
    document.body.classList.remove('--lock');
  }

  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', scroll);
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
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('--sending');
      } else {
        alert('Ошибка');
        form.classList.remove('--sending');
      }
    } else {
      alert('Заполните все поля');
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

  const quizData = [
    {
      question: "<u>____</u> you interested in sport?",
      a: "Be",
      b: "Am",
      c: "Is",
      d: "Are",
      correct: "d"
    },
    {
      question: "My <u>____</u> is a writer and his books are very popular.",
      a: "aunt",
      b: "uncle",
      c: "sister",
      d: "mother",
      correct: "b"
    },
    {
      question: "Paul is very <u>____</u>. He's very good at art.",
      a: "honest",
      b: "friendly",
      c: "polite",
      d: "creative",
      correct: "d"
    },
    {
      question: "We live in the city center and our house <u>____</u> have a big garden.",
      a: "doesn't",
      b: "isn't",
      c: "aren't",
      d: "don't",
      correct: "a"
    },
    {
      question: "I <u>____</u> arrive at school before nine o'clock.",
      a: "has to",
      b: "have to",
      c: "doesn't have to",
      d: "haven't to",
      correct: "b"
    },
    {
      question: "The beach was very crowded <u>____</u> Monday.",
      a: "in",
      b: "on",
      c: "at",
      d: "to",
      correct: "b"
    },
    {
      question: "You <u>____</u> eat all that cake! It isn’t good for you.",
      a: "don't",
      b: "may not",
      c: "shouldn’t",
      d: "will",
      correct: "c"
    },
    {
      question: "Cathy <u>____</u> a game on her computer at the moment.",
      a: "plays",
      b: "is playing",
      c: "to play",
      d: "play",
      correct: "b"
    },
    {
      question: "There <u>____</u> a lot of people outside the school. What’s the problem?",
      a: "are",
      b: "is",
      c: "be",
      d: "am",
      correct: "a"
    },
    {
      question: "<u>____</u> you like to come out with us tonight?",
      a: "Do",
      b: "Would",
      c: "Are",
      d: "Will",
      correct: "b"
    },
    {
      question: "How <u>____</u> time have we got to do this exercise?",
      a: "long",
      b: "many",
      c: "much",
      d: "quick",
      correct: "c"
    },
    {
      question: "Turn <u>____</u> and you’ll see the museum on the left.",
      a: "on the right",
      b: "rightly",
      c: "by the right",
      d: "right",
      correct: "d"
    },
    {
      question: "Don’t forget to get <u>____</u> the bus at Station Road.",
      a: "out",
      b: "off",
      c: "over",
      d: "down",
      correct: "b"
    },
    {
      question: "Tom got the <u>____</u> marks in the class for his homework.",
      a: "worse",
      b: "worst",
      c: "baddest",
      d: "most bad",
      correct: "b"
    },
    {
      question: "There wasn’t <u>____</u> milk for breakfast this morning so I had toast and orange juice.",
      a: "a",
      b: "some",
      c: "the",
      d: "any",
      correct: "d"
    },
    {
      question: "My sister <u>____</u> speak French when she was only six years old.",
      a: "was",
      b: "should",
      c: "could",
      d: "had",
      correct: "c"
    },
    {
      question: "Did you <u>____</u> shopping after school yesterday?",
      a: "went",
      b: "goed",
      c: "going",
      d: "go",
      correct: "d"
    },
    {
      question: "I <u>____</u> five emails before school today.",
      a: "sent",
      b: "sended",
      c: "did send",
      d: "was send",
      correct: "a"
    },
    {
      question: "Our teacher speaks English to us <u>____</u> so that we can understand her.",
      a: "slow",
      b: "slower",
      c: "more slow",
      d: "slowly",
      correct: "d"
    },
    {
      question: "Quick - get the food inside! It <u>____</u> any moment.",
      a: "rains",
      b: "is raining",
      c: "is going to rain",
      d: "can rain",
      correct: "c"
    },
    {
      question: "I <u>____</u> the new Batman film yet. Is it any good?",
      a: "haven’t seen",
      b: "didn’t see",
      c: "don’t see",
      d: "am not seen",
      correct: "a"
    },
    {
      question: "I hope you <u>____</u> a good time at the moment in Greece! Phone soon.",
      a: "are having",
      b: "have",
      c: "have had",
      d: "had",
      correct: "a"
    },
    {
      question: "I wanted to see Harry. How long ago <u>____</u>?",
      a: "he left",
      b: "has he left",
      c: "did he leave",
      d: "could he leave",
      correct: "c"
    },
    {
      question: "Do students in your country have to stand <u>____</u> when the teacher arrives?",
      a: "on",
      b: "at",
      c: "in",
      d: "up",
      correct: "d"
    },
    {
      question: "Which train <u>____</u> for when I saw you on the platform on Sunday?",
      a: "did you wait",
      b: "were you waiting",
      c: "have you waited",
      d: "are you waiting",
      correct: "b"
    },
    {
      question: "You <u>____</u> hurry as we’ve still got twenty minutes before the film starts.",
      a: "mustn't",
      b: "can't",
      c: "may not",
      d: "needn't",
      correct: "d"
    },
    {
      question: "That car is <u>____</u> dangerous to drive.",
      a: "too",
      b: "enough",
      c: "not enough",
      d: "the worst",
      correct: "a"
    },
    {
      question: "I <u>____</u> you in the cafe at about 4.30 and we can discuss our plans then, OK?",
      a: "'ll see",
      b: "am going to see",
      c: "am seeing",
      d: "see",
      correct: "a"
    },
    {
      question: "My father has been a pilot <u>____</u> twenty years and he still loves his job.",
      a: "since",
      b: "for",
      c: "until",
      d: "by",
      correct: "b"
    },
    {
      question: "I really enjoy <u>____</u> new languages and I’d like to learn Italian soon.",
      a: "to learn",
      b: "learning",
      c: "learn",
      d: "learned",
      correct: "b"
    },
    {
      question: "If we <u>____</u> in the countryside, we’d have much better views than we do now.",
      a: "lived",
      b: "were live",
      c: "would live",
      d: "live",
      correct: "a"
    },
    {
      question: "I wish Joe <u>____</u> to Hawaii on holiday. They’re talking about an eruption there on the news.",
      a: "doesn't go",
      b: "didn't go",
      c: "hasn't gone",
      d: "hadn't gone",
      correct: "d"
    },
    {
      question: "Could I possibly <u>____</u> some money for the bus fare home? I’ve lost my bag.",
      a: "lend",
      b: "owe",
      c: "borrow",
      d: "need",
      correct: "c"
    },
    {
      question: "Sam asked me if I <u>____</u> a lift home after the concert.",
      a: "had wanted",
      b: "wanted",
      c: "would want",
      d: "want",
      correct: "b"
    },
    {
      question: "People say that an avalanche <u>____</u> by loud noises in the area but I don’t know if that’s true.",
      a: "causes",
      b: "has caused",
      c: "is causing",
      d: "is caused",
      correct: "d"
    },
    {
      question: "Look at the news! Three cars <u>____</u> in a bad accident on the motorway at Dartford.",
      a: "are involving",
      b: "involve",
      c: "have involved",
      d: "have been involved",
      correct: "d"
    },
    {
      question: "I <u>____</u> for arriving so late but I was caught up in a traffic jam in the town centre.",
      a: "sorry",
      b: "regret",
      c: "apologise",
      d: "afraid",
      correct: "c"
    },
    {
      question: "Look out for a petrol station because I think we’re going to run <u>____</u> of petrol soon.",
      a: "down",
      b: "out",
      c: "off",
      d: "through",
      correct: "b"
    },
    {
      question: "It was great to see you at the party. I didn’t realize how long <u>____</u> since we last met.",
      a: "it had been",
      b: "it was been",
      c: "it was being",
      d: "it is been",
      correct: "a"
    },
    {
      question: "The girls <u>____</u> to each other since the film started.",
      a: "talked",
      b: "were talking",
      c: "are talking",
      d: "have been talking",
      correct: "d"
    },
    {
      question: "By the time I hand in this project, I <u>____</u> on it for three weeks!",
      a: "'ll be working",
      b: "'ll have been working",
      c: "have worked",
      d: "'ll work",
      correct: "b"
    },
    {
      question: "Jonah’s just fallen down the steps outside and there’s <u>____</u> everywhere.",
      a: "bone",
      b: "blood",
      c: "skin",
      d: "cut",
      correct: "b"
    },
    {
      question: "I really wish people <u>____</u> dump litter in front of our house. We have to clear it up every day.",
      a: "won't",
      b: "wouldn't",
      c: "haven't",
      d: "don't",
      correct: "b"
    },
    {
      question: "You should be very proud <u>____</u> what you’ve achieved over the last year.",
      a: "of",
      b: "on",
      c: "to",
      d: "for",
      correct: "a"
    },
    {
      question: "<u>____</u> people know this but our school is being inspected today.",
      a: "Little",
      b: "Any",
      c: "None",
      d: "Few",
      correct: "d"
    },
    {
      question: "That’s the office <u>____</u> my dad works.",
      a: "who",
      b: "where",
      c: "that",
      d: "which",
      correct: "b"
    },
    {
      question: "The studio lights went out while the footballer <u>____</u>.",
      a: "had been interviewed",
      b: "was interviewed",
      c: "was being interviewed",
      d: "was interviewing",
      correct: "c"
    },
    {
      question: "Last Tuesday the company told Ruth that they’d emailed her the job details the <u>____</u> day.",
      a: "last",
      b: "before",
      c: "previous",
      d: "earlier",
      correct: "c"
    },
    {
      question: "I must remember <u>____</u> Ed to take notes for me while I’m away next week.",
      a: "ask",
      b: "to ask",
      c: "asking",
      d: "for asking",
      correct: "b"
    },
    {
      question: "If I’d gone to the sales yesterday, I <u>____</u> one of those cheap bags before they sold out.",
      a: "could have bought",
      b: "had bought",
      c: "would buy",
      d: "bought",
      correct: "a"
    },
  ];

  const answerElms = document.querySelectorAll('.quiz__answer');

  const quizBoxHeader = document.querySelector('.quiz__box-header');
  const questionEl = document.querySelector('.quiz__question');
  const answerA = document.querySelector('.quiz__text-a');
  const answerB = document.querySelector('.quiz__text-b');
  const answerC = document.querySelector('.quiz__text-c');
  const answerD = document.querySelector('.quiz__text-d');
  const submitButton = document.querySelector('.quiz__btn');
  const quizPagination = document.querySelector('.quiz__pagination');
  const quizCloseCross = document.querySelector('.quiz__close-cross');
  const quizCloseButton = document.querySelector('.quiz__close-btn');
  const quizStartButton = document.querySelector('.header__btn');
  const quizContent = document.querySelector('.quiz');

  let currentQuiz = 0;
  let score = 0;

  loadQuiz();

  function loadQuiz() {
    deselectAnswers();

    quizPagination.textContent = `${currentQuiz + 1}/50`;

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerHTML = currentQuizData.question;
    answerA.textContent = currentQuizData.a;
    answerB.textContent = currentQuizData.b;
    answerC.textContent = currentQuizData.c;
    answerD.textContent = currentQuizData.d;
  }

  function getSelected() {
    let answer;

    answerElms.forEach(answerElm => {
      if (answerElm.checked) {
        answer = answerElm.getAttribute('class').substring(26);
      }
    });

    return answer;
  }

  function deselectAnswers() {
    answerElms.forEach(answerElm => {
      answerElm.checked = false;
    });
  }

  function changeButtonsStyle() {
    submitButton.style.cssText = `
      display: none;
     `;
    quizCloseButton.style.cssText = `
      display: block;
      `;
  }

  function getScore(result) {
    if (result >= 0 && result <= 20) {
      quizBoxHeader.innerHTML = `
        <h2 style="text-align: center; padding: 20px;">Ваш результат ${result} из 50 <br>
        Рекомендуемый уровень: Elementary</h2>
        `;
        changeButtonsStyle();
    } else if (result >= 21 && result <= 30) {
      quizBoxHeader.innerHTML = `
        <h2 style="text-align: center; padding: 20px;">Ваш результат ${result} из 50 <br>
        Рекомендуемый уровень: Pre-Intermediate</h2>
        `;
        changeButtonsStyle();
    } else if (result >= 31 && result <= 40) {
      quizBoxHeader.innerHTML = `
        <h2 style="text-align: center; padding: 20px;">Ваш результат ${result} из 50 <br>
        Рекомендуемый уровень: Intermediate</h2>
        `;
        changeButtonsStyle();
    } else if (result >= 41 && result <= 50) {
      quizBoxHeader.innerHTML = `
        <h2 style="text-align: center; padding: 20px;">Ваш результат ${result} из 50 <br>
        Рекомендуемый уровень: Upper-Intermediate</h2>
        `;
        changeButtonsStyle();
    }
  }

  submitButton.addEventListener('click', () => {

    const answer = getSelected();

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

  quizStartButton.addEventListener('click', () => {
    quizContent.classList.add('quiz--open');
    document.body.classList.add('quiz--lock');
  });

  quizCloseCross.addEventListener('click', () => {
    quizContent.classList.remove('quiz--open');
    document.body.classList.remove('quiz--lock');
    location.reload();
  });

  quizCloseButton.addEventListener('click', () => {
    quizContent.classList.remove('quiz--open');
    document.body.classList.remove('quiz--lock');
    location.reload();
  });

});
