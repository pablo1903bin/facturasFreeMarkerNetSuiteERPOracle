var str = 'hola mundo desde java'; // java desde mundo hola .reverse("").join("")

var newArray = str.split(' ')
console.log(newArray);
var resp = [];

for(var i = 0; i < newArray.length; i++){
    
    console.log(newArray[i]);
    resp.push( newArray[i].split('').join(''));
}
console.log(resp.join(' '));


function invertirCadena(cad) {
    var nuevaCadena = "";
    for (var i = cad.length - 1; i >= 0; i--) {
        console.log(nuevaCadena += cad[i]);
    }
    return console.log(nuevaCadena);
}
invertirCadena('hola');