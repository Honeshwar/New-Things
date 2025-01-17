// fetching html elements
const leaderboardContent = document.getElementById('leaderboard');
const playAgainButton = document.getElementById('play-again-button');


// adding event listeners
playAgainButton.addEventListener('click', () => {
    window.location.href = "index.html";
});


// function to show leaderboard
function showLeaderboard() {
    leaderboardContent.style.display = 'block';
}