/* 
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of previous guess and guesses remaining
- Notify the player of the correct answer if they lose
- Let player choose to play again
- Generate random number each round
ADDITIONAL:
- Track rounds won out of total rounds
*/

// Game variables
const totalGuesses = 3,
  min = 7,
  max = 9;
let winningNum = getRandomNum(min, max),
  guessesLeft = totalGuesses,
  gamePlaying = true,
  roundsWon = 0;
totalRounds = 0;

// UI elements
const UIgame = document.querySelector('#game'),
  UIminNum = document.querySelector('#min'),
  UImaxNum = document.querySelector('#max'),
  UIguessBtn = document.querySelector('#guess-btn'),
  UIguessInput = document.querySelector('#guess-input'),
  UImessage = document.querySelector('#message'),
  UIroundsWon = document.querySelector('#rounds-won'),
  UItotalRounds = document.querySelector('#total-rounds');

// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Event listener
UIguessBtn.addEventListener('click', guess);

// Guess function
function guess(e) {
  // Check if game playing
  if (gamePlaying) {
    // Get input
    let g = parseInt(UIguessInput.value);

    // Validate if input is acceptable
    if (isNaN(g) || guess < min || guess > max) {
      setMessage(`Please enter a number in between ${min} and ${max}`, 'red');
    }
    // Check if guess is correct
    else if (g === winningNum) {
      endGame(`${g} is correct!`, true);
    }
    // If guess is incorrect
    else {
      guessesLeft -= 1;
      // If no more guesses left
      if (guessesLeft === 0) {
        endGame(
          `No more guesses left. ${winningNum} was the correct number. Game Over.`,
          false
        );
      }
      // If guesses still left
      else {
        let t = guessesLeft > 1 ? 'guesses' : 'guess';
        setMessage(
          `${g} is not correct. You have ${guessesLeft} ${t} left.`,
          'red'
        );
        UIguessInput.value = NaN;
      }
    }
  }
  // If game over
  else {
    UIguessBtn.value = 'SUBMIT';
    UIguessInput.disabled = false;
    UIguessInput.value = NaN;
    setMessage('', '#D1D1D1');
    guessesLeft = totalGuesses;
    winningNum = getRandomNum(min, max);
    gamePlaying = true;
  }
}

// Message function
function setMessage(msg, color) {
  UIguessInput.style.borderColor = color;
  UImessage.style.color = color;
  UImessage.textContent = msg;
}

// End game function
function endGame(msg, won) {
  setMessage(msg, won === true ? 'green' : 'red');
  UIguessBtn.value = 'PLAY AGAIN';
  UIguessInput.disabled = true;
  gamePlaying = false;
  roundsWon += won === true ? 1 : 0;
  totalRounds += 1;
  UIroundsWon.textContent = roundsWon;
  UItotalRounds.textContent = totalRounds;
}

// Random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
