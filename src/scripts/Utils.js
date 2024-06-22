// Function to convert degrees to radians
function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Function to convert radians to degrees
function toDeg(radians) {
    return radians * (180 / Math.PI);
}

/*
 random Int function
 @param mix:int
 @param max:int
 @return randomNumber:int
*/
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}