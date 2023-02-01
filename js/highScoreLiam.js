const highScoreList = document.querySelector('#highscorelist')
const highScores = JSON.parse(localStorage.getItem('highScoresLiam')) || []

highScoreList.innerHTML = 
highScores.map(score => {
    return `<li class='high-score'>${score.name} - ${score.score}</li>`
}).join('')