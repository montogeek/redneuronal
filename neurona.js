function fadeIn(el) {
    'use strict';
    el.style.opacity = 0;

    var last = +new Date(),
        tick = function () {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 1000;
            last = +new Date();

            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
    tick();
}

function numFilter(num) {
    'use strict';
    return num.toFixed(3);
}

function sigmoide(s) {
    'use strict';
    return 1 / (1 + Math.pow(Math.E, -s));
}
function deltaK(d, f) {
    'use strict';
    return f * (d - f) * (1 - f);
}

function deltaJ(deltak, peso, fj) {
    'use strict';
    return (1 - fj) * deltak * peso * fj;
}

function pesoK(valor, deltak, x) {
    'use strict';
    return valor + (deltak *  x);
}

function neurona(event) {
    'use strict';
    event.preventDefault();
    // Entrada (X1, X2)
    var entrada = Array.prototype.slice.call(document.getElementsByName('entrada'), 0).map(function(element) {
           return parseInt(element.value, 10);
        }),
    
    // Valor deseado de salida (d)
        valor_deseado = parseInt(document.getElementsByName('valor_deseado')[0].value, 10),
    
    // Pesos Unidades Sigmoidales
        peso    = Array.prototype.slice.call(document.getElementsByName('peso'), 0).map(function(element) {
            return parseInt(element.value, 10);
        }),

    // Otras variables
        deltak  = 0,
        deltaj  = [],
        pesok   = [],
        i       = 0,
        c       = 1,    // Índice de aprendizaje
        f_temp  = [],   // Funciones Sigmoidales capa 1
        f       = [],   // Función Sigmoidal capa 2
        s       = 0;
    
    // Process
    // ----------------

    //  Salida de las primeras neuronas utilizando la función sigmoide(s).
    //  El valor s es el producto de la acción (entrada1) por peso (peso1)
    for (i = 0; i < entrada.length; i = i + 1) {
        s = entrada[i] * peso[i];
        f_temp.push(sigmoide(s));
    }
    
    //  Salida de la última neurona. Se obtiene de la resta 
    //  de la función sigmoide de los valores obtenidos anteriormente
    //  por su peso correspondiente
    for (i = 0; i < f_temp.length; i = i + 1) {
        s = f_temp[i] * peso[i + 2];
        f.push(sigmoide(s));
    }
    
    f.push(f[0] - f[1]);

    //  Función Delta para la última capa (deltak)
    deltak = deltaK(valor_deseado, f[2]);

    //  Función Delta propagada hacia atrás con los pesos de la
    //  segunda capa (DeltaJ)
    deltaj.push(
        deltaJ(deltak, peso[2], f_temp[0]),
        deltaJ(deltak, peso[3], f_temp[1])
    );

    // Cálculo de nuevos pesos
    pesok = peso.map(function(value) {
        return pesoK(value, deltak, c);
    });

    // Output
    // -----------------

    //  Sigmoides
    document.getElementById('sigmoide1').innerHTML = numFilter(f_temp[0]);
    document.getElementById('sigmoide2').innerHTML = numFilter(f_temp[1]);
    document.getElementById('sigmoide3').innerHTML = numFilter(f[2]);

    //  Deltas
    document.getElementById('delta1').innerHTML = numFilter(deltak);
    document.getElementById('delta2').innerHTML = numFilter(deltaj[0]);
    document.getElementById('delta3').innerHTML = numFilter(deltaj[1]);

    //  Pesos
    document.getElementById('peso1').innerHTML = numFilter(pesok[0]);
    document.getElementById('peso2').innerHTML = numFilter(pesok[1]);
    document.getElementById('peso3').innerHTML = numFilter(pesok[2]);
    document.getElementById('peso4').innerHTML = numFilter(pesok[3]);


    // Fancy output
    fadeIn(document.getElementById('output'));
}

function init() {
    'use strict';
    var btnCalcular = document.getElementById('calcular');
    btnCalcular.addEventListener('click', neurona);
}

document.onreadystatechange = init;