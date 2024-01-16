'use strict'


//Game elements
const scrambledWordElement = document.querySelector('#scramble');
const hintElement = document.querySelector('.hint')
const inputContainer = document.querySelector('.input_container');
const remainingChancesElement = document.querySelector('#remaining');
const chanceIndicators = document.querySelectorAll('#dot');
const mistakesElement = document.querySelector('#mistakes');
const resultElement = document.querySelector('#result');
const checkGuessButton = document.querySelector('#check_btn');
const resetGameButton = document.querySelector('#reset_btn');
const showHintButton = document.querySelector('#hint_btn');


// Array of words for the game

const words = [
    { word: "flower", hint: "Blooms in gardens." },
    { word: "pencil", hint: "Used for writing or drawing." },
    { word: "ocean", hint: "Vast body of saltwater." },
    { word: "window", hint: "Allows you to see outside." },
    { word: "guitar", hint: "Musical instrument with strings." },
    { word: "planet", hint: "Celestial body in space." },
    { word: "puzzle", hint: "A challenging game or problem." },
    { word: "secret", hint: "Something kept hidden or unknown." },
    { word: "travel", hint: "Moving from one place to another." },
    { word: "dragon", hint: "Mythical, fire-breathing creature." },
    { word: "castle", hint: "Fortified building, often with a moat." },
    { word: "pirate", hint: "Seafaring robber or adventurer." },
    { word: "doctor", hint: "Medical professional." },
    { word: "pizza", hint: "Popular Italian dish." },
    { word: "island", hint: "Landmass surrounded by water." },
    { word: "galaxy", hint: "Collection of stars and celestial matter." },
    { word: "bubble", hint: "Spherical thin film of liquid." },
    { word: "camera", hint: "Device for capturing images." },
    { word: "planet", hint: "Celestial body in space." },
    { word: "rocket", hint: "Vehicle that travels into space." },
    { word: "candle", hint: "Wax with a wick for illumination." },
    { word: "garden", hint: "Outdoor space for plants." },
    { word: "potato", hint: "Edible tuber." },
    { word: "kitten", hint: "Young cat." },
    { word: "jungle", hint: "Dense, tropical vegetation." },
    { word: "rocket", hint: "Vehicle that travels into space." },
    { word: "zipper", hint: "Fastening device for clothes." },
    { word: "bronze", hint: "Alloy of copper and tin." },
    { word: "jungle", hint: "Dense, tropical vegetation." },
    { word: "cavern", hint: "Large underground chamber." },
    { word: "branch", hint: "Part of a tree." },
    { word: "forest", hint: "Large area covered with trees." },
    { word: "marvel", hint: "A source of wonder or astonishment." },
    { word: "winter", hint: "Coldest season of the year." },
    { word: "summer", hint: "Warmest season of the year." },
    { word: "tunnel", hint: "Underground passage." },
    { word: "teapot", hint: "Container for brewing and pouring tea." },
    { word: "rocket", hint: "Vehicle that travels into space." },
    { word: "tunnel", hint: "Underground passage." },
    { word: "cherry", hint: "Small, round fruit." },
    { word: "cosmic", hint: "Relating to the universe." },
    { word: "mellow", hint: "Smooth and pleasant." }
];



let chances = 5;
let remainingChance = chances;
let mistakeWords = [];
let inputFields = []
let currentWord = '';
let currentHint = '';
let misplacedLetters = [];

// function to start game 
function statGame() {
    // Get a random word & hint from the array
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word;
    currentHint = words[randomIndex].hint;

    createInputBox(currentWord.length)

    // Scramble the random word
    const scrambledWord = shuffleWord(currentWord);

    // Display scrambled word
    scrambledWordElement.textContent = scrambledWord;

    // Update the UI
    updateUI();

}

// Function to check user's guess

function checkGuess() {
    const userGuess = Array.from(inputFields).map(input => input.value).join('')

    if (userGuess.toLowerCase() === currentWord.toLowerCase()) {
        handleCorrectGuess()
    } else if (userGuess === '') {
        handleEmptyGuess

    } else if (userGuess.toLowerCase() !== currentWord.toLowerCase()) {
        handleIncorrectGuess(userGuess)
    }
}


