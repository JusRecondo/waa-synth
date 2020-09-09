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

let on = () => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    console.log("audio ctx created");

    //crear nodo de delay
    delay = audioCtx.createDelay(5.0);    
    //crear nodo para feedback
    feedback = audioCtx.createGain();
    feedback.gain.value = 0.2;

    //crear nodo gain para master
    gainMaster = audioCtx.createGain();
    gainMaster.gain.value = gainMasterControl.value;

    //creado loop para feedback    
    delay.connect(feedback);    
    feedback.connect(delay);    
    gainMaster.connect(delay);
    gainMaster.connect(audioCtx.destination);
    delay.connect(audioCtx.destination);

   
    analyserMaster = audioCtx.createAnalyser();
    analyserMaster.smoothingTimeConstant = 0.85;
    analyserMaster.connect(gainMaster);
    visualize(visualizerMaster, canvasCtx4, analyserMaster);
   
    filter = audioCtx.createBiquadFilter();
    filter.connect(analyserMaster);
    filter.type = filterType.value;
    filter.frequency.value = filterCut2.value;
    filter.Q.value = filterRes.value;

    analyser1 = audioCtx.createAnalyser();
    analyser1.smoothingTimeConstant = 0.85;
    analyser1.connect(filter);
    analyser2 = audioCtx.createAnalyser();
    analyser2.smoothingTimeConstant = 0.85;
    analyser2.connect(filter);
    analyser3 = audioCtx.createAnalyser();
    analyser3.smoothingTimeConstant = 0.85;
    analyser3.connect(filter);


    gainOsc1 = audioCtx.createGain();
    gainOsc1.gain.value = 0;
    gainOsc1.connect(analyser1);
    gainOsc2 = audioCtx.createGain();
    gainOsc2.gain.value = 0;
    gainOsc2.connect(analyser2);
    gainOsc3 = audioCtx.createGain();
    gainOsc3.gain.value = 0;
    gainOsc3.connect(analyser3);

    
    lfoGain = audioCtx.createGain();
    lfoGain.gain.value = lfoAmt.value; 
    lfoActivate();

    osc1 = 0;
    osc2 = 0;
    osc3 = 0;

    oscControls.forEach((e)=> e.disabled = false);
}

