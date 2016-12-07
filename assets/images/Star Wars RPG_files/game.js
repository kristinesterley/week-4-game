var yourCharaterIndex = -1;
var character = [
	{
		name: "Qui-Gon Ginn",
		image: "assets/images/quigon.jpeg",
		healhPoints: 150,
		baseAttackPower: 25,
		currentAttackPower: 25,
		userCharacter: false
	},
	{
		name: "Darth Vader",
		image: "assets/images/darth.jpeg",
		healhPoints: 165,
		baseAttackPower: 30,
		currentAttackPower: 30,
		userCharacter: false
	},
	{
		name: "Yoda",
		image: "assets/images/yoda.jpeg",
		healhPoints: 170,
		baseAttackPower: 35,
		currentAttackPower: 35,
		userCharacter: false
	},
	{
		name: "Jango Fett",
		image: "assets/images/jango.jpeg",
		healhPoints: 140,
		baseAttackPower: 20,
		currentAttackPower: 20,
		userCharacter: false
	}
]

function initializeGame() {
	//display characters to choose 

	for (var i=0; i<character.length; i++){

	var tempId = "char-" + i;
	$(".choices").append(createCharacterDiv(tempId,character[i].name,character[i].image,character[i].healhPoints));
	} //end for
	$("#message").html("Click on a character to begin.");
	$("#restart").css("visibility","hidden");  //???????

}//end initializeGame


function createCharacterDiv(charId, charName, charImage, charHP) {

		var newDiv = '<div class= "col-xs-6 col-sm-4 col-md-2" id="'+charId+'">'+
				'<div class= "box text-center box-player-0">' +
					'<div class="player-name">'+
						'<p>'+charName+'</p>'+
					'</div>'+	
					'<img src='+ charImage + ' alt='+charName+'>'+
					'<div class= "player-HP">'+
						'<p>'+charHP+'</p>'+
					'</div>'+
				'</div>'+	       
			'</div>';
			console.log(newDiv);
			return newDiv;
}

function processUserCharChoice(indexChoice){

		character[indexChoice].userCharacter=true;
		yourCharaterIndex=indexChoice;
		for (var i=0;i<character.length;i++){
			if (i===indexChoice){
				$("#char-" + i).remove();  //remove from choices row
				var tempId = "player-chosen";
				$(".player").append(createCharacterDiv(tempId,character[i].name,character[i].image,character[i].healhPoints));			
				// $(".player").append($("#char-" + i));
			}
			else {
				$("#char-" + i).remove();  //remove from choices row
				var tempId = "enemy-"+i;
				console.log(tempId);
				$(".enemies").append(createCharacterDiv(tempId,character[i].name,character[i].image,character[i].healhPoints));			
				$("#message").html("Click on an Enemy to fight.")
				// $(".enemies").append($("#char-" + i));
			}
		}
		return;

}
function processDefenderDisplay(indexChoice){
	console.log("in procesDefenderDisplay");
	for (var i=0;i<character.length;i++){
			if (i===indexChoice){
				$("#enemy-" + i).remove();  //remove from choices row
				var tempId = "defender-"+i;
				$(".defender").append(createCharacterDiv(tempId,character[i].name,character[i].image,character[i].healhPoints));			
				// $(".player").append($("#char-" + i));
			}
			else {
				
			}
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
	var indexChar = 0;

	$("#char-0").click(function() {
		indexChar=0;
		processUserCharChoice(indexChar);
	});
	$("#char-1").click(function() {
		indexChar=1;
		console.log($("#char-1").parent());
		processUserCharChoice(indexChar);
	});
	$("#char-2").click(function() {
		indexChar=2;
		processUserCharChoice(indexChar);
	});
	$("#char-3").click(function() {
		indexChar=3;
		processUserCharChoice(indexChar);
	});

	$(".enemies").on('click',"#enemy-0",function() {
		console.log("clicked on emeny image");
		indexChar=0;
		processDefenderDisplay(indexChar);
	});

	$(".enemies").on('click',"#enemy-1",function() {
		console.log("clicked on emeny image");
		indexChar=1;
		processDefenderDisplay(indexChar);
	});
	$(".enemies").on('click',"#enemy-2",function() {
		console.log("clicked on emeny image");
		indexChar=;2
		processDefenderDisplay(indexChar);
	});
	$(".enemies").on('click',"#enemy-3",function() {
		console.log("clicked on emeny image");
		indexChar=3;
		processDefenderDisplay(indexChar);
	});
	


	console.log("at end");

});//end document ready function