// Deck Characters - a few were changes to mix it up a bit

let deck = [
    'at', 'at',
    'bus', 'bus',
    'asterisk', 'asterisk',
    'bolt', 'bolt',
    'cube', 'cube',
    'leaf', 'leaf',
    'bicycle', 'bicycle',
    'bomb', 'bomb'
];

let firstCardSelected;

let moves = 0;

let remainingMatches = 8;

let stars = 0;

//displays cards on the page


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



function startGame() {
    startTime = undefined;
    deck = shuffle(deck);
    const deckElement = document.getElementById('deck');
    // clear cards incase the reresh button is used

    deckElement.innerHTML = '';
    for (var index = 0; index < deck.length; index++) {

        const card = document.createElement('li');
        card.addEventListener('click', openCard);
        card.className = 'card';
        const cardType = document.createElement('i');
        cardType.className = 'fa fa-' + deck[index];
        card.append(cardType);
        deckElement.append(card);
    }
   
    moves = 0;
    rating();
    document.getElementById('moves').textContent = moves;
    remainingMatches = 8;

    document.getElementById('game').style.display = 'block';
    document.getElementById('completed').style.display = 'none';
}
let timer = setInterval(function () {
    startTimer();
}, 1000);
let startTime;
let duration = 0;

function startTimer() {
    if (startTime !== undefined) {
        const currentTime = new Date().getTime();
        duration = (currentTime - startTime) / 1000 ;
       
        document.getElementById('timer').innerHTML = Math.round(duration);
    }else{
        document.getElementById('timer').innerHTML = '0';
    }
}

function stopTimer() {
    clearInterval(timer);
}

function openCard(event) {
    event.currentTarget.className = 'card open show';
    if (firstCardSelected === undefined) {
        firstCardSelected = event.currentTarget;
    } else {
        checkMatch(firstCardSelected, event.currentTarget);
        firstCardSelected = undefined;
    }

}

// checks the cards for matches

function checkMatch(firstCard, secondCard) {
    if (startTime=== undefined) {
        // if duration is zero the timer hansent started yet
        startTime = new Date().getTime();
    }

    // stops clicks till another card is chosen

    document.getElementById('deck').className = 'disable-clicks deck';
    const firstCardType = firstCard.childNodes[0].className;
    const secondCardType = secondCard.childNodes[0].className;
    if (firstCard !== secondCard) {
        moves = moves + 1;
        rating();
        document.getElementById('moves').textContent = moves;
    }
    setTimeout(function () {
        if (firstCardType === secondCardType && firstCard !== secondCard) {

            firstCard.className = 'card match';
            secondCard.className = 'card match';
            firstCard.removeEventListener('click', openCard);
            secondCard.removeEventListener('click', openCard);
            remainingMatches--;
            // another card can be picked again
            document.getElementById('deck').className = 'deck';
            if (remainingMatches === 0) {
                gameEnd();
            }
        } else {
            firstCard.className = 'card not-match';
            secondCard.className = 'card not-match';
            setTimeout(function () {
                firstCard.className = 'card';
                secondCard.className = 'card';
                // another card can be picked again
                document.getElementById('deck').className = 'deck';
            }, 500);

        }
    }, 700);

}

// Final Results

function gameEnd() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('completed').style.display = 'block';
    document.getElementById('tally').textContent = moves;
    document.getElementById('stars').textContent = stars;
    document.getElementById('finaltime').textContent =Math.round(duration);
}


function rating() {

    if (moves > 50) {
        document.getElementById('star1').className = 'fa fa-star-o';
        document.getElementById('star2').className = 'fa fa-star-o';
        document.getElementById('star3').className = 'fa fa-star-o';
        stars = 0;
    } else if (moves > 32) {
        document.getElementById('star1').className = 'fa fa-star';
        document.getElementById('star2').className = 'fa fa-star-o';
        document.getElementById('star3').className = 'fa fa-star-o';
        stars = 1;
    } else if (moves > 16) {
        document.getElementById('star1').className = 'fa fa-star';
        document.getElementById('star2').className = 'fa fa-star';
        document.getElementById('star3').className = 'fa fa-star-o';
        stars = 2;
    } else {
        document.getElementById('star1').className = 'fa fa-star';
        document.getElementById('star2').className = 'fa fa-star';
        document.getElementById('star3').className = 'fa fa-star';
        stars = 3;
    }
}

// Listens for the start of the game (click starts the game)

document.getElementById('restart').addEventListener('click', startGame);
startGame();

document.getElementById('replay').addEventListener('click', startGame);
startGame();