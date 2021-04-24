'use strict';

let audioCtx;
let osc1;
let osc2;
let osc3;
let gainOsc1;
let gainOsc2;
let gainOsc3;
let lfoGain;

let analyserMaster;
let analyser1; 
let analyser2;
let analyser3;
let canvasWidth = 300;
let canvasHeight = 150;

let filter;
let gainMaster;
let delay;
let feedback;

//MASTER 
let onOffMasterBtn = document.querySelector("#on-off-master");
let gainMasterControl = document.querySelector("#gain-master");
let gainMasterVal = document.querySelector("#gain-master-val");
let oscControls = document.querySelectorAll(".osc-controls");
//Master ON
let masterOn = () => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    console.log("audio ctx created");

    //create delay node
    delay = audioCtx.createDelay(5.0);    
    //create gain node for delay feedback loop
    feedback = audioCtx.createGain();
    feedback.gain.value = 0.2;

    //create gain node for master
    gainMaster = audioCtx.createGain();
    gainMaster.gain.value = gainMasterControl.value;

    //create delay feedback loop   
    delay.connect(feedback);    
    feedback.connect(delay);    
    gainMaster.connect(delay);
    gainMaster.connect(audioCtx.destination);
    delay.connect(audioCtx.destination);

    //create analyser for master's visualizer
    analyserMaster = audioCtx.createAnalyser();
    analyserMaster.smoothingTimeConstant = 0.85;
    analyserMaster.connect(gainMaster);
    visualize(visualizerMaster, canvasCtx4, analyserMaster);
   
    //create filter
    filter = audioCtx.createBiquadFilter();
    filter.connect(analyserMaster);
    filter.type = filterType.value;
    filter.frequency.value = filterCut.value;
    filter.Q.value = filterRes.value;

    //create analysers for oscillators
    analyser1 = audioCtx.createAnalyser();
    analyser1.smoothingTimeConstant = 0.85;
    analyser1.connect(filter);
    analyser2 = audioCtx.createAnalyser();
    analyser2.smoothingTimeConstant = 0.85;
    analyser2.connect(filter);
    analyser3 = audioCtx.createAnalyser();
    analyser3.smoothingTimeConstant = 0.85;
    analyser3.connect(filter);

    //create gain node for oscillators
    gainOsc1 = audioCtx.createGain();
    gainOsc1.gain.value = 0;
    gainOsc1.connect(analyser1);
    gainOsc2 = audioCtx.createGain();
    gainOsc2.gain.value = 0;
    gainOsc2.connect(analyser2);
    gainOsc3 = audioCtx.createGain();
    gainOsc3.gain.value = 0;
    gainOsc3.connect(analyser3);

    //create lfo node gain
    lfoGain = audioCtx.createGain();
    lfoGain.gain.value = lfoAmt.value; 
    lfoActivate();

    osc1 = 0;
    osc2 = 0;
    osc3 = 0;

    oscControls.forEach((e)=> e.disabled = false);
}
//Master OFF
let masterOff = () => {
    audioCtx.close().then( () => {
        console.log("audio ctx closed");
        oscControls.forEach((e)=> e.setAttribute('disabled', true));
        osc1OnOffBtn.innerHTML = "OFF";
        osc1OnOffBtn.classList.remove("button-on");
        osc2OnOffBtn.innerHTML = "OFF";
        osc2OnOffBtn.classList.remove("button-on");
        osc3OnOffBtn.innerHTML = "OFF";
        osc3OnOffBtn.classList.remove("button-on");
        modOsc1.checked = false;
        modOsc2.checked = false;
        modFilt.checked = false;
    });
}

function onOffMaster() {
    if(!audioCtx || audioCtx.state === "closed") {
        masterOn();
        onOffMasterBtn.innerHTML = "ON";
        onOffMasterBtn.classList.add("button-on");
        presetRandomBtn.classList.add("button-on");
    } else if(audioCtx.state === "running") {
        masterOff();
        onOffMasterBtn.innerHTML = "OFF";
        onOffMasterBtn.classList.remove("button-on");
        presetRandomBtn.classList.remove("button-on");
    } 
} 

