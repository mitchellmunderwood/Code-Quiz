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

var question_card = document.getElementById("question_card");
var question_text = document.getElementById("question_text");
var answer_a = document.getElementById("answer_a");
var answer_b = document.getElementById("answer_b");
var answer_c = document.getElementById("answer_c");
var answer_d = document.getElementById("answer_d");

var question_answer_selected = '';

var question_box = document.querySelector(".question_box");

question_box.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.matches("button")) {
        question_answer_selected = event.target.getAttribute("data");
    }
    console.log("user selected", question_answer_selected);
})

function renderQuestion(string) {
    var current_question = questions[string]
    question_text.textContent = current_question.question;
    answer_a.textContent = current_question.choices.a
    answer_b.textContent = current_question.choices.b
    answer_c.textContent = current_question.choices.c
    answer_d.textContent = current_question.choices.d
}



var start_button = document.getElementById("start_button");
var grade = 100;

start_button.addEventListener("click", function() {
    question_card.style.display = "block";
    renderQuestion("q1");
})


function takeQuiz() {
    question_list = ['q1','q2','q3','q4'];
    while


}