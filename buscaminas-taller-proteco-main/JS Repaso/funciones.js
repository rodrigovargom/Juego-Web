/**
 * En JS una función es un bloque de codigo que está diseñado para realizar una tarea en partícular
 * Tamboién se ejecuta cuando "algo" lo invoca (o lo llama).
//Sintaxis.
 * En JS una función es definida con una palabra resevada "function", seguido de un nombre, seguido de unos parentesis.
 * El nombre de la función puede contener letras, digitos, guiones bajos, signos de dolares.
 * Los parentesis pueden incluir los nombres de los parametros seperados por commas
 * function name(parameter1,parameter2){//codigo}
 */

//Suma de dos numeros
function suma(n1,n2){
    return n1 + n2
}

let totalSuma = suma(3,79);
console.log(totalSuma);

//Funcion que convierta de farenheit a centígrados
function centigrados(gfarenheit){
    return (5/9)*(gfarenheit-32)
}
let centigrado = centigrados(77);
console.log(centigrado);

let texto = "La temperatura es " + centigrados(77)+" centigrados";
console.log(texto);