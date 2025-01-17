
/********** Find DOM Elements from HTML   *********/

const faceELement = document.getElementById('faces');
let currentScore = 0
const startButton = document.getElementById('start-button');
const score = document.getElementById('score');
const timerElement = document.getElementById('timer');
let timeInterval = null



/********** Game Logic Functions   *********/

// start game by clicking start button
startButton.onclick = () => {
    const allImages = faceELement.querySelectorAll('img');
    for (let i = 0; i < allImages.length; i += 2) {
        // random time delay for each face
        const delay = Math.floor(Math.random() * 12);
        let face1 = allImages[i];
        let face1_hit = allImages[i + 1];
        face1.style.animation = `jump 3s ${delay}s infinite alternate ease-in-out`
        face1_hit.style.animation = `jump 3s ${delay}s infinite alternate ease-in-out`
        // face1.classList.add('start-jump');
        // face1_hit.classList.add('start-jump');
    }
    window.scrollTo(0, 0);
    startButton.style.display = 'none';
    score.style.display = 'inline';
    startTime(30);
}

// start timer to count down
function startTime(timeInSeconds) {

    timeInterval = setInterval(() => {
        if (timeInSeconds >= 0) {
            timerElement.textContent = timeInSeconds;
            timeInSeconds--;
        } else {
            clearInterval(interval);
            gameEnd();
        }
    }, 1000);
}

// it will end the game and lead to leaderboard
function gameEnd() {
    faceELement.innerHTML = '';
    startButton.style.display = 'inline';
    score.style.display = 'none';
    // const allImages = faceELement.querySelectorAll('img');
    // for (let i = 0; i < allImages.length; i += 2) {
    //     let face1 = allImages[i];
    //     let face1_hit = allImages[i + 1];
    //     face1.style.animation = `none`;
    //     face1_hit.style.animation = `none`;
    //     face1.style.visibility = 'visible';
    //     face1_hit.style.visibility = 'visible';
    // }
}



/********** Helper Functions  *********/
function addOnClickEventListenerToFace1() {
    for (let div of faceELement.children) {
        console.log(div);
        const image_element = div.children;
        console.log(image_element);
        let face1 = image_element[0];
        let face1_hit = image_element[1];

        face1.onclick = (e) => {
            currentScore++;
            score.textContent = currentScore;
            if (currentScore === 11) {
                clearInterval(timeInterval);
                gameEnd();
            }
            e.preventDefault();
            e.stopPropagation();
            console.log(face1);
            face1.style.zIndex = 0;
            setTimeout(() => {
                // face1.style.animation = `none`
                // face1_hit.style.animation = `none`

                face1.style.visibility = 'hidden';
                face1_hit.style.visibility = 'hidden';
                // no effect of this because we use flex box and its grow/shrink property
                // face1.style.display = 'none';
                // face1_hit.style.display = 'none';
                // reset z-index
                face1_hit.style.zIndex = 0;
            }, 1000);
        }


    }

}

// add face image to game board/html
function addFaceInGameBoard(faceImages) {
    let htmlText = '';
    for (let url of faceImages) {

        htmlText += `
        <div>
            <img src="${url[0]}" alt="face">
            <img src="${url[1]}" alt="hit face">
        </div>
        `
    }

    faceELement.innerHTML = htmlText;

}

// make order of faces random
function reArrangeFaces(faceImages) {
    const faceImagesCopy = [...faceImages];
    for (let i = 0; i < faceImagesCopy.length; i++) {
        const randomIndex = Math.floor(Math.random() * faceImagesCopy.length);
        [faceImagesCopy[i], faceImagesCopy[randomIndex]] = [faceImagesCopy[randomIndex], faceImagesCopy[i]];
    }

    return faceImagesCopy;

}




/********** Setup Faces and their functions   *********/
let faceImages = [
    ['./assets/faces/f1.png', './assets/faces/f1_hit.png'],
    ['./assets/faces/f2.png', './assets/faces/f2_hit.png'],
    ['./assets/faces/f3.png', './assets/faces/f3_hit.png'],
    ['./assets/faces/f4.png', './assets/faces/f4_hit.png'],
    ['./assets/faces/f5.png', './assets/faces/f5_hit.png'],
    ['./assets/faces/f6.png', './assets/faces/f6_hit.png'],
    ['./assets/faces/f7.png', './assets/faces/f7_hit.png'],
    ['./assets/faces/f8.png', './assets/faces/f8_hit.png'],
    ['./assets/faces/f9.png', './assets/faces/f9_hit.png'],
    ['./assets/faces/f10.png', './assets/faces/f10_hit.png'],
    ['./assets/faces/f11.png', './assets/faces/f11_hit.png'],

]//all faces

faceImages = reArrangeFaces(faceImages);// make order of faces random
addFaceInGameBoard(faceImages);// add face in game board
addOnClickEventListenerToFace1();// add onClick event listener to face1



