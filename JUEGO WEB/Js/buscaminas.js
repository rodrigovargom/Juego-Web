
let element;
let index;
const grid = document.getElementById("grid");


function crearTableroPersonalizado() {
  let nfilas, ncolumnas;

  // do {
  //   nfilas = parseInt(prompt("Ingrese el número de filas (mínimo 10):"));
  // } while (nfilas < 10);

  // do {
  //   ncolumnas = parseInt(prompt("Ingrese el número de columnas (mínimo 10):"));
  // } while (ncolumnas < 10);
nfilas=20;
ncolumnas=20;
  const tamano = nfilas * ncolumnas;
  Minfila=tamano/6;
  Maxfila=tamano/4;
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
   let nminas =Math.floor(Math.random() *Maxfila )+Minfila; 
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
function crearPantalla() {
  let cad = ''
  for (let f = 0; f < 10; f++) {
    for (c = 0; c < 10; c++) {
      cad += `<span class="celda gris" id="celda${f}${c}" data-fila="${f}" data-columna="${c}"></span>`
    }
  }
  document.querySelector(".contenedor").innerHTML = cad
}

function destapar(arreglo, fila, columna, evento) {
  if (arreglo[fila][columna] === 'b') {
    evento.target.style.backgroundColor = 'red'
    setTimeout(() => alert('Perdiste'), 10);
    estado = false
  } else {
    if (arreglo[fila][columna] >= 1 && arreglo[fila][columna] <= 8) {
      evento.target.textContent = arreglo[fila][columna]
      evento.target.classList.add('verde')
      evento.target.classList.remove('gris')
    } else {
      if (arreglo[fila][columna] === 0) {
        recorrer(arreglo, fila, columna)
        console.table(arreglo)
      }
    }
  }
  verificarGanado();
}
function verificarGanado() {
  const celdas = document.querySelectorAll(".contenedor span")
  let cant = 0
  celdas.forEach(celda => {
    if (celda.classList.contains('verde')) {
      cant++
    }
  })
  if (cant == 90) {
    estado = false
    setTimeout(() => alert('Ganaste'), 10)
  }
}


let estado = true;
const arreglo =crearTableroPersonalizado();
crearMina(arreglo);
crearMinasProximas(arreglo);
crearPantalla();
console.table(arreglo);