onOffMasterBtn.addEventListener('click', onOffMaster);


//master gain
gainMasterControl.oninput = (e) => {
    let gain = parseFloat(e.target.value);
    if(audioCtx){
        gainMaster.gain.setTargetAtTime(gain*gain, audioCtx.currentTime + 0.001, 0.01);
    }
}

//OSCILLOSCOPES
//VisualizerMaster
let visualizerMaster = document.querySelector('#visualizer-master');
let canvasCtx4 = visualizerMaster.getContext("2d");
canvasCtx4.fillStyle = 'rgb(0, 0, 0)';
canvasCtx4.fillRect(0, 0, canvasWidth, canvasHeight);

//Visualizer OSC I
let visualizerOsc1 = document.querySelector('#visualizer-osc-1');
let canvasCtx1 = visualizerOsc1.getContext("2d");
canvasCtx1.fillStyle = 'rgb(0, 0, 0)';
canvasCtx1.fillRect(0, 0, canvasWidth, canvasHeight);

//Visualizer OSC II
let visualizerOsc2 = document.querySelector('#visualizer-osc-2');
let canvasCtx2 = visualizerOsc2.getContext("2d");
canvasCtx2.fillStyle = 'rgb(0, 0, 0)';
canvasCtx2.fillRect(0, 0, canvasWidth, canvasHeight);

//Visualizer OSC III
let visualizerOsc3 = document.querySelector('#visualizer-osc-3');
let canvasCtx3 = visualizerOsc3.getContext("2d");
canvasCtx3.fillStyle = 'rgb(0, 0, 0)';
canvasCtx3.fillRect(0, 0, canvasWidth, canvasHeight);

let drawVisual;

//Analyser - Visualizer
function visualize(canvas, canvasCtx, analyser) {

    analyser.fftSize = 2048;
    var bufferLength = analyser.fftSize;
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    var draw = function() {

      drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(192, 151, 233)';
      canvasCtx.fillRect(0, 0,canvasWidth, canvasHeight);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(255, 255, 255)';

      canvasCtx.beginPath();

      var sliceWidth = canvasWidth * 1.0 / bufferLength;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * canvasHeight/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
    };

    draw();
}

//FILTER
const filterType = document.querySelector('#filter-type');
const filterCut = document.querySelector('#filter-C');
const filterCutDisplay = document.querySelector('#filter-C-display');
const filterRes = document.querySelector('#filter-R');
const filterResDisplay = document.querySelector('#filter-R-display');


//Cut off input range
filterCut.addEventListener('input', function (e) {
    let cutOff = parseFloat(e.target.value);
    if(audioCtx && (osc1 || osc2 || osc3)) {
        filter.frequency.exponentialRampToValueAtTime(cutOff, audioCtx.currentTime + 0.1, 0.2); 
    }
    let val = cutOff.toFixed(2);
    filterCutDisplay.innerHTML = `${val} Hz`;
})

//Resonance
filterRes.addEventListener( 'input', function(e) {
    let res = parseFloat(e.target.value);
    if(audioCtx && (osc1 || osc2 || osc3)){
        filter.Q.value = res;
    }
    let val = res.toFixed(2);
    filterResDisplay.innerHTML = val;
})

//Filter type LP-BP-HP
filterType.addEventListener( 'change', function(e) {
    if(audioCtx && (osc1 || osc2 || osc3)){
        filter.type = e.target.value;
    }
})

//DELAY
const delayTimeInput = document.querySelector("#delay-time");
const delayTimeDis = document.querySelector("#delay-time-display");
const feedbackInput = document.querySelector("#feedback");

delayTimeInput.addEventListener( 'input', function(e) {
    let time = parseFloat(e.target.value);
    delay.delayTime.linearRampToValueAtTime(time, audioCtx.currentTime + 0.1, 0.1); 
    delayTimeDis.innerHTML = time;
})

