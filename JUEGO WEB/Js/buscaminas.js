let time;
let timerInterval;


document.addEventListener('DOMContentLoaded', ()=>{
    const timerElement = document.querySelector('#timer');
    if (!timerElement) {
        console.error('El elemento #timer no se encuentra en el DOM.');
        return;
      }
function startTimer() {
    time = 0; 
    timerInterval = setInterval(() => {
        time+=1;
        timerElement.textContent = `Tiempo: ${time}`; // Actualiza el tiempo en el DOM
      }, 1000);
}
function stopTimer() {
  clearInterval(timerInterval);
}
function resetGame(){
    grid.innerHTML = ''; 
    squares = [];
    isGameOver = false;
    createBoard();
    startTimer(); // Reinicia el temporizador
}
  const grid = document.querySelector('.grid');
  let width = 10;
  let filas=10;
  let columnas=10;    
  let bombAmount = 20;  
  let flags = 0;
  let squares = [];
  let isGameOver = false;
  playButton.addEventListener('click', () => {
    menu.style.display = 'none'; 
    game.style.display = 'block'; 
    createBoard();
    resetGame(); // Crea el tablero
  });
  optionsButton.addEventListener('click', () => {
    menu.style.display = 'none'; 
    options.style.display = 'block'; 
  });
  volverButton.addEventListener('click', () => {
    options.style.display = 'none'; 
    menu.style.display = 'block'; 
  });
  volverMenu.addEventListener('click', () => { 
    game.style.display = 'none'; 
    menu.style.display = 'block'; 
  });
  resetButton.addEventListener('click', () => {
   resetGame(); 
  });
  function createBoard(){
      const bombsArray = Array(bombAmount).fill('bomb'); 
      console.log(bombsArray);
      const emptyArray = Array(width*width - bombAmount).fill('valid');
      const gameArray = emptyArray.concat(bombsArray); // Concatenando los dos arreglos
      const shuffledArray = gameArray.sort(()=> Math.random() - 0.5) // Haciéndolo aleatorio

      for(let i=0;  i< filas; i++){
        for(let j = 0; j < columnas; j++){
            const square = document.createElement('div');
            const index = i * columnas + j; // Calcular el índice correcto en el arreglo mezclado
            square.setAttribute('id', `${i}-${j}`); // Usar un ID único basado en fila y columna
            square.classList.add(shuffledArray[index]); // Asignar clase según el arreglo mezclado
            grid.appendChild(square); // Agregar la celda al tablero
            squares.push(square); 
          // Normal click
          square.addEventListener('click', function(e){
              click(square)
          })
          // control y click  izquierdo
          square.oncontextmenu = function(e){
              e.preventDefault(); 
              addFlag(square); 
          }
        }
      }
      for (let i = 0; i<squares.length; i++){
          let total = 0;
          const isLeftEdge = (i%width === 0); // Para verificar los bordes
          const isRightEdge = (i%width === width -1);
          if (squares[i].classList.contains('valid')){ 
              //Checa a la izquierda de la casilla 
              if(i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) 
                  total++;
              // Checa en la esquina de arriba de la derecha de la casilla
              if(i>(width-1) && !isRightEdge && squares[i+1-width].classList.contains('bomb')) 
                  total++;
              // Checando arriba de la casilla
              if(i>(width-1) && squares[i-width].classList.contains('bomb'))
                  total++;
              // Checa en la esquina de arriba de la izquierda de la casilla
              if(i>(width+1) && !isLeftEdge && squares[i-1-width].classList.contains('bomb'))
                  total++;
              // Checa la casiilla de la derecha
              if(i < (width*width - 2) && !isRightEdge && squares[i+1].classList.contains('bomb'))
                  total++
              // Checando la casilla abajo a la izquierda
              if(i<(width*width - width) && !isLeftEdge && squares[i-1 + width].classList.contains('bomb'))
                  total++
              // Checando la casilla abajo a la derecha.
              if(i<(width*width - width - 1) && !isRightEdge && squares[i+1+width].classList.contains('bomb'))
                  total++
              // Checando la casilla de abajo
              if(i<(width*width-width-1) && squares[i+width].classList.contains('bomb'))
                  total++
              squares[i].setAttribute('data',total);
          }
      }
  }

  createBoard();
  // Añadir las banderas con el click derecho
  function addFlag(square){
      if (isGameOver) return;
      if (!square.classList.contains('checked') && (flags < bombAmount)){
          if (!square.classList.contains('flag')){
              square.classList.add('flag');
              square.innerHTML = '🚩';
              flags ++;
              checkforWin();
          } else {
              square.classList.remove('flag');
              square.innerHTML = '';
              flags--;
          }
      }
  }

  // Click on square actions
  function click(square){
      let currentId = square.id;
      if (isGameOver) return;
      if (square.classList.contains('checked') || square.classList.contains('flag')) return;
      if (square.classList.contains('bomb')){
          //console.log("Game over :C");
          gameOver(square); // Llamando a la función gameOver
          //isGameOver = true;
          //alert('Game over :C');
      }else {
          let total = square.getAttribute('data');
          if (total != 0){
              square.classList.add('checked');
              square.innerHTML = total;
              return;
          }
          checkSquare(square, currentId)
      }
  square.classList.add('checked')
  }

  // Verificar cuadrados vecinos una vez que al cuadrado se le hizo click
  function checkSquare(square, currentId){
      const isLeftEdge = (currentId%width === 0);
      const isRightEdge = (currentId%width ===  width-1);

      setTimeout(()=>{
          if (currentId > 0 && !isLeftEdge){
              const newId = squares[parseInt(currentId)-1].id; // Pasando el id del cuadrado de la izquierda
              const newSquare = document.getElementById(newId);
              click(newSquare)
          }
          if (currentId > (width-1) && !isRightEdge){
              const newId = squares[parseInt(currentId)+1-width].id; // Id cuadrado de la derecha arriba
              const newSquare = document.getElementById(newId);
              click(newSquare)
          }
          if (currentId > width){
              const newId = squares[parseInt(currentId)-width].id; // Id cuadrado de arribita
              const newSquare = document.getElementById(newId);
              click(newSquare)
          }
          if (currentId > (width+1) && !isLeftEdge){
              const newId = squares[parseInt(currentId)-1-width].id; // Id cuadrado de arribita a la izquierda
              const newSquare = document.getElementById(newId);
              click(newSquare)
          }
          if (currentId < (width*width - 2) && !isRightEdge){
              const newId = squares[parseInt(currentId)+1].id; // Id cuadrado de la derechita
              const newSquare = document.getElementById(newId);
              click(newSquare)
          }
          if (currentId < (width*width - width) && !isLeftEdge){
              const newId = squares[parseInt(currentId)-1+width].id; // Id cuadrado de abajo a la izquierda
              const newSquare = document.getElementById(newId);
              click(newSquare)
          }
          if (currentId < (width*width - width -1) && !isRightEdge){
              const newId = squares[parseInt(currentId)+1+width].id; // Id cuadrado de abajo a la derecha
              const newSquare = document.getElementById(newId);
              click(newSquare)
          }
          if (currentId <= (width*width - width -1) && !isRightEdge){
              const newId = squares[parseInt(currentId)+width].id; // Id cuadrado de abajo
              const newSquare = document.getElementById(newId);
              click(newSquare)
          }
      },15)
  }

  // Función del Game Over :0
  function gameOver(){
      console.log('Terminó el juego C:');
      isGameOver=true;
stopTimer(); 
      squares.forEach(square => {
          if (square.classList.contains('bomb')){
              square.innerHTML = '💣';
              square.classList.remove('bomb')
              square.classList.add('checked')
          }
      })
  }

  // Verificando la victoria
  function checkforWin() {
      let matches = 0;
      for (let i = 0; i < squares.length; i++){
          if ( squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
              matches++;
          }
      }
      if (matches === bombAmount){
          console.log('Ganaste :D!!!')
          isGameOver = true;
          stopTimer(); 
      }
  }


})
