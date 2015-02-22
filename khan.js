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
	numbers = sortLowToHigh(numbers);

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
	var nextNumNeg = 1;

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

			var newNumber = +subString;
			newNumber *= nextNumNeg;
			nextNumNeg = 1;

			numbers.push(newNumber);
			subString = "";
			return;
		}

		if(currentChar === "-"){

			nextNumNeg = -1;
			return;
		}

		if( isNaN(+currentChar) === true && currentChar !== "."){
			subString = "ERROR";
			numbers.push(subString);
			return;
		}

		subString = "" + subString + currentChar;
 		
		if(currentIndex === str.length){
			var newNumber = +subString;
			newNumber *= nextNumNeg;
			nextNumNeg = 1;
			numbers.push(newNumber);
		}
	}

console.log(numbers);

	return numbers;
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

//========

var boxinput = document.getElementById("boxinput");
var boxsurfaceoutput = document.getElementById("boxsurfaceoutput");
var boxclearbutton = document.getElementById("boxclearbutton");
var boxbutton = document.getElementById("boxbutton");
boxbutton.addEventListener("click", function(){
	
	updateboxes();
});


boxclearbutton.addEventListener("click", function(){
	
	boxsurfaceoutput.value = " ";
	
});

function updateboxes(){

	var LWH = getNumbersFromString(boxinput.value);
	if(LWH.length !== 3){
		boxsurfaceoutput.innerHTML = "ERROR";
		return;
	}
	var surfacearea = getSurfaceOfBox(LWH);
	var volume = getVolumeOfBox(LWH);
	console.log(surfacearea);

	boxsurfaceoutput.innerHTML = "" + surfacearea + " square units";
	boxvolumeoutput.innerHTML = "" + volume + " cube units";
}

function getSurfaceOfBox(LWH){
	var total = 0;

	var L = LWH[0];
	var W = LWH[1];
	var H = LWH[2];

	total += 2 * L * H;
	total += 2 * L * W;
	total += 2 * H * W;

	return total;

}

function getVolumeOfBox(LWH){
	return LWH[0] * LWH[1] * LWH[2];
}

//---------

var pyramidinput = document.getElementById("pyramidinput");
var pyramidsurfaceoutput = document.getElementById("pyramidsurfaceoutput");
var pyramidclearbutton = document.getElementById("pyramidclearbutton");
var pyramidbutton = document.getElementById("pyramidbutton");
pyramidbutton.addEventListener("click", function(){
	
	updatepyramids();
});


pyramidclearbutton.addEventListener("click", function(){
	
	pyramidsurfaceoutput.value = " ";
	
});

function updatepyramids(){

	var LWH = getNumbersFromString(pyramidinput.value);
	if(LWH.length !== 3){
		pyramidsurfaceoutput.innerHTML = "ERROR";
		return;
	}
	var surfacearea = getSurfaceOfpyramid(LWH);
	var volume = getVolumeOfpyramid(LWH)
	console.log(surfacearea);

	pyramidsurfaceoutput.innerHTML = "" + surfacearea + " square units";
	pyramidvolumeoutput.innerHTML = "" + volume + " cube inits";
}

function getSurfaceOfpyramid(LWH){
	var total = 0;

	var L = LWH[0];
	var W = LWH[1];
	var H = LWH[2];

	total += L * W;
	total += L * H;
	total += W * H;

	return total;

}

function getVolumeOfpyramid(LWH){
	return "not implemented";
}

//--------

var triprisminput = document.getElementById("triprisminput");
var triprismsurfaceoutput = document.getElementById("triprismsurfaceoutput");
var triprismclearbutton = document.getElementById("triprismclearbutton");
var triprismbutton = document.getElementById("triprismbutton");
triprismbutton.addEventListener("click", function(){
	
	updatetriprisms();
});


triprismclearbutton.addEventListener("click", function(){
	
	triprismsurfaceoutput.value = " ";
	
});

function updatetriprisms(){

	var LWHS = getNumbersFromString(triprisminput.value);
	if(LWHS.length !== 4){
		triprismsurfaceoutput.innerHTML = "ERROR";
		return;
	}
	var surfacearea = getSurfaceOftriprism(LWHS);
	var volume = getVolumeOftriprism(LWHS)
	console.log(surfacearea);

	triprismsurfaceoutput.innerHTML = "" + surfacearea + " square units";
	triprismvolumeoutput.innerHTML = "" + volume + " cube inits";
}

function getSurfaceOftriprism(LWHS){
	var total = 0;

	var L = LWHS[0];
	var W = LWHS[1];
	var H = LWHS[2];
	var S = LWHS[3];
	console.log(LWHS);

	total += L * W;

	total += 2 * W * S;
	total += (H * L)/2 * 2;
	

	return total;

}

