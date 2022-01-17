'use strict';

let player = 0;
let score = function () {
  return document.querySelector(`#score--${player}`);
};
let current = function () {
  return document.querySelector(`#current--${player}`);
};
let numPlayer = function () {
  return document.querySelector(`.player--${player}`);
};
let playerName = function () {
  return document.querySelector(`#name--${player}`);
};
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const activePlayer = document.querySelectorAll('.player');
const currentNum = [0, 0];
const scoreNum = [0, 0];

// When game beggins
const newRound = function () {
  numPlayer().classList.remove('player--winner');
  player = 0;
  playerName().textContent = 'Player 1';
  activePlayer[player].classList.add('player--active');
  score().textContent = 0;
  current().textContent = 0;
  player++;
  playerName().textContent = 'Player 2';
  numPlayer().classList.remove('player--winner');
  activePlayer[player].classList.remove('player--active');
  score().textContent = 0;
  current().textContent = 0;
  player--;
  dice.style.display = 'none';
  btnHold.disabled = false;
  btnRoll.disabled = false;
};
newRound();

// To change next player
const nextPlayer = function () {
  currentNum[player] = 0;
  current().textContent = currentNum[player];
  player = player === 1 ? 0 : 1;
  for (let eachPlayer of activePlayer) {
    eachPlayer.classList.toggle('player--active');
  }
  dice.style.display = 'none';
};

//When NEW GAME is clicked
btnNew.addEventListener('click', newRound);

//When ROLL DICE is clicked
btnRoll.addEventListener('click', function () {
  let randNum = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice-${randNum}.png`;
  dice.style.display = 'block';
  currentNum[player] += randNum;
  console.log(player);
  console.log(currentNum);

  current().textContent = currentNum[player];
  if (randNum === 1) {
    nextPlayer();
  }
});

//When HOLD is clicked
btnHold.addEventListener('click', function () {
  scoreNum[player] += currentNum[player];
  score().textContent = scoreNum[player];

  if (Number(score().textContent) >= 100) {
    playerName().textContent = '👑WINNER!👑';
    numPlayer().classList.add('player--winner');
    btnHold.disabled = true;
    btnRoll.disabled = true;
  } else {
    nextPlayer();
  }
  dice.style.display = 'none';
});

// '🎉'