feedbackInput.addEventListener( 'input', function(e) {
    let feedInput = parseFloat(e.target.value);
        feedback.gain.value = feedInput;
})


//LFO 
let lfo;
const lfoSwitch = document.querySelector('#lfo-on-off');
const modOsc1 = document.querySelector('#mod-osc1');
const modOsc2 = document.querySelector('#mod-osc2');
const modFilt = document.querySelector('#mod-filter-cut');
const lfoWave = document.querySelector('#lfo-wave');
const lfoRate = document.querySelector('#lfo-rate');
const lfoRateDis = document.querySelector('#lfo-rate-display');
const lfoAmt = document.querySelector('#lfo-amount');


//crear LFO (se ejecuta al prender master)
function lfoActivate() {
  
        lfo = audioCtx.createOscillator();
        lfo.frequency.value = lfoRate.value;
        lfo.type = lfoWave.value;

        lfo.connect(lfoGain);   
        lfoGain.gain.value = lfoAmt.value;

        lfo.start(audioCtx.currentTime);
}

//LFO destination  
//mod osc I pitch
modOsc1.addEventListener( 'change', function() {
    if(this.checked && osc1) {
        lfoGain.connect(osc1.frequency);
    } else {
        lfoGain.disconnect(osc1.frequency);
    }

});

//mod osc II pitch
modOsc2.addEventListener( 'change', function() {
    if(this.checked && osc2) {
        lfoGain.connect(osc2.frequency);
    } else {
        lfoGain.disconnect(osc2.frequency);
    }    
});

//mod filter cut
modFilt.addEventListener( 'change', function() {
    if(this.checked) {
        lfoGain.connect(filter.frequency);
    } else {
        lfoGain.disconnect(filter.frequency);
    }    
});


lfoWave.addEventListener( 'change', function(){
    if(audioCtx){
      lfo.type = lfoWave.value; 
    }
});

//Amount (amplitude)
lfoAmt.oninput = (e) => {
    let amt = parseFloat(e.target.value);
   if(audioCtx && lfo){
        lfoGain.gain.setTargetAtTime(amt, audioCtx.currentTime + 0.001, 0.01);         
    }
}

//rate
lfoRate.oninput = (e) => {
    let rate = parseFloat(e.target.value);
   if(audioCtx && lfo){
        lfo.frequency.exponentialRampToValueAtTime(rate, audioCtx.currentTime + 0.1, 0.1); 
    } 
    lfoRateDis.innerHTML = `${rate} `;
}


//OSCILADORES

//Set wave
const waveSelect = document.querySelectorAll('.osc-wave');

function setWave(osc, wave) {
    switch (osc) {
        case 0:
            if (audioCtx && osc1) {
                osc1.type = wave;
            } 
            break;
        case 1:
            if (audioCtx && osc2) {
                osc2.type = wave;
            } 
            break; 
        case 2: 
            if (audioCtx && osc3) {
                osc3.type = wave;
            }           
            break;  
    }
} 

waveSelect.forEach( (select, index) => {
    select.addEventListener('change', function (input) {
        let osc = index;
        let wave = input.target.value;

        setWave(osc, wave);
    });
});


//Set oscillators frequency
const freqFaders = document.querySelectorAll(".osc-freq");

function setFreq(osc, freq) {
    switch (osc) {
        case 0:
            osc1FreqDisplay.innerHTML = freq + " Hz";  
            //check if osc exists
            if (audioCtx && osc1) {
                osc1.frequency.value = freq;
            } 
            break;
        case 1:
            osc2FreqDisplay.innerHTML = freq + " Hz";  
            if(audioCtx && osc2) {
                osc2.frequency.value = freq;
            } 
            break; 
        case 2: 
            osc3FreqDisplay.innerHTML = freq + " Hz";  
            if(audioCtx && osc3){
                osc3.frequency.value = freq;
            }             
            break;  
    }
}

