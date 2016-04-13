//comp class
function computer(num) {
    var handArray = new Array();
    var discardIndex;
    var playerNum = num;
    //adds a card the computers array
    this.addCard = function(newCard) {
       handArray.push(newCard);
    }
    
    this.playCard = function() {
        //row array will later be used to check for valid plays on the board by an array param
        var indexOfCard = -1;
        var availableCards = handArray.slice();//copy the card
        do {
            
            if (availableCards.length == 0) {//if no more cards 
                indexOfCard = -1;
                cantPlayCard = false;
                return false;
            }
            else {
                indexOfCard = Math.floor(Math.random() * handArray.length);
                var topOrBottom = Math.floor(Math.random() * 2);
                return true;
                /*
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
                
                if (isFree && isFree2) {//both locations are available
                    cantPlayCard = false;
                }
                else if (isFree) {//the first location is available
                    var token = $("#" + availableCards[indexOfCard].toString()).children()[playerNum].id;
                    $("#" + token).css("visibility") = 'visible';
                    return true;
                }
                else if (isFree2) {//the second location is available
                    return true;s
                }
                else {//can assume now that none are available
                    
                }*/
                
            }
        } while (true);
        
        
        //playerHand.splice(0,1);

    }
}