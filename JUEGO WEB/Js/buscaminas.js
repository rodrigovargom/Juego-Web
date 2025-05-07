// Se hace de la siguiente manera para saber que todo el HTML se lee antes de leer el código
function startTimer() {
  timerInterval = setInterval(() => {
      time++;
      timerElement.textContent = `Tiempo: ${time}`;
  }, 1000);
}
function stopTimer() {
  clearInterval(timerInterval);
}
document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.querySelector('.grid');
  let width = 10;
  let bombAmount = 20;  
  let flags = 0;
  let squares = [];
  let isGameOver = false;

  // Creando el tablero 
  function createBoard(){
      // Creando un arreglo de bombas que se pongan aleatoriamente.
      const bombsArray = Array(bombAmount).fill('bomb'); // Con el método Array estamos creando un array del tamaño del numero de bombas, y llenamos cada índice con la cadena de 'bomb'
      console.log(bombsArray);
      const emptyArray = Array(width*width - bombAmount).fill('valid');
      const gameArray = emptyArray.concat(bombsArray); // Concatenando los dos arreglos
      const shuffledArray = gameArray.sort(()=> Math.random() - 0.5) // Haciéndolo aleatorio

      for(let i=0;  i< width*width; i++){
          const square = document.createElement('div');
          square.setAttribute('id',i);
          square.classList.add(shuffledArray[i]);
          grid.appendChild(square);
          squares.push(square);
          // Normal click
          square.addEventListener('click', function(e){
              click(square)
          })
          // control y click  izquierdo
          square.oncontextmenu = function(e){
              // Asigna una función al evento de clic derecho en la casilla.
              e.preventDefault(); // Evita que se muestre el menú contextual predeterminado del navegador al hacer clic derecho.
              addFlag(square); // Llama a la función `addFlag` y le pasa la casilla como argumento, para manejar la colocación y eliminación de banderas en la casilla.
          }
      }
      // Añadiendo números
      for (let i = 0; i<squares.length; i++){
          let total = 0;
          const isLeftEdge = (i%width === 0); // Para verificar los bordes
          const isRightEdge = (i%width === width -1);
          if (squares[i].classList.contains('valid')){ // Osea si no es una bomba
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
document.addEventListener('DOMContentLoaded', () => {
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', () => {
      // Recargar la página para reiniciar el juego
      location.reload();
  });

  // ...existing code...
});
startTimer(); // Iniciar el temporizador al cargar la página