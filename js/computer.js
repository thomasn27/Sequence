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
    
    //returns true or false, indicating if it was able to play a card 
    this.playCard = function() {
        //row array will later be used to check for valid plays on the board by an array param
        var indexOfCard = -1;
        var availableCards = handArray.slice();//copy the card
        do {
            
            if (availableCards.length == 0)//if no more cards 
                return false;
            else {
                indexOfCard = Math.floor(Math.random() * availableCards.length);
                
                //check here if card is one of the jacks =(
                    
                //checks to see if there are tokens on the places
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
                    var temp = new Array();
                    handArray = removeACardFromArray(handArray, indexOfCard);
                    return true;
                }
                else if (isFree) {//the first location is available
                    var token = $("#" + availableCards[indexOfCard].toString()).children()[playerNum].id;
                    $("#" + token).css("visibility",'visible');//set the token to visible
                    handArray = removeACardFromArray(handArray, indexOfCard);
                    return true;
                }
                else if (isFree2) {//the second location is available
                    var token = $("#" + availableCards[indexOfCard].toString() + "_1").children()[playerNum].id;
                    $("#" + token).css("visibility",'visible');//set the token to visible
                    handArray = removeACardFromArray(handArray, indexOfCard);                    
                    return true;
                }
                else//can assume now that none of the spots are available
                    availableCards = removeACardFromArray(availableCards, indexOfCard);//remove the card from the available cards            
            }
        } while (true);
    }
}