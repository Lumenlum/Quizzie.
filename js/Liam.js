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
        question: 'what do you need to make a scanner',
        choice1: 'titanium & battery',
        choice2: 'titaniun & acid shroom',
        choice3: 'silver & gold',
        choice4: 'copper & gold',
        answer: 1,
    },
    {
        question: 'what is the main characters name',
        choice1: 'john',
        choice2: 'ryley',
        choice3: 'robert',
        choice4: 'sam',
        answer: 2,
    },
    {
        question: 'what leviathan is the biggest out of these options',
        choice1: 'reaper leviathan',
        choice2: 'sea dragon leviathan',
        choice3: 'ghost leviathan',
        choice4: 'sea emperor leviathan',
        answer: 4,
    },
    {
        question: 'what is the name of the alien race',
        choice1: 'precursors',
        choice2: 'advents',
        choice3: 'calamarains',
        choice4: 'kaaliums',
        answer: 1,
    },
    {
        question: 'what is the name of the planet in subnautica',
        choice1: 'Kepler-16b',
        choice2: 'GJ 1214b',
        choice3: '4546B',
        choice4: 'HD 189733b',
        answer: 3,
    },
    {
        question: 'what is the name of the starting sector in subnautica',
        choice1: 'safe shallows',
        choice2: 'sector zero',
        choice3: 'mushroom forest',
        choice4: 'blood kelp zone',
        answer: 1,
    },
    {
        question: 'what is the name of the crashed ship',
        choice1: 'sunbeam',
        choice2: 'aurora',
        choice3: 'mercury II',
        choice4: 'degasi',
        answer: 2,
    },
    {
        question: 'what is the bladderfish mostly used for',
        choice1: 'making water',
        choice2: 'getting air',
        choice3: 'making air bladder',
        choice4: 'being food',
        answer: 3,
    },
    {
        question: 'what is 3 + 3',
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '8',
        answer: 3,
    },
    {
        question: 'what is 3 + 3',
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '8',
        answer: 3,
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

}

startGame()
   