function handleCorrectGuess() {
    resultElement.textContent = 'Correct guess, you won 🎉'
    resultElement.style.color = '#2ecc71';
    inputFields.forEach(input => input.disabled = true)
    inputFields.forEach(input => input.style.borderColor = 'green')
}

function handleEmptyGuess() {
    resultElement.textContent = 'Input should not be empty'
    resultElement.style.color = '#e74c3c';
}

function handleIncorrectGuess(userGuess) {
    resultElement.textContent = 'Incorrect letter, Try again 💪';
    resultElement.style.color = '#e67e22';
    remainingChance--;
    remainingChance = Math.max(remainingChance, 0);
    chanceIndicators[remainingChance].style.backgroundColor = '#4a5567';
    remainingChancesElement.textContent = remainingChance;
    handleMistake(userGuess)
}


// funtion to show hint
function displayHint() {
    hintElement.textContent = currentHint
}

// function to handle mistakes
function handleMistake(userGuess) {
    const incorrectLetters = userGuess.toLowerCase().split('').filter(letter => !currentWord.includes(letter))

    // Adding incorrect letters to mistakeWords array

    incorrectLetters.forEach(letter => {
        if (mistakeWords.length < 5) {
            mistakeWords.push(letter)
        }
    })


    userGuess.toLowerCase().split('').forEach((letter, index) => {
        if (currentWord.includes(letter) && letter !== currentWord[index]) {
            misplacedLetters.push(letter);
        }
    });

    if (misplacedLetters.length > 0) {
        resultElement.textContent = ''
        resultElement.textContent += '\nMisplaced letters: ' + misplacedLetters.join(', ');
    }

    // displaying incorrect letters
    mistakesElement.textContent = mistakeWords.join(', ')

    if (mistakeWords.length === 5 && remainingChance === 0) {
        resultElement.textContent = `You lost, the correct word was ${currentWord}`;
        resultElement.style.color = '#e74c3c';
        inputFields.forEach(input => input.disabled = true)
    }
}


// Function to shuffle the characters of a word
function shuffleWord(word) {
    const wordArray = word.split('');
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]]; // (Fisher-Yates shuffle algorithm)
    }
    return wordArray.join('');
}


// Function to create input boxes 
function createInputBox(wordLength) {

    // Clear any existing input fields
    inputContainer.innerHTML = '';
    inputFields = [];

    for (let i = 0; i < wordLength; i++) {
        const inputElement = document.createElement('input')
        inputElement.type = 'text'
        inputElement.classList.add('letter-input')
        inputElement.maxLength = 1

        inputContainer.appendChild(inputElement)
        inputFields.push(inputElement);
    }

    inputFields[0].focus();

    handleInputFocus(inputFields)

}


// function to update the UI

function updateUI() {
    // update chances 
    remainingChance = chances;
    remainingChancesElement.textContent = remainingChance;
    chanceIndicators.forEach((dot, index) => {
        dot.style.backgroundColor = index < remainingChance ? '#672171' : '#4a5567';
    });

    // clearing mistakes array and inputs
    mistakesElement.textContent = '';
    mistakeWords = [];
    resultElement.textContent = '';
    hintElement.textContent = '';
    inputFields.forEach(input => input.value = '')
    inputFields.forEach(input => input.disabled = false)
    inputFields.forEach(input => input.style.borderColor = '')
}


// handling focus of the input
function handleInputFocus(inputFields) {
    inputFields.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1) {
                const nextInput = inputFields[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && input.value === '') {
                const previousInput = inputFields[index - 1];
                if (previousInput) {
                    previousInput.focus();
                }
            }

            if (['ArrowLeft', 'ArrowRight'].includes(event.key) && input.selectionStart === 0) {
                const previousInput = inputFields[index - 1];
                if (previousInput) {
                    previousInput.focus();
                }
            }
        });
    });

}


checkGuessButton.addEventListener('click', checkGuess)
showHintButton.addEventListener('click', displayHint)
resetGameButton.addEventListener('click', statGame)

// game start
statGame()