freqFaders.forEach( (fader, index) => {
    fader.addEventListener('input', function (input) {
        let osc = index;
        let freq = parseFloat(input.target.value);

        setFreq(osc, freq);
    });
});


//Set osc volume
const gainFaders = document.querySelectorAll(".osc-gain");

function setGain (osc, value) {
    let gain = Math.pow(value, 2);
    
    switch (osc) {
        case 0:
            osc1GainVal.innerHTML = gain.toFixed(2);  
            //check if osc exists
            if (audioCtx && osc1) {
                gainOsc1.gain.value = gain;
            } 
            break;
        case 1:
            osc2GainVal.innerHTML = gain.toFixed(2);  
            //check if osc exists
            if (audioCtx && osc2) {
                gainOsc2.gain.value = gain;
            } 
            break; 
        case 2: 
            osc3GainVal.innerHTML = gain.toFixed(2);  
            //check if osc exists
            if (audioCtx && osc3) {
                gainOsc3.gain.value = gain;
            }          
            break;  
    }
}

gainFaders.forEach( (fader, index) => {
    fader.addEventListener('input', function (input) {
        let osc = index;
        let gainValue = input.target.value;

       setGain(osc, gainValue);
       
    });
});

//Detune oscillators
const detuneFaders = document.querySelectorAll(".osc-detune");

function setDetune(osc, cents) {
    switch (osc) {
        case 0:
            osc1DetVal.innerHTML = `${cents} cents`;  
            //check if osc exists
            if (audioCtx && osc1) {
                osc1.detune.value = cents;
            } 
            break;
        case 1:
            osc2DetVal.innerHTML = `${cents} cents`;  
            //check if osc exists
            if (audioCtx && osc2) {
                osc2.detune.value = cents;
            } 
            break; 
        case 2: 
            osc3DetVal.innerHTML = `${cents} cents`;  
            //check if osc exists
            if (audioCtx && osc3) {
                osc3.detune.value = cents;
            }        
            break;  
    }
}

detuneFaders.forEach( (fader, index) => {
    fader.addEventListener('input', function (input) {
        let osc = index;
        let cents = parseFloat(input.target.value);

        setDetune(osc, cents);
    });
});



//OSC I controls
const osc1OnOffBtn = document.querySelector('#osc1-on-off');
const osc1GainControl = document.querySelector('#osc1-gain');
const osc1FreqDisplay = document.querySelector('#osc1-freq-display');
const osc1Det = document.querySelector('#osc1-detune');
const osc1DetVal = document.querySelector('#osc1-det-val');
const osc1GainVal = document.querySelector('#osc1-gain-val');
const osc1Wave = document.querySelector('#osc1-wave');

//create osc I
let createOsc1 = () => {
    if(audioCtx) {
        osc1 = audioCtx.createOscillator();
        osc1.type = osc1Wave.value;
        osc1.frequency.value = freqFaders[0].value;
        osc1.detune.value = osc1Det.value;


        osc1.connect(gainOsc1);
        //toma como nivel de gain el input del fader,
        //actualizado si es que se modifico mientras estaba apagado
        //el oscilador 
        let input =osc1GainControl.value; 
        let gain = input * input;
        gainOsc1.gain.value = gain;
        osc1.start(audioCtx.currentTime);

        visualize(visualizerOsc1, canvasCtx1, analyser1);

        console.log('OSC I prendido');

        if (modOsc1.checked){
            lfoGain.connect(osc1.frequency);
        }
        
    } else {
        console.log("Prender Master");
    }
}

 
//delete osc I
let deleteOsc1 = () => {
    osc1.stop(audioCtx.currentTime);
    osc1.onended = function() {
        console.log('OSC I apagado');
        osc1 = 0;
      }
}


function onOffOsc1() {
    if(!osc1) {
        createOsc1();
       /*  createOsc(osc1, 0, gainOsc1); */
        console.log("osc 1 on");
        osc1OnOffBtn.innerHTML = "ON";
        osc1OnOffBtn.classList.add("button-on");
    } else if(osc1) {
        deleteOsc1();
        osc1OnOffBtn.innerHTML = "OFF";
        osc1OnOffBtn.classList.remove("button-on");
    } 
}

