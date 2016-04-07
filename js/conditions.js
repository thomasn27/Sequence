// Conditions to check if someone has completed a sequence
var checkArray[
    [1,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,1]
];

// function: check if there is a sequence
function checkCondition(x,y,player) {
    var pos7, pos8, pos9;
    var pos4,       pos6; 
    var pos1, pos2, pos3;
    
    pos1 = pos2 = pos3 = pos4 = pos6 = pos7 = pos8 = pos9 = 0;
    
    // check horizontal
    for(int i = 1; i < 5; i++) {
        if(checkArray[x+i][y] = player)
            pos6++;
        else 
            break;
    }
    for(int i = 1; i < 5; i++) {
        if(checkArray[x-i][y] = player)
            pos4++;
        else
            break;
    }
    
    // check vertical
    for(int i = 1; i < 5; i++) {
        if(checkArray[x][y+i] = player)
            pos8++;
        else
            break;
    }
    for(int i = 1; i < 5; i++) {
        if(checkArray[x][y-i] = player)
            pos2++;
        else
            break;
    }
    
    // check right diagonal
    for(int i = 1; i < 5; i++) {
        if(checkArray[x+i][y+i] = player)
            pos9++;
        else
            break;
    }
    for(int i = 1; i < 5; i++) {
        if(checkArray[x-i][y-i] = player)
            pos1++;
        else
            break;
    }
    
    // check left diagonal
    for(int i = 1; i < 5; i++) {
        if(checkArray[x+i][y-i] = player)
            pos7++;
        else
            break;
    }
    for(int i = 1; i < 5; i++) {
        if(checkArray[x-i][y+i] = player)
            pos3++;
        else
            break;
    }
    
    if(4 <= (pos6 + pos4))    // call win method
    if(4 <= (pos8 + pos2))    // call win method
    if(4 <= (pos9 + pos1))    // call win method
    if(4 <= (pos7 + pos3))    // call win method
}

function addToken(x,y,player) {
    checkArray[x][y] = player;
    
    checkCondition(x,y,player);
}