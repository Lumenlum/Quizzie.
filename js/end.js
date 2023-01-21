const username = document.querySelector('#username')
const savScoreBtn = document.querySelector('@saveScoreBtn')
const finalscore = document.querySelector('#finalscore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

finalscore.innerTEXT = mostRecentScore

username.addEventListener('keyup', () => {
    savScoreBtn.disabled = !username.value
})

savingHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value,
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highscores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}