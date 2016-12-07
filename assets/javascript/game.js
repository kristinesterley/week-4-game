var yourCharaterIndex = -1;
var defenderIndex = -1;
var character = [
	{
		name: "Qui-Gon Ginn",
		image: "assets/images/quigon.jpeg",
		beginHealthPoints:150,
		healthPoints: 150,
		baseAttackPower: 25,
		currentAttackPower: 25,
	},
	{
		name: "Darth Vader",
		image: "assets/images/darth.jpeg",
		beginHealthPoints:165,
		healthPoints: 165,
		baseAttackPower: 30,
		currentAttackPower: 30,
	},
	{
		name: "Yoda",
		image: "assets/images/yoda.jpeg",
		beginHealthPoints:170,
		healthPoints: 170,
		baseAttackPower: 35,
		currentAttackPower: 35,
	},
	{
		name: "Jango Fett",
		image: "assets/images/jango.jpeg",
		beginHealthPoints:140,
		healthPoints: 140,
		baseAttackPower: 20,
		currentAttackPower:20,
	}
]

function initializeGame() {
	//display characters to choose 

	for (var i=0; i<character.length; i++){

	var tempId = "char-" + i;
	$(".choices").append(createCharacterDiv(tempId,character[i].name,character[i].image,character[i].healthPoints,i));
	} //end for
	$("#message").html("Click on a character to begin.");
	$("#restart").css("visibility","hidden");
	$("#attack").prop('disabled',true);

}//end initializeGame


function createCharacterDiv(charId, charName, charImage, charHP, charI) {

		var newDiv = '<div class= "col-xs-6 col-sm-4 col-md-2" id="'+charId+'">'+
				'<div class= "box text-center">' +
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
}

function processUserCharChoice(indexChoice){

		yourCharaterIndex=indexChoice;
		for (var i=0;i<character.length;i++){
			if (i===indexChoice){
				$("#char-" + i).remove();  //remove from choices row
				var tempId = "player-chosen";
				$(".player").append(createCharacterDiv(tempId,character[i].name,character[i].image,character[i].healthPoints,i));			
				// $(".player").append($("#char-" + i));
			}
			else {
				$("#char-" + i).remove();  //remove from choices row
				var tempId = "enemy-"+i;
				$(".enemies").append(createCharacterDiv(tempId,character[i].name,character[i].image,character[i].healthPoints,i));			
				$("#message").html("Click on an Enemy to fight.");
				// $(".enemies").append($("#char-" + i));
			}
		}
		// return;

}
function processDefenderDisplay(indexChoice){
	//remove any past defenders
	$("#defender").remove();
	//save off defender's index number in the object array
	defenderIndex=indexChoice;

	for (var i=0;i<character.length;i++){
			if (i===indexChoice){
				$("#enemy-" + i).remove();  //remove from enemy choices row
				var tempId = "defender";
				$(".defender").append(createCharacterDiv(tempId,character[i].name,character[i].image,character[i].healthPoints,i));			
				$("#message").html("Click the Attack button until you win or lose.")
				$("#attack").prop('disabled',false);
				// $(".player").append($("#char-" + i));
			} //end if
			else if (i!= yourCharaterIndex) {
				 //disable clicks on remaining enemies
				var tempId = "enemy-"+i; 
				$(tempId).prop('disabled',true);  ///?????
				}
				
			
		}//end for

}//end function

function processAttack() {

	if (character[yourCharaterIndex].healthPoints>=0 && character[defenderIndex].healthPoints>=0) {
		character[yourCharaterIndex].healthPoints -= character[defenderIndex].baseAttackPower;
		character[defenderIndex].healthPoints -= character[yourCharaterIndex].currentAttackPower;
		character[yourCharaterIndex].currentAttackPower += character[yourCharaterIndex].baseAttackPower;
		console.log(character[defenderIndex].currentAttackPower);
		$("#message").html("Your attack power:" + character[yourCharaterIndex].currentAttackPower + "<p>Your opponent's current attach power:"+ character[defenderIndex].currentAttackPower + "</p>");
		
		//update health point display under each character	
		var charTempHPId = "#HP-"+yourCharaterIndex;
		var defTempHPId = "#HP-"+ defenderIndex;
		$(charTempHPId).text(character[yourCharaterIndex].healthPoints);
		$(defTempHPId).text(character[defenderIndex].healthPoints);
	} 

	if (character[yourCharaterIndex].healthPoints<=0){
		$("#message").html("Game Over. You lost.");
		$("#restart").css("visibility","visible");

	}
	if (character[defenderIndex].healthPoints<=0){
		$("#message").html("You beat " + character[defenderIndex].name + ". Choose another opponent.");
	}
	

}

function cleanUp(){
	$(".defender").empty();
	$(".player").empty();
	$(".enemies").empty();
	$(".choices").empty();
	//reset health points and currentAttackPower
	for (i=0;i<character.length;i++){
		character[i].healthPoints = character[i].beginHealthPoints;
		character[i].currentAttackPower=character[i].baseAttackPower;
	}

}


	// playerdiv0  = $(document.createElement('div'));
	// playerdiv0.addClass("col-xs-6 col-sm-4 col-md-2 box text-center box-player-0");
	// playerdiv0.html("test player 0");
	// // img1 = '<img> id="test" src="http://placehold.it/130x75" alt="Player 0">'
	// img0='<img src="http://placehold.it/130x75" alt="Player 0" class="text-center">'

	// $(playerdiv0).append(img0);
	// hpdiv = $(document.createElement('div'));
	// hpdiv.addClass("player-HP");

	// $(".player-choice").append(playerdiv0);
	// $(".box-player-0").append(hpdiv);
	// $(hpdiv).append("150");


	// var $newdiv1 = $("<div class="col-xs-6 col-sm-4 col-md-2" id="col-player-0"></div>")





		// var newId = "col-player-" + charNo;

$(document).ready(function(){


	initializeGame();


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