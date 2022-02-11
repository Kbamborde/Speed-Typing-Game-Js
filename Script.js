const randomQuoteApiUrl = 'https://api.quotable.io/random';
const quoteDisplayElement = document.querySelector("#quote-display");
const quoteInputElement = document.querySelector("#quoteInput");
const timer = document.querySelector("#timer");

/* let gameActive = false;
let count = 0; */
quoteInputElement.addEventListener("input", () => {
 /*    gameActive = true;    
    if(gameActive && count===0){
        count++
        timerFunc();
    } */

 
    const arrayQuote = quoteDisplayElement.querySelectorAll("span");
    const arrayValue = quoteInputElement.value.split("");
    
    let correct = true;
    
    for (let i = 0; i < arrayQuote.length; i++) {
        if (arrayValue[i] == null) {
            arrayQuote[i].classList.remove("correct");
            arrayQuote[i].classList.remove("incorrect");
            correct = false;
        }
        
        else if (arrayValue[i] === arrayQuote[i].textContent) {
            arrayQuote[i].classList.add("correct");
            arrayQuote[i].classList.remove("incorrect");
        }
        
        else {
            arrayQuote[i].classList.add("incorrect");
            arrayQuote[i].classList.remove("correct");
            correct = false;
        }
    }

/*     count = 0
    stopTimer() */
    if (correct){
        renderNewQuote();
    }
})



function getRandomQuote() {
    return fetch(randomQuoteApiUrl)
        .then(response => response.json())
        .then(data => data.content)
};

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerText = '';
    quote.split("").forEach(character => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    })

    quoteInputElement.value = null;
    startTimer()
;}


let startTime
function startTimer() {
    timer.innerText = 0;
    startTime = new Date()
    setInterval(()=>{
        timer.innerText = getTimerTime();
    },1000);
}


function getTimerTime() {
  return  Math.floor((new Date() - startTime) / 1000);
}
renderNewQuote();

