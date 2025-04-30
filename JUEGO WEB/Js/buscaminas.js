


function crearTableroPersonalizado() {
  const nfilas = parseInt(prompt("Ingrese el número de filas:"));
  const ncolumnas = parseInt(prompt("Ingrese el número de columnas:"));
const tamano=nfilas * ncolumnas;
crearTablero(nfilas, ncolumnas);
}

function crearTablero(nfilas, ncolumnas) {
  tamano = nfilas * ncolumnas;
    const arreglo = [];
    for (let i = 0; i < nfilas; i++) {
arreglo.push([]);
        for (let j = 0; j < ncolumnas; j++) {
           arreglo[i].push(0);
        }    
    }
    return arreglo;
}


function crearMina(){
    let cant =0;
   let nminas =Math.floor(Math.random() *(tamano/6) )+tamano/8; 
    do{
        const fila= Math.floor(Math.random() * 10);
        const columna= Math.floor(Math.random() * 10);  
        if(arreglo[fila][columna] == 0) {
            arreglo[fila][columna] = "b";
            cant++;
        }
    }while(cant < nminas);
    const mina = Math.floor(Math.random() * 10);
    return mina;
}
function contarlado(arreglo,columna, fila) {
    let total = 0
    if (fila - 1 >= 0 && columna - 1 >= 0) {
      if (arreglo[fila - 1][columna - 1] == "b") {
        total = total + 1
      }
    }
    if (fila - 1 >= 0) {
      if (arreglo[fila - 1][columna] == "b") {
        total = total + 1
      }
    }
    if (fila - 1 >= 0 && columna + 1 < 10) {
      if (arreglo[fila - 1][columna + 1] == "b") {
        total = total + 1
      }
    }
    if (columna + 1 < 10) {
      if (arreglo[fila][columna + 1] == "b") {
        total = total + 1
      }
    }
    if (fila + 1 < 10 && columna + 1 < 10) {
      if (arreglo[fila + 1][columna + 1] == "b") {
        total = total + 1
      }
    }
    if (fila + 1 < 10) {
      if (arreglo[fila + 1][columna] == "b") {
        total = total + 1
      }
    }
    if (fila + 1 < 10 && columna - 1 >= 0) {
      if (arreglo[fila + 1][columna - 1] == "b") {
        total = total + 1
      }
    }
    if (columna - 1 >= 0) {
      if (arreglo[fila][columna - 1] == "b") {
        total = total + 1
      }
    }
    return total
}

function crearMinasProximas(){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if(arreglo[i][j] == 0){      
                arreglo[i][j] = contarlado(arreglo, j, i)
            }
        }
    }
}

function renderizarTablero(arreglo) {
  const contenedor = document.querySelector('.contenedor');
  contenedor.innerHTML = ''; // Limpia el contenedor antes de renderizar

  for (let i = 0; i < arreglo.length; i++) {
      const filaDiv = document.createElement('div');
      filaDiv.classList.add('fila');

      for (let j = 0; j < arreglo[i].length; j++) {
          const celda = document.createElement('span');
          celda.classList.add('celda', 'gris'); // Clase inicial para las celdas
          celda.dataset.fila = i; // Guarda la fila en un atributo
          celda.dataset.columna = j; // Guarda la columna en un atributo
          celda.textContent = ''; // Inicialmente vacío
          filaDiv.appendChild(celda);
      }

      contenedor.appendChild(filaDiv);
  }
}


let estado = true;
const arreglo = crearTablero(10,10);
crearMina(arreglo);
crearMinasProximas(arreglo);
renderizarTablero(arreglo);
console.table(arreglo);