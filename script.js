// --------------------------------------------------
// Variables and Element Objects
// --------------------------------------------------

// Basic HTML objects
var header = document.getElementById("header");
var main = document.getElementById("main");

// Header Objects
var timerEl = document.getElementById("timer");
var nav_link_scores = document.getElementById("high_scores");

// Start Card Objects
var start_card = document.getElementById("start_card");
var start_button = document.getElementById("start_button");

// Questions Card Objects
var question_card = document.getElementById("question_card");
var question_text = document.getElementById("question_text");
var question_box = document.querySelector(".question_box");
var answer_a = document.getElementById("answer_a");
var answer_b = document.getElementById("answer_b");
var answer_c = document.getElementById("answer_c");
var answer_d = document.getElementById("answer_d");
var response = document.getElementById("response");

// Completion Card Objects
var complete_card = document.getElementById("complete_card");
var scoreEl = document.getElementById("score");
var initials = document.getElementById("initials");
var submit_btn = document.getElementsByClassName("submit_btn")[0];

// Highscore Card Objects
var highscoresEl = document.getElementById("highscores");
var highscores = [["MU",100]];
var score_list = document.getElementById("score_list");
var clear_btn = document.getElementById("clear_btn"); 
var back_btn = document.getElementById("back_btn"); 

// Backend Variables
var index = 1;
var score = 0;
var timer = 60;

// --------------------------------------------------
// Functions
// --------------------------------------------------

// function to render the given question based on index value
function renderQuestion(num) {
    var current_question = questions["q"+num]
    question_text.textContent = current_question.question;
    answer_a.textContent = current_question.choices.a;
    answer_b.textContent = current_question.choices.b;
    answer_c.textContent = current_question.choices.c;
    answer_d.textContent = current_question.choices.d;
}

// function to temporarily show answer to previous question
function renderResponse(res) {
    if (res === "Correct!") {
        response.style.color = "green";
    } else {
        response.style.color = "red";
    }
    response.textContent = res;
    setTimeout(function() {response.textContent = "";}, 400);
}

// render the completed quiz card at the end of the questions
function renderComplete() {
    question_card.style.display = "none";
    complete_card.style.display = "block";
    scoreEl.textContent = score;
}

// render the high scores in the HTML based on the variable
function renderHighscores() {
    header.style.display = "none";
    main.style.display = "none";
    highscoresEl.style.display = "flex";
    score_list.innerHTML = "";
    for (i=0; i<highscores.length; i++) {
        var entry = document.createElement("div");
        entry.textContent = ((i+1)+". "+highscores[i][0]+" - "+highscores[i][1]);
        score_list.appendChild(entry);
    }
}

// function to submit highscore to highscore array
function submitHighscore(name, score) {
    var entry = [name, score];
    highscores.push(entry);
}

// function to clear highscores
function clearHighscores() {
    highscores = [];
    renderHighscores()
}

// function to restart the quiz after seeing the highscore card
function startOver() {
    header.style.display = "block";
    main.style.display = "block";
    highscoresEl.style.display = "none";
    complete_card.style.display = "none";
    if (index === 6) {
        start_card.style.display = "block";
        index = 1;
        timer = 60;
        score = 0;
    }
    if (index === 5) {
        complete_card.style.display = "block"; 
    } else {
        question_card.display = "block";
    }
}

// --------------------------------------------------
// Event Listeners
// --------------------------------------------------

// start button to set off the quiz
start_button.addEventListener("click", function() {
    var time = setInterval(function() {
        timerEl.textContent = timer;
        timer -= 1;
        if (timer < 0 || index > 4) {
            clearInterval(time);
            timerEl.textContent = 0;
            renderComplete();    
        }
    }, 1000);
    start_card.style.display = "none";
    question_card.style.display = "block";
    renderQuestion(1);
})

// listener to advance the quiz to different questions as they are answered
question_box.addEventListener("click", function(event) {
    event.preventDefault();
    var answer_selected = '';
    var correct_answer = questions["q"+index].answer;
    if (event.target.matches("button")) {
        answer_selected = event.target.getAttribute("data");
    }
    index++;
    if (answer_selected === correct_answer) {
        score += 25; 
        renderResponse("Correct!");
       
    } else {
        renderResponse("Incorrect!");
        timer -= 5;
    }
    if (index > 4) {
        renderComplete();
    } else {
        renderQuestion(index);
    }
    
})

// listener to submit scores after quiz and render highscore card
submit_btn.addEventListener("click", function(event) {
    event.preventDefault();
    var player_name = initials.value;
    initials.value = "";
    player_score = score;
    submitHighscore(player_name, player_score);
    renderHighscores();
    index ++;
})

// back button listener on highscore card
back_btn.addEventListener("click", function() {
    event.preventDefault();
    startOver();
})

// listener to clear highscores
clear_btn.addEventListener("click", function(event) {
    event.preventDefault();
    clearHighscores();
})

// add listener to 'view highscore' link on header
nav_link_scores.addEventListener("click", function() {
    renderHighscores();
})

// --------------------------------------------------
// Questions in the Quiz
// --------------------------------------------------

// question object
var questions = {};

// question 1
questions.q1 = {};
questions.q1.question = "Which of these is a primitive in JS";
questions.q1.choices = {};
questions.q1.choices.a = "Array";
questions.q1.choices.b = "Class";
questions.q1.choices.c = "Object";
questions.q1.choices.d = "Boolean";
questions.q1.answer = "d";

// question 2
questions.q2 = {};
questions.q2.question = "What character is used to designate the end of expresssions in JS";
questions.q2.choices = {};
questions.q2.choices.a = "!";
questions.q2.choices.b = "$";
questions.q2.choices.c = "*";
questions.q2.choices.d = ";";
questions.q2.answer = "d";

// question 3
questions.q3 = {};
questions.q3.question = "What type of inheritance does JS have";
questions.q3.choices = {};
questions.q3.choices.a = "Estate";
questions.q3.choices.b = "Class";
questions.q3.choices.c = "Prototype";
questions.q3.choices.d = "Legal";
questions.q3.answer = "c";

// question 4
questions.q4 = {};
questions.q4.question = "Which of these is the name of the JS engine used in Chrome";
questions.q4.choices = {};
questions.q4.choices.a = "V8";
questions.q4.choices.b = "12 Stroke";
questions.q4.choices.c = "Caffeine High";
questions.q4.choices.d = "JavaTime";
questions.q4.answer = "a";

// --------------------------------------------------
// End
// --------------------------------------------------