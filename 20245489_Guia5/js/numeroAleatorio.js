const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
const numeroIntentos = 3;

let intentos = 1;

function generarNumeroAleatorio() {
    let mensaje;

    const parrafo = document.querySelector("#idParrafo");

    if (intentos <= numeroIntentos) {
        let numero = prompt(
            "¿Qué número se ha generado (Intento " + intentos + ")?"
        );
        if (numero == numeroAleatorio) {
            mensaje = `Es sorprendente, pudiste adivinar el número oculto (${numeroAleatorio}). 
            Refresque la página para volver a jugar.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Su número de intentos han terminado.
            El número era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
        } else {
            mensaje = `Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos`;

            if (numero < numeroAleatorio) {
                mensaje += ", el número oculto es mayor.";
            } else {
                mensaje += ", el número oculto es menor.";
            }
        }

        intentos++;
    } else {
        mensaje = `Su número de intentos ha terminado. 
        El número oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }
    parrafo.innerHTML = mensaje;
}