let off = () => {
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
        on();
        onOffMasterBtn.innerHTML = "ON";
        onOffMasterBtn.classList.add("button-on");
    } else if(audioCtx.state === "running") {
        off();
        onOffMasterBtn.innerHTML = "OFF";
        onOffMasterBtn.classList.remove("button-on");
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

      canvasCtx.fillStyle = 'rgb(207, 169, 245)';
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
let filterType = document.querySelector('#filter-type');
let filterCut1 = document.querySelector('#filter-C1');
let filterCut2 = document.querySelector('#filter-C2');
let filterCutDisplay1 = document.querySelector('#filter-C-display1');
let filterCutDisplay2 = document.querySelector('#filter-C-display2');
let filterRes = document.querySelector('#filter-R');
let filterResDisplay = document.querySelector('#filter-R-display');

//Cut off input range 
filterCut1.oninput = (e) => {

    let cutOff = parseFloat(e.target.value);
    if(audioCtx && (osc1 || osc2 || osc3)) {
        filter.frequency.exponentialRampToValueAtTime(cutOff, audioCtx.currentTime + 0.1, 0.2); 
    }
    let val = cutOff.toFixed(2);
    filterCutDisplay1.innerHTML = `${val} Hz`;
}

//Cut off input range
filterCut2.oninput = (e) => {

    let cutOff = parseFloat(e.target.value);
    if(audioCtx && (osc1 || osc2 || osc3)) {
        filter.frequency.exponentialRampToValueAtTime(cutOff, audioCtx.currentTime + 0.1, 0.2); 
    }
    let val = cutOff.toFixed(2);
    filterCutDisplay2.innerHTML = `${val} Hz`;
}

//Resonance
filterRes.oninput = (e) => {
    let res = parseFloat(e.target.value);
    if(audioCtx && (osc1 || osc2 || osc3)){
        filter.Q.value = res;
    }
    let val = res.toFixed(2);
    filterResDisplay.innerHTML = val;
}

//LP-BP-HP
filterType.onchange = (e)=> {
    if(audioCtx && (osc1 || osc2 || osc3)){
        filter.type = e.target.value;
    }
}

//Delay controles
let delayTimeInput = document.querySelector("#delay-time");
let delayTimeDis = document.querySelector("#delay-time-display");
let feedbackInput = document.querySelector("#feedback");

delayTimeInput.oninput = (e) => {
    let time = parseFloat(e.target.value);
    delay.delayTime.linearRampToValueAtTime(time, audioCtx.currentTime + 0.1, 0.1); 
    delayTimeDis.innerHTML = time;
}

feedbackInput.oninput = (e) => {
    let feedInput = parseFloat(e.target.value);
        feedback.gain.value = feedInput;
}


//LFO 
//controles
let lfo;
let lfoSwitch = document.querySelector('#lfo-on-off');
let modOsc1 = document.querySelector('#mod-osc1');
let modOsc2 = document.querySelector('#mod-osc2');
let modFilt = document.querySelector('#mod-filter-cut');
let lfoWave = document.querySelector('#lfo-wave');
let lfoRate = document.querySelector('#lfo-rate');
let lfoRateDis = document.querySelector('#lfo-rate-display');
let lfoAmt = document.querySelector('#lfo-amount');


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

//OSC I controls
let osc1OnOffBtn = document.querySelector('#osc1-on-off');
let osc1GainControl = document.querySelector('#osc1-gain');
let osc1Freq = document.querySelector('#osc1-freq');
let osc1Det = document.querySelector('#osc1-detune');
let osc1DetVal = document.querySelector('#osc1-det-val');
let osc1GainVal = document.querySelector('#osc1-gain-val');
let osc1Wave = document.querySelector('#osc1-wave');

//create osc I
let createOsc1 = () => {
    if(audioCtx) {
        osc1 = audioCtx.createOscillator();
        osc1.type = osc1Wave.value;
        osc1.frequency.value = osc1Freq.value;
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
        osc1OnOffBtn.innerHTML = "ON";
        osc1OnOffBtn.classList.add("button-on");
    } else if(osc1) {
        deleteOsc1();
        osc1OnOffBtn.innerHTML = "OFF";
        osc1OnOffBtn.classList.remove("button-on");
    } 
}

osc1OnOffBtn.addEventListener('click', onOffOsc1);
 

//gain input fader
osc1GainControl.oninput = (e) => {
    let input = parseFloat(e.target.value);    
    let gain = input * input;
    osc1GainVal.innerHTML = gain.toFixed(2); 
   if(audioCtx && osc1){
        gainOsc1.gain.value = gain;
        osc1GainVal.innerHTML = gain.toFixed(2); 
        console.log(osc1GainControl.value);
    }  
}



//freq input
osc1Freq.oninput = (e) => {
    let freq = parseFloat(e.target.value);
    if (osc1) {
        osc1.frequency.value = freq;
    }  
}

//detune fader
osc1Det.oninput = (e) => {
    let cents = parseFloat(e.target.value);
    if(osc1) {
        osc1.detune.value = cents;
    }

    osc1DetVal.innerHTML = `${cents} cents`;
}

//wave
osc1Wave.addEventListener( 'change', function(){
    if(osc1) {
    osc1.type = osc1Wave.value;
    }
});


//OSC 2

//OSC II controls
let osc2OnOffBtn = document.querySelector('#osc2-on-off');
let osc2GainControl = document.querySelector('#osc2-gain');
let osc2Freq = document.querySelector('#osc2-freq');
let osc2Det = document.querySelector('#osc2-detune');
let osc2DetVal = document.querySelector('#osc2-det-val');
let osc2GainVal = document.querySelector('#osc2-gain-val');
let osc2Wave = document.querySelector('#osc2-wave');

//create osc2
let createOsc2 = () => {
    if(audioCtx) {
        osc2 = audioCtx.createOscillator();
        osc2.frequency.value = osc2Freq.value;
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
        osc2OnOffBtn.classList.add("button-on");
    } else if(osc2) {
        deleteOsc2();
        osc2OnOffBtn.innerHTML = "OFF";
        osc2OnOffBtn.classList.remove("button-on");
    } 
}

osc2OnOffBtn.addEventListener('click', onOffOsc2);


//gain input fader
osc2GainControl.oninput = (e) => {
    let input = parseFloat(e.target.value);    
    let gain = input * input;
    osc2GainVal.innerHTML = gain.toFixed(2); 
   if(audioCtx && osc2){
        gainOsc2.gain.value = gain;
        osc2GainVal.innerHTML = gain.toFixed(2);  
    } 
}

//freq input
osc2Freq.oninput = (e) => {
    let freq = parseFloat(e.target.value);
    if(osc2) {
        osc2.frequency.value = freq;
    }
}

//detune fader
osc2Det.oninput = (e) => {
    let cents = parseFloat(e.target.value);
    if(osc2) {
        osc2.detune.value = cents;
    }
    osc2DetVal.innerHTML = `${cents} cents`;
}

//wave
osc2Wave.addEventListener( 'change', function(){
    if(osc2) {
        osc2.type = osc2Wave.value;
        }
});

//OSC 3

//OSC III controls
let osc3OnOffBtn = document.querySelector('#osc3-on-off');
let osc3GainControl = document.querySelector('#osc3-gain');
let osc3Freq = document.querySelector('#osc3-freq');
let osc3Det = document.querySelector('#osc3-detune');
let osc3DetVal = document.querySelector('#osc3-det-val');
let osc3GainVal = document.querySelector('#osc3-gain-val');
let osc3Wave = document.querySelector('#osc3-wave');

//create osc3
let createOsc3 = () => {
    if(audioCtx) {
        osc3 = audioCtx.createOscillator();
        osc3.frequency.value = osc3Freq.value;
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


//gain input fader
osc3GainControl.oninput = (e) => {
    let input = parseFloat(e.target.value);    
    let gain = input * input;
    osc3GainVal.innerHTML = gain.toFixed(2);
   if(audioCtx && osc3){
        gainOsc3.gain.value = gain;
        osc3GainVal.innerHTML = gain.toFixed(2); 
    }
     
}

//freq input
osc3Freq.oninput = (e) => {
    let freq = parseFloat(e.target.value);
    if(osc3) {
        osc3.frequency.value = freq;
    }
}

//detune fader
osc3Det.oninput = (e) => {
    let cents = parseFloat(e.target.value);
    if(osc3) {
        osc3.detune.value = cents;
    }
    osc3DetVal.innerHTML = `${cents} cents`;
}

//wave
osc3Wave.addEventListener( 'change', function(){
    if(osc3) {
        osc3.type = osc3Wave.value;
        }
});
    
