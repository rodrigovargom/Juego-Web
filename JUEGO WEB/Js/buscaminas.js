let time;
let timerInterval;
var particleSystem = null;
let lastTime = performance.now();
var canvas = /** @type {HTMLCanvasElement} */(null);
var ctx = /** @type {CanvasRenderingContext2D} */(null);
const audioFlag = new Audio('Sonido/flag.mp3');
const audioDig = new Audio('Sonido/dig.mp3');
const audioBomb = new Audio('Sonido/bomb.mp3');
const music = new Audio('Sonido/music.mp3');
music.volume = 0.2;
var requestAnimationFrameID = -1;
   let filas = 10;
    let columnas = 8;
    let width = filas * columnas;
    let bombs = Math.floor(Math.random() * (width / 8)) + width / 6;
    let bombAmount = Math.round(bombs);
    let flags = 0;
    let squares = [];
    let isGameOver = false;
document.addEventListener('DOMContentLoaded', () => {
    const submitScoreButton = document.getElementById("submitWinScore");
    const resumeButton = document.getElementById("resumeButton");
    const playerNameInput = document.getElementById("playerName");
    const finalStreakSpan = document.getElementById("finalStreak");

submitScoreButton.addEventListener("click", () => {
  let playerName = playerNameInput.value.trim();

  if (!playerName) {
    playerName = prompt("Please enter your name:");
    if (!playerName) {
      alert("Name is required to submit score.");
      return;
    }
    playerNameInput.value = playerName;
  }

  // Usa la variable time directamente
  const streak = time || 0;

  if (typeof storeHighscore === "function") {
    storeHighscore(playerName, streak);
    alert("Score submitted!");
    resumeButton.click();
  } else {
    console.error("storeHighscore function not found.");
  }
});

    resumeButton.addEventListener("click", () => {
      document.getElementById("game").style.display = "none";
      menu.style.display = "block";
    });

 
if (!canvas) {
    canvas = document.createElement('canvas');
    // Haz que el canvas ocupe toda la pantalla
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none'; // para que no bloquee clicks
    canvas.style.zIndex = '10';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    // Ajusta el tamaño real del canvas al tamaño de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}
    var assets = {
    bomb: {
        img: null,
        path: "bomba1.webp",
    },
       a: {
        img: null,
        path: "bomba.png",
    },
}
    const flagsLeftElement = document.getElementById('flagsLeft');
    const filasInput = document.getElementById('filasInput');
    const columnasInput = document.getElementById('columnasInput');
    const applyOptionsButton = document.getElementById('applyOptionsButton');
    // Actualizar filas y columnas al aplicar las opciones
    applyOptionsButton.addEventListener('click', () => {
        const nuevasFilas = parseInt(filasInput.value);
        const nuevasColumnas = parseInt(columnasInput.value);
        if (nuevasFilas >= 5 && nuevasFilas <= 12 && nuevasColumnas >= 5 && nuevasColumnas <= 12) {
        filas = nuevasFilas;
        columnas = nuevasColumnas;
        width = nuevasFilas * nuevasColumnas;
        bombs = Math.floor(Math.random() * (width / 8)) + width / 6;
        bombAmount = Math.round(bombs); // <-- recalcula aquí
        resetGame(); // Reinicia el juego con el nuevo tamaño y número de bombas
    }
    });
    function Start(){
         createBoard();
   particleSystem = new ParticleSystem(assets.bomb.img,configRain);
}
    function Initt(){
      
     LoadImages(assets, () => {
        Start();
        update();
    });
}
function update(now) {
    // Calcula el deltaTime en segundos
    Draw(ctx);
    let deltaTime = (now - lastTime) / 1000;
    lastTime = now;
    particleSystem.Update(deltaTime);
     updateFlagsLeft();
    requestAnimationFrame(update);
}

function LoadImages(assets, onloaded) {
    let imagesToLoad = 0;
    const onload = () => --imagesToLoad === 0 && onloaded();
    for (let asset in assets) {
        if (assets.hasOwnProperty(asset)) {
            imagesToLoad++;
            const img = assets[asset].img = new Image();
            img.src = assets[asset].path;
            img.onload = onload;
        }
    }
    return assets;
}
   playButton.addEventListener('click', () => {
        menu.style.display = 'none';
        game.style.display = 'block';
        winPanel.style.display = 'none';
        resetGame();
        
         music.currentTime = 0; 
                music.play();
    });
    optionsButton.addEventListener('click', () => {
        menu.style.display = 'none';
        options.style.display = 'block';
        
    });
    volverButton.addEventListener('click', () => {
        options.style.display = 'none';
        menu.style.display = 'block';
        Lost.style.display = 'none';
       
    });
    volverButton2.addEventListener('click', () => {
        options.style.display = 'none';
        menu.style.display = 'block';
        Lost.style.display = 'none';
    });
    volverMenu.addEventListener('click', () => {
        game.style.display = 'none';
        menu.style.display = 'block';
        Lost.style.display = 'none';
        music.pause();
        particleSystem = null;
    });
    resetButton.addEventListener('click', () => {
        resetGame();
       
    });
    const timerElement = document.querySelector('#timer');
    function startTimer() {
        stopTimer(); // Detener cualquier temporizador existente
        time = 0;
        timerInterval = setInterval(() => {
            time += 1;
            timerElement.textContent = `Tiempo: ${time} s`; // Actualiza el tiempo en el DOM
        }, 1000);
    }
    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetGame() {
        grid.innerHTML = '';
        squares = [];
        isGameOver = false;
         flags = 0;
        createBoard();
        Lost.style.display = 'none';
        startTimer(); // Reinicia el temporizador
         
        particleSystem = null;
       
        
    }
    const grid = document.querySelector('.grid');
 
    function createBoard() {
       let flags = 0;
        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(filas * columnas - bombAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray); // Concatenando los dos arreglos
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5); // Haciéndolo aleatorio
        grid.style.gridTemplateRows = `repeat(${filas}, 1fr)`; // Ajustar filas dinámicamente
        grid.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`; // Ajustar columnas dinámicamente

        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                const square = document.createElement('div');
                const index = i * columnas + j; // Calcular el índice correcto en el arreglo mezclado
                square.setAttribute('id', `${i}-${j}`); // Usar un ID único basado en fila y columna
                square.classList.add(shuffledArray[index]); // Asignar clase según el arreglo mezclado
                grid.appendChild(square); // Agregar la celda al tablero
                squares.push(square);

                // Normal click
                square.addEventListener('click', function (e) {
                    click(square);
                });

                // Control y clic derecho
                square.oncontextmenu = function (e) {
                    e.preventDefault();
                    addFlag(square);
                };
            }
           updateFlagsLeft(); 
        }

        for (let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = (i % columnas === 0); // Para verificar los bordes
            const isRightEdge = (i % columnas === columnas - 1);

            if (squares[i].classList.contains('valid')) {
                // Checa a la izquierda de la casilla
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
                // Checa en la esquina de arriba a la derecha
                if (i >= columnas && !isRightEdge && squares[i + 1 - columnas].classList.contains('bomb')) total++;
                // Checa arriba de la casilla
                if (i >= columnas && squares[i - columnas].classList.contains('bomb')) total++;
                // Checa en la esquina de arriba a la izquierda
                if (i >= columnas + 1 && !isLeftEdge && squares[i - 1 - columnas].classList.contains('bomb')) total++;
                // Checa la casilla de la derecha
                if (i < (filas * columnas - 1) && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
                // Checa la casilla abajo a la izquierda
                if (i < (filas * columnas - columnas) && !isLeftEdge && squares[i - 1 + columnas].classList.contains('bomb')) total++;
                // Checa la casilla abajo a la derecha
                if (i < (filas * columnas - columnas - 1) && !isRightEdge && squares[i + 1 + columnas].classList.contains('bomb')) total++;
                // Checa la casilla de abajo
                if (i < (filas * columnas - columnas) && squares[i + columnas].classList.contains('bomb')) total++;
            }

            squares[i].setAttribute('data', total);
        }
    }
 function updateFlagsLeft() {
    if (flagsLeftElement) {
        flagsLeftElement.textContent = `Banderas: ${bombAmount - flags}`;
    }
}
function addFlag(square) {
        if (isGameOver) return;
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag');
                square.innerHTML = '🚩';
                flags++;
                 audioFlag.currentTime = 0; // Reinicia el sonido si se pulsa rápido
                audioFlag.play();
                checkforWin();
            } else {
                square.classList.remove('flag');
                square.innerHTML = '';
                flags--;
            }
            updateFlagsLeft();
        }
    }

    // Click on square actions
    function click(square) {
        let currentId = square.id;
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;

        if (square.classList.contains('bomb')) {
              audioBomb.currentTime = 0;
        audioBomb.play();
            gameOver(square); // Llamando a la función gameOver
            return; // Detener la ejecución si es una bomba
        }

        let total = square.getAttribute('data');
        square.classList.add('checked');
  audioDig.currentTime = 0;
    audioDig.play();
        if (total != 0) {
            square.innerHTML = total; // Muestra el número si no es 0
            return;
        }

        // Si es 0, no muestra nada y propaga el clic a las casillas vecinas
        checkSquare(square, currentId);
    }

    function checkSquare(square, currentId) {
        // Obtener fila y columna a partir del id (formato "fila-columna")
        const [fila, columna] = currentId.split('-').map(Number);

        // Recorrer todas las casillas vecinas (incluyendo diagonales)
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                // Saltar la casilla actual
                if (dx === 0 && dy === 0) continue;

                const nuevaFila = fila + dx;
                const nuevaColumna = columna + dy;

                // Verificar que la nueva posición esté dentro del tablero
                if (
                    nuevaFila >= 0 && nuevaFila < filas &&
                    nuevaColumna >= 0 && nuevaColumna < columnas
                ) {
                    const newId = `${nuevaFila}-${nuevaColumna}`;
                    const newSquare = document.getElementById(newId);

                    // Si la casilla existe y no está marcada como checked ni como bandera
                    if (newSquare && !newSquare.classList.contains('checked') && !newSquare.classList.contains('flag')) {
                        // Si la casilla es un cero, propaga recursivamente
                        if (newSquare.getAttribute('data') == "0") {
                            newSquare.classList.add('checked');
                            checkSquare(newSquare, newId);
                        } else {
                            // Si es un número, solo lo muestra
                            newSquare.classList.add('checked');
                            let total = newSquare.getAttribute('data');
                            if (total != 0) {
                                newSquare.innerHTML = total;
                            }
                        }
                    }
                }
            }
        }
    }
    function gameOver() {

        isGameOver = true;
        stopTimer();
        Lost.style.display = 'block';
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣';
                square.classList.remove('bomb')
                square.classList.add('checked')
            }
        })
        
           particleSystem = new ParticleSystem(assets.bomb.img, configRain);
        
        
  
    }

    // Verificando la victoria
    function checkforWin() {
        let matches = 0;
        for (let i = 0; i < squares.length; i++) {
           
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
                matches++;
            }
        }
        if (matches === bombAmount) {
            isGameOver = true;
             winPanel.style.display = 'block';
            stopTimer();
        }
    }

function Draw() {
   if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
  particleSystem.Draw(ctx);
   
   
}

Initt();
});

