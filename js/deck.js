//deck class
function Deck () {
	
	//private method: sets up the decks array
	var setUpDeck = function() {
		var tempDeck = new Array();
		
		var counter = 0;
        
        //104 cards to create 
		for (var i = 1; i < 5; i++) 
			for (var j = 1; j < 14; j++) {
                //2 copies of each value
				tempDeck[counter] = new Card(i,j);
                counter++;
                tempDeck[counter] = new Card(i,j);
				counter++;
			}
         

		//shuffle the cards
		for (var i = 0; i < 104; i++) {
			var swapLoc = Math.floor(Math.random() * 104);
			var temp = tempDeck[i];
			tempDeck[i] = tempDeck[swapLoc];
			tempDeck[swapLoc] = temp;
		}
		return tempDeck;
	}
	
	//private member variables
	var cardList = setUpDeck();
	var size = 103;
	
	//public method: returns a card if there are any available, if not returns null
	this.drawCard = function() {
		if (size < 0)
			return null;
		var temp = cardList[size];
		size--;
		return temp;
	}
	
	//public method: returns the size of the deck
	this.getDeckSize = function() {
		if (size < 0)
			return 0;
		return size + 1;
	}
	
	//public method: prints the deck
	this.printDeck = function() {
		for (var i = 0; i <= size; i++)
			console.log(cardList[i].toString());
	}
	
	//public method: returns true if deck is empty
	this.isEmpty = function() {
		return size < 0;
	}
	
}