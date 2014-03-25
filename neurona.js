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

function NumFilter (num) {
    return num.toFixed(3);
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
    // Entrada (X1, X2)
    var entrada = [],
        entrada1 = parseInt(document.getElementsByName('entrada1')[0].value, 10),
        entrada2 = parseInt(document.getElementsByName('entrada2')[0].value, 10),
    
    // Valor deseado de salida (d)
        valor_deseado = parseInt(document.getElementsByName('valor_deseado')[0].value, 10),
    
    // Pesos Unidades Sigmoidales
        peso   = [],
        peso1   = parseInt(document.getElementsByName('peso1')[0].value, 10),
        peso2   = parseInt(document.getElementsByName('peso2')[0].value, 10),
        peso3   = parseInt(document.getElementsByName('peso3')[0].value, 10),
        peso4   = parseInt(document.getElementsByName('peso4')[0].value, 10),

    // Otras variables
        deltak  = 0,
        deltaj  = [],
        pesok   = [],
        i       = 0,
        c       = 1,    // Índice de aprendizaje
        f_temp  = [],   // Funciones Sigmoidales capa 1
        f       = [],   // Función Sigmoidal capa 2
        s       = 0;
    
    entrada.push(entrada1, entrada2);
    peso.push(peso1, peso2, peso3, peso4);
    
    // Process
    // ----------------

    //  Salida de las primeras neuronas utilizando la función Sigmoide(s).
    //  El valor s es el producto de la acción (entrada1) por peso (peso1)
    for ( i = 0; i < entrada.length; i++) {
        s = entrada[i]*peso[i];
        f_temp.push( Sigmoide(s) );
    }
    
    //  Salida de la última neurona. Se obtiene de la resta 
    //  de la función sigmoide de los valores obtenidos anteriormente
    //  por su peso correspondiente
    for ( i = 0; i < f_temp.length; i++ ) {
        s = f_temp[i]*peso[i+2];
        f.push( Sigmoide(s) );
    }
    f.push(f[0]-f[1]);

    //  Función Delta para la última capa (deltak)
    deltak = DeltaK( valor_deseado, f[2] );

    //  Función Delta propagada hacia atrás con los pesos de la
    //  segunda capa (DeltaJ)
    deltaj.push(
        DeltaJ( deltak, peso[2], f_temp[0] ),
        DeltaJ( deltak, peso[3], f_temp[1] )
    );

    // Cálculo de nuevos pesos
    pesok.push(
        PesoK( peso[0], deltak, c ),
        PesoK( peso[1], deltak, c ),
        PesoK( peso[2], deltak, c ),
        PesoK( peso[3], deltak, c )
    );


    // Output
    // -----------------

    //  Sigmoides
    document.getElementById('sigmoide1').innerHTML = NumFilter(f_temp[0]);
    document.getElementById('sigmoide2').innerHTML = NumFilter(f_temp[1]);
    document.getElementById('sigmoide3').innerHTML = NumFilter(f[2]);

    //  Deltas
    document.getElementById('delta1').innerHTML = NumFilter(deltak);
    document.getElementById('delta2').innerHTML = NumFilter(deltaj[0]);
    document.getElementById('delta3').innerHTML = NumFilter(deltaj[1]);

    //  Pesos
    document.getElementById('peso1').innerHTML = NumFilter(pesok[0]);
    document.getElementById('peso2').innerHTML = NumFilter(pesok[1]);
    document.getElementById('peso3').innerHTML = NumFilter(pesok[2]);
    document.getElementById('peso4').innerHTML = NumFilter(pesok[3]);


    // Fancy output
    fadeIn(document.getElementById('output'));
}

function init() {
    'use strict';
    var btnCalcular = document.getElementById('calcular');
    btnCalcular.addEventListener('click', neurona);
}

document.onreadystatechange = init;