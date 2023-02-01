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
        question: 'What do you need to make a scanner',
        choice1: 'Titanium & Battery',
        choice2: 'Titaniun & Acid shroom',
        choice3: 'Silver & Gold',
        choice4: 'Copper & Gold',
        answer: 1,
    },
    {
        question: 'What is the main characters name',
        choice1: 'John',
        choice2: 'Ryley',
        choice3: 'Robert',
        choice4: 'Bob',
        answer: 2,
    },
    {
        question: 'What leviathan is the biggest out of these options',
        choice1: 'Reaper leviathan',
        choice2: 'Sea dragon leviathan',
        choice3: 'Ghost leviathan',
        choice4: 'Sea emperor leviathan',
        answer: 4,
    },
    {
        question: 'What is the name of the alien race',
        choice1: 'Precursors',
        choice2: 'Advents',
        choice3: 'Calamarains',
        choice4: 'Kaaliums',
        answer: 1,
    },
    {
        question: 'What is the name of the planet in subnautica',
        choice1: 'Kepler-16b',
        choice2: 'GJ 1214b',
        choice3: '4546B',
        choice4: 'HD 189733b',
        answer: 3,
    },
    {
        question: 'What is the name of the starting sector in subnautica',
        choice1: 'Safe shallows',
        choice2: 'Sector zero',
        choice3: 'Mushroom forest',
        choice4: 'Blood kelp zone',
        answer: 1,
    },
    {
        question: 'what is the name of the crashed ship',
        choice1: 'Sunbeam',
        choice2: 'Aurora',
        choice3: 'Mercury II',
        choice4: 'Degasi',
        answer: 2,
    },
    {
        question: 'What is the bladderfish mostly used for',
        choice1: 'Making water',
        choice2: 'Getting air',
        choice3: 'Making air bladder',
        choice4: 'Being food',
        answer: 1,
    },
    {
        question: 'What is the main characters name in below zero',
        choice1: 'Megan',
        choice2: 'Theresa',
        choice3: 'Sam',
        choice4: 'Bobby',
        answer: 3,
    },
    {
        question: 'what is the name of the company the main character works for',
        choice1: 'Biotechnica.',
        choice2: 'Alterra Corporation ',
        choice3: 'Militech',
        choice4: 'Fuyutsuki Electronics',
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

    return window.location.assign('../quiz/highscoreLiam.html')
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
localStorage.setItem("LiamScore", score);

}

startGame()
   