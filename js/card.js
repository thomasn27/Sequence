//card class
function Card (suit, value) {
	
	//private method: to set the suit for the card
	var setSuit = function(num) {
		if (num >= 1 && num <= 4)
			return num;
		console.log(num + " is not a proper suit");
	}
	
	//private method: to set the value of the card
	var setValue = function(num) {
		if (num >= 1 && num <= 13)
			return num;
		console.log(num + " is not a proper value");
	}
	
	//private method: to set the imageSource of the card
	var setImage = function(suit, value) {
		var imageSource = "assets/svg/";
		if (suit === 1)
			imageSource += "clover";
		else if (suit === 2)
			imageSource += "diamond";
		else if (suit === 3)
			imageSource += "heart";
		else
			imageSource += "spade";
        if (value == 1)
            imageSource += "0";    
		imageSource += value.toString() + ".svg";
		return imageSource;
	}
	
	//private member variables
	var suit = setSuit(suit);
	var value = setValue(value);
	var image = setImage(suit, value);
	
	//public method: returns the value
	this.getValue = function() {
		return value;
	}
	
	//public method: returns the suit
	this.getSuit = function() {
		return suit;
	}
	
	//public method: returns the image source
	this.getImageSource = function() {
		return image;
	}
	
	//public method: returns a string representing the card
	this.toString = function() {
		var message;
		if (suit === 1)
			message = "clover";
		else if (suit === 2)
			message = "diamond";
		else if (suit === 3)
			message = "heart";
		else
			message = "spade";
        if (value != 1)
		    message += value;
        else   
            message += "0" + value;
		return message;
	}
    
    
}