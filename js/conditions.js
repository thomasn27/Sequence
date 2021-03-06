// Conditions to check if someone has completed a sequence
var checkArray = new Array();
var player1_complete;   // fleet
var player2_complete;   // fleet
var player3_complete;   // fleet
var numberOfPlayers;    // TODP: used for modulus division
var player = 1;         // TODO: needs to grab the player turn

// objects for array
function arrayCard(cardID) {
    var setUp = function () {
        if (card == "wild_1" || card == "wild_2" ||
           card == "wild_3" || card == "wild_4")
            return 4;
        else
            return 0;
    }

    var card = cardID;
    var number = setUp();
    // console.log(card + "   " + number);
    this.setCard = function (cardID) {
        card = cardID;
    }

    this.getCard = function () {
        return card;
    }

    this.setValue = function (num) {
        number = num;
    }

    this.getValue = function () {
        return number;
    }

}

// filling up the array
for (i = 0; i < 10; i++) {
    row = new Array();
    for (j = 0; j < 10; j++) {
        row.push(new arrayCard($("#row" + i).children()[j].id));
        // console.log(row);
    }
    checkArray.push(row);
}

// function: check if there is a sequence
function checkCondition(card, player) {
//    console.log("Player "+ player+ " played " + card);
    var x;
    var y;
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            if (checkArray[i][j].getCard() == card) {
                y = i;
                x = j;
            }
        }
    }
    checkArray[x][y].setValue(player);

    var verticalSequence = checkDirection(x, y, 0, 1, player) + checkDirection(x, y, 0, -1, player);
    var horizontalSequence = checkDirection(x, y, 1, 0, player) + checkDirection(x, y, -1, 0, player);
    var UpLeftDownRight = checkDirection(x, y, -1, -1, player) + checkDirection(x, y, 1, 1, player);
    var UpRightDownLeft = checkDirection(x, y, 1, -1, player) + checkDirection(x, y, -1, 1, player);

    if (verticalSequence >= 4 || horizontalSequence >= 4 || UpLeftDownRight >= 4 || UpRightDownLeft >= 4) {
        if (player == 1) {
            $("#endModal").modal('show');
        }
        else {
            $("#endModal-label").html('<h1>You lost!</h1>');
            $("#endModal").modal('show');
        }
    }
    printBoard();
}

function checkDirection(x, y, i, j, player) {
    var sequence = 0;
    for (q = 1; q < 5; q++) {
        if ((x + i > -1 && x + i < 10) && (y + j > -1 && y + j < 10)) {
            var value = checkArray[x + i][y + j].getValue();
            if (value == 4 || value == player || value == (player + 4)) {
                sequence++;
                x = x + i;
                y = y + j;
            }
            else {
                break;
            }
        }
    }
    return sequence;
}

function deleteToken(card) {
    var x;
    var y;
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            if (checkArray[i][j].getCard() == card) {
                y = i;
                x = j;
            }
        }
    }
    
    if (checkArray[x][y].getValue() < 4)
        checkArray[x][y].setValue(0);
}

function printBoard() {
    for (i = 0; i < 10; i++) {
        console.log(checkArray[0][i].getValue() + " " + checkArray[1][i].getValue() + " " + checkArray[2][i].getValue() + " " + checkArray[3][i].getValue() + " " + checkArray[4][i].getValue() + " " + checkArray[5][i].getValue() + " " + checkArray[6][i].getValue() + " " + checkArray[7][i].getValue() + " " + checkArray[8][i].getValue() + " " + checkArray[9][i].getValue());
    }
}