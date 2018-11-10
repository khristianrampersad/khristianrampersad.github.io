$(document).ready(function () {

    // Questions & Answers
  
      var possible = [
      {
          question: "How Many Days Late was this Assignment?", 
          choice: ["1", "2", "3", "4"],
          answer: 3,
          photo: "Assets/images/tenor.gif"
       },
       {
           question: "How many Hours Late?", 
          choice: ["5", "10", "24", "72"],
          answer: 3,
          photo: "Assets/images/fineeeeee.gif"
       }, 
       {
           question: "On a Scale of 1-4. How Cute is Khristian?", 
          choice: ["1", "2", "3", "4" ],
          answer: 3,
          photo: "images/annoyed-you-with-my-friendship.gif"
      }, 
      {
          question: "Does Khristian Being Cute make everything okay?", 
          choice: ["Yes", "No", ],
          answer: 0,
          photo: "Assets/images/0_nsgXxd0kwN3qT2ks.gif"
      },
    
    ];
  
  var correctCount = 0;
  var incorrectCount = 0;
  var notAnswerCount = 0;
  var timer = 20;
  var timeID;
  var playerGuess ="";
  var run = false;
  var qCount = possible.length;
  var pick;
  var index;
  var newArray = [];
  var hold = [];
  
  
  //Hide the reset button
  $("#reset").hide();
  
  //Start Game
  $("#start").on("click", function () {
          $("#start").hide();
          displayQuestion();
          runTimer();
          for(var i = 0; i < possible.length; i++) {
      hold.push(possible[i]);
  }
      })
  //timer start
  function runTimer(){
      if (!run) {
      timeID = setInterval(decrement, 1000); 
      run = true;
      }
  }
  //Countdown timer
  function decrement() {
      $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
      timer --;
  
      //Time is up prompt
      if (timer === 0) {
          notAnswerCount++;
          stop();
          $("#correctguess").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
          hidepicture();
      }	
  }
  
  //timer stop
  function stop() {
      run = false;
      clearInterval(timeID);
  }
  
  function displayQuestion() {
      
      index = Math.floor(Math.random()*possible.length);
      pick = possible[index];
  

          $("#questionguess").html("<h2>" + pick.question + "</h2>");
          for(var i = 0; i < pick.choice.length; i++) {
              var userChoice = $("<div>");
              userChoice.addClass("answerchoice");
              userChoice.html(pick.choice[i]);
            
              userChoice.attr("data-guessvalue", i);
              $("#correctguess").append(userChoice);
 
  }
  
  
  
  //On Click function to select answers
  $(".answerchoice").on("click", function () {
      //grab array position from playerGuess
      playerGuess = parseInt($(this).attr("data-guessvalue"));
  
      //If statement for correct and incorrect guesses
      if (playerGuess === pick.answer) {
          stop();
          correctCount++;
          playerGuess="";
          $("#correctguess").html("<p>Correct!</p>");
          hidepicture();
  
      } else {
          stop();
          incorrectCount++;
          playerGuess="";
          $("#correctguess").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
          hidepicture();
      }
  })
  }
  
  
  function hidepicture () {
      $("#correctguess").append("<img src=" + pick.photo + ">");
      newArray.push(pick);
      possible.splice(index,1);
  
      var hidpic = setTimeout(function() {
          $("#correctguess").empty();
          timer= 20;
  
      // Keep track of score going through game
      if ((incorrectCount + correctCount + notAnswerCount) === qCount) {
          $("#questionguess").empty();
          $("#questionguess").html("<h3>Game Over!  Here's how you did: </h3>");
          $("#correctguess").append("<h4> Correct: " + correctCount + "</h4>" );
          $("#correctguess").append("<h4> Incorrect: " + incorrectCount + "</h4>" );
          $("#correctguess").append("<h4> Unanswered: " + notAnswerCount + "</h4>" );
          $("#reset").show();
          correctCount = 0;
          incorrectCount = 0;
          notAnswerCount  = 0;
  
      } else {
          runTimer();
          displayQuestion();
  
      }
      }, 3000);
  
  
  }
   // Reset Button
  $("#reset").on("click", function() {
      $("#reset").hide();
      $("#correctguess").empty();
      $("#questionguess").empty();
      for(var i = 0; i < hold.length; i++) {
          possible.push(hold[i]);
      }
      runTimer();
      displayQuestion();
  
  })
  
  })