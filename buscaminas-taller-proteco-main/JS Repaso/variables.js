//Variables y constantes
//https://www.w3schools.com/js/js_variables.asp
/*
- Todas las variables en Js deben ser identificadas con un unico nombre.
- Estos unicos nombres son llamados identificadores.
- Los indentificadores pueden ser nombres cortos  como (x,y) o más descriptivos (edad, suma, volumenTotal)
Las reglas generales para construir los nombres de las variables (unico dentificador) son:
    - Los nombres pueden contener letras, digitos, guion bajo y simbolo de dolar
    - Los nombres deben empezar con una letra.
    - Los nombres también pueden empezar con $ y _ 
    - las palabras reservadas en Js no pueden ser usadas como nombre.
*/

//Operadores.
// Operador =
x = x + 2; // Esto es diferente a == que es comparar a algo.

//Tipos de datos.
const pi = 3.1416;
let persona = "John Doe";
let answer = "Si soy";

//Declarando variables
const atun = 65; //La palabra reservada const nunca cambia el valor
console.log(atun);
var x = 2;//Var se usa para navegadores viejos pero puede cambiar su valor respecto a la ejecución del programa
x = x**2;
console.log(x)
//Let se usa cuando no podamos usar un const en este caso a que tener cuidado de como se define las variables
let x_1 = 6
let y = 2
let z = x_1**2 + y**2
console.log(z);
//Error de Var a Let
//Aquí todo cool pero...
var val = 2;
let time = 2*val;
console.log(time);
//var time  = 2**4;. Esto dará error :(