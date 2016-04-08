// Conditions to check if someone has completed a sequence
var checkArray = new Array();
var player1_complete;   // fleet
var player2_complete;   // fleet
var player3_complete;   // fleet
var numberOfPlayers;    // TODP: used for modulus division
var player = 1; // TODO: needs to grab the player turn

// objects for array
function arrayCard(cardID) {
    var setUp = function() {
        if(card == "wild_1" || card == "wild_2" ||
           card == "wild_3" || card == "wild_4")
            return 4;
        else
            return 0;
    }   
    
    var card = cardID;
    var number = setUp();
    // console.log(card + "   " + number);
    this.setCard = function(cardID) {
        card = cardID;
    }
    
    this.getCard = function() {
        return card;
    }
    
    this.setValue = function(num) {
        number = num;
    }
    
    this.getValue = function() {
        return number;
    }       
 
}

// filling up the array
for(i = 0; i < 10; i++) {
    row = new Array();
    for(j = 0; j < 10; j++) {
       row.push(new arrayCard($("#row" + i).children()[j].id));
       // console.log(row);
    }
    checkArray.push(row);
}

// function: check if there is a sequence
function checkCondition(card, player) {
    var x, y;
    
    // search function
    for(i = 0; i < 10; i++)
        for(j = 0; j < 10; j++)
            if(checkArray[i][j].getCard() == card){
                x = i;
                console.log(x);
                y = j;
                console.log(y);
            }
    
    checkArray[x][y].setValue(player);
    
    // check horizontal rows
    var counter = 0;
    
    for(i = 1; i < 5; i++) {
        if(x+i > -1 && x+i < 10) {
            if(checkArray[x+i][y].getValue() == player ||
               checkArray[x+i][y].getValue() == (player + 4) ||
               checkArray[x+i][y].getValue() == 4)
                counter++;
            else break;
        } else break;
    }
    for(i = 1; i < 5; i++) {
        if(x-i > -1 && x-i < 10) {
            if(checkArray[x-i][y].getValue() == player ||
               checkArray[x-i][y].getValue() == (player + 4) ||
               checkArray[x-i][y].getValue() == 4)
                    counter++;
            else break;
        } else break;
    }
    if (counter == 4) {
        player1_wins++;  // TODO
        for(var i = 1; i < 5; i++) { 
            if(x+i > -1 && x+i < 10) {
                if(checkArray[x+i][y].getValue() == player)
                    checkArray[x+i][y].setValue(player + 4);
                else break;
            } else break;
        }
        for(var i = 1; i < 5; i++) {
            if(x-i > -1 && x-i < 10) {
                if(checkArray[x-i][y].getValue() == player)
                    checkArray[x-i][y].setValue(player + 4);
                else break;
            } else break;
        }
    }
    if(numberOfPlayers > 2) {
        ; // TODO: call tom's win condition
    } else {
        player1_complete++;  // TODO
        if(player1_complete = 1)
            ; // TODO: call tom's win condition
    }
    
    // check vertical rows
    var counter = 0;
    for(i = 1; i < 5; i++) {
        if(y+i > -1 && y+i < 10) {
            if(checkArray[x][y+i].getValue() == player ||
               checkArray[x][y+i].getValue() == (player + 4) ||
               checkArray[x][y+i].getValue() == 4)
                counter++;
            else break;
        } else break;
    }
    for(i = 1; i < 5; i++) {
        if(y-i > -1 && y-i < 10) {
            if(checkArray[x][y-i].getValue() == player ||
               checkArray[x][y-i].getValue() == (player + 4) ||
               checkArray[x][y-i].getValue() == 4)
                    counter++;
            else break;
        } else break;
    }
    if (counter == 4) {
        player1_wins++;  // TODO
        for(var i = 1; i < 5; i++) {
            if(y+i > -1 && y+i < 10) {
                if(checkArray[x][y+i].getValue() == player)
                    checkArray[x][y+i].setValue(player + 4);
                else break;
            } else break;
        }
        for(var i = 1; i < 5; i++) {
            if(y-i > -1 && y-i < 10) {
                if(checkArray[x][y-i].getValue() == player)
                    checkArray[x][y-i].setValue(player + 4);
                else break;
            } else break;
        }
    }
    if(numberOfPlayers > 2) {
        ;// TODO: call tom's win condition
    } else {
        player1_complete++;  // TODO
        if(player1_complete = 1)
            ;// TODO: call tom's win condition
    } 
    
    // check diagonal right
    var counter = 0;
    for(i = 1; i < 5; i++) {
        if(x+i > -1 && x+i < 10 && y+i > -1 && y+i < 10) {
            if(checkArray[x+i][y+i].getValue() == player ||
               checkArray[x+i][y+i].getValue() == (player + 4) ||
               checkArray[x+i][y+i].getValue() == 4)
                counter++;
            else break;
        } else break;
    }
    for(i = 1; i < 5; i++) {
        if(x-i > -1 && x-i < 10 && y-i > -1 && y-i < 10) {
            if(checkArray[x-i][y-i].getValue() == player ||
               checkArray[x-i][y-i].getValue() == (player + 4) ||
               checkArray[x-i][y-i].getValue() == 4)
                    counter++;
            else break;
        } else break;
    }
    if (counter == 4) {
        player1_wins++;  // TODO
        for(var i = 1; i < 5; i++) {
            if(x+i > -1 && x+i < 10 && y+i > -1 && y+i < 10) {
                if(checkArray[x+i][y+i].getValue() == player)
                    checkArray[x+i][y+i].setValue(player + 4);
                else break;
            } else break;
        }
        for(var i = 1; i < 5; i++) {
            if(x-i > -1 && x-i < 10 && y-i > -1 && y-i < 10) {
                if(checkArray[x-i][y-i].getValue() == player)
                    checkArray[x-i][y-i].setValue(player + 4);
                else break;
            } else break;
        }
    }
    if(numberOfPlayers > 2) {
        ;// TODO: call tom's win condition
    } else {
        player1_complete++;  // TODO
        if(player1_complete = 1)
            ;// TODO: call tom's win condition
    }
    
    
    // check diagonal left
    var counter = 0;
    for(i = 1; i < 5; i++) {
        if(x+i > -1 && x+i < 10 && y-i > -1 && y-i < 10) {
            if(checkArray[x+i][y-i].getValue() == player ||
               checkArray[x+i][y-i].getValue() == (player + 4) ||
               checkArray[x+i][y-i].getValue() == 4)
                counter++;
            else break;
        } else break;
    }
    for(i = 1; i < 5; i++) {
        if(x-i > -1 && x-i < 10 && y+i > -1 && y+i < 10) {
            if(checkArray[x-i][y+i].getValue() == player ||
               checkArray[x-i][y+i].getValue() == (player + 4) ||
               checkArray[x-i][y+i].getValue() == 4)
                    counter++;
            else break;
        } else break;
    }
    if (counter == 4) {
        player1_wins++;  // TODO
        for(var i = 1; i < 5; i++) {
            if(x+i > -1 && x+i < 10 && y-i > -1 && y-i < 10) {
                if(checkArray[x+i][y-i].getValue() == player)
                    checkArray[x+i][y-i].setValue(player + 4);
                else break;
            } else break;
        }
        for(var i = 1; i < 5; i++) {
            if(x-i > -1 && x-i < 10 && y+i > -1 && y+i < 10) {
                if(checkArray[x-i][y+i].getValue() == player)
                    checkArray[x-i][y+i].setValue(player + 4);
                else break;
            } else break;
        }
    }
    if(numberOfPlayers > 2) {
        ;// TODO: call tom's win condition
    } else {
        player1_complete++;  // TODO
        if(player1_complete = 1)
            ;// TODO: call tom's win condition
    }
    console.log("wilb checking: " + checkArray[x][y].getValue());
}

function deleteToken(x,y) {
    if(checkArray[x][y].getValue() < 4) {
        checkArray[x][y].setValue(0);
        return true;
    } else
        return false;
}