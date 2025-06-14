const quizData = [
  {
    question: "Which language is used for web apps?",
    type: "single",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "Select all frontend technologies:",
    type: "multi",
    options: ["HTML", "CSS", "SQL", "JavaScript"],
    answer: ["HTML", "CSS", "JavaScript"]
  },
  {
    question: "Fill in the blank: CSS stands for ____ Style Sheets.",
    type: "fill",
    answer: "Cascading"
  }
];

const quizEl = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
  const q = quizData[currentQuiz];
  let output = `<div class="question"><h3>${q.question}</h3>`;

  if (q.type === "single") {
    output += '<div class="options">';
    q.options.forEach(option => {
      output += `<label><input type="radio" name="answer" value="${option}"/> ${option}</label>`;
    });
    output += '</div>';
  } else if (q.type === "multi") {
    output += '<div class="options">';
    q.options.forEach(option => {
      output += `<label><input type="checkbox" name="multi-answer" value="${option}"/> ${option}</label>`;
    });
    output += '</div>';
  } else if (q.type === "fill") {
    output += `<input type="text" id="fill-answer" placeholder="Your answer here" />`;
  }

  output += '</div>';
  quizEl.innerHTML = output;
}

function getAnswer() {
  const q = quizData[currentQuiz];

  if (q.type === "single") {
    const selected = document.querySelector('input[name="answer"]:checked');
    return selected ? selected.value : null;

  } else if (q.type === "multi") {
    return [...document.querySelectorAll('input[name="multi-answer"]:checked')].map(input => input.value);

  } else if (q.type === "fill") {
    return document.getElementById("fill-answer").value.trim();
  }
}

function checkAnswer(answer) {
  const correct = quizData[currentQuiz].answer;

  if (Array.isArray(correct)) {
    return answer.length === correct.length && answer.every(val => correct.includes(val));
  }

  return answer.toLowerCase() === correct.toLowerCase();
}

submitBtn.addEventListener("click", () => {
  const userAnswer = getAnswer();

  if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
    alert("Please select or enter your answer.");
    return;
  }

  if (checkAnswer(userAnswer)) {
    score++;
  }

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    quizEl.innerHTML = "";
    submitBtn.style.display = "none";
    // resultEl.innerHTML = `🎉 You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>`;
    if (score === quizData.length) {
      resultEl.innerHTML = `<p>🎉 Perfect Score! You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong></p>`;
    }
    else if (score >= quizData.length / 2) {
      resultEl.innerHTML = `<p>👍 Good Job! You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong></p>`;
    } else {
      resultEl.innerHTML = `<p>😞 Better Luck Next Time! You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong></p>`;
    }
  }
});

loadQuiz();