function getVolumeOftriprism(LWH){
	return "not implemented";
}

//FRACTIONS

var fractioninput1 = document.getElementById("fractioninput1");
var fractioninput2 = document.getElementById("fractioninput2");
var fractioninput3 = document.getElementById("fractioninput3");
var fractioninput4 = document.getElementById("fractioninput4");
var fractionaddoutput = document.getElementById("fractionaddoutput");
var fractionsubtractoutput = document.getElementById("fractionsubtractoutput");
var fractionmultiplyoutput = document.getElementById("fractionmultiplyoutput");
var fractiondivideoutput = document.getElementById("fractiondivideoutput");
var fractionclearbutton = document.getElementById("fractionclearbutton");
var fractionbutton = document.getElementById("fractionbutton");
fractionbutton.addEventListener("click", function(){
	
	updatefractions();
});


fractionclearbutton.addEventListener("click", function(){
	
	fractioninput1.value = " ";
	fractioninput2.value = " ";
	fractioninput3.value = " ";
	fractioninput4.value = " ";
	
});

function updatefractions(){

	var frac1 = getNumbersFromString(fractioninput1.value);
	var frac2 = getNumbersFromString(fractioninput2.value);
	var frac3 = getNumbersFromString(fractioninput3.value);
	var frac4 = getNumbersFromString(fractioninput4.value);
	
	var fractionadd = getFractionAdd(frac1,frac2,frac3,frac4);
	var fractionsubtract = getFractionSubtract(frac1,frac2,frac3,frac4);
	var fractionmultiply = getFractionMultiply(frac1,frac2,frac3,frac4);
	var fractiondivide = getFractionDivide(frac1,frac2,frac3,frac4);
	
	//var fractionsubtract = getFractionSubtract(frac1,frac2,frac3,frac4);
	//var fractionmultiply = getFractionMultiply(frac1,frac2,frac3,frac4);
	//var fractiondivide = getFractionDivide(frac1,frac2,frac3,frac4);
	

	fractionaddoutput.innerHTML = "" + fractionadd[0] + "/" + fractionadd[1];
	fractionsubtractoutput.innerHTML = "" + fractionsubtract[0] + "/" + fractionsubtract[1];
	fractionmultiplyoutput.innerHTML = "" + fractionmultiply[0] + "/" + fractionmultiply[1];
	fractiondivideoutput.innerHTML = "" + fractiondivide[0] + "/" + fractiondivide[1];
	
}

function getFractionAdd(frac1, frac2, frac3, frac4){

	var divisor1 = greatestCommonFactor([frac1, frac2]);
	frac1 /= divisor1;
	frac2 /= divisor1;

	var divisor2 = greatestCommonFactor([frac3, frac4]);
	frac3 /= divisor2;
	frac4 /= divisor2;

	var LCD = getLowestCommonDenomenator([frac2, frac4]);

	var leftMult = LCD/frac2;
	var rightMult = LCD/frac4;


	frac1 *= leftMult;
	frac2 = LCD;
	frac3 *= rightMult;
	frac4 = LCD;

	var top = frac1 + frac3;
	var bottom = frac2;

	var finalDivisor = greatestCommonFactor([top, bottom]);
	console.log("final divisor " + finalDivisor);
	top /= finalDivisor;
	bottom /= finalDivisor;

	return [top,bottom];



}

function getFractionSubtract(frac1, frac2, frac3, frac4){

	var divisor1 = greatestCommonFactor([frac1, frac2]);
	frac1 /= divisor1;
	frac2 /= divisor1;

	var divisor2 = greatestCommonFactor([frac3, frac4]);
	frac3 /= divisor2;
	frac4 /= divisor2;

	var LCD = getLowestCommonDenomenator([frac2, frac4]);

	var leftMult = LCD/frac2;
	var rightMult = LCD/frac4;


	frac1 *= leftMult;
	frac2 = LCD;
	frac3 *= rightMult;
	frac4 = LCD;

	var top = frac1 - frac3;
	var bottom = frac2;

	var finalDivisor = greatestCommonFactor([top, bottom]);
	console.log("final divisor " + finalDivisor);
	top /= finalDivisor;
	bottom /= finalDivisor;

	return [top,bottom];



}

function getFractionMultiply(frac1, frac2, frac3, frac4){
	

	var top = frac1 * frac3;
	var bottom = frac2 * frac4;

	var finalDivisor = greatestCommonFactor([top, bottom]);
	top /= finalDivisor;
	bottom /= finalDivisor;

	return [top,bottom];
}

