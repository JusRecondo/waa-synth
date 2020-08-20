# web-audio-api-synth
Ejercicio de programación y de síntesis.
<main>
        <div>
            <h1>Notas</h1>
            <ol>
                <li>
                    Esta idea de sintetizador sigue en desarollo y esta hecho con Javascript (utilizando la 
                    <a href="https://www.w3.org/TR/webaudio/" target="_blank">Web Audio API</a>), <br>
                    html y css. Es por un lado un ejercicio de programacion pero tambien uno sobre sintesis. 
                </li>
                <li>La fundamental de cada oscilador se puede modificar de las siguientes formas:</li>
                <ul>
                    <li>Escribiedo la frecuencia en el input "Freq" (escribiendo cualquier numero <br> 
                        o presionado las flechas hacia arriba o abajo)</li>
                    <li>Tocando con el teclado qwerty <a href="#grafico">(ver gráfico)</a></li>    
                    <li>Con el input "detune", 50 cents hacia arriba o hacia abajo (50 cents=1/4 de tono)</li>  
                    <li>Cada oscilador se puede cambiar de octava independientemente.</li>  
                </ul>
                <li>La introduccion de notas con el teclado esta pensada por el momento simplemente <br>
                    para cambiar las frecuencias, no funciona como el teclado de un sinte habitual (por ej, no es <br>
                    necesario mantener las teclas presionadas, y si lo haces el resultado no va a ser el esperado). <br>
                    Sin embargo, pueden tocarse melodías sencillas.</li>
                <li>Si en el OSC III es tildada la casilla "free", su frecuencia no se va a modificar con el teclado <br>
                    junto con la de los otros dos osciladores, quedando en la ultima que fue ingresada (la cual se <br> 
                    puede modificar a traves del input "Freq").</li> 
                <li>Cada vez que se prende un OSC, un oscilador nuevo es creado, pueden modificarse sus parámetros con los controles, <br> 
                    (volumen, tipo de onda, frecuencia, etc.) pero siempre es el mismo sonando continuamente. Por eso, por ejemplo <br> 
                    para poder articular una "nota repetida", se resolvió bajando y subiendo el volumen muy rapido, <br> 
                    para simular la articulacion del sonido nuevo.</li>       
                <li>La frecuencia de corte del filtro tiene 2 tipos de input: numérico y con fader, cada uno muestra <br>
                    su valor actual por separado. El  motivo es que tienen distinta sensibilidad, el input numerico, si <br> 
                    se clickea sobre las flechas arriba/abajo y se mantiene presionado moviendo el mouse hacia arriba <br> 
                    y hacia abajo, va a variar mas lentamente que el fader. </li>
                <li>Por el cuidado de sus oidos y dispositivos, tener cuidado con los volumenes, no llevar el Master al <br>
                    maximo, y controlar los niveles de los osciladores (gain) en funcion de la suma de las <br>
                    señales y la manipulacion del filtro.</li>    
                <li>Se recomienda comenzar probando combinar distintos tipos de onda, distintas octavas, diferenciar <br>
                    ligeramente la afinacion de alguno de los OSC (con detune), probar luego la respuesta de los filtros <br>
                    con distintas frecuencias de corte (cut) y sobre la combinacion de distintos tipos de onda <br> 
                    (cuanto mas material armonico tenga para filtrar, mas se va a notar su efecto, si todos los osc estan <br>
                    en onda senoidal obviamente no se va a notar). Luego introducir el LFO como factor de modulacion en el tiempo, <br>
                    el LFO puede modular los 3 parametros posibles simultaneamente. 
                </li>
                <li>
                    Se puede reducir el zoom de la ventana del navegador a un 90% si es necesario para poder visualizar <br> 
                    todos los controles. No esta pensado ni optimizado para usarse en dispositivos moviles. 
                </li>
                    <li>
                        Los controles se pueden manipular tambien solo con el teclado, usando la tecla TAB <br>
                        para desplazarse, las flechas del teclado para incrementar/disminuir, y el enter <br>
                        para ingresar en los selectores de onda por ejemplo.
                    </li>
                <li>Aca hay algunas ideas de posibles combinaciones de parámetros para comenzar:
                    <ul>
                        <li><a href="img/preset1.png" target="_blank">"preset" 1</a></li>
                        <li><a href="img/preset2.png" target="_blank">"preset" 2</a></li>
                        <li><a href="img/preset3.png" target="_blank">"preset" 3</a></li>
                        <li><a href="img/preset4.png" target="_blank">"preset" 4</a></li>
                        <li><a href="img/preset5.png" target="_blank">"preset" 5</a></li>
                    </ul>
                </li>    
            </ol>
        </div>
        <div id="grafico">
            <img src="img/teclado.png" width="50%" alt="teclado qwerty con notas">
        </div>
        <div>
            <span>Data útil:</span><br>
            <a href="http://www.michaelnorris.info/theory/harmonicseriescalculator" target="_blank">harmonic series calculator</a><br>   
            <a href="https://pages.mtu.edu/~suits/notefreqs.html" target="_blank">Frequencies for equal-tempered scale, A4 = 440 Hz</a>
        </div>
        <span><b>Proximas mejoras podrian ser la incorporacion de MIDI y manipulacion de la envolvente :3</b></span>
    </main>