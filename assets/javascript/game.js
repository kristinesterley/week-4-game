var yourCharaterIndex = -1;
var defenderIndex = -1;
var numEnemies;
var readyforDefender = true;
var character = [
	{
		name: "Qui-Gon Ginn",
		image: "assets/images/quigon.jpeg",
		beginHealthPoints:111,
		healthPoints: 0,
		baseAttackPower: 7,
		currentAttackPower: 0,
	},
	{
		name: "Darth Vader",
		image: "assets/images/darth.jpeg",
		beginHealthPoints:160,
		healthPoints: 0,
		baseAttackPower: 20,
		currentAttackPower: 0,
	},
	{
		name: "Yoda",
		image: "assets/images/yoda.jpeg",
		beginHealthPoints:120,
		healthPoints: 0,
		baseAttackPower: 8,
		currentAttackPower: 0,
	},
	{
		name: "Jango Fett",
		image: "assets/images/jango.jpeg",
		beginHealthPoints:140,
		healthPoints: 0,
		baseAttackPower: 15,
		currentAttackPower:0,
	}
]

function setCharacters(){  //initializes the healthPoints and currentAttackPower for each character
	$.each(character, function(index){
		character[index].currentAttackPower= character[index].baseAttackPower;
		character[index].healthPoints = character[index].beginHealthPoints;
	});

} //end setCharacters

function initializeGame() {

	setCharacters();
	//display characters to choose 
	for (var i=0; i<character.length; i++){
		var tempId = "char-" + i;
		$(".choices").append(createCharacterDiv("box",tempId,character[i].name,character[i].image,character[i].healthPoints,i));
	} //end for
	// initialize global variables
	yourCharaterIndex = -1;
	defenderIndex = -1;
	numEnemies = character.length -1;
	readyforDefender = true;

	$("#message").html("Click on a character to begin.");
	//hide reset button and disable attack button until after fight is ready to begin
	$("#restart").css("visibility","hidden");
	$("#attack").prop('disabled',true);

}//end initializeGame


function createCharacterDiv(boxClass,charId, charName, charImage, charHP, charI) { //creates the character divs

		var newDiv = '<div class= "col-xs-6 col-sm-4 col-md-2" id="'+charId+'">'+
				'<div class= "'+boxClass+' text-center">' +
					'<div class="player-name">'+
						'<p>'+charName+'</p>'+
					'</div>'+	
					'<img src='+ charImage + ' alt='+charName+'>'+
					'<div class= "player-HP" id="HP-'+ charI +'">'+
						'<p>'+charHP+'</p>'+
					'</div>'+
				'</div>'+	       
			'</div>';
			return newDiv;
} //end createCharacterDiv

function processUserCharChoice(indexChoice){  //user has clicked on character to be Your Character

		yourCharaterIndex=indexChoice;
		for (var i=0;i<character.length;i++){
			if (i===indexChoice){
				$("#char-" + i).remove();  //remove selected character from the choices row
				var tempId = "player-chosen";
				// put selected character on the Your Character row
				$(".player").append(createCharacterDiv("boxp", tempId,character[i].name,character[i].image,character[i].healthPoints,i));			

			}
			else { //put the rest in the enemy row
				$("#char-" + i).remove();  //remove from choices row
				var tempId = "enemy-"+i;
				//put the unselected characters on the enemy row
				$(".enemies").append(createCharacterDiv("boxe",tempId,character[i].name,character[i].image,character[i].healthPoints,i));			
				$("#message").html("Click on an Enemy to fight.");
			}
		}// end for
} // end processUserCharChoice	





function processDefenderDisplay(indexChoice){
	if (readyforDefender){
		//save off defender's object array index number
		defenderIndex=indexChoice;
		//remove any past defenders from the defender row
		$("#defender").remove();
		//decrement numEnemies so we know how many are left
		numEnemies--;
		//set flag to say that the game is not ready for a new defender - we're about to begin the fight!
		readyforDefender=false;

		for (var i=0;i<character.length;i++){
			if (i===indexChoice){
				$("#enemy-" + i).remove();  //remove from enemy choices row
				var tempId = "defender";
				//display the newly chosen defender in the defender row
				$(".defender").append(createCharacterDiv("boxd",tempId,character[i].name,character[i].image,character[i].healthPoints,i));			
				//acticate the attack button and direct the user to click it
				$("#message").html("Click the Attack button until you win or lose.")
				$("#attack").prop('disabled',false);
				
			} //end if
		}//end for
	} //end if	
}//end function

