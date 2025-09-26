document.addEventListener('DOMContentLoaded', () => {
  const game = document.querySelector('.memory-game');
  const resetBtn = document.getElementById('resetBtn');
  const modal = document.getElementById('winModal');

  const images = [
    'capiguara.jpg',
    'patuju.jpg',
    'toborochi.jpg',
    'tucan.jpg'
  ];

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function createBoard() {
    game.innerHTML = '';
    let cardsArray = [...images, ...images]; // duplicar para parejas
    cardsArray.sort(() => 0.5 - Math.random()); // mezclar

    cardsArray.forEach(img => {
      const card = document.createElement('div');
      card.classList.add('memory-card');

      const front = document.createElement('div');
      front.classList.add('front');
      front.textContent = '❓';

      const back = document.createElement('div');
      back.classList.add('back');
      back.style.backgroundImage = `url("img/${img}")`;

      card.appendChild(front);
      card.appendChild(back);

      card.dataset.framework = img;
      card.addEventListener('click', flipCard);

      game.appendChild(card);
    });
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    if (document.querySelectorAll('.memory-card:not(.flip)').length === 0) {
      setTimeout(() => { modal.style.display = 'flex'; }, 500);
    }
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  resetBtn.addEventListener('click', createBoard);
  window.cerrarModal = function() { modal.style.display = 'none'; createBoard(); };

  createBoard(); // inicializar
});
