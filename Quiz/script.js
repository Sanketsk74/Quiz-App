const questions=[
    {
        question: "What is JavaScript?",
        answers:[
            {text:" JavaScript is a scripting language used to make the website interactive", correct:true},
            {text:"JavaScript is an assembly language used to make the website interactive", correct:false},
            {text:"JavaScript is a compiled language used to make the website interactive", correct:false},
            {text:"None of the mentioned", correct:false},
        ]
    },
    {
        question: " Which of the following is correct about JavaScript?",
        answers:[
            {text:" JavaScript is Assembly-language", correct:false},
            {text:" JavaScript is an Object-Oriented language", correct:false},
            {text:" JavaScript is an Object-Based language", correct:true},
            {text:"JavaScript is a High-level language", correct:false},
        ]
    },
    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        answers:[
            {text:"It is an ordered list of objects", correct:false},
            {text:"It is an ordered list of values", correct:true},
            {text:"It is an ordered list of string", correct:false},
            {text:"It is an ordered list of functions", correct:false},
        ]
    },
    {
        question: " Will the following JavaScript code work? <br>var js = (function(x) {return x*x;}(10));",
        answers:[
            {text:" Exception will be thrown", correct:false},
            {text:"Memory leak", correct:false},
            {text:" Error", correct:false},
            {text:" Yes, perfectly", correct:true},
        ]
    },
    {
        question: "Where is Client-side JavaScript code is embedded within HTML documents?",
        answers:[
            {text:"A URL that uses the special javascript:code", correct:false},
            {text:"A URL that uses the special javascript:protocol", correct:true},
            {text:"A URL that uses the special javascript:encoding", correct:false},
            {text:"A URL that uses the special javascript:stack", correct:false},
        ]
    },
    {
        question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
        answers:[
            {text:"Position", correct:false},
            {text:"Window", correct:true},
            {text:"Standard", correct:false},
            {text:"Location", correct:false},
        ]
    },
    {
        question: "Which of the following can be used to call a JavaScript Code Snippet?",
        answers:[
            {text:"Function/Method", correct:true},
            {text:"Preprocessor", correct:false},
            {text:"Triggering Event", correct:false},
            {text:" RMI", correct:false},
        ]
    },
    {
        question: " Which of the following scoping type does JavaScript use?",
        answers:[
            {text:" Sequential", correct:false},
            {text:"Segmental", correct:false},
            {text:"Lexical", correct:true},
            {text:"Literal", correct:false},
        ]
    },
    {
        question: "Why JavaScript Engine is needed?",
        answers:[
            {text:"Both Compiling & Interpreting the JavaScript", correct:false},
            {text:" Interpreting the JavaScript", correct:true},
            {text:"Compiling the JavaScript", correct:false},
            {text:"Parsing the javascript", correct:false},
        ]
    },
    {
        question: "Why event handlers is needed in JS?",
        answers:[
            {text:"Allows JavaScript code to alter the behaviour of windows", correct:true},
            {text:"Adds innerHTML page to the code", correct:false},
            {text:"Change the server location", correct:false},
            {text:"Performs handling of exceptions and occurrences", correct:false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next"
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion= questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " +currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}...!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
