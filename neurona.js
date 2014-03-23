function fadeIn(el) {
    'use strict';
    el.style.opacity = 0;

    var last = +new Date(),
        tick = function () {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
    tick();
}

function Sigmoide(s) {
    'use strict';
    return 1 / (1 + Math.pow(Math.E, -s));
}
function DeltaK(d, f) {
    'use strict';
    return f * (d - f) * (1 - f);
}

function DeltaJ(deltak, peso, fj) {
    'use strict';
    return (1 - fj) * deltak * peso * fj;
}

function PesoK(valor, deltak, x) {
    'use strict';
    return valor + (deltak *  x);
}

function neurona(event) {
    'use strict';
    event.preventDefault();
    // Entradas (X1, X2)
    var entradas = [],
        entrada1 = parseInt(document.getElementsByName('entrada1')[0].value, 10),
        entrada2 = parseInt(document.getElementsByName('entrada2')[0].value, 10),
    
    // Valor deseado de salida (d)
        valor_deseado = parseInt(document.getElementsByName('valor_deseado')[0].value, 10),
    
    // Pesos Unidades Sigmoidales
        pesos = [],
        peso1 = parseInt(document.getElementsByName('peso1')[0].value, 10),
        peso2 = parseInt(document.getElementsByName('peso2')[0].value, 10),
        peso3 = parseInt(document.getElementsByName('peso3')[0].value, 10);
    
    entradas.push(entrada1, entrada2);
    pesos.push(peso1, peso2, peso3);
    
    // Process
    var value = document.getElementById('unidad1');
    value.innerHTML = 32
    fadeIn(value);
}

function init() {
    'use strict';
    var btnCalcular = document.getElementById('calcular');
    btnCalcular.addEventListener('click', neurona);
}

document.onreadystatechange = init;