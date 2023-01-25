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
        question: 'What is the first name of the main character?',
        choice1: 'John',
        choice2: 'Arthur',
        choice3: 'Dutch',
        choice4: 'Micah',
        answer: 2,
    },
    {
        question: 'What is the near city to basecamp?',
        choice1: 'Annesburg',
        choice2: 'Saint denis',
        choice3: 'Valentine',
        choice4: 'Rhodes',
        answer: 3,
    },
    {
        question: 'what is the biggest city in rdr2?',
        choice1: 'Van Horn',
        choice2: 'Rhodes',
        choice3: 'Blackwater',
        choice4: 'Saint Denis',
        answer: 4,
    },
    {
        question: 'where does the gang your in originally come from?',
        choice1: 'Valentine',
        choice2: 'Strawbery',
        choice3: 'Blackwater',
        choice4: 'Armadillo',
        answer: 3,
    },
    {
        question: 'where in de map do you start with the story?',
        choice1: 'North',
        choice2: 'East',
        choice3: 'South',
        choice4: 'West',
        answer: 1,
    },
    {
        question: 'What is the rarest horse?',
        choice1: 'White Coat Arabian',
        choice2: 'Gold Coat Turkoman',
        choice3: 'Brindle Coat Thoroughbred',
        choice4: 'Silver Dapple Pinto Coat Missouri Fox Trotter',
        answer: 1,
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: 3,
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: 4,
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: 2,
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: 4,
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

    return window.location.assign('../quiz/highscoreJesse.html')
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
scoretext.innerText = score

}

startGame()