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
        for (var i = 0; i < arr.length; i++)
            if (i != index)
                temp.push(arr[i]);
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
                    continue;//try again at playing another card from hand
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
                        return false;    
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