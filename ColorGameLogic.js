/*jshint esversion: 6 */

//instance variables
var highScores = [];
var highscore =0;

var lastWasCorrect;
var curMode = "hard";
  var score = 0;
    var curTime = 40;
   var answerPosition = 0;
   var numOfShapesToShow = 6;
   var correct =0;
   var wrong=0;
   var pickedShape="not set";
   var pickedColor="not set";
   const  colorOptions = [
  "red",
  "blue",
  "yellow",
  "purple",
  "green",
  "orange"
  ];

  	var shapeOptions = ["square", "circle"];

    var colorList = [];
    var shapeList = [];




  //
  // //variables for selectors
  //
  // var shapes =$(".shape");
  //
  // var newGameBtn =$("#newBtn");
  // var difficultyBtn = $("#difficultyBtn");
  // var colorText = $("#colorText");
  // var shapeText = $("#ShapeText");
  // var correctText = $("#correct");
  // var wrongText = $("#wrong");


{//adding variables to elements in doc
var countDownTimer;
  var shapes = document.querySelectorAll(".shape");
  var newGameBtn = document.querySelector("#newBtn");
  var difficultyBtn = document.querySelector("#difficulty");
  var colorText = document.querySelector("#colorText");
  var shapeText = document.querySelector("#ShapeText");
  var correctText = document.querySelector("#correct");
  var wrongText = document.querySelector("#wrong");
  var timerText = document.querySelector("#timer");
  var scoreText = document.querySelector("#score");
  var instructionText = document.querySelector("#instr");
  var gameOverText = document.querySelector("#gameOver");
  var highScoreText = document.querySelector("#highScore");
  var endScoreText = document.querySelector("#endScore");


}

{//adding event listeners
  //event listeners for buttons
  newGameBtn.addEventListener("click", function(){
  	newGame();
  });

  difficultyBtn.addEventListener("click", function(){
  	curMode = changeMode();
    newGame();
  });

    addGamelogicListenersToShapes();

}




  //changing colors and text content with selectors

// {//initial control code
//
//
//   resetShapes();
//   updateDisplay();
//
// }


//functions
///////////////

function generateNewColorsAndShapes(){
//clearing old lists
 colorList= [];
  shapeList= [];


  	for (var i=0; i< numOfShapesToShow; i++) {
      //adding anser to list if at the correct position
      if (i==answerPosition){
        colorList.push(pickedColor);
        shapeList.push(pickedShape);

      } else {
        //generateing colors and shapes and only adding if not the same combo as was chosen
          var newColor, newShape;
        do{
         newColor = colorOptions[randInt(colorOptions.length)];
         newShape = shapeOptions[randInt(shapeOptions.length)];

      } while (newColor==pickedColor && newShape == pickedShape);
      colorList.push(newColor);
      shapeList.push(newShape);
      }

  	}

}

//shape generaters assum max num does not overfill array
function generateColor(){//refactor to randomColor

  var color  = colorOptions[randInt(colorList.length)];
  return color;

}

function generateShape(){//refactor to randomShape
  var shape  = shapeOptions[randInt(shapeOptions.length)];
    return shape;
}


function pickAnswerColorsAndShapes(numOfShapes){
  pickedColor = generateColor(numOfShapes);
  pickedShape = generateShape();
}


function changeMode(){ //Todo - function not done yet
  if (numOfShapesToShow == 6){
    numOfShapesToShow = 3;
          difficultyBtn.textContent = "mode: easy";
    return "easy";

  } else {
    numOfShapesToShow = 6;
      difficultyBtn.textContent = "mode: hard";
    return "hard";
  }


}

function updateCounterDisplay(){

    timerText.textContent = curTime;

}

function addScoreToHighScores(scr){
  //inset at proper location

}

function showHighScores(){

}

function addToHighScores(){
  if (score>highscore){
    highscore = score;
    return true;
  } else {
    return false;
  }
}




// function countdownUpdate(){
//   dlog("in countdown" );
//   if (curTime >=0){
//
//     curTime--;
//      updateCounterDisplay();
//
//
//   } else {
//      updateCounterDisplay();
//     endgame();
//     //return;
//   }
// }