function processAttack() {

		//format message before increasing currentAttackPower for your character
	var msg1 = "You attacked "+ character[defenderIndex].name + " for " + character[yourCharaterIndex].currentAttackPower + " damage.";
	var msg2 = character[defenderIndex].name + " attacked you for " + character[defenderIndex].baseAttackPower + " damage.";
	var msg3 = "";


	// do the math for the attack
	//you attack first - reduce enemy health points and increase your own attack power
	character[defenderIndex].healthPoints -= character[yourCharaterIndex].currentAttackPower;
	character[yourCharaterIndex].currentAttackPower += character[yourCharaterIndex].baseAttackPower;
	// you only lose heath points if your enemy is still alive  ( I noticed this on the video! )
	if (character[defenderIndex].healthPoints > 0){
		character[yourCharaterIndex].healthPoints -= character[defenderIndex].baseAttackPower;
	}

	
	//update health point display under your character and the defender

	var charTempHPId = "#HP-"+yourCharaterIndex;
	var defTempHPId = "#HP-"+ defenderIndex;
	$(charTempHPId).text(character[yourCharaterIndex].healthPoints);
	$(defTempHPId).text(character[defenderIndex].healthPoints);

	// for readability:
	var youAlive = true;
	var enemyAlive = true;
	if (character[yourCharaterIndex].healthPoints<=0){
		youAlive = false;
	}
	if (character[defenderIndex].healthPoints<=0){
		enemyAlive = false;
	}

	
	// if you are not alive - you lost
	if (!youAlive){
		$("#message").html("Game Over. You lost.");
		$("#attack").prop('disabled',true);
		$("#restart").css("visibility","visible");

	}
	//if you are alive and your enemy is alive, update and allow attack again
	else if (enemyAlive) {
		$("#message").html(msg1 + "<p>" + msg2 + "</p>");		
	}  

	// if you are alive and your enemy is dead - you won
	else {
		//turn off the attack button
		$("#attack").prop('disabled',true);
		//begin the victory message
		msg3 = "You beat " + character[defenderIndex].name + ". ";
		// if enemies are left to fight, add that to the message to the user and set the flag so that the user can choose another defender
		if (numEnemies>0){
			msg3 = msg3 + " Choose another opponent.";
			readyforDefender=true;
		}
		else{  //You are alive and you have no more enemies, so you won the game.  Make restart button visible so user can play again
			msg3 = msg3 + "Game Over. You win.";
			$("#restart").css("visibility","visible");
		}
		//display the completed message
		$("#message").html(msg3);
		// I don't really want to put this here, but the specs say to do so...
		$("#defender").remove();
	}

}

function cleanUp(){
	$(".defender").empty();
	$(".player").empty();
	$(".enemies").empty();
	$(".choices").empty();
}



	//begin code execution
	initializeGame();
	$(document).ready(function(){


		$(".choices").on('click',"#char-0",function() {
			indexChar=0;
			processUserCharChoice(indexChar);

		});
		$(".choices").on('click',"#char-1",function() {
			indexChar=1;
			processUserCharChoice(indexChar);
		});
		$(".choices").on('click',"#char-2",function() {
			indexChar=2;
			processUserCharChoice(indexChar);
		});
		$(".choices").on('click',"#char-3",function() {
			indexChar=3;
			processUserCharChoice(indexChar);
		});

		
		$(".enemies").on('click',"#enemy-0",function() {
			indexChar=0;
			processDefenderDisplay(indexChar);
		});
		$(".enemies").on('click',"#enemy-1",function() {
			indexChar=1;
			processDefenderDisplay(indexChar);
		});
		$(".enemies").on('click',"#enemy-2",function() {
			indexChar=2;
			processDefenderDisplay(indexChar);
		});
		$(".enemies").on('click',"#enemy-3",function() {
			indexChar=3;
			processDefenderDisplay(indexChar);
		});
		
		
		$("#attack").click(function(){
			processAttack();
		});

		$("#restart").click(function(){
			cleanUp();
			initializeGame();
		})

	});//end document ready function