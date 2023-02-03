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
        question: 'When Odin the Allfather created Valheim, which number world was it?',
        choice1: 'The tenth',
        choice2: 'The eight',
        choice3: 'The thirth',
        choice4: 'The fifth',
        answer: 1,
        imgSrc: '../img/mogh.gif',
    },
    {
        question: 'What did Odin sent to Midgard',
        choice1: 'Lion',
        choice2: 'Wolf',
        choice3: 'Valkyries',
        choice4: 'Horse',
        answer: 3,
    },
    {
        question: 'What did Odin search for?',
        choice1: 'his enemies',
        choice2: 'warriors',
        choice3: 'a god',
        choice4: 'information',
        answer: 2,
    },
    {
        question: 'There are five bosses to defeat across the world of Valheim, but which is the third?',
        choice1: 'Bonemass',
        choice2: 'The Elder',
        choice3: 'Moder',
        choice4: 'Eikthyr',
        answer: 1,
    },
    {
        question: 'There are many tombstones scattered around Valheim that feature messages written by Vikings of the past. Who is the "Shieldmaiden of the forest"?',
        choice1: 'Helga',
        choice2: 'Astrid',
        choice3: 'Lagertha',
        choice4: 'Torvi',
        answer: 2,
    },
    {
        question: 'What is the name of the other warrior who has left tombstone messages scattered around Valheim?',
        choice1: 'Ragnar',
        choice2: 'Floki',
        choice3: 'Ulf',
        choice4: 'Bjorn',
        answer: 3,
    },
    {
        question: 'True or False: An Artisan Table is required for a Windmill to function.',
        choice1: 'True',
        choice2: 'False',
        answer: 2,
    },
    {
        question: 'A Dragon Egg can be carried through a portal: True or False?',
        choice1: 'True',
        choice2: 'False',
        answer: 2,
    },
    {
        question: 'What is the name of the Valheim weapon that hits for the most damage?',
        choice1: 'Frostner',
        choice2: 'Blackmetal atgeir',
        choice3: 'Silver sword',
        choice4: 'Porcupine',
        answer: 3,
    },
    {
        question: 'Which of the following animals cannot be tamed?',
        choice1: 'Wolf',
        choice2: 'Deer',
        choice3: 'Lox',
        choice4: 'Boar',
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


// document.getElementById("img").src = currentQuestion.imgSrc; //n copy deze link in je eigen naam.js



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
localStorage.setItem("EnyaScore", score);
}

startGame()