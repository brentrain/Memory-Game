

//My Dilemma with thi program is that it looks a liot like other programs I have looked at.
//with that being said I would like to thank the folks at Youtube and StackOverflow for their
//Inspiration.  I would like to thank Trafersy Media for ROCKING it with the tutorials.
//I would like to thank my fellow students at Udacity for their assistance and their inspiration while 
//building thia program.
//Should anyting in this program resemble any work by any one else it is purely conincidetal
//Last, but not least, thank you to Udacity for this amazing opportunit - For that I am Grateful


/* Variables*/
let newList = [];
let openCardsList = [];
let jsmoves = [];
let matchedGameFields = [];

/*
 * List of cards
 */
let list = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];


newList = shuffle(list); /* shuffle cards */

let deck = document.getElementsByClassName("deck")[0]
deck.innerHTML = "";

for (let j = 0; j <16 ; j++) {                                                  
    let para = document.createElement("li");                                    
    para.classList.add("card");
    let para2 = document.createElement("i");
    para2.classList.add("fa");
    para2.classList.add(newList[j]);
    para.appendChild(para2);                                                    
    deck.appendChild(para);
};

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


for (let k =0; k < 16; k++){                                                    
let card = document.getElementsByClassName("card")[k]
card.addEventListener('click', listing);
card.addEventListener('click', showCard);
card.addEventListener('click', moveCounter);
};

function listing(event) {                                                       
    openCardsList.push(event.target.firstChild);
    event.target.classList.add('open');
    openCardsList[0].parentNode.removeEventListener('click', listing);
};

function showCard(event) {                                                      
    event.target.classList.add('show');
    openCardsList[0].parentNode.removeEventListener('click', showCard)
};

function moveCounter(event) {                                                   /* move counter */
    jsmoves.push(event.target.firstChild);
    let moves = document.getElementsByClassName("moves")[0]
    moves.innerHTML = jsmoves.length
    if (jsmoves.length == 25){                                                  /* first star at 25 moves*/
      let stars1 = document.getElementsByClassName("star1")[0];
      stars1.remove();
    }
    else if (jsmoves.length == 50){                                             /* second star at 50 moves*/
      let stars2 = document.getElementsByClassName("star2")[0];
      stars2.remove();
    };
    openCardsList[0].parentNode.removeEventListener('click', moveCounter);
    matchFunction();
};

function matchFunction() {                                                      
    if (openCardsList.length == 2)
    { for (let l =0; l < 16; l++){
        let card = document.getElementsByClassName("card")[l]
        card.removeEventListener('click', showCard)                             
        card.removeEventListener('click', listing)
        card.removeEventListener('click', moveCounter)
      };
      if (openCardsList[0].classList.value == openCardsList[1].classList.value)
      {
      openCardsList[0].parentNode.classList.remove("open");                     
      openCardsList[0].parentNode.classList.remove("show");
      openCardsList[0].parentNode.classList.add("match");
      openCardsList[1].parentNode.classList.remove("open");
      openCardsList[1].parentNode.classList.remove("show");
      openCardsList[1].parentNode.classList.add("match");

      matchedGameFields = document.getElementsByClassName("match");
      if (matchedGameFields.length == 16) {                                     /* when all the cards match the game ends */
          clearInterval(myTimer);
          let conf = confirm("WOO HOO!!! Play Again? -press [OK]!  Time: " + sec + " sec.  Rating: " + document.getElementsByClassName("fa-star").length);
          if (conf == true) {
            restart();
          };
      }
      openCardsList = [];
      for (let m =0; m < 16; m++){
      let card = document.getElementsByClassName("card")[m]

        if (card.classList != "card match") {
        card.addEventListener('click', listing);                                
        card.addEventListener('click', showCard);
        card.addEventListener('click', moveCounter);

        };
      };
      } else if (openCardsList[0].classList.value != openCardsList[1].classList.value)
      {
          setTimeout(function()
          {
          openCardsList[0].parentNode.classList.remove("open");                 
          openCardsList[0].parentNode.classList.remove("show");
          openCardsList[1].parentNode.classList.remove("open");
          openCardsList[1].parentNode.classList.remove("show");
          openCardsList = [];
          for (let m =0; m < 16; m++){
          let card = document.getElementsByClassName("card")[m]

            if (card.classList != "card match") {
            card.addEventListener('click', listing);                            
            card.addEventListener('click', showCard);
            card.addEventListener('click', moveCounter);

            };
          };
        }, 1000);                                                               
      }

    }
};                                                                              

function time() {                                                               
sec++;
document.getElementById("seconds").innerHTML=sec+" sec.";
};
let sec = 0;
let myTimer = setInterval('time()',1000);

let restarter = document.getElementsByClassName("restart")[0]
restarter.addEventListener('click', restart)

function restart(event) {
  location.reload();
};