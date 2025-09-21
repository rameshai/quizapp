// Question Pool: Java + Python + MySQL
const questionPool = [
  // Java Questions
  { question: "Which keyword is used to inherit a class in Java?", options: ["this", "super", "extends", "implements"], answer: "extends" },
  { question: "Which of these is not a Java primitive type?", options: ["int", "float", "boolean", "string"], answer: "string" },
  { question: "What is the default value of a boolean variable in Java?", options: ["true", "false", "0", "null"], answer: "false" },
  { question: "Which method is the entry point of a Java program?", options: ["start()", "main()", "run()", "execute()"], answer: "main()" },
  { question: "Which keyword is used to prevent inheritance in Java?", options: ["static", "final", "const", "private"], answer: "final" },
  { question: "Which of the following is not an OOP concept in Java?", options: ["Encapsulation", "Polymorphism", "Compilation", "Inheritance"], answer: "Compilation" },
  { question: "Which collection class allows key-value pairs and does not allow duplicate keys?", options: ["List", "Set", "Map", "Queue"], answer: "Map" },
  { question: "Which exception is thrown when a null object is accessed?", options: ["IOException", "NullPointerException", "ClassNotFoundException", "RuntimeException"], answer: "NullPointerException" },
  { question: "Which package is imported by default in Java?", options: ["java.util", "java.lang", "java.io", "java.sql"], answer: "java.lang" },
  { question: "Which operator is used for object comparison in Java?", options: ["==", "!=", "equals()", "="], answer: "equals()" },

  // Python Questions
  { question: "Which keyword is used to define a function in Python?", options: ["func", "def", "function", "define"], answer: "def" },
  { question: "Which of the following is a mutable data type in Python?", options: ["tuple", "list", "string", "int"], answer: "list" },
  { question: "What is the output of: print(2**3) in Python?", options: ["6", "8", "9", "23"], answer: "8" },
  { question: "Which symbol is used for comments in Python?", options: ["//", "#", "/* */", "<!-- -->"], answer: "#" },
  { question: "Which function returns the length of a list in Python?", options: ["count()", "length()", "size()", "len()"], answer: "len()" },
  { question: "What does the 'break' keyword do in Python loops?", options: ["Stops the loop", "Skips one iteration", "Exits the function", "Restarts the loop"], answer: "Stops the loop" },
  { question: "Which operator is used for floor division in Python?", options: ["/", "//", "%", "**"], answer: "//" },
  { question: "Which of the following is used to handle exceptions in Python?", options: ["try-except", "catch-throw", "error-handle", "do-catch"], answer: "try-except" },
  { question: "Which method adds an element to the end of a Python list?", options: ["append()", "add()", "insert()", "extend()"], answer: "append()" },
  { question: "Which keyword is used to create a class in Python?", options: ["class", "def", "object", "type"], answer: "class" },

  // MySQL Questions
  { question: "Which command is used to create a database in MySQL?", options: ["CREATE DATABASE", "CREATE DB", "NEW DATABASE", "MAKE DATABASE"], answer: "CREATE DATABASE" },
  { question: "Which command is used to delete a table in MySQL?", options: ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "TRUNCATE TABLE"], answer: "DROP TABLE" },
  { question: "Which statement is used to retrieve data from a MySQL table?", options: ["SELECT", "GET", "FETCH", "RETRIEVE"], answer: "SELECT" },
  { question: "Which keyword is used to sort query results in MySQL?", options: ["ORDER BY", "SORT BY", "GROUP BY", "ARRANGE BY"], answer: "ORDER BY" },
  { question: "Which datatype is used to store textual data in MySQL?", options: ["VARCHAR", "INT", "BOOLEAN", "DATE"], answer: "VARCHAR" },
  { question: "Which clause is used to filter rows in a SELECT query?", options: ["WHERE", "HAVING", "IF", "FILTER"], answer: "WHERE" },
  { question: "Which command is used to add a new row in MySQL?", options: ["INSERT INTO", "ADD ROW", "NEW ROW", "UPDATE"], answer: "INSERT INTO" },
  { question: "Which function is used to get the total number of rows in a table?", options: ["COUNT()", "SUM()", "TOTAL()", "NUMBER()"], answer: "COUNT()" },
  { question: "Which clause is used to combine rows from two tables?", options: ["JOIN", "MERGE", "UNION", "LINK"], answer: "JOIN" },
  { question: "Which command is used to change existing data in a table?", options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"], answer: "UPDATE" }
];

// DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const questionCounter = document.getElementById("question-counter");
const optionsContainer = document.getElementById("options");
const scoreText = document.getElementById("score-text");
const progressBar = document.getElementById("progress-bar");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Shuffle function (returns new array)
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Pick n random questions
function getRandomQuestions(num) {
  return shuffleArray(questionPool).slice(0, num);
}

// Start Quiz
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  resultScreen.style.display = "none";

  questions = getRandomQuestions(5); // pick 5 random questions
  currentQuestionIndex = 0;
  score = 0;
  progressBar.style.width = "0%";

  showQuestion();
}

// Show Question
function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  // Update progress bar
  progressBar.style.width = ((currentQuestionIndex) / questions.length) * 100 + "%";

  // Shuffle options
  let shuffledOptions = shuffleArray(currentQuestion.options);

  shuffledOptions.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    optionsContainer.appendChild(button);
  });
}

// Reset state
function resetState() {
  nextBtn.style.display = "none";
  optionsContainer.innerHTML = "";
}

// Select Answer
function selectAnswer(selectedBtn, correctAnswer) {
  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }

  Array.from(optionsContainer.children).forEach(button => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.style.backgroundColor = "#4CAF50";
    } else {
      button.style.backgroundColor = "#e74c3c";
    }
  });

  nextBtn.style.display = "block";
}

// Next Button
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Show Result
function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  progressBar.style.width = "100%";
  scoreText.textContent = `${score} / ${questions.length}`;
}
