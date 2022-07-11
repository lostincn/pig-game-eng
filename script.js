'use strict';
//selecting ELEMENTS
const score0El = document.querySelector('#score--0'); //чтобы выбрать id элемента через querySelector нужно использовать #
const score1El = document.getElementById('score--1');
// REMEMBER чтобы выбрать АЙДИ, можно использовать два этих способа

const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let playing;
let scores;
let currentScore;
let activePlayer;
const btnRoll = document.querySelector('.btn--roll');
const init = function () {
  document.getElementById(`name--0`).textContent = `Игрок 1`;
  document.getElementById(`name--1`).textContent = `Игрок 2`;
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  score0El.textContent = Number(0);
  score1El.textContent = Number(0);
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// ROLL DICE Functionality
// Бросание костей

// Function to roll the dice so you can start the game
// Функция для броска костей, для начала игры
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1 Generate Random Dice Roll 1 to 6
    //1 Создаём рандомное число от 1 до 6
    const diceRandom = Math.trunc(Math.random() * 6) + 1;

    //2 Display Dice in the beginning of the game
    //2 В начале игры показываем кости
    diceEl.classList.remove('hidden');

    //here we change the picture of the dice using diceRandom function
    // тут мы меняем цифру картинки просто через код подбора цифр, который у нас будет выходить из diceRandom
    diceEl.src = `dice-${diceRandom}.png`;

    // 3 Check for rolled if it true add to current score
    // 3 Если наша кость не равна 1, то мы добавляем число в currentScore
    if (diceRandom !== 1) {
      currentScore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if activePlayer gets 1 switch to next player
      // если activePlayer выпадает 1, меняем на следующего игрока
      switchPlayer();
    }
  }
});

const btnNew = document.querySelector('.btn--new');
btnNew.addEventListener('click', init);

const btnHold = document.querySelector('.btn--hold');
//this function  is to hold the current score
//функция для кнопки сохранения счёта
btnHold.addEventListener('click', function () {
  //1. Add the current score to the score of the active player
  //1. Добавить текущий счёт активному игроку
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent =
      Number('0');
    //2. Check if the score is >= 100 finish the game
    //2. Если число >=100 заканчиваем игру

    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      diceEl.classList.add('hidden');
      document.getElementById(
        `name--${activePlayer}`
      ).textContent = `Игрок Победил!`;
    }
    //3. Change the active player
    //3. Смена игрока если число
    else {
      switchPlayer();
    }
  }
});

// switchPlayer function is used in two options - if player gets 1 and if player clicks hold button
//функция для смены игрока Используется в двух местах - при достижении однёрки и при сохранении числа

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  document;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  currentScore = 0;
};