osc1OnOffBtn.addEventListener('click', onOffOsc1);

//OSC 2

//OSC II controls
const osc2OnOffBtn = document.querySelector('#osc2-on-off');
const osc2GainControl = document.querySelector('#osc2-gain');
const osc2Det = document.querySelector('#osc2-detune');
const osc2DetVal = document.querySelector('#osc2-det-val');
const osc2GainVal = document.querySelector('#osc2-gain-val');
const osc2Wave = document.querySelector('#osc2-wave');
const osc2FreqDisplay = document.querySelector('#osc2-freq-display');

//create osc2
let createOsc2 = () => {
    if(audioCtx) {
        osc2 = audioCtx.createOscillator();
        osc2.frequency.value = freqFaders[1].value;
        osc2.detune.value = osc2Det.value;
        osc2.type = osc2Wave.value;

        osc2.connect(gainOsc2); 
        let input = osc2GainControl.value; 
        let gain = input * input;
        gainOsc2.gain.value = gain;

        osc2.start(audioCtx.currentTime);

        visualize(visualizerOsc2, canvasCtx2, analyser2);

        console.log('OSC II prendido');

        if (modOsc2.checked){
            lfoGain.connect(osc2.frequency);
        }
 
    } else {
        console.log("Prender Master");
    }
}

//delete osc2
let deleteOsc2 = () => {
    osc2.stop(audioCtx.currentTime);
    osc2.onended = function() {
        console.log('OSC II apagado');
        osc2 = 0;
      }
}


function onOffOsc2() {
    if(!osc2) {
        createOsc2();
        osc2OnOffBtn.innerHTML = "ON";
        console.log(osc2);
        osc2OnOffBtn.classList.add("button-on");
    } else if(osc2) {
        deleteOsc2();
        osc2OnOffBtn.innerHTML = "OFF";
        osc2OnOffBtn.classList.remove("button-on");
    } 
}

osc2OnOffBtn.addEventListener('click', onOffOsc2);

//OSC 3

//OSC III controls
const osc3OnOffBtn = document.querySelector('#osc3-on-off');
const osc3GainControl = document.querySelector('#osc3-gain');
const osc3Det = document.querySelector('#osc3-detune');
const osc3DetVal = document.querySelector('#osc3-det-val');
const osc3GainVal = document.querySelector('#osc3-gain-val');
const osc3Wave = document.querySelector('#osc3-wave');
const osc3FreqDisplay = document.querySelector('#osc3-freq-display');

//create osc3
let createOsc3 = () => {
    if(audioCtx) {
        osc3 = audioCtx.createOscillator();
        osc3.frequency.value = freqFaders[2].value;
        osc3.detune.value = osc3Det.value;
        osc3.type = osc3Wave.value;

        osc3.connect(gainOsc3);
        let input =osc3GainControl.value; 
        let gain = input * input;
        gainOsc3.gain.value = gain;

        osc3.start(audioCtx.currentTime);

        visualize(visualizerOsc3, canvasCtx3, analyser3);

        console.log('OSC III prendido');
        
    } else {
        console.log("Prender Master");
    }
}

//delete osc3
let deleteOsc3 = () => {
    osc3.stop(audioCtx.currentTime);
    osc3.onended = function() {
        console.log('OSC III apagado');
        osc3 = 0;
      }
}

function onOffOsc3() {
    if(!osc3) {
        createOsc3();
        osc3OnOffBtn.innerHTML = "ON";
        osc3OnOffBtn.classList.add("button-on");
    } else if(osc3) {
        deleteOsc3();
        osc3OnOffBtn.innerHTML = "OFF";
        osc3OnOffBtn.classList.remove("button-on");
    } 
}

osc3OnOffBtn.addEventListener('click', onOffOsc3);

