/**
 * https://www.w3schools.com/js/js_comparisons.asp
 * Operadores en JS
 * == Igual a
 * === Igual en valor y también en tipo
 * != no igual
 * !== no igual al valor o no igual el tipo
 * > mayor que
 * < menor que
 * >= mayor o igual que
 * <= menor o igual que
*/
//Ejemplo con if
var edad = 15;
if (edad < 18) text = "Muy joven para beber";
console.log(text);

/*
 * Operadores lógicos.
 && and 
 || or
 ! not 
*/
edad = 64
let edades = (edad <18 ) ? "Muy joven":"Muy grande";
console.log(edades)

//Tipos de comparaciones.
edad = "x"
edad = Number(edad);
if (isNaN(edad)){
    edades = "Edad no valida";
    console.log(edades);
} else{
    edades = (edad <18 ) ? "Muy joven":"Muy grande"; 
    console.log(edades);
}