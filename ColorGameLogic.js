/*jshint esversion: 6 */
console.log("connected");
//instance variables


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
  // var resetBtn = $("#resetBtn");
  // var colorText = $("#colorText");
  // var shapeText = $("#ShapeText");
  // var correctText = $("#correct");
  // var wrongText = $("#wrong");


{//adding variables to elements in doc

  var shapes = document.querySelectorAll(".shape");
  var newGameBtn = document.querySelector("#newBtn");
  var resetBtn = document.querySelector("#resetBtn");
  var colorText = document.querySelector("#colorText");
  var shapeText = document.querySelector("#ShapeText");
  var correctText = document.querySelector("#correct");
  var wrongText = document.querySelector("#wrong");
}

{//adding event listeners
  //event listeners for buttons
  newGameBtn.addEventListener("click", function(){
  	newGame();
  });

  resetBtn.addEventListener("click", function(){
  	changeMode();
    newGame();
  });

  	for(var i=0; i< shapes.length; i++){

      shapes[i].addEventListener("click", function(){
      var clickedColor = this.style.backgroundColor;
      var clickedShape = shapeList[answerPosition];
      if(clickedColor === pickedColor && clickedShape === pickedShape){
        correct +=1;
      //  newShapes(); //error here
      } else {
        wrong +=1;
      //  newShapes();//error here

      }
      resetShapes();
      updateDisplay();
      });
    }
}




  //changing colors and text content with selectors

{//initial control code


  resetShapes();
  updateDisplay();

  // colorText.textContent = pickedColor;
  //
  // colorText.style.color = generateColor();
  //
  //  shapeText.textContent = pickedShape;
  //  shapeText.style.color = generateColor();
  // correctText.textContent = correct;
  // wrongText.textContent = wrong;

}


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
    return "easy";

  } else {
    numOfShapesToShow = 6;
    return "hard";
  }


}




function newGame(){
  correct = 0;
	wrong = 0;
  resetShapes();
  updateDisplay();
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
    for (var j=numOfShapesToShow; j <=shapes.length; j++) {
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













////////////////////////
///non-program specific functions below


function randInt(num){
  return Math.floor(Math.random()*num);
}

function errorMessage(message){
  console.log("Error:\t" + message);
}
