function myFunction() {
    var row1 = [];
        tiles = [];
        count = 0;
        gameEnd = false;

    var x = document.querySelectorAll("label");
    var defaultColor = x[0].backgroundColor;
    for (i = 0; i < x.length; i++) {
        tiles[i] = 4;
        x[i].innerHTML =tiles[i];
        x[i].innerText = tiles[i]; // for IE
        x[i].style.backgroundColor = "red";

    }

    //hide replay buttons
	document.getElementById("btnReplay1").style.display='none';
	document.getElementById("btnReplay2").style.display='none';

	//Reset 
	document.getElementById("robotId").innerHTML='';
	document.getElementById("robotId").innerText='';

	document.getElementById("userId").innerHTML='';
	document.getElementById("userId").innerText='';

    //clear the main mancalas
    tiles[0] = 0;
    x[0].innerHTML = "";
    x[0].style.backgroundColor = defaultColor;

    tiles[15] = 0;
    x[15].innerHTML = "";
    x[15].style.backgroundColor = defaultColor;

}
function mouseClick(value){
	var number = tiles[value.id];
	var counter = value.id;
	tiles[value.id] = 0;
 
    
	//set the value of the selected text to 0;
	var x = document.getElementById(counter);
	x.innerHTML = tiles[counter];

	 

	if(typeof x.innerHTML == "undefined") //check for IE
	{
		x.innerText  = tiles[counter];
	}
	
	x.style.backgroundColor = "red";

	var isUseronRobot = false;
	var isSuccessfulPlay = false;

	var isTypeUser = false;
	var isRobotItself = false;

    if(counter <= 7)
    	isTypeUser = true;
    

	while(number > 0 && gameEnd === false)
	{
		if(isUseronRobot === true) // user on robot side
		{
			counter = counter;
			isUseronRobot = false;
			tiles[counter] = tiles[counter] + 1;

			number --;
     		isSuccessfulPlay = true;

		}
		else if(isRobotItself === true) //robot itself
		{
			counter = counter;
			isRobotItself = false;
			tiles[counter] = tiles[counter] + 1;

			number --;

			isSuccessfulPlay = true;
		}
		else if(counter <= 7) // user 
		{
			counter --;
			number --;
			
      
			if(number == 0 && parseInt(tiles[counter]) == 0 && isTypeUser === true && counter != 0)
			{
				//alert("Falls on opposite : id :" + counter);
				tiles[counter] = tiles[counter] + 1;
				tiles[0] = tiles[0] + tiles[counter + 7] + tiles[counter];
				tiles[counter + 7] = 0;
				tiles[counter] = 0;
				writeDisplay(counter + 7) ;
				counter=0;

	    	    isSuccessfulPlay = true;
				//take opponent tiles here
			}
			else if(number == 0 && counter == 0)
			{
				isSuccessfulPlay = false;
			   // alert("Its a redo");
			    tiles[counter] = tiles[counter] + 1;

			    document.getElementById("userId").innerHTML="Your turn again!!!";
	            document.getElementById("userId").innerText="Your turn again!!!";
	            document.getElementById("userId").style.backgroundColor = "red";

	            document.getElementById("robotId").innerHTML='';
	            document.getElementById("robotId").innerText='';
			// Replay when it falls on your mancala
			}
			else
			{
				tiles[counter] = tiles[counter] + 1;
	    	    isSuccessfulPlay = true;
			}
			
		}
		else  // robot
		{
			counter ++;
			number --;

	    	if(number == 0 && parseInt(tiles[counter]) == 0 && isTypeUser === false && counter != 15) // falls on the opposite
	    	{
	    		//alert("Falls on opposite robot : id :" + counter);
	    		tiles[counter] = tiles[counter] + 1;
				tiles[15] = tiles[15] + tiles[counter - 7] + tiles[counter];
				tiles[counter - 7] = 0;
				tiles[counter] = 0;
				writeDisplay(counter - 7) ;
				counter=15;

	    	    isSuccessfulPlay = true;

	    	}
	    	else if(number == 0 && counter == 15)
	    	{
	    		isSuccessfulPlay = false;
			  //  alert("Its a redo");
			    tiles[counter] = tiles[counter] + 1;

                document.getElementById("robotId").innerHTML="Computer's turn again!!!";
	            document.getElementById("robotId").innerText="Computer's turn again!!!";
	            document.getElementById("robotId").style.backgroundColor = "red";

	            document.getElementById("userId").innerHTML='';
	            document.getElementById("userId").innerText='';

			    robotPlay();
			// Replay when it falls on your mancala
	    	}
	    	else
	    	{
	    		tiles[counter] = tiles[counter] + 1;
	    		isSuccessfulPlay = true;
	    	}

	    	//Clears messages
            document.getElementById("robotId").innerHTML="";
        	document.getElementById("robotId").innerText="";

        	document.getElementById("userId").innerHTML="";
	        document.getElementById("userId").innerText="";


		}
		
        writeDisplay(counter);
		if(isSuccessfulPlay === true)
		{
			if(counter == 0)
			{
				counter = 8;
			    isUseronRobot = true;
			}
			if(counter == 14 && isTypeUser === true) // jump the robot mancala, changed from 15
			{
				counter = 7;
			    isUseronRobot = true;
			}
			if(counter == 1 && isTypeUser === false)
			{
				counter = 8;
				isUseronRobot = true;
			}
			if(counter == 15)
			{
				counter = 7;
			    isUseronRobot = true;
			}

		}

	}

	//Check for game over
	 if(gameEnd === false)
	 {
	 	if(tiles.slice(1,8).filter(isBigEnough).length == 0)
	 	{
	 		gameOver();
	 	}
	 	else if(tiles.slice(8,15).filter(isBigEnough).length == 0)
	 	{
	 		gameOver();
	 	}
	 	if(count == 0 && isSuccessfulPlay === true)
	 	{
	 		robotPlay();
	 	}
	
	}


	 
	count = 0;
	
}
function robotPlay()
{
	var y = document.createElement("LABEL");
	y.innerHTML = 8 ;

	y.id = numIndexes();//tiles[indexed[index]];
	if(typeof y.id === 'undefined')
	{
		gameOver();
	}
	//alert("New id is : " + y.id);
	count = 1;
	mouseClick(y);

}
function gameOver()
{
	/*
	for(i=1; i < (tiles.length - 1); i++)
	{
		if(i <= 7)
		{
			tiles[0] = tiles[0] + tiles[i];
			tiles[i] = 0;
			writeDisplay(i);
		}
		else if(i > 7)
		{
			tiles[15] = tiles[15] + tiles[i];
			tiles[i] = 0;
			writeDisplay(i);
		}

	}
	*/
	alert("Game Over!!!");
	 
	if(parseInt(tiles[0]) > parseInt(tiles[15]))
	{

		document.getElementById("userId").innerHTML = "You win with a score : " + tiles[0];
		document.getElementById("userId").innerText = "You win with a score : " + tiles[0];
		document.getElementById("userId").style.backgroundColor = "green";

	 
		document.getElementById("robotId").innerHTML = "Computer lose with a score : " + tiles[15];
		document.getElementById("robotId").innerText = "Computer lose with a score : " + tiles[15];
		document.getElementById("robotId").style.backgroundColor = "red";


	}
	else if(parseInt(tiles[15]) > parseInt(tiles[0]))
	{
		
		document.getElementById("robotId").innerHTML = "Computer wins with a score : " + tiles[15];
		document.getElementById("robotId").innerText = "Computer wins with a score : " + tiles[15];
		document.getElementById("robotId").style.backgroundColor = "green";

		document.getElementById("userId").innerHTML = " You lose with a score : " + tiles[15];
		document.getElementById("userId").innerText = "You lose with a score : " + tiles[15];
		document.getElementById("userId").style.backgroundColor = "red";
	}
	else
	{
		
		document.getElementById("robotId").innerHTML = "Its a tie with a score : " + tiles[15];
		document.getElementById("robotId").innerText = "Its a tie with a score : " + tiles[15];
		document.getElementById("robotId").style.backgroundColor = "green";

	   
		document.getElementById("userId").value = " Its a tie with a score : " + tiles[15];
		document.getElementById("userId").innerText = " Its a tie with a score : " + tiles[15];
		document.getElementById("userId").style.backgroundColor = "green";


	}

    //Show replay buttons

	document.getElementById("btnReplay1").style.display='block';
	document.getElementById("btnReplay2").style.display='block';
	gameEnd = true;
	writeDisplay(0);
	writeDisplay(15);
	

}
function numIndexes()
{
	var newIndexed = [];
	var r = 0;
	for( c=8; c < (tiles.length - 1); c++)
	{
			//newIndexed[c] = indexed
		if(tiles[c] > 0)
		{
			newIndexed.push(c);
			//alert("Nice is  : = " + newIndexed[r]);
			r++;
		}
	}
	var index = getRandomInt(0,(newIndexed.length - 1));
	//alert(" New Ic index : = " + index);

	return (newIndexed[index]);
}
function writeDisplay(counter)
{
	var x = document.getElementById(counter);
		x.innerHTML = tiles[counter];
		x.style.backgroundColor = "red";

}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function isBigEnough(value) {
  return value > 0;
}
function replayGame()
{
	myFunction();
}