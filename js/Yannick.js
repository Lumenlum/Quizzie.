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
        question: 'Who captured Miquella during the battle of Aeonia?',
        choice1: 'Mohg, Lord of Blood',
        choice2: 'Godfrey, First Elden lord',
        choice3: 'Maliketh, the Black Blade',
        choice4: 'Morgott, the Elden King',
        answer: 1,
    },
    {
        question: 'What animal represents Godfrey, the first Elden Lord?',
        choice1: 'Stormhawk',
        choice2: 'Lion',
        choice3: 'Wolf',
        choice4: 'Dog(turtle)',
        answer: 2,
    },
    {
        question: 'Who stole a fragment of the Rune of Death?',
        choice1: 'Radagon of the Golden Order',
        choice2: 'Marika the Eternal',
        choice3: 'Rennala, Queen of the Full Moon',
        choice4: 'Ranni, Lunar Princess',
        answer: 4,
    },
    {
        question: 'What was the name of Godfrey`s elite group of soldiers?',
        choice1: 'The Black Blades',
        choice2: 'The Godskin',
        choice3: 'The Cruicible Knights',
        choice4: 'The Golden Order',
        answer: 3,
    },
    {
        question: 'Who shattered the Elden Ring?',
        choice1: 'Rennala, Queen of the Full Moon',
        choice2: 'Radagon, The Second Elden Lord',
        choice3: 'Marika, the Eternal',
        choice4: 'Godfrey, The First Elden Lord',
        answer: 3,
    },
    {
        question: 'Who challenged the Golden Order?',
        choice1: 'The Carian Royal Family',
        choice2: 'The Ancient Dragons and Northern Giants',
        choice3: 'The Storm Lord of Stormveil',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question: 'Why is Caelid covered in scarlet rot?',
        choice1: 'Malenia unleashed it upon the land during her battle against Radahn',
        choice2: 'Radahn accidentally unleashed it upon the land when returning from battle',
        choice3: 'Marika cursed the land after Radahn went to war against her',
        choice4: 'After The Shattering, rot began to consume Caelid without reasony',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 7

startGame = () => {
    questionCounter = 0
    score = 0
    availibleQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
if(availibleQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('../quiz/highscoreYannick.html')
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