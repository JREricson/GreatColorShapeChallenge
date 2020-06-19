/*jshint esversion: 6 */



var correct = 0;
var wrong = 0;



//picking colors and shapes
var ind = Math.floor(Math.random()*(6));
var pickedColor;
var pickedShape;

//variables for selectors
var shapes = document.querySelectorAll(".shape");

var newGameBtn = document.querySelector("#newBtn");
var resetBtn = document.querySelector("#resetBtn");
var colorText = document.querySelector("#colorText");
var shapeText = document.querySelector("#ShapeText");
var correctText = document.querySelector("#correct");
var wrongText = document.querySelector("#wrong");

//changing colors and text content with selectors
colorText.textContent = pickedColor;
colorText.style.color = generateColors(1);
shapeText.textContent = pickedShape;
shapeText.style.color = generateColors(1);
correctText.textContent = correct;
wrongText.textContent = wrong;


//event listeners for buttons
newGameBtn.addEventListener("click", function(){
	newGame();
});

resetBtn.addEventListener("click", function(){
	newShapes();
});



//logic for game



function gameLogic(){
	for(var i=0; i< shapes.length; i++){
		makeShape(i);
		isCorrect(i);
	};


}

function makeShape(i) {
	shapes[i].style.backgroundColor = colorList[i]; //error here
	//setting shapes

	if(shapeList[i] === "circle"){
		shapes[i].style.borderRadius = "50%";
	} else {
		shapes[i].style.borderRadius = "0%";}


}
function pickColorsAndShapes(){
	colorText.textContent = pickedColor;
	shapeText.textContent = pickedShape;

}


function isCorrect(i){

	shapes[i].addEventListener("click", function(){
	var clickedColor = this.style.backgroundColor;
	var clickedShape = shapeList[ind];
	if(clickedColor === pickedColor && clickedShape === pickedShape){
		correct +=1;
		newShapes(); //error here
	} else {
		wrong +=1;
		newShapes();//error here

	}



	});


}




function generateColors(num){
	var arr = [];
	var colorOptions = [
	"red",
	"blue",
	"yellow",
	"purple",
	"green",
	"orange"
	];

	for (var i=0; i< num; i++) {



		var loc = Math.floor(Math.random()*colorOptions.length);
		// arr.push(colorOptions[loc]);
		arr.push(colorOptions.splice(loc,1)[0]);

	}

	return arr;

}

function generateShapes(num) {
	var arr = [];
	var shapeOptions = ["square", "circle"];

	for (var i=0; i< num; i++) {
		var loc = Math.floor(Math.random()*shapeOptions.length);
		arr.push(shapeOptions[loc]);

	}

	return arr;

}


function newShapes(){




	//reset seleceted shapes and colors
	colorList = generateColors(6);
	shapeList = generateShapes(6);

	//assigns picked color
	ind = Math.floor(Math.random()*(6));
	pickedColor = colorList[ind];
	pickedShape = shapeList[ind];


	//displates new text on screen for choosen colors
	pickColorsAndShapes()
	colorText.style.color = generateColors(1);
	shapeText.style.color = generateColors(1);

	//displays right and wrong on screen
	correctText.textContent = correct;
	wrongText.textContent = wrong;


	//reset shapes on screen
	for (var i=0; i < shapes.length; i++) {
		makeShape(i);
	};

	//reset choosen colors





//right now --- color list and shape list not reseting
//           --- make shape feature also not working

	//things taht stay the same
		//counters
		//timer

}


function newGame(){
	//reset board
	correct = 0;
	wrong = 0;
	newShapes();
	timer(5)
	gameLogic()
	//reset timer
	//resetScore


}

///functions for timers

// var colorText = document.querySelector("#colorText");
// colorText.textContent = pickedColor;

var displayTime = document.querySelector("#timer");


function displayTimeLeft(secLeft){
	console.log(secLeft)
	displayTime.textContent = secLeft;

}

function timer(sec){
	const startTime = Date.now();
	const endTime = startTime + sec*1000;
	//display initial value
	displayTimeLeft(sec)



	countDown = setInterval(() => {
		const secLeft = Math.round((endTime- Date.now())/1000);
		//need to stop???
		if(secLeft <0) {
			clearInterval(countDown);
			return;
		}
		displayTimeLeft(parseInt(secLeft))
	}, 1000);

}


function clearShapes(){

}
