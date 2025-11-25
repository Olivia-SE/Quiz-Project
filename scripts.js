  document.addEventListener("DOMContentLoaded", () => {

  const questions = [
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Hyperlinks Text Modern Language", correct: false },
        { text: "Home Tool Markup Language", correct: false },
        { text: "Hyper Trainer Marking Language", correct: false }
      ]
    },
    {
      question: "Which language is used to style web pages?",
      answers: [
        { text: "HTML", correct: false },
        { text: "Python", correct: false },
        { text: "CSS", correct: true },
        { text: "Java", correct: false }
      ]
    },
    {
      question: "Which language adds interactivity to a website?",
      answers: [
        { text: "CSS", correct: false },
        { text: "JavaScript", correct: true },
        { text: "PHP", correct: false },
        { text: "SQL", correct: false }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Creative Style System", correct: false },
        { text: "Computer Styling Structure", correct: false },
        { text: "Colorful Style Sheet", correct: false }
      ]
    },
    {
      question: "What does console.log() do in JavaScript?",
      answers: [
        { text: "Prints output to the browser console", correct: true },
        { text: "Shows a popup alert", correct: false },
        { text: "Writes HTML", correct: false },
        { text: "Refreshes the page", correct: false }
      ]
    },
    {
      question: "Which symbol is used for comments in CSS?",
      answers: [
        { text: "/* comment */", correct: true },
        { text: "// comment", correct: false },
        { text: "<!-- comment -->", correct: false },
        { text: "# comment", correct: false }
      ]
    },
    {
      question: "In CSS, which property controls text size?",
      answers: [
        { text: "font-size", correct: true },
        { text: "text-size", correct: false },
        { text: "size", correct: false },
        { text: "font-style", correct: false }
      ]
    },
    {
      question: "What does DOM stand for?",
      answers: [
        { text: "Document Object Model", correct: true },
        { text: "Data Object Mode", correct: false },
        { text: "Document Order Machine", correct: false },
        { text: "Desktop Object Module", correct: false }
      ]
    },
    {
      question: "Which method selects an element by its ID?",
      answers: [
        { text: "document.getElementById()", correct: true },
        { text: "document.id()", correct: false },
        { text: "document.select()", correct: false },
        { text: "$('#id')", correct: false }
      ]
    },
    {
      question: "Which CSS property adds space INSIDE an element?",
      answers: [
        { text: "padding", correct: true },
        { text: "margin", correct: false },
        { text: "border", correct: false },
        { text: "gap", correct: false }
      ]
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 15;
  let timer;

  const progress = document.getElementById("progress");
  const timeDisplay = document.getElementById("time");
  const questionElement = document.getElementById("question");
  const answersContainer = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");
  const scoreContainer = document.getElementById("score-container");
  const scoreDisplay = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    nextBtn.classList.add("hidden");
    showQuestion();
  }

  function startTimer() {
    timeLeft = 15;
    timeDisplay.textContent = timeLeft;

    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        autoFail();
      }
    }, 1000);
  }

  function autoFail() {
    const allButtons = answersContainer.querySelectorAll("button");
    allButtons.forEach(btn => btn.disabled = true);
    nextBtn.classList.remove("hidden");
  }

  function updateProgress() {
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progress.style.width = progressPercent + "%";
  }

  function showQuestion() {
    answersContainer.innerHTML = "";
    nextBtn.classList.add("hidden");

    updateProgress();
    startTimer();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.addEventListener("click", () =>
        selectAnswer(button, answer.correct)
      );
      answersContainer.appendChild(button);
    });
  }

  function selectAnswer(button, correct) {
    const allButtons = answersContainer.querySelectorAll("button");
    allButtons.forEach(btn => btn.disabled = true);

    clearInterval(timer);

    if (correct) {
      button.classList.add("correct");
      score++;
    } else {
      button.classList.add("wrong");
    }

    nextBtn.classList.remove("hidden");
  }

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) showQuestion();
    else endQuiz();
  });

  function endQuiz() {
    document.getElementById("quiz-container").classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} / ${questions.length}`;
    progress.style.width = "100%";
    clearInterval(timer);
  }

  restartBtn.addEventListener("click", startQuiz);

  startQuiz();

});
