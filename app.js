/*
-player must guess a number between a min and a max.
-Player gets a certain amount of guesses.
-Notify player of guesses remaining.
-Notify the player of the correct answer if loose.
-Let player choose to play again.
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate input
  if(isNaN(guess) || guess < min || guess > max){
    errorMessage(`Please enter a number from ${min} to3e ${max}.`,'red');
  }else{
  
  // If won
  if(guess === winningNum){
    gameOver(true,`${guess} is correct, YOU WIN`)
  }else{
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game over - lost
      gameOver(false,`Game over, you lost. The correct number was ${winningNum}`)
    }else{
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';
      // Clear input
      guessInput.value = '';
      // Tell the user it's the wrong number.
      errorMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red')
    }
  }
}
})

// Game over
function gameOver(won,msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Change text color1z  `q x  
  message.style.color = color;
  // Set message
  errorMessage(msg);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//Get winning number
function getRandomNum(min,max){
  return Math.floor(Math.random() * (max-min+1)+min);
}

// Set message
function errorMessage(msg, color){
  message.textContent = msg;
  message.style.color = color;
}