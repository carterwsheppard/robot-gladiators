// function for random number generation 
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max-min+1)) + min;

  return value
}

var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = window.prompt("What is your robot's name?");
    }

    return name;
}



var player = {
  Name: getPlayerName(),
  Health: 100,
  Attack: 10,
  Money: 10,
  reset: function() {
    this.Health = 100;
    this.Money = 10;
    this.Attack = 10;
  }, // comma!
  refillHealth: function() {
    if (this.money >=7) {
    this.health += 20;
    this.money -= 7;
  }
  else {
    window.alert("Not enough money")
  }
  }, // comma!
  upgradeAttack: function() {
    if (this.money>=7) {
    this.attack += 6;
    this.money -= 7;
  }
  else {
    window.alert("Not enough money")
  }
  }
};

var enemy = [
  {
    Name: "Roberto",
    Attack: randomNumber(10, 14)

  },
  {
    Name:"Amy Android",
    Attack: randomNumber(10, 14)

  },
  {
    Name: "Robo Trumble",
    Attack: randomNumber(10, 14)

  }
];

var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Conditional Recursive Function Call
  promptFight = promptFight.toLowerCase(); 

if (promptFight === "" || promptFight === null) {
  window.alert("You need to provide a valid answer! Please try again.");
  return fightOrSkip();
}

  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(player.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      player.money = Math.max(0,player.Money - 10);
      return true 
      shop();
    }
  }
}

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  while (player.Health > 0 && enemy.Health > 0) {
    // ask player if they'd like to fight or run
  if (fightOrSkip()) {
    break;
  };

// generate random damage value based on player's attack power
    var damage = randomNumber(player.Attack - 3, player.Attack);
    enemy.Health = Math.max(0, enemy.Health - damage);
    console.log(
      player.Name + ' attacked ' + enemy.Name + '. ' + enemy.Name + ' now has ' + enemy.Health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.Health <= 0) {
      window.alert(enemy.Name + ' has died!');

      // award player money for winning
      player.Money = player.Money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.Name + ' still has ' + enemy.Health + ' health left.');
    }

    // generate random damage value based on players attack
    var damage = randomNumber(enemy.Attack-3,enemy.Attack);
    player.Health = Math.max(0,player.Health - damage);
    console.log(
      enemy.Name + ' attacked ' + player.Name + '. ' + player.Name + ' now has ' + player.Health + ' health remaining.'
    );

    // check player's health
    if (player.Health <= 0) {
      window.alert(player.Name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(player.Name + ' still has ' + player.Health + ' health left.');
    }
  } // end of while loop
}; // end of fight function

// function to start a new game
var startGame = function() {
  // reset player stats
 player.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemy.length; i++) {
    // if player is still alive, keep fighting
    if (player.Health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemy[i];

      // reset enemyHealth before starting new fight
      pickedEnemyObj.Health = randomNumber(40,60);

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
      if (player.Health > 0 && i < enemy.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
      
        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player is not alive, break out of the loop and let endGame function run
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  // after loop ends, we are either out of playerHealth or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (player.Health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + player.Money + '.');
  } else {
    window.alert("You've lost your robot in battle!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm('Would you like to play again?');

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert('Thank you for playing Robot Gladiators! Come back soon!');
  }
};

// go to shop between battles function
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    'Would you like to 1) refill your health, 2) upgrade your attack, or 3) leave the store? Please enter 1, 2 or 3 to make a choice.'
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);

  // use switch case to carry out action
  switch (shopOptionPrompt) {
    case 1:
      player.refillHealth();
      break;
    case 2:
     player.upgradeAttack();
      break;
    case 3:
      window.alert('Leaving the store.');

      // do nothing, so function will end
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// start first game when page loads
startGame();