function getFractionDivide(frac1, frac2, frac3, frac4){
	
	if(frac3 < 0){
		frac3 *= -1;
		frac4 *= -1;
	}

	var top = frac1 * frac4;
	var bottom = frac2 * frac3;

	var finalDivisor = greatestCommonFactor([top, bottom]);
	top /= finalDivisor;
	bottom /= finalDivisor;

	return [top,bottom];
}

function getLowestCommonMultiple(list){

}

function getLowestCommonDenomenator(numbers){

	var bigList = [];
	for(var i = 0; i < numbers.length; i++){
		bigList.push({base: numbers[i], multiple: numbers[i]});
	}

	function multiplier(index, bigList){

		if(index === bigList.length){
			index = 0;
		}

		if(isEqualToTheRest(bigList[index].multiple, bigList)){
			return bigList[index].multiple;
		}

		if(isEqualOrHigherThanTheRest(bigList[index].multiple, bigList)){
			return multiplier(index + 1, bigList);
		}

		bigList[index].multiple += bigList[index].base;

		return multiplier(index, bigList);

	}

	function isEqualOrHigherThanTheRest(number, bigList){

		for(var i = 0; i < bigList.length; i++){
			if(number < bigList[i].multiple){
				return false;
			}
		}
		return true;
	}

	function isEqualToTheRest(number, bigList){
		for(var i = 0; i < bigList.length; i++){
			if(number !== bigList[i].multiple){
				return false;
			}
		}
		return true;
	}

	return multiplier(0,bigList);

}

	function greatestCommonFactor(numbers){
		var bigList = [];
		for(var i = 0; i < numbers.length; i++){
			bigList.push(getMultiples(numbers[i], true));
		}

		for(var j = bigList[0].length - 1; j >= 0; j--){
			var allHaveNumber = true;
			for(var k = 1; k < bigList.length; k++){
				
				if(hasNumber(bigList[k],bigList[0][j]) === false){
					allHaveNumber = false;
					break;
				}
			}

			if(allHaveNumber === true){
				return bigList[0][j];
			}
			
		}

		return 1;

	}

	function hasNumber(arr, num){
		for(var i = 0; i < arr.length; i++){
			if(arr[i] === num){
				return true;
			}
		}
		return false;
	}

	function getMultiples(num, include1AndSelf){
		var numList = [];
	
		if(include1AndSelf === true){
			for(var i = 1; i <= num; i++){
				if(num % i === 0){
					numList.push(i);
				}
			}
		}else{
			for(var i = 2; i < num; i++){
				if(num % i === 0){
					numList.push(i);
				}
			}
		}
		
		numList = sortLowToHigh(numList);
		return numList;
	}

	function isPrime(num){
		if(num % 1 !== 0){
			return false;
		}

		if(num < 2){
			return false;
		}

		var numList = getMultiples(num, true);
		if(numList.length > 2){
			return false;
		}

		return true;
	}

	function primeFactorization(num){

		if(isPrime(num)){
			return [num];
		}
		num = +num;

		num = Math.floor(num);

		var numList = getMultiples(num);
		var primeMultiples = [];
		var factorization = [];
		for(var i = 0; i < numList.length; i++){
			if(isPrime(numList[i]) === true ){
				primeMultiples.push([numList[i],1, 0]);
			}
		}


		//var highestPrime = primeMultiples[primeMultiples.length - 1];
		//highestPrime[2] = 1;
		//highestPrime[1] = highestPrime[0]; 


		function mainLoop(index, arr){
			var total = 1;
			for(var i = 0; i<arr.length; i++){
				total *=   arr[i][1];
			}

			if(total === num){
				for(var j = 0; j<arr.length; j++){
					if(arr[j][2] > 0){
						for(var k = 0; k < arr[j][2]; k++){
							factorization.push(arr[j][0]);
						}
						
					}
				}
				return factorization;
			}

			if(total > num){
				arr[index][1] = 1;
				arr[index][2] = 0;

				arr[index - 1][2] += 1;
				arr[index - 1][1] *= arr[index - 1][0];
				index = arr.length - 1;
			}

			if(total < num){
				arr[index][2] += 1;
				arr[index][1] *= arr[index][0];
			}

			return mainLoop(index, arr);

		}


		return mainLoop(primeMultiples.length - 1, primeMultiples);

	}

	console.log("PF ", primeFactorization(6784693));

//divisible
//2 if last number is divisible by 2
//3 if sum of digits is divisible by 3, so on and so on
//4 if last 2 digits divisible by 4
//5 if 5 or 0
//6 if both 2 and 3
//9 if sum of digits divisible by 9
//10 last digit is 0

//prime factorization
//any number is made up of prime multiplied in one way only







