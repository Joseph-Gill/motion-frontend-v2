////////////////////////////////////////////////////////////////////////////////////////////
// These helper functions are used to handle to conversion between "Arrays of Objects" and "Dictionaries"
// We receive an "Array of Objects" from the backend when we fetch stuff
// For easier access of a specific Object we could transform them it into a "Dictionary"
// Read this to see the benefit of storing Dictionaries in redux: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/
// "normalizr" does something similar but is more powerful: https://github.com/paularmstrong/normalizr (created by Dan Abramov, creator of Redux and core team member of React)

// Further resources:
// - https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/
// - https://redux.js.org/recipes/structuring-reducers/updating-normalized-data/
// - https://egghead.io/lessons/javascript-redux-normalizing-the-state-shape


// While it IS good practice to "normalize" your redux store, it also does increase the complexity
// In these solutions we are intentionally NOT following best practices to simplify things
////////////////////////////////////////////////////////////////////////////////////////////

/*
// What you get from the backend:
arrayOfObjects = [
    { id: 1, content: "post1" },
    { id: 2, content: "post2" },
    { id: 3, content: "post3" }
]
// how it should be stored in redux
dictionary = {
    1: { id: 1, content: "post1" },
    2: { id: 2, content: "post2" },
    3: { id: 3, content: "post3" }
}


// access a specific object from an "Array of objects":
const idToFind = 3;
const objectInQuestion = arrayOfObjects.find((object) => object.id === idToFind);  // linear time complexity --> O(n)
// access a specific object from a "Dictionary"
const idToFind = 3;
const objectInQuestion = dictionary[idToFind];  // constant time complexity --> O(1)  (stays the same no matter how many entries)

*/

/*************************************************************************************************/


/**
 * use this to transform a "Dictionary" to an "Array of Objects"
 * It reverses the convertArrayToDict function.
 */
export const convertDictToArray = (dictionary) => Object.values(dictionary).map(obj => obj);


/*************************************************************************************************/


/**
 * This transforms an "Array of Objects" into a "Dictionary"
 * It is the reverse of the convertdictToArray
 * @param {array} sourceArray an "Array of Objects". Objects inside are expected to have an "id" property or some other unique identifier
 * @param {string} identifier identifier inside an object whose value will be used to identify itself in the "Dictionary" Using "id" by default.
 */
export const convertArrayToDict = (sourceArray, identifier = 'id') => {
    if (!sourceArray.isArray) {
        return sourceArray.reduce((accumulator, obj) => {
            accumulator[obj[identifier]] = obj;
            return accumulator;
        }, {})
    }
    return sourceArray; // silently returning source in case it is already a "Dictionary"
};


/*************************************************************************************************/


// /**
//  * This takes all identifiers of a dictionary and returns them numerically sorted (largest to smallest)
//  * Works only if you are using numbers as identifier
//  */
// export const getSortedIDs = dictionary => Object.keys(dictionary).sort((a, b) => b - a);


/*************************************************************************************************/


const filterDictToArray = (dictionary, keys) => {
    // intentionally not using functional style for performance reasons
    const length = keys.length;
    const extractedData = [];
    for (let i = 0; i < length; i++) {
        const currentKey = keys[i];

        // check if currentKey exists and push the value
        const current = dictionary[currentKey];
        if (current) {
            extractedData.push(current);
        }
    }
    return extractedData;
};


const filterDictToDict = (dictionary, keys) => {
    // intentionally not using functional style for performance reasons
    const length = keys.length;
    const filteredDict = {};
    for (let i = 0; i < length; i++) {
        const currentKey = keys[i];

        // check if currentId exists and push the value
        const current = dictionary[currentKey];
        if (current) {
            filteredDict[currentKey] = current;
        }
    }
    return filteredDict;
};


/**
 * use this to extract data from a dictionary and return a new filtered dictionary
 * @param {Object} dictionary an object storing objects under a unique identifier/key
 * @param {Array} keys an array of identifiers you want extracted
 * @param {boolean} convertToArray
 */
export const filterDict = (dictionary, keys, convertToArray = true) => {
    return convertToArray
        ? filterDictToArray(dictionary, keys)
        : filterDictToDict(dictionary, keys);
}

