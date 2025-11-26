 // ===== QUIZ DATA ===== //
const questions = [
  {
    question: "What time does work officially start?",
    options: ["8:00 AM", "9:00 AM", "10:00 AM", "7:30 AM"],
    answer: 1
  },
  {
    question: "How long is the lunch break?",
    options: ["30 minutes", "45 minutes", "1 hour", "2 hours"],
    answer: 2
  },
  {
    question: "What skill is most important for succeeding in your role?",
    options: ["Good communication", "Speed typing", "Excel mastery", "Coding"],
    answer: 0
  },
  {
    question: "How do employees clock in or sign attendance?",
    options: ["Paper register", "Login portal", "Biometric keycard", "Calling HR"],
    answer: 2
  },
  {
    question: "What is the dress code at your workplace?",
    options: ["Corporate", "Traditional", "Smart casual", "Anything goes"],
    answer: 2
  },
  {
    question: "What is the company's preferred communication tool?",
    options: ["WhatsApp", "Slack", "Phone calls", "Email"],
    answer: 3
  },
  {
    question: "What should you do if you need help with a task or project?",
    options: ["Ignore it", "Ask a supervisor or senior colleague", "Message HR", "Google it only"],
    answer: 1
  },
  {
    question: "Which department helps you set up your work tools on your first day?",
    options: ["Admin", "Finance", "IT Department", "Security"],
    answer: 2
  },
  {
    question: "Where do you submit requests for office supplies or equipment?",
    options: ["Security", "Your friend", "Admin Department", "Finance"],
    answer: 2
  },
  {
    question: "Who do you contact if you have issues with your salary or payroll?",
    options: ["IT", "Admin", "HR Department", "Security"],
    answer: 2
  }
];

// ===== DOM ELEMENTS ===== //
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

// ===== QUIZ LOGIC ===== //
let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  const current = questions[currentIndex];

  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => selectAnswer(index);
    optionsEl.appendChild(btn);
  });
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function selectAnswer(index) {
  const correct = questions[currentIndex].answer;

  if (index === correct) score++;

  nextQuestion();
}

function nextQuestion() {
  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
    startTimer();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById("quiz-container").style.display = "none";
  resultEl.style.display = "block";

  resultEl.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} / ${questions.length}</p>
  `;
}

startQuiz();
