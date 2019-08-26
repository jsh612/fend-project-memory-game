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

//matching card event
const deck = document.querySelector('.deck');
let openCardsArr = [];
let matchingNum = 0;

deck.addEventListener('click', e => {
    console.log('target',e.target.className);
    if (e.target.className === 'card') {
        let card = e.target;
        if (openCardsArr.length < 2) {
            card.classList.add('open', 'show');
            openCardsArr.push(card);
            if (openCardsArr.length === 2) {
                setTimeout(() => {
                    if (openCardsArr[0].firstElementChild.className !== openCardsArr[1].firstElementChild.className) {
                        openCardsArr.forEach(card => card.classList.remove('open', 'show'));
                    }else {
                        matchingNum ++
                        console.log(matchingNum)
                    }
                    openCardsArr = []
                }, 1000);
            }
        }
    }
});

//shuffle&repeat event
const shuffleButton = document.querySelector('.fa-repeat');
const allCards = document.querySelectorAll('.card');

shuffleButton.addEventListener('click', () => {
    let classNameShuffleArr = [];
    allCards.forEach(card => {
        classNameShuffleArr.push(card.firstElementChild.className);
        card.classList.remove('open', 'show');
    });
    classNameShuffleArr = shuffle(classNameShuffleArr);
    for (let i=0; i<allCards.length; i++) {
        allCards[i].firstElementChild.className = classNameShuffleArr[i];
    }
});




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
