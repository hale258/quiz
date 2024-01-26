const questions = [
    {
        question: "Who's That Pokemon?",
        imagePath:"image/rayquaza.png",
        answers: [
            {text: "Latios", correct: false},
            {text: "Latias", correct: false},
            {text: "Rayquaza", correct: true},
            {text: "Charizard", correct: false},
        ]
    },
    {
        question: "Who's That Pokemon?",
        imagePath:"image/raikou.png",
        answers: [
            {text: "Pikachu", correct: false},
            {text: "Zapdos", correct: false},
            {text: "Raikou", correct: true},
            {text: "Zekrom", correct: false},
        ]
    },
    {
        question: "Who's That Pokemon?",
        answers: [
            {text: "Suicune", correct: true},
            {text: "Articuno", correct: false},
            {text: "Blastoise", correct: false},
            {text: "Palkia", correct: false},
        ]
    },
    {
        question: "Who's That Pokemon?",
        answers: [
            {text: "Moltres", correct: false},
            {text: "Blaziken", correct: false},
            {text: "Groudon", correct: false},
            {text: "Reshiram", correct: true},
        ]
    },
    {
        question: "Who's That Pokemon?",
        answers: [
            {text: "Celebi", correct: false},
            {text: "Sceptile", correct: true},
            {text: "Virizion", correct: false},
            {text: "Bulbasaur", correct: false},
        ]
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-but");
const imageElement = document.getElementById("img");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    imageElement.src = currentQuestion.imagePath;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");  
        button.innerHTML = answer.text;
        button.classList.add("but");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
    }
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectBut = e.target
    const isCorrect = selectBut.dataset.correct === "true";
    if(isCorrect){
        selectBut.classList.add("correct");
        score++;
    }
    else{
        selectBut.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        } else{
            showScore();
        }
    }

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
