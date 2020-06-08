var questions = {};

questions.q1 = {};
questions.q1.question = "Which of these is the letter a";
questions.q1.choices = {};
questions.q1.choices.a = "a";
questions.q1.choices.b = "b";
questions.q1.choices.c = "c";
questions.q1.choices.d = "d";
questions.q1.answer = "a";

questions.q2 = {};
questions.q2.question = "Which of these is the letter b";
questions.q2.choices = {};
questions.q2.choices.a = "a";
questions.q2.choices.b = "b";
questions.q2.choices.c = "c";
questions.q2.choices.d = "d";
questions.q2.answer = "b";

questions.q3 = {};
questions.q3.question = "Which of these is the letter c";
questions.q3.choices = {};
questions.q3.choices.a = "a";
questions.q3.choices.b = "b";
questions.q3.choices.c = "c";
questions.q3.choices.d = "d";
questions.q3.answer = "c";

questions.q4 = {};
questions.q4.question = "Which of these is the letter d";
questions.q4.choices = {};
questions.q4.choices.a = "a";
questions.q4.choices.b = "b";
questions.q4.choices.c = "c";
questions.q4.choices.d = "d";
questions.q4.answer = "d";

var start_card = document.getElementById("start_card");
var question_card = document.getElementById("question_card");
var question_text = document.getElementById("question_text");
var answer_a = document.getElementById("answer_a");
var answer_b = document.getElementById("answer_b");
var answer_c = document.getElementById("answer_c");
var answer_d = document.getElementById("answer_d");
var complete_card = document.getElementById("complete_card");
var response = document.getElementById("response");
var timerEl = document.getElementById("timer");

var index = 1;
var score = 0;
var timer = 60;
var question_box = document.querySelector(".question_box");

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

function renderResponse(res) {
    if (res === "Correct!") {
        response.style.color = "green";
    } else {
        response.style.color = "red";
    }
    response.textContent = res;
    setTimeout(function() {response.textContent = "";}, 500);
}


function renderQuestion(num) {
    // response.textContent = "";
    var current_question = questions["q"+num]
    question_text.textContent = current_question.question;
    answer_a.textContent = current_question.choices.a;
    answer_b.textContent = current_question.choices.b;
    answer_c.textContent = current_question.choices.c;
    answer_d.textContent = current_question.choices.d;
}

function renderComplete() {
    question_card.style.display = "none";
    complete_card.style.display = "block";
    var scoreEl = document.getElementById("score");
    scoreEl.textContent = score;
}


var start_button = document.getElementById("start_button");

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

var submit_btn = document.getElementsByClassName("submit_btn")[0];
var initials = document.getElementById("initials");

submit_btn.addEventListener("click", function(event) {
    event.preventDefault();
    var player_name = initials.value;
    initials.value = "";
    player_score = score;
    submitHighscore(player_name, player_score);
    renderHighscores();
    index ++;
})

function submitHighscore(name, score) {
    var entry = [name, score];
    highscores.push(entry);
}

var back_btn = document.getElementById("back_btn"); 
var clear_btn = document.getElementById("clear_btn"); 
var header = document.getElementById("header");
var main = document.getElementById("main");
var highscoresEl = document.getElementById("highscores");
var highscores = [["MU",100],["AGU", 100]];
var score_list = document.getElementById("score_list");

function renderHighscores() {
    header.style.display = "none";
    main.style.display = "none";
    highscoresEl.style.display = "flex";
    // clear out existing children of highscore
    score_list.innerHTML = "";

    for (i=0; i<highscores.length; i++) {
        var entry = document.createElement("div");
        entry.textContent = ((i+1)+". "+highscores[i][0]+" - "+highscores[i][1]);
        score_list.appendChild(entry);
        
    }
}

function clearHighscores() {
    highscores = [];
    renderHighscores()
}

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

back_btn.addEventListener("click", function() {
    event.preventDefault();
    startOver();
})

clear_btn.addEventListener("click", function(event) {
    event.preventDefault();
    clearHighscores();
})


// make sure "view highscores works"
// fix css on submit page
// refactor code for more intuitive feel

var nav_link_scores = document.getElementById("high_scores");
nav_link_scores.addEventListener("click", function() {
    renderHighscores();
})