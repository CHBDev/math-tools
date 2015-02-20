var docBody = document.getElementById("body");

var meandiv = document.getElementById("meandiv");
var sumoutput = document.getElementById("sumoutput");
var orderedoutput = document.getElementById("orderedoutput");
var totaloutput = document.getElementById("totaloutput");
var meaninput = document.getElementById("meaninput");
var meanoutput = document.getElementById("meanoutput");
var medianoutput = document.getElementById("medianoutput");
var madoutput = document.getElementById("madoutput");
var modeoutput = document.getElementById("modeoutput");
var boxandwhiskeroutput = document.getElementById("boxandwhiskeroutput");


var meanbutton = document.getElementById("meanbutton");
var clearbutton = document.getElementById("clearbutton");
clearbutton.addEventListener("click", function(){
	
	meaninput.value = " ";
});


meanbutton.addEventListener("click", function(){
	
	updateMiddles();
	
});

function updateMiddles(){
	var numbers = getNumbersFromString(meaninput.value);

	for(var i = 0; i < numbers.length; i++){
		if( isNaN(numbers[i]) === true ){
			console.log("FAIL");
			meanoutput.innerHTML = "ERROR";
			return;
		}
	}
	var threeValues = getLowHighAndMode(numbers);
	var mean = meanfunction(numbers);
	var median = medianfunction(numbers);
	var mad = madfunction(mean, numbers);
	var mode = threeValues.mode;
	var sum = sumArray(numbers);

	sumoutput.innerHTML = "" + sum;
	orderedoutput.innerHTML = "" + numbers;
	totaloutput.innerHTML = "" + numbers.length;
	medianoutput.innerHTML = "" + median;
	meanoutput.innerHTML = "" + mean;
	madoutput.innerHTML = "" + mad;
	modeoutput.innerHTML = "" + mode;

	boxandwhiskerfunction(median, numbers, threeValues);


}

function sumArray(numbers){
	var total = 0;
	for(var i = 0; i < numbers.length; i++){
		total += numbers[i];
	}
	return total;
}

function meanfunction(numbers){
	
	
	var total = sumArray(numbers);
	

	var mean = total / numbers.length;

	return mean;

}

function medianfunction(numbers){
	
	var median;
	if(numbers.length % 2 === 0){
		median = (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2])/2;
	}else{
		median = numbers[Math.floor(numbers.length / 2)];
	}
	
	return median;

}

function madfunction(mean, numbers){
	
	var totalDiff = 0;

	for(var i = 0; i < numbers.length; i++){
		totalDiff += Math.abs(numbers[i] - mean);  
	}
	var mad = ( totalDiff / numbers.length);
	
	return mad;

}

function boxandwhiskerfunction(median, numbers, threeValues){
	var leftSide = [];
	var rightSide = [];

	for(var i = 0; i < Math.floor(numbers.length / 2); i++){
		leftSide.push(numbers[i]);
	}

	for(var i = numbers.length - 1, count = Math.floor(numbers.length / 2); count > 0 ; i--, count--){
		rightSide.push(numbers[i]);
	}

	console.log(leftSide);
	console.log(rightSide);

	rightSide = sortLowToHigh(rightSide);

	var leftSideMedian = medianfunction(leftSide);
	var rightSideMedian = medianfunction(rightSide);

	var low = threeValues.low;
	var high = threeValues.high;

	boxandwhiskeroutput.innerHTML = "(low: " + low + ") (quarter: " + leftSideMedian + ") (median: " + median + ") (quarter: " + rightSideMedian + ") (high: " + high +")";

	var returnArr = [low, leftSideMedian, median, rightSideMedian, high];
	return returnArr;

}




function getLowHighAndMode(numbers){
	var threeValues = {};
	threeValues.low = numbers[0];
	threeValues.high = numbers[0];
	threeValues[numbers[0]] = 1;
	threeValues.mode;

	var thisNumber;
	for(var i = 1; i < numbers.length; i++){
		thisNumber = numbers[i];

		if(thisNumber < threeValues.low) threeValues.low = thisNumber;
		if(thisNumber > threeValues.high) threeValues.high = thisNumber;

		if(threeValues.hasOwnProperty(thisNumber) ){
			threeValues[thisNumber]++;
		}else{
			threeValues[thisNumber] = 1;
		}
	}

	var highestMode = numbers[0];
	for(var i = 1; i < numbers.length; i++){
		thisNumber = numbers[i];
		if(threeValues[thisNumber] > threeValues[highestMode]){
			highestMode = thisNumber;
		}

	}

	threeValues.mode = highestMode;

	return threeValues;
}



function getNumbersFromString(str){
	var numbers = [];
	var subString = "";
	var currentIndex = 0;
	var currentChar;

	while(currentIndex < str.length){
		findNextNumber();
	}



	function findNextNumber(){
		currentChar = str[currentIndex];
		currentIndex++;
		if(currentChar === "," || currentChar === " "){
			if(subString === ""){
				return;
			}

			numbers.push(+subString);
			subString = "";
			return;
		}

		if( isNaN(+currentChar) === true && currentChar !== "."){
			subString = "ERROR";
			numbers.push(subString);
			return;
		}

		subString = "" + subString + currentChar;
 		
		if(currentIndex === str.length){
			numbers.push(+subString);
		}
	}



	return sortLowToHigh(numbers);
}

function sortLowToHigh(numbers){
	
	var tempArr = [];
	tempArr.push(numbers[numbers.length - 1]);

	function test(index,tempArr){
		
		if(index < 0){
			return tempArr;
		}
		var innerIndex = tempArr.length - 1;

		tempArr = moveLeft(numbers[index], innerIndex, tempArr);

		return test(index - 1, tempArr);

	}

	function moveLeft(thing, innerIndex, tempArr){
		if(thing < tempArr[innerIndex]){
			if(innerIndex === 0){
				tempArr.unshift(thing);
				return tempArr;
			}
			return moveLeft(thing, innerIndex - 1, tempArr);
		}

		//insert thing to the right of innerIndex
		tempArr.splice(innerIndex + 1, 0, thing);
		
		return tempArr;

	}

	return test(numbers.length - 2, tempArr);
	


}

	








