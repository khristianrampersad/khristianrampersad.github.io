var videogames = ['starfox', 'marioparty', 'zelda', 'runescape']

//Empty variables to store values later
var randomGame = "";
var letters = []
var blanks = 0;
var corr = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;






function Game() {
    //computer generates random word from words array
    randomvideoGame = videogames[Math.floor(Math.random() * videogames.length)];

    // split the individual word into separate arrays, and store in new array 
    letters = randomvideoGame.split("");

    //store length of word in blanks, for later use
    blanks = letters.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        corr.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + corr.join("  ");

    //console logging 
    console.log(randomvideoGame);
    console.log(letters)
    console.log(blanks)
    console.log(corr)
}



function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    corr = [];
    Game()
}



//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomvideoGame[i] === letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomvideoGame[i] === letter) {
                corr[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(corr);
}



//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert and reset new round
    if (letters.toString() === corr.toString()) {
        wins++;
        reset()
        //display wins on screen
        document.getElementById("wins").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("losses").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + corr.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}


//call start game function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("wrongGuesses").innerHTML = "  " + wrongGuess.join(" ");
}
function getHint()
{
var random = randomvideoGame[Math.floor(Math.random() * randomvideoGame.length)];
document.getElementById("message").innerHTML=random;
}; 
