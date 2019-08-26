/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//
//
//timer
//
//

const startButton = document.querySelector('#start-button')
let startOnOff = 'off'
let timerId;
let time = 0;

function leadingZero(num) {
    if (num<10) {
        num = '0' + num;
    }
    return num;
}

const timer = document.querySelector('.timer');
function timeChecker() {
    startOnOff = "on"
    let timeSec;
    let timeMin;
    timerId = setInterval(() => {
        time++
        timeMin = parseInt(time/60);
        timeSec = leadingZero(time%60);
        timeMin = leadingZero(timeMin);
        timer.innerHTML = `${timeMin} : ${timeSec}`
    }, 1000);
}

startButton.addEventListener('click', timeChecker);


//
//
//end-page display
//
//

const endPage = document.querySelector('.end-page');

function reStart() {
    container.style.display = 'flex';
    endPage.style.display = 'none';
    repeatEventFunc();
}

function endGame(moves, star) {
    endPage.innerHTML = `
    <div class="end-container">
        <img src="./img/thumb-up.png" height="200px" alt="thumb-up">
        <div class="end-page-text"><h1>move counter: ${moves}</h1></div>
        <div class="end-page-text"><h1>Time: ${timer.innerHTML}</h1></div>
        <div class="end-page-text"><h1>Star rating: ${star}</h1></div>
        <button class="re-game-btn">RE-GAME</button>
    </div>
    `
    document.querySelector('.re-game-btn').addEventListener('click', reStart);
}

//
//
//matching card event
//
//

const container = document.querySelector('.container')
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const stars = document.querySelector('.stars');

moves.innerHTML = 0;
let openCardsArr = [];
let matchingNum = 0;

deck.addEventListener('click', e => {
    if (startOnOff === 'on') {
        if (e.target.className === 'card') {
            let card = e.target;
            if (openCardsArr.length < 2) {
                card.classList.add('open', 'show');
                openCardsArr.push(card);
                if (openCardsArr.length === 2) {
                    moves.innerHTML ++
                    setTimeout(() => {
                        if (openCardsArr[0].firstElementChild.className !== openCardsArr[1].firstElementChild.className) {
                            openCardsArr.forEach(card => card.classList.remove('open', 'show'));
                        }else {
                            matchingNum ++
                        }
                        if (matchingNum%7 === 0) {
                            stars.removeChild(stars.children[0]);
                        }
                        openCardsArr = [];
                        console.log("맞은개수",matchingNum);
                        if (matchingNum === 8) {
                            clearInterval(timerId);
                            endGame(moves.innerHTML, stars.children.length );
                            container.style.display = 'none';
                            endPage.style.display = 'block';
                        }
                    }, 1000);
                }
            }
        }
    }else {
        alert('CLICK "GAME START" ');
    }
});

//
//
//shuffle&repeat event
//
//

const repeat = document.querySelector('.fa-repeat');
const allCards = document.querySelectorAll('.card');

function repeatEventFunc() {
    let classNameShuffleArr = [];
    allCards.forEach(card => {
        classNameShuffleArr.push(card.firstElementChild.className);
        card.classList.remove('open', 'show');
    });
    classNameShuffleArr = shuffle(classNameShuffleArr);
    for (let i=0; i<allCards.length; i++) {
        allCards[i].firstElementChild.className = classNameShuffleArr[i];
    }
    time = 0;
    timer.innerHTML = `00 : 00`
}

repeat.addEventListener('click', repeatEventFunc);




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
