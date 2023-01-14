const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progresstext = document.querySelector('#progresstext')
const scoretext = document.querySelector('#score')
const progressbarfull = document.querySelector('#progressbarfull')

let currentQeustion = {}
let acceptingAnswers = true
let score = 0
let questionCounter
let availibleQeustions = []

let questions = [
    {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '8',
        choice4: '16',
        answer: 2,
    },  
    {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '8',
        choice4: '16',
        answer: 2,
    },  
    {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '8',
        choice4: '16',
        answer: 2,
    },  
    {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '8',
        choice4: '16',
        answer: 2,
    },  
]

const SCORE_POINTS = 100
const MAX_QEUSTIONS = 4

startGame = () => {
   questionCounter = 0 
   score = 0
   availibleQeustions = [...questions]
   getNewQeustion()
}

getNewQeustion = () => {
    if(availibleQeustions.lengt === 0 || questionCounter > MAX_QEUSTIONS) {
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign(end.html)
    }

    questionCounter++
    progresstext.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressbarfull.style.width = `${(questionCounter/MAX_QEUSTIONS)} * 100%`

    const questionsIndex = Math.floor(Math.random() * availibleQeustions.length)
    currentQeustion = availibleQeustions[questionsIndex]
    question.inneText = currentQeustion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQeustion['choice' + number]
    })

    availibleQeustions.splice(questionsIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer = currentQeustion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore()
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQeustion()
        
        }, 1000)
    })
})