function endGame(){
  var audio = new Audio('media/84226__josomebody__crash.wav'); //https://freesound.org/people/josomebody/sounds/84226/
audio.play();
  instructionText.style.color= "#212121";
  colorText.style.color= "#212121";
  shapeText.style.color= "#212121";
  gameOverText.style.color= "#e8bc43";
  gameOverText.innerHTML = "Game Over!!!";

  //Todo add new high scores to game over text


if ( addToHighScores()){
  //endScoreText.innerHTML ="test";

  endScoreText.innerHTML =( "   --- new high Score: "+ highscore);
  dlog(highscore+"is the high");


} else {

    endScoreText.innerHTML =( "  --- your score was: "+ score);

}

gameOverText.style.color= "#e8bc43";
endScoreText.style.color= "#e8bc43";


//hiding background shapes
  for(var i=0; i< shapes.length; i++){


  shapes[i].style.backgroundColor = "#212121";
  }

    //removeListeners
    //removeEventListersFromShapes();





}




function newGame(){
  endScoreText.innerHTML = "";
  instructionText.style.color= "white";
  gameOverText.style.color= "#212121";
   highScoreText.innerHTML = highscore;
  removeEventListersFromShapes();


  if (typeof(countDownTimer)!="undefined"){
      clearInterval(countDownTimer);
  }

  resetVariables();
  resetShapes();
  updateDisplay();
  //setInterval(function(){ alert("Hello"); }, 3000);
  //setInterval(countdownUpdate(), 1000);
countDownTimer =  setInterval(function countdownUpdate(){

    if (curTime >0){

      curTime--;
       updateCounterDisplay();


    } else {
       updateCounterDisplay();
       clearInterval(countDownTimer);
      endGame();
      //return;
    }
  }, 1000);
  //setInterval(countdownUpdate(), 1000);
  //new timer
}


function resetShapes(){
  answerPosition = randInt(numOfShapesToShow);
  pickAnswerColorsAndShapes(numOfShapesToShow);//need to update to grab from array
  generateNewColorsAndShapes();
    //styleNewShapes();

}
/////////////////////
//code for stying below








function updateDisplay(){//not set up for easy/hard mode yet

  //setting content of text on display
  colorText.textContent = pickedColor;
   shapeText.textContent = pickedShape;


  //styling colors of text on display
  colorText.style.color = generateColor();
  shapeText.style.color = generateColor();

  //displays num of right and wrong on screen
  correctText.textContent = correct;
  wrongText.textContent = wrong;

  //stying new shapes
  styleNewShapes();

}



function styleNewShapes(){
  for (var i=0; i <numOfShapesToShow; i++) {
		makeShape(i);
	};


  if( numOfShapesToShow<shapes.length){
    for (var j=numOfShapesToShow; j <shapes.length; j++) {
	shapes[j].style.backgroundColor = "#212121";
    }

  }
}


function makeShape(i) {
	shapes[i].style.backgroundColor = colorList[i];
	//setting shapes

	if(shapeList[i] === "circle"){
		shapes[i].style.borderRadius = "50%";

	} else {
		shapes[i].style.borderRadius = "0%";}
}
/////////////////
//timer
function resetVariables(){
  score = 0;
  correct = 0;
  wrong = 0;
  curTime = 5;
}


function updateScore(ansCorrect){
  if (ansCorrect){
    score = score*2+30;
  } else{
    score -= Math.floor(score*0.7+15);
  }

  if (score<0){
    score = 0;
  }
  scoreText.textContent =  score;

}

function removeEventListersFromShapes(){
  for(var i=0; i< numOfShapesToShow; i++){

  //  shapes[i].removeEventListener("click", shapeLogic());
}
}

function addGamelogicListenersToShapes(){


for(var i=0; i< numOfShapesToShow; i++){

  shapes[i].addEventListener("click", function shapeLogic(){
  var clickedColor = this.style.backgroundColor;
  var clickedShape = shapeList[answerPosition];
  if(clickedColor === pickedColor && clickedShape === pickedShape){
    lastWasCorrect=true;
    correct++;
  //  newShapes(); //error here
  } else {
    lastWasCorrect=false;
    wrong++;
  //  newShapes();//error here

  }
  updateScore(lastWasCorrect);
  resetShapes();
  updateDisplay();
  });
}

}






////////////////////////
///non-program specific functions below


function randInt(num){
  return Math.floor(Math.random()*num);
}

function errorMessage(message){
  console.log("Error:\t" + message);
}

function clog(text){
  console.log(text);

}

function dlog(text){
  console.log("debug: " + text);

}
