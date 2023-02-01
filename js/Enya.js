const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progresstext = document.querySelector('#progresstext');
const scoretext = document.querySelector('#score');
const progressbarfull = document.querySelector('#progressbarfull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availibleQuestions = 0

let questions = [
    {
        question: 'Where did Odin throw hes foes',
        choice1: 'tenth world',
        choice2: 'Valhallah',
        choice3: 'hel',
        choice4: 'asgard',
        answer: 1,
    },
    {
        question: 'what did Odin sent to Midgard',
        choice1: 'Lion',
        choice2: 'Wolf',
        choice3: 'Valkyries',
        choice4: 'Horse',
        answer: 3,
    },
    {
        question: 'what did Odin search for?',
        choice1: 'his enemies',
        choice2: 'warriors',
        choice3: 'a god',
        choice4: 'information',
        answer: 2,
    },

]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availibleQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
if(availibleQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('../quiz/highscoreEnya.html')
}

questionCounter++
progresstext.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressbarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%` 

const questionsIndex = Math.floor(Math.random() * availibleQuestions.length)
currentQuestion = availibleQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText =currentQuestion['choice' + number]
})

availibleQuestions.splice(questionsIndex, 1)

acceptingAnswers = true
}   

choices.forEach(choice => {
choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']
    
    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct') {
        incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
    }, 1000)
})
})

incrementScore = num => {
score +=num
scoretext.innerText = score;
localStorage.setItem("EnyaScore", score);
}

startGame()