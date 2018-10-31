//Global variables
$(document).ready(function() {


    
    //Array of Playable Fighters
    var fighters = {
        'Sora': {
            name: 'Sora',
            health: 90,
            attack: 8,
            imageUrl: "assets/images/Sora.jpg",
            enemyAttackBack: 20
        }, 
          'Riku': {
            name: 'Riku',
            health: 100,
            attack: 8,
            imageUrl: "assets/images/Riku_KH.png",
            enemyAttackBack: 20
        }, 
        'Axel': {
            name: 'Axel',
            health: 110,
            attack: 7,
            imageUrl: "assets/images/Axel_3_KHD.png",
            enemyAttackBack: 20
        },
        'Cloud': {
            name: 'Cloud',
            health: 150,
            attack: 7,
            imageUrl: "assets/images/cloud.png",
            enemyAttackBack: 20
        },
        
      
    };
    
    var myPlayer;
    var myRival;
    var combatants = [];
    var indexofSelChar;
    var attackResult;
    var turnCounter = 1;
    var killCount = 0;
    var combatants1 = "";
    
    
    var renderOne = function(character, fighterArea, makeChar) {
        //character: obj, fighterArea: class/id, makeChar: string
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(fighterArea).append(charDiv);
        //Capitalizes the first letter in fighters name
        // $('.character').css('textTransform', 'capitalize');
        // conditional render
        if (makeChar === 'enemy') {
          $(charDiv).addClass('enemy');
        } else if (makeChar === 'oppChar') {
          myRival = character;
          $(charDiv).addClass('target-enemy');
        }
      };
    
      // Create function to render game message to DOM
      var renderMessage = function(message) {
        var gameMesageSet = $("#gamebox");
        var newMessage = $("<div>").text(message);
        gameMesageSet.append(newMessage);
    
        if (message === 'clearMessage') {
          gameMesageSet.text('');
        }
      };
    
      var renderFighters = function(charObj, areaRender) {
        //render all fighters
        if (areaRender === '#characters-section') {
          $(areaRender).empty();
          for (var key in charObj) {
            if (charObj.hasOwnProperty(key)) {
              renderOne(charObj[key], areaRender, '');
            }
          }
        }
        //render player character
        if (areaRender == '#selected-character') {
          $('#selected-character').prepend("Your Character");       
          renderOne(charObj, areaRender, '');
          $('#attack-button').css('visibility', 'visible');
          $('#random-button').css('visibility', 'visible');
        }
        //render combatants
        if (areaRender == '#available-to-attack-section') {
            $('#available-to-attack-section').prepend("Chose Who you will Body Next.");      
          for (var i = 0; i < charObj.length; i++) {
    
            renderOne(charObj[i], areaRender, 'enemy');
          }
          //render one enemy to oppChar area
          $(document).on('click', '.enemy', function() {
            //select an combatant to fight
            name = ($(this).data('name'));
            //if oppChar area is empty
            if ($('#oppChar').children().length === 0) {
              renderFighters(name, '#oppChar');
              $(this).hide();
              renderMessage("clearMessage");
            }
          });
        }
        //render oppChar
        if (areaRender == '#oppChar') {
          $(areaRender).empty();
          for (var i = 0; i < combatants.length; i++) {
            //add enemy to oppChar area
            if (combatants[i].name == charObj) {
              $('#oppChar').append("Select Your Opponent")
              renderOne(combatants[i], areaRender, 'oppChar');
            }
          }
        }
        //re-render oppChar when attacked
        if (areaRender == 'playerDamage') {
          $('#oppChar').empty();
          $('#oppChar').append("Your opponent");
          renderOne(charObj, '#oppChar', 'oppChar');

        }
        //re-render player character when attacked
        if (areaRender == 'enemyDamage') {
          $('#selected-character').empty();
          renderOne(charObj, '#selected-character', '');
        }
        //render defeated enemy
        if (areaRender == 'enemyDefeated') {
          $('#oppChar').empty();
          var gameStateMessage = "You've defeated " + charObj.name + ", Who Will you body next?";
          renderMessage(gameStateMessage);

        }
      };
      //this is to render all fighters for user to choose their computer
      renderFighters(fighters, '#characters-section');
      $(document).on('click', '.character', function() {
        name = $(this).data('name');
        //if no player char has been selected
        if (!myPlayer) {
          myPlayer = fighters[name];
          for (var key in fighters) {
            if (key != name) {
              combatants.push(fighters[key]);
            }
          }
          $("#characters-section").hide();
          renderFighters(myPlayer, '#selected-character');
          //this is to render all fighters for user to choose fight against
          renderFighters(combatants, '#available-to-attack-section');
        }
      });
      
      // ----------------------------------------------------------------
      // Create functions to enable actions between objects.
      $("#attack-button").on("click", function() {
        //if oppChar area has enemy
        if ($('#oppChar').children().length !== 0) {
          //oppChar state change
          var attackMessage = "You attacked " + myRival.name + " for " + (myPlayer.attack * turnCounter) + " damage.";
         
          renderMessage("clearMessage");
          //combat
          myRival.health = myRival.health - (myPlayer.attack * turnCounter);
    
          //win condition
          if (myRival.health > 0) {
            //enemy not dead keep playing
            renderFighters(myRival, 'playerDamage');
            //player state change
            var counterAttackMessage = myRival.name + " Smacked You Back for " + myRival.enemyAttackBack + " Damage.";
            renderMessage(attackMessage);
            renderMessage(counterAttackMessage);
    
            myPlayer.health = myPlayer.health - myRival.enemyAttackBack;
            renderFighters(myPlayer, 'enemyDamage');
            if (myPlayer.health <= 0) {
              renderMessage("clearMessage");
              restartGame("Lix Pon Yuh Tail");
              
              $("#attack-button").unbind("click");
            }
          } else {
            renderFighters(myRival, 'enemyDefeated');
            killCount++;
            if (killCount >= 3) {
              renderMessage("clearMessage");
              restartGame("Good Job, You've Won!");
              
            }
          }
          turnCounter++;
        } else {
          renderMessage("clearMessage");
          renderMessage("Who you attacking? Scrub.");
          
        }
      });
    
    //Restarts the game - renders a reset button
      var restartGame = function(inputEndGame) {
        //When 'Restart' button is clicked, reload the page.
        var restart = $('<button class="btn">Restart</button>').click(function() {
          location.reload();
        });
        var gameState = $("<div>").text(inputEndGame);
        $("#gamebox").append(gameState);
        $("#gamebox").append(restart);
      };
       
    
    });