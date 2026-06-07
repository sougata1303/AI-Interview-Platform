const questionBank = [
    {
        question: "What is 25 + 15?",
        answer: "40"
    },
    {
        question: "What is 12 × 5?",
        answer: "60"
    },
    {
        question: "What is 100 ÷ 4?",
        answer: "25"
    },
    {
        question: "What is 18 + 27?",
        answer: "45"
    },
    {
        question: "What is 9 × 7?",
        answer: "63"
    }
];

let currentIndex = 0;
let score = 0;
let selectedQuestions = [];

/* ================= START EXAM ================= */
function generateExam() {

    currentIndex = 0;
    score = 0;

    selectedQuestions = questionBank
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    showQuestion();
    updateUI();
}

/* ================= SHOW QUESTION ================= */
function showQuestion() {

    document.getElementById("question").innerText =
        selectedQuestions[currentIndex].question;

    document.getElementById("answer").value = "";

    document.getElementById("feedback").innerText =
        "Solve the question carefully.";
}

/* ================= SUBMIT ANSWER ================= */
function submitAnswer() {

    const userAnswer = document
        .getElementById("answer")
        .value
        .trim();

    const correctAnswer =
        selectedQuestions[currentIndex].answer;

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").innerHTML =
            "✅ Correct Answer";
    } else {
        document.getElementById("feedback").innerHTML =
            `❌ Wrong Answer. Correct: ${correctAnswer}`;
    }

    currentIndex++;

    updateUI();

    if (currentIndex < selectedQuestions.length) {
        setTimeout(showQuestion, 700);
    } else {
        setTimeout(showResult, 700);
    }
}

/* ================= UPDATE UI ================= */
function updateUI() {

    if (selectedQuestions.length === 0) return;

    const total = selectedQuestions.length;

    document.getElementById("question-count").innerText =
        `Question ${Math.min(currentIndex + 1, total)}/${total}`;

    document.getElementById("current-score").innerText =
        `Score: ${score}`;

    const percent = (currentIndex / total) * 100;

    document.getElementById("progress-fill").style.width =
        percent + "%";
}

/* ================= SHOW RESULT ================= */
function showResult() {

    document.getElementById("question").innerText =
        "🎉 Exam Completed";

    document.getElementById("feedback").innerHTML =
        `
        Final Score: ${score} / ${selectedQuestions.length}
        <br><br>
        ${score >= 3 ? "🎯 Great Performance" : "📚 Need More Practice"}
        `;

    document.getElementById("progress-fill").style.width = "100%";
}

/* ================= RESTART EXAM (FIXED) ================= */
function restartExam() {

    currentIndex = 0;
    score = 0;
    selectedQuestions = [];

    document.getElementById("question").innerText =
        "Click Start Exam to begin.";

    document.getElementById("answer").value = "";

    document.getElementById("feedback").innerText =
        "Result will appear here.";

    document.getElementById("question-count").innerText =
        "Question 0/0";

    document.getElementById("current-score").innerText =
        "Score: 0";

    document.getElementById("progress-fill").style.width =
        "0%";
}