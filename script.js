document.addEventListener("DOMContentLoaded", () => {

  const questions = [
    {
      question: "What time does work officially start?",
      answers: [
        { text: "8:00 AM", correct: false },
        { text: "9:00 AM", correct: true },
        { text: "10:00 AM", correct: false },
        { text: "7:30 AM", correct: false }
      ]
    },
    {
      question: "How long is the lunch break?",
      answers: [
        { text: "30 minutes", correct: false },
        { text: "45 minutes", correct: false },
        { text: "1 hour", correct: true },
        { text: "2 hours", correct: false }
      ]
    },
    {
      question: "What skill is most important for succeeding in your role?",
      answers: [
        { text: "Good communication", correct: true },
        { text: "Speed typing", correct: false },
        { text: "Excel mastery", correct: false },
        { text: "Coding", correct: false }
      ]
    },
    {
      question: "How do employees clock in or sign attendance?",
      answers: [
        { text: "Paper register", correct: false },
        { text: "Login portal", correct: false },
        { text: "Biometric keycard", correct: true },
        { text: "Calling HR", correct: false }
      ]
    },
    {
      question: "What is the dress code at your workplace?",
      answers: [
        { text: "Corporate", correct: false },
        { text: "Traditional", correct: false },
        { text: "Smart casual", correct: true },
        { text: "Anything goes", correct: false }
      ]
    },
    {
      question: "What is the company's preferred communication tool?",
      answers: [
        { text: "WhatsApp", correct: false },
        { text: "Slack", correct: false },
        { text: "Phone calls", correct: false },
        { text: "Email", correct: true }
      ]
    },
    {
      question: "What should you do if you need help with a task or project?",
      answers: [
        { text: "Ignore it", correct: false },
        { text: "Ask a supervisor or senior colleague", correct: true },
        { text: "Message HR", correct: false },
        { text: "Google it only", correct: false }
      ]
    },
    {
      question: "Which department helps you set up your work tools on your first day?",
      answers: [
        { text: "Admin", correct: false },
        { text: "Finance", correct: false },
        { text: "IT Department", correct: true },
        { text: "Security", correct: false }
      ]
    },
    {
      question: "Where do you submit requests for office supplies or equipment?",
      answers: [
        { text: "Security", correct: false },
        { text: "Your friend", correct: false },
        { text: "Admin Department", correct: true },
        { text: "Finance", correct: false }
      ]
    },
    {
      question: "Who do you contact if you have issues with your salary or payroll?",
      answers: [
        { text: "IT", correct: false },
        { text: "Admin", correct: false },
        { text: "HR Department", correct: true },
        { text: "Security", correct: false }
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
