// Function to convert degrees to radians
function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Function to convert radians to degrees
 * @param {Number} radians
 * @returns {Number} degrees 
*/
function toDeg(radians) {
    return radians * (180 / Math.PI);
}

/**
 Returns a random int
 @param {Number} min minimum
 @param {Number} max maximum
 @returns {Number} random int
*/
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {Number} val The initial value
 * @param {Number} min The lower boundary
 * @param {Number} max The upper boundary
 * @returns {Number} A number in the range (min, max)
 */
function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max)
};