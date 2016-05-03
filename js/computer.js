//comp class
function computer(num) {
    var handArray = new Array();
    var discardIndex;
    var playerNum = num;
    
    //adds a card the computers array
    this.addCard = function(newCard) {
       handArray.push(newCard);
    }
    
    //returns an array with the card at index removed
    var removeACardFromArray = function(arr, index) {
        var temp = new Array();
        discardPile.push(arr[index]);
        showDiscardCard();
        console.log("  Com" + num + " Played: " + arr[index])
        for (var i = 0; i < arr.length; i++)
            if (i != index) {
                temp.push(arr[i]);
            }
        return temp.slice();
    }
    
    //returns the index of the card inside the array;
    var indexOf = function(arr, cardObject) {
        for (var i = 0; i < arr.length; i++)
            if (cardObject.toString() === arr[i].toString())
                return i;
        return -1;
    }
    
    //returns true or false, indicating if it was able to play a card 
    this.playCard = function() {
        var indexOfCard = -1;
        var availableCards = handArray.slice();//copy the card
        
        do {
            if (availableCards.length == 0)//if no more cards 
                return false;
            else {
                indexOfCard = Math.floor(Math.random() * availableCards.length);
                console.log(availableCards[indexOfCard].toString());
                
                //two eye jack found, (wild)
                if (availableCards[indexOfCard].toString().includes("clover11") || availableCards[indexOfCard].toString().includes("diamond11")) {
                    console.log("two eyed jack found");
                    //choose a random number from [0,95] and check if you can drop a card there
                    var attemps = 0;
                    
                    do {
                        var location = Math.floor(Math.random() * 96);
                        var row;
                        if (location >= 0 && location <=7) {//range 0-7 row 0
                            row = 0;
                            location = location + 1;
                            console.log("row 0");   
                        }
                        else if (location >= 8 && location <= 17) {//range 8-17 row 1
                            row = 1;
                            location = location - 8;
                            console.log("row 1");
                        }
                        else if (location >= 18 && location <= 27) {//range 18-27 row 2
                            row = 2;
                            location = location - 18;
                            console.log("row 2");
                        }
                        else if (location >= 28 && location <= 37) {//range 28-37 row 3
                            row = 3;
                            location = location - 28;
                            console.log("row 3");
                        }
                        else if (location >= 38 && location <= 47){ //range 38-47 row 4
                            row = 4;
                            location = location - 38;
                            console.log("row 4");                        
                        }       
                        else if (location >= 48 && location <= 57) {//range 48-57 row 5
                            row = 5;
                            location = location - 48;
                            console.log("row 5");
                        }
                        else if (location >= 58 && location <= 67) {//range 58-67 row 6
                            row = 6;
                            location = location - 58;
                            console.log("row 6");
                        }
                        else if (location >= 68 && location <= 77) {//range 68-77 row 7
                            row = 7;
                            location = location - 68;
                            console.log("row 7");
                        }
                        else if (location >= 78 && location <= 87) {//range 78-87 row 8
                            row = 8;
                            location = location - 78;
                            console.log("row 8");
                        }
                        else {//range 88-95 row 8
                            row = 9;
                            location = location - 88;
                            location = location + 1;
                            console.log("row 9");
                        }
                       
                        var cardId = $("#row" + row).children()[location].id;
                        var isFree = true;
                        for (var i = 1; i <=3; i++) {
                            var token = $("#" + cardId).children()[i].id;
                            if ($("#" + token).css("visibility") != "hidden")//if the game board has a token present
                                isFree = false;
                        }
                        
                        if (isFree) {
                            var token = $("#" + cardId).children()[playerNum].id;
                            $("#" + token).css("visibility",'visible');//set the token to visible
                            //remove joker from handArray
                            console.log("played a two eyed joker at " + cardId);
                            indexOfCard = indexOf(handArray, availableCards[indexOfCard]);
                            if (indexOfCard == -1) {
                                console.log("INDEX OF RETURNED -1 GHOST CARD");
                                console.log("THIS IS IN TWO EYE JACK");
                                return false;   
                            }
                            handArray = removeACardFromArray(handArray, indexOfCard);//removes the card from the hand
                            return true;
                        }
                        
                        attemps++;
                    } while (attemps < 200)
                    availableCards = removeACardFromArray(availableCards, indexOfCard);//remove card from array
                }//one eye jack found (removal)
                else if (availableCards[indexOfCard].toString().includes("heart11") || availableCards[indexOfCard].toString().includes("spade11")) {
                    console.log("one eyed jack found");
                    var enemyLocations = new Array();
                    for (var i = 0; i <= 9; i++)//rows
                        for (var j = 0; j <=9; j++) {//individual cards
                            if (i == 0 || i == 9)
                                if (j == 0 || j == 9)
                                    continue;//those are the wild cards on the board
                            
                            var cardId = $("#row" + i).children()[j].id;
                            var isFree = true;
                            for (var x = 1; x <=3; x++)
                                if (x != playerNum) {
                                    var token = $("#" + cardId).children()[x].id;
                                        if ($("#" + token).css("visibility") != "hidden")//if the game board has a token present
                                            isFree = false;
                                }
                            if (!isFree)//the board place has an enemy piece on it
                               enemyLocations.push(cardId);//save the card name
                        }
                    if (enemyLocations.length == 0) {//there are no enemies to remove with this card, its dead
                        availableCards = removeACardFromArray(availableCards, indexOfCard);//remove card from array
                        continue;
                    }
                    var indexOfCardToRemove = Math.floor(Math.random() * enemyLocations.length);
                    var cardId = enemyLocations[indexOfCardToRemove];
                    console.log("card removed is " + cardId);
                    for (var x = 1; x <= 3; x++) {
                        var token = $("#" + cardId).children()[x].id;
                        $("#" + token).css("visibility", "hidden");
                    }
                    indexOfCard = indexOf(handArray, availableCards[indexOfCard]);
                    if (indexOfCard == -1) {
                        console.log("INDEX OF RETURNED -1 GHOST CARD");
                        console.log("THIS IS IN ONE EYE JACK");
                        return false;   
                    }
                    handArray = removeACardFromArray(handArray, indexOfCard);//remove the card from the hand
                    return true;
                }
                else {
                    console.log("attempting a non jack card");
                    var isFree = true;
                    var isFree2 = true;
                    for (var i = 1; i <= 3; i++) {
                        var token = $("#" + availableCards[indexOfCard].toString()).children()[i].id;
                        if ($("#" + token).css("visibility") != "hidden")//if the first place has a visible token
                            isFree = false;
                        token = $("#" + availableCards[indexOfCard].toString() + "_1").children()[i].id;
                        if ($("#" + token).css("visibility") != "hidden")//if the second place has a visible token
                            isFree2 = false;
                    }
                    
                    if (isFree && isFree2) {//both locations are available, choose one randomly
                        var topOrBottom = Math.floor(Math.random() * 2);
                        var token;
                        if (topOrBottom == 0)
                            token = $("#" + availableCards[indexOfCard].toString()).children()[playerNum].id;                 
                        else
                            token = $("#" + availableCards[indexOfCard].toString() + "_1").children()[playerNum].id;
                        $("#" + token).css("visibility",'visible');//set the token to visible
                        indexOfCard = indexOf(handArray, availableCards[indexOfCard]);
                        if (indexOfCard == -1) {
                            console.log("INDEX OF RETURNED -1 GHOST CARD");
                            console.log("THIS IS REGULAR CARD");
                            return false;   
                        }
                        handArray = removeACardFromArray(handArray, indexOfCard);
                        return true;
                    }
                    else if (isFree) {//the first location is available
                        var token = $("#" + availableCards[indexOfCard].toString()).children()[playerNum].id;
                        $("#" + token).css("visibility",'visible');//set the token to visible
                        indexOfCard = indexOf(handArray, availableCards[indexOfCard]);
                        if (indexOfCard == -1) {
                            console.log("INDEX OF RETURNED -1 GHOST CARD");
                            console.log("THIS IS IN REGULAR CARD");
                            return false;   
                        }
                        handArray = removeACardFromArray(handArray, indexOfCard);
                        return true;
                    }
                    else if (isFree2) {//the second location is available
                        var token = $("#" + availableCards[indexOfCard].toString() + "_1").children()[playerNum].id;
                        $("#" + token).css("visibility",'visible');//set the token to visible
                        indexOfCard = indexOf(handArray, availableCards[indexOfCard]);
                        if (indexOfCard == -1) {
                            console.log("INDEX OF RETURNED -1 GHOST CARD");
                            console.log("THIS IS IN REGULAR CARD");
                            return false;   
                        }
                        handArray = removeACardFromArray(handArray, indexOfCard);                    
                        return true;
                    }
                    else//can assume now that none of the spots are available
                        availableCards = removeACardFromArray(availableCards, indexOfCard);//remove the card from the available cards
                   }            
            }
        } while (true);
    }
    
    //Aggressive
    this.playAgroCard = function() {
        console.log("Computer " + playerNum+ " hand: " + handArray);
        var indexOfCard = -1;
        var availableCards = handArray.slice();//copy the hand arrray
        
        // console.log("sleep 3");
        // sleep(3000);
        
        for (var i = 0; i < availableCards.length; i++)
            if (availableCards[i].toString().includes("clover11") || availableCards[i].toString().includes("diamond11")) {
                indexOfCard = i;
                break;
            }
         
        //wild card found
        if (indexOfCard != -1) {
            var locationArray = new Array();//holds #of tokens, and locations of a possible sequence spot
            for (var row = 0; row <= 9; row++)//for all the boards row
                for (var col = 0; col <= 9; col++) {//for all the boards col
                    if ((row == 0 && col == 0) || (row == 0 && col == 9) || (row == 9 && col == 0) || (row == 9 && col == 9))
                        continue;//there are wild card locations
                    var counter = 0;
                    var cardId = $("#row" + row).children()[col].id;
                    var token = $("#" + cardId).children()[playerNum].id;
                    if ($("#" + token).css("visibility") != "hidden") {//if the game board has a friend present
                        counter++;
                        for (var i = -1; i <= 1; i ++) {//direction for loop
                            for (var j = -1; j <= 1; j++) {
                                if (i == 0 && j == 0)//skip
                                    continue;
                                var nextRow = row + i;
                                var nextCol = col + j;
                                var hitEdge = false;
                                while (true) {
                                    if ((nextRow == 0 && nextCol == 0) || (nextRow == 0 && nextCol == 9) || (nextRow == 9 && nextCol == 0) || (nextRow == 9 && nextCol == 9)) {
                                        hitEdge = true;
                                        break; //there are wild card locations you are done looking
                                    }
                                    if (nextRow > 9 || nextRow < 0 || nextCol > 9 || nextCol < 0) {
                                        hitEdge = true;
                                        break;//if out of bounds you are done looking
                                    }
                                    //now to see if we have a friend token there
                                    var nextCardId = $("#row" + nextRow).children()[nextCol].id;
                                    var nextCardToken = $('#' + nextCardId).children()[playerNum].id;
                                    if ($("#" + nextCardToken).css("visibility") == "hidden")//friend piece is missing
                                        break;
                                    counter++;
                                    nextRow += i;//update the direction
                                    nextCol += j;//update the direction
                                }
                                if (counter > 1) {//at least 2 tokens where found 
                                    if (!hitEdge) {
                                        //test if the spot is empty
                                        var testCardLocation = $("#row" + nextRow).children()[nextCol].id;
                                        var isTaken = false;
                                        for (var loc = 1; loc <=3; loc++) {
                                            var testToken = $("#" + testCardLocation).children()[loc].id;
                                            if ($("#" + testToken).css("visibility") != "hidden") {
                                                isTaken = true;
                                                break;
                                            }
                                        }
                                        if (!isTaken) {//that location is empty
                                             var tempVar = new Array();
                                             tempVar.push(counter);//the length of the sequence
                                             tempVar.push(nextRow);
                                             tempVar.push(nextCol);
                                             locationArray.push(tempVar);
                                        }
                                        else  {
                                            var otherDirectionRow = row - i;
                                            var otherDirectionCol = col - j;
                                            var inBounds = true;
                                            if ((otherDirectionRow == 0 && otherDirectionCol == 0) || (otherDirectionRow == 0 && otherDirectionCol == 9) || (otherDirectionRow == 9 && otherDirectionCol == 0) || (otherDirectionRow == 9 && otherDirectionCol == 9))
                                                inBounds = false;
                                            if (otherDirectionRow > 9 || otherDirectionRow < 0 || otherDirectionCol > 9 || otherDirectionCol < 0) 
                                                inBounds = false;
                                            if (inBounds) {
                                                testCardLocation = $("#row" + otherDirectionRow).children()[otherDirectionCol].id;
                                                isTaken = false;
                                                for (var loc = 1; loc <= 3; loc++) {
                                                    testToken = $("#" + testCardLocation).children()[loc].id;
                                                    if ($("#" + testToken).css("visibility") != "hidden") {
                                                        isTakne = true;
                                                        break;
                                                    }
                                                
                                                }
                                                if (!isTaken) {//the location is empty push
                                                    var tempVar = new Array();
                                                    tempVar.push(counter);
                                                    tempVar.push(otherDirectionRow);
                                                    tempVar.push(otherDirectionCol);
                                                    locationArray.push(tempVar);
                                                }
                                            }
                                        }  
                                    }
                                }
                            }
                        }//end of direction for loop  
                    }//end of if statement for when a friend token was found
                }//end of col for
            
            if (locationArray.length > 0) {
                var maxCounter = -1;
                var location = -1;
                for (var i = 0; i < locationArray.length; i++)
                    if (locationArray[i][0] > maxCounter)
                        location = i;   
                if (location != -1) {//play the card!
                    var cardId = $("#row" + locationArray[location][1]).children()[locationArray[location][2]].id;
                    var token = $("#" + cardId).children()[playerNum].id;
                    $("#" + token).css("visibility",'visible');//set the token to visible
                    handArray = removeACardFromArray(handArray, indexOf(handArray, availableCards[indexOfCard]));//remove the jack from the hand
                    console.log("comp " + playerNum + " played wild card");
                    return true;
                }
            }
            for (var i = 0; i < availableCards.length; i++) {//remove all wild cards
                 if (availableCards[i].toString().includes("clover11") || availableCards[i].toString().includes("diamond11")) {
                    availableCards = removeACardFromArray(availableCards, indexOf(availableCards, availableCards[i]));
                    i--;
                }
            }      
        }
        
        //checking if you have a jack to remove tokens
        indexOfCard = -1;
        for (var i = 0; i < availableCards.length; i++)
            if (availableCards[i].toString().includes("heart11") || availableCards[i].toString().includes("spade11")) {
                indexOfCard = i;
                break;
            }
        if (indexOfCard != -1) {//select a random enemy token and remove it
            var enemyLocations = new Array();
                for (var i = 0; i <= 9; i++)//rows
                    for (var j = 0; j <=9; j++) {//individual cards
                        if (i == 0 || i == 9)
                            if (j == 0 || j == 9)
                                continue;//those are the wild cards on the board
                            
                         var cardId = $("#row" + i).children()[j].id;
                         var isFree = true;
                         for (var x = 1; x <=3; x++)
                            if (x != playerNum) {
                                var token = $("#" + cardId).children()[x].id;
                                    if ($("#" + token).css("visibility") != "hidden")//if the game board has a token present
                                        isFree = false;
                            }
                         if (!isFree)//the board place has an enemy piece on it
                               enemyLocations.push(cardId);//save the card name
                    }
                if (enemyLocations.length == 0) {//there are no enemies to remove with this card, its dead
                    availableCards = removeACardFromArray(availableCards, indexOfCard);//remove card from array
                }
                else {//remove a enemy token
                    var indexOfCardToRemove = Math.floor(Math.random() * enemyLocations.length);
                    var cardId = enemyLocations[indexOfCardToRemove];
                    
                    for (var x = 1; x <= 3; x++) {
                        var token = $("#" + cardId).children()[x].id;
                        $("#" + token).css("visibility", "hidden");
                    }
                    indexOfCard = indexOf(handArray, availableCards[indexOfCard]);
                    if (indexOfCard == -1) {
                        console.log("INDEX OF RETURNED -1 GHOST CARD");
                        console.log("THIS IS IN ONE EYE JACK");
                        return false;   
                    }
                    handArray = removeACardFromArray(handArray, indexOfCard);//remove the card from the hand
                    console.log("comp " + playerNum + " played remove card");
                    return true;
                }
        }
        var locationArray = new Array();
        for (var x = 0; x < availableCards.length; x++) {//checking for sequence for non jack cards
            //if the place where i can drop the card is empty
            var isFree = true;
            var isFree2 = true;
            for (var i = 1; i <= 3; i++) {
                var token = $("#" + availableCards[x].toString()).children()[i].id;
                if ($("#" + token).css("visibility") != "hidden")//if the first place has a visible token
                    isFree = false;
                    token = $("#" + availableCards[x].toString() + "_1").children()[i].id;
                if ($("#" + token).css("visibility") != "hidden")//if the second place has a visible token
                    isFree2 = false;
            }
            
            if (isFree || isFree2) {//at least one location is available
                var row = -1;
                var col = -1;
                var spot;
                if (isFree)     
                    spot = availableCards[x].toString();
                else
                    spot = availableCards[x].toString() + "_1"
                var getOut = false;
                for (var i = 0; i <=9; i++) {
                    if (getOut)
                        break;
                    for (var j = 0; j <=9; j++) {
                        if (i == 0 || i == 9)
                            if (j == 0 || j == 9)
                                continue;//those are the wild cards on the board
                        //get id of that location does 
                        var otherspot = $("#row" + i).children()[j].id;
                        if (spot === otherspot) {
                            row = i;
                            col = j;
                            getOut = true;
                            break;
                        }
                    }     
                }
                         
                for (var i = -1; i <= 1; i ++)//direction for loop
                    for (var j = -1; j <= 1; j++) {
                        if (i == 0 && j == 0)//skip
                            continue;
                        counter = 0;
                        var nextRow = row + i;
                        var nextCol = col + j;
                        var hitEdge = false;
                        while (true) {
                            if ((nextRow == 0 && nextCol == 0) || (nextRow == 0 && nextCol == 9) || (nextRow == 9 && nextCol == 0) || (nextRow == 9 && nextCol == 9))
                                break; //there are wild card locations you are done looking
                            if (nextRow > 9 || nextRow < 0 || nextCol > 9 || nextCol < 0)
                                break;//if out of bounds you are done looking
                             //now to see if we have a friend token there
                             var nextCardId = $("#row" + nextRow).children()[nextCol].id;
                             var nextCardToken = $('#' + nextCardId).children()[playerNum].id;
                             if ($("#" + nextCardToken).css("visibility") == "hidden")//friend piece is missing
                                break;
                             counter++;
                             nextRow += i;//update the direction
                             nextCol += j;//update the direction
                        }
                        if (counter > 1) {
                            var bundle = new Array();
                            bundle.push(counter);
                            bundle.push(row);
                            bundle.push(col);
                            bundle.push(x);//the location of the card in the array
                            locationArray.push(bundle);
                        }
                    }     
            }//end of if a spot is available
        }//end of looking for all cards
        if (locationArray.length != 0) {//if there are locations where i can drop my non jacks and make a sequence bigger
            var maxCounter = -1;
            var maxLocation = -1;
            for (var loc = 0; loc < locationArray.length; loc++) {
                if (locationArray[loc][0] > maxCounter) {
                    maxCounter = locationArray[loc][0];
                    maxLocation = loc;
                }
            }
           if (maxCounter == -1) {
               console.log("eror in non jack cards picking max sequence");
               return false;
           }
            var cardId = $("#row" + locationArray[maxLocation][1]).children()[locationArray[maxLocation][2]].id;
            var cardToken = $('#' + nextCardId).children()[playerNum].id;
            $("#" + cardToken).css("visibility",'visible');//set the token to visible
            handArray = removeACardFromArray(handArray, indexOf(handArray, availableCards[locationArray[maxLocation][3]]));
            console.log("comp " + playerNum + " played a non jack the smart way");

            return true;
        }
        //playing a random card this time
        
        var attemps = 0;
        while (attemps < availableCards.length) {//will attempt each card
            var location = Math.floor(Math.random() * availableCards.length);
            var isFree = true;
            var isFree2 = true;
            for (var i = 1; i <= 3; i++) {//check to see if that place is empty
                var token = $("#" + availableCards[location].toString()).children()[i].id;
                if ($("#" + token).css("visibility") != "hidden")//if the first place has a visible token
                    isFree = false;
                token = $("#" + availableCards[location].toString() + "_1").children()[i].id;
                if ($("#" + token).css("visibility") != "hidden")//if the second place has a visible token
                    isFree2 = false;
            }
            if (isFree && isFree2) {//both locations are available, choose one randomly
                var topOrBottom = Math.floor(Math.random() * 2);
                var token;
                if (topOrBottom == 0)
                    token = $("#" + availableCards[location].toString()).children()[playerNum].id;                 
                else
                    token = $("#" + availableCards[location].toString() + "_1").children()[playerNum].id;
                $("#" + token).css("visibility",'visible');//set the token to visible
                location = indexOf(handArray, availableCards[location]);
                if (location == -1) {
                    console.log("INDEX OF RETURNED -1 GHOST CARD");
                    console.log("THIS IS REGULAR CARD");
                    return false;   
                }
                handArray = removeACardFromArray(handArray, location);
               // console.log("comp " + playerNum + " played a random non jack");
                return true;
            }
            else if (isFree) {//the first location is available
                var token = $("#" + availableCards[location].toString()).children()[playerNum].id;
                $("#" + token).css("visibility",'visible');//set the token to visible
                location = indexOf(handArray, availableCards[location]);
                if (location == -1) {
                    console.log("INDEX OF RETURNED -1 GHOST CARD");
                    console.log("THIS IS IN REGULAR CARD");
                    return false;   
                }
                handArray = removeACardFromArray(handArray, location);
                console.log("comp " + playerNum + " played a random non jack");
                return true;
            }
            else if (isFree2) {//the second location is available
                var token = $("#" + availableCards[location].toString() + "_1").children()[playerNum].id;
                $("#" + token).css("visibility",'visible');//set the token to visible
                location = indexOf(handArray, availableCards[location]);
                if (location == -1) {
                    console.log("INDEX OF RETURNED -1 GHOST CARD");
                    console.log("THIS IS IN REGULAR CARD");
                    return false;   
                }
                handArray = removeACardFromArray(handArray, location);  
  //              console.log("comp " + playerNum + " played a random non jack");                  
                return true;
           }
           else//can assume now that none of the spots are available
           availableCards = removeACardFromArray(availableCards, location);//remove the card from the available cards
        
        }
        return false;//couldnt play a card??
    }
    
    //Returns true or false, signifying if it was able to discard a card
    this.discardCard = function() {
        if (handArray.length == 0)
            return 0;
        var indexOfCard = Math.floor(Math.random() * handArray.length);
        console.log("Removed:" + handArray[indexOfCard].toString());
        handArray = removeACardFromArray(handArray, indexOfCard);
        return true;
    }
}