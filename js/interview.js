const questions = {

    easy: [
        "What is HTML?",
        "What is CSS?",
        "What is JavaScript?"
    ],

    medium: [
        "Explain the DOM.",
        "What is Event Bubbling?",
        "Explain API Integration."
    ],

    hard: [
        "Explain Virtual DOM.",
        "Authentication vs Authorization?",
        "How does React State Management work?"
    ]
};

let currentQuestions = [];
let currentIndex = 0;
let totalScore = 0;

function startInterview() {

    const difficulty =
        document.getElementById("difficulty").value.toLowerCase();

    currentQuestions = questions[difficulty];

    currentIndex = 0;
    totalScore = 0;

    document.getElementById("question").innerText =
        currentQuestions[currentIndex];

    document.getElementById("feedback").innerText =
        "Answer the question and submit.";

    document.getElementById("answer").value = "";

    updateProgress();
}

function checkAnswer() {

    const answer =
        document.getElementById("answer").value;

    let score = 0;

    if(answer.length < 20){

        score = 3;

    }
    else if(answer.length < 60){

        score = 6;

    }
    else{

        score = 9;

    }

    totalScore += score;

    currentIndex++;

    updateProgress();

    document.getElementById("answer").value = "";

    if(currentIndex < currentQuestions.length){

        document.getElementById("question").innerText =
            currentQuestions[currentIndex];

        document.getElementById("feedback").innerText =
            `Question ${currentIndex} completed.`;

    }
    else{

        const finalScore =
            (totalScore / currentQuestions.length).toFixed(1);

        document.getElementById("question").innerText =
            "Interview Completed 🎉";

        document.getElementById("feedback").innerHTML =
            `
            Final Score: ${finalScore}/10
            <br><br>
            Great job completing the interview.
            `;

        document.getElementById("progress-fill").style.width =
            "100%";
    }
}

function updateProgress(){

    const total = currentQuestions.length;

    if(total === 0){
        return;
    }

    const percentage =
        (currentIndex / total) * 100;

    document.getElementById("question-count").innerText =
        `Question ${Math.min(currentIndex + 1, total)}/${total}`;

    document.getElementById("current-score").innerText =
        `Score: ${totalScore}`;

    document.getElementById("progress-fill").style.width =
        percentage + "%";
}

function restartInterview(){

    currentQuestions = [];
    currentIndex = 0;
    totalScore = 0;

    document.getElementById("question").innerText =
        "Your interview question will appear here.";

    document.getElementById("feedback").innerText =
        "Feedback and score will appear here.";

    document.getElementById("answer").value = "";

    document.getElementById("question-count").innerText =
        "Question 0/0";

    document.getElementById("current-score").innerText =
        "Score: 0";

    document.getElementById("progress-fill").style.width =
        "0%";
}