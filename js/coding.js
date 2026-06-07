const codingQuestions = {

    easy: [
        "Write a program to print Hello World.",
        "Write a program to add two numbers."
    ],

    medium: [
        "Write a program to reverse a string.",
        "Find the largest number in an array."
    ],

    hard: [
        "Implement Binary Search.",
        "Find the longest substring without repeating characters."
    ]
};

function generateQuestion(){

    const difficulty =
        document.getElementById("difficulty")
        .value
        .toLowerCase();

    const questionList =
        codingQuestions[difficulty];

    const randomQuestion =
        questionList[
            Math.floor(Math.random() * questionList.length)
        ];

    document.getElementById("question").innerText =
        randomQuestion;
}

function checkCode(){

    const code =
        document.getElementById("code").value;

    if(code.length < 30){

        document.getElementById("feedback").innerHTML =
            "Solution too short. Try again.";
    }
    else{

        document.getElementById("feedback").innerHTML =
            "Good attempt. Code submitted successfully.";
    }
}