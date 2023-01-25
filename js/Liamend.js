const username = document.querySelector('#username')
const savScoreBtn = document.querySelector('#saveScoreBtn')
const finalscore = document.querySelector('#finalscore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highscores = JSON.parse(localStorage.getItem('highScores')) || []

finalscore.innerTEXT = mostRecentScore

username.addEventListener('keyup', () => {
    savScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value,
    }

    highscores.push(score)

    highscores.sort((a,b) => {
        return b.score - a.score
    })

    highscores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highscores))
    window.location.assign('../quiz/highscoreLiam.html')
}

