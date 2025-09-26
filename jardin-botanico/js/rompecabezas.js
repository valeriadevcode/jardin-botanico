// rompecabezas 3x3 - arrastrar y soltar
document.addEventListener('DOMContentLoaded', () => {
  const puzzle = document.getElementById('puzzle');
  const size = parseInt(puzzle.dataset.size) || 3; // 3x3
  const total = size * size;
  const imageUrl = 'img/plant.jpg'; // tu imagen

  let tiles = []; // array de objetos {correctIndex, currentIndex, el}

  // crear piezas y colocarlas en orden inicial
  function crearPiezas() {
    puzzle.innerHTML = '';
    tiles = [];
    for (let i = 0; i < total; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.setAttribute('draggable', 'true');
      tile.dataset.correct = i;   // posición correcta
      tile.dataset.pos = i;       // posición actual
      // calcular background-position
      const row = Math.floor(i / size);
      const col = i % size;
      const posX = (col * 100) / (size - 1);
      const posY = (row * 100) / (size - 1);
      tile.style.backgroundImage = `url("${imageUrl}")`;
      tile.style.backgroundPosition = `${posX}% ${posY}%`;
      // añadir listeners drag/drop
      addDragEvents(tile);
      puzzle.appendChild(tile);
      tiles.push({ correctIndex: i, el: tile });
    }
  }

  // listeners para drag & drop
  function addDragEvents(tile) {
    tile.addEventListener('dragstart', (e) => {
      tile.classList.add('dragging');
      e.dataTransfer.setData('text/plain', tile.dataset.pos);
      // permitir imagen invisible en FF
      if (e.dataTransfer.setDragImage) {
        const crt = tile.cloneNode(true);
        crt.style.position = "absolute";
        crt.style.top = "-1000px";
        document.body.appendChild(crt);
        e.dataTransfer.setDragImage(crt, 30, 30);
        setTimeout(()=> document.body.removeChild(crt), 0);
      }
    });

    tile.addEventListener('dragend', () => {
      tile.classList.remove('dragging');
    });

    tile.addEventListener('dragover', (e) => {
      e.preventDefault(); // necesario para permitir drop
    });

    tile.addEventListener('drop', (e) => {
      e.preventDefault();
      const fromPos = parseInt(e.dataTransfer.getData('text/plain'));
      const toPos = parseInt(tile.dataset.pos);
      if (!isNaN(fromPos)) {
        swapTiles(fromPos, toPos);
      }
    });
  }

  // intercambiar dos piezas por sus posiciones actuales
  function swapTiles(posA, posB) {
    if (posA === posB) return;
    // buscar elementos por dataset.pos
    const elA = puzzle.querySelector(`[data-pos='${posA}']`);
    const elB = puzzle.querySelector(`[data-pos='${posB}']`);
    if (!elA || !elB) return;

    // intercambiar dataset.pos
    elA.dataset.pos = posB;
    elB.dataset.pos = posA;

    // intercambiar posiciones en DOM: reemplazar
    const next = elB.nextSibling;
    const parent = puzzle;
    parent.insertBefore(elA, next); // mueve A justo después de B's next (efecto: coloca A donde estaba B)
    parent.insertBefore(elB, parent.children[posA]); // colocar B en la posición original de A

    // después del swap revisar si está resuelto
    setTimeout(() => {
      if (checkSolved()) {
        showWin();
      }
    }, 100);
  }

  // mezclar usando Fisher-Yates en posiciones
  // mezclar las piezas de forma aleatoria
function shuffle() {
  const tiles = Array.from(puzzle.children);
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  // limpiar y volver a insertar en nuevo orden
  puzzle.innerHTML = '';
  tiles.forEach((tile, index) => {
    tile.dataset.pos = index;
    puzzle.appendChild(tile);
  });
}


  // revisar si todas las piezas están en su posición correcta
  function checkSolved() {
    const all = puzzle.querySelectorAll('.tile');
    for (let t of all) {
      if (t.dataset.pos !== t.dataset.correct) return false;
    }
    return true;
  }

  // mostrar modal de victoria
  function showWin() {
    document.getElementById('winModal').style.display = 'flex';
  }
  window.cerrarModal = function() {
    document.getElementById('winModal').style.display = 'none';
  }

  // reiniciar al orden original
  function reset() {
    // colocar en orden
    const elems = Array.from(puzzle.querySelectorAll('.tile')).sort((a,b) => {
      return parseInt(a.dataset.correct) - parseInt(b.dataset.correct);
    });
    puzzle.innerHTML = '';
    elems.forEach((tile, i) => {
      tile.dataset.pos = i;
      puzzle.appendChild(tile);
    });
    document.getElementById('winModal').style.display = 'none';
  }

  // inicializar
  crearPiezas();
  // por defecto mezclar
  shuffle();

  // controles
  document.getElementById('shuffleBtn').addEventListener('click', shuffle);
  document.getElementById('resetBtn').addEventListener('click', reset);
});
