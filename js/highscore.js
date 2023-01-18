const highScoreList = document.querySelector('#highscorelist')
const highscores = JSON.parse(localStorage.getItem('#highscores')) || []

highScoreList.innerHTML = 