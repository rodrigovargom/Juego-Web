//Ciclo for
/**
 * Los ciclos son sencillos, si queremos correr en el mismo código una y otra vez, cada tiempo con diferente valor
 * for - Repetidor en una parte del codigo con limitado número de veces
 * for/in - Repetidor en las propiedades de un objeto
 * for/of - Repetidor en los valores de un objeto iterable
 * while - Repetidor en una parte del código se ejectua si y solo si la parte es verdadera
 * do/while - también es repetidor pero inicia la parte del código primero y después verifica si es correcta la asignación.
 */

//for
let texto = "";

for(let i = 0; i < 5;i++){
    texto += "El numero es "+ i + "<br>";
    console.log(texto);
}
//for in -> for(key in object)
const persona = {fname:"John",lname:"Wick",pbirth:"URRS"};
let  text = "";
for(let x in persona){
    text +=" "+persona[x];
    console.log(text);
}

//For of -> for(variable of iterable)

const carros = ["BMW", "Volvo", "Mini"];

let text_1 = "";
for(let x of carros){
    text_1 +=" "+x;
    console.log(text_1);
}
//While
let i = 0;
let anuncio = "";
while (i <10){
    anuncio += "El numero es: "+ i + "\n";
    console.log(anuncio);
    i++;
}
//do while
anuncio = "";
i = 0;
do{
    anuncio += "El numero es: "+ i + "\n";
    console.log(anuncio);
    i++;
}while(i<10);