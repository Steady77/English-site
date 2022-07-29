import { UI_ELEMENTS } from "./view";

export const quiz = () => {
  function getData() {
    fetch("../quizdata.json")
      .then((res) => res.json())
      .then((quizData) => {
        startQuiz(quizData);
      })
      .catch((err) => {
        console.error(err);
        openModal("Ошибка при загрузке данных. Попробуйте позже.");
      });
  }

  function startQuiz(quizData) {
    let currentQuestion = 0;
    let score = 0;

    loadQuestion();

    function loadQuestion() {
      showQuiz();
      deselectAnswers();

      UI_ELEMENTS.QUIZ_PAGINATION.textContent = `${currentQuestion + 1}/50`;

      const currentQuestionData = quizData[currentQuestion];

      UI_ELEMENTS.QUIZ_QUESTION.innerHTML = currentQuestionData.question;
      UI_ELEMENTS.QUIZ_ANSWER_A.textContent = currentQuestionData.a;
      UI_ELEMENTS.QUIZ_ANSWER_B.textContent = currentQuestionData.b;
      UI_ELEMENTS.QUIZ_ANSWER_C.textContent = currentQuestionData.c;
      UI_ELEMENTS.QUIZ_ANSWER_D.textContent = currentQuestionData.d;
    }

    function getSelectedAnswers() {
      let answer;

      UI_ELEMENTS.QUIZ_ANSWER_BUTTONS.forEach((btn) => {
        if (btn.checked) {
          answer = btn.classList.item(2);
        }
      });

      return answer;
    }

    function deselectAnswers() {
      UI_ELEMENTS.QUIZ_ANSWER_BUTTONS.forEach((btn) => {
        btn.checked = false;
      });
    }

    function toggleButton() {
      UI_ELEMENTS.QUIZ_NEXT_BUTTON.style.display = "none";
      UI_ELEMENTS.QUIZ_CLOSE_BUTTON.style.display = "block";
    }

    function showResultText(result, level) {
      UI_ELEMENTS.QUIZ_HEADER.innerHTML = `
      <h2 style="text-align: center; padding: 20px;">Ваш результат ${result} из 50 <br>
      Рекомендуемый уровень: ${level}</h2>
    `;
    }

    function getScore(result) {
      switch (true) {
        case result >= 0 && result <= 20:
          showResultText(result, "Elementary");
          toggleButton();
          break;
        case result >= 21 && result <= 30:
          showResultText(result, "Pre-Intermediate");
          toggleButton();
          break;
        case result >= 31 && result <= 40:
          showResultText(result, "Intermediate");
          toggleButton();
          break;
        case result >= 41 && result <= 50:
          showResultText(result, "Upper-Intermediate");
          toggleButton();
          break;
        default:
          break;
      }
    }

    function closeQuiz() {
      UI_ELEMENTS.QUIZ_CONTAINER.classList.remove("quiz--open");
      document.body.classList.remove("quiz--lock");
      location.reload();
    }

    function showQuiz() {
      UI_ELEMENTS.QUIZ_CONTAINER.classList.add("quiz--open");
      document.body.classList.add("quiz--lock");
    }

    UI_ELEMENTS.QUIZ_NEXT_BUTTON.addEventListener("click", () => {
      const answer = getSelectedAnswers();

      if (answer) {
        if (answer === quizData[currentQuestion].correct) {
          score++;
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
          loadQuestion();
        } else {
          getScore(score);
        }
      }
    });

    UI_ELEMENTS.QUIZ_CLOSE_CROSS.addEventListener("click", closeQuiz);
    UI_ELEMENTS.QUIZ_CLOSE_BUTTON.addEventListener("click", closeQuiz);
  }

  UI_ELEMENTS.QUIZ_START_BUTTON.addEventListener("click", getData);
};
