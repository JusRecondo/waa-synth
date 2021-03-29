'use strict';

//presets
const presetRandomBtn = document.querySelector("#preset-random");

function checkOsc () {
    if (osc1 === 0 && osc2 === 0 & osc3 === 0){
        createOsc1();
        osc1OnOffBtn.innerHTML = "ON"; 
        osc1OnOffBtn.classList.add("button-on");       
        createOsc2();        
        osc2OnOffBtn.innerHTML = "ON";
        osc2OnOffBtn.classList.add("button-on");
        createOsc3();
        osc3OnOffBtn.innerHTML = "ON"; 
        osc3OnOffBtn.classList.add("button-on");       
    } else if (osc1 === 0 && osc2 === 0) {
        createOsc1();
        osc1OnOffBtn.innerHTML = "ON"; 
        osc1OnOffBtn.classList.add("button-on");       
        createOsc2();        
        osc2OnOffBtn.innerHTML = "ON";
        osc2OnOffBtn.classList.add("button-on");
    } else if (osc1 === 0 && osc3 === 0) {
        createOsc1();
        osc1OnOffBtn.innerHTML = "ON"; 
        osc1OnOffBtn.classList.add("button-on");       
        createOsc3();
        osc3OnOffBtn.innerHTML = "ON";
        osc3OnOffBtn.classList.add("button-on");        
    } else if (osc2 === 0 && osc3 === 0) {
        createOsc2();        
        osc2OnOffBtn.innerHTML = "ON";
        osc2OnOffBtn.classList.add("button-on");
        createOsc3();
        osc3OnOffBtn.innerHTML = "ON";   
        osc3OnOffBtn.classList.add("button-on");     
    } else if (osc1 === 0) {
        createOsc1();
        osc1OnOffBtn.innerHTML = "ON";
        osc1OnOffBtn.classList.add("button-on");        
    } else if (osc2 === 0){
        createOsc2();        
        osc2OnOffBtn.innerHTML = "ON";
        osc2OnOffBtn.classList.add("button-on");
    } else if (osc3 === 0) {
        createOsc3();
        osc3OnOffBtn.innerHTML = "ON";   
        osc3OnOffBtn.classList.add("button-on");     
    }
}

let preset1 = () => {

    checkOsc();

    gainMaster.gain.value = 0.5;
    gainMasterControl.value = 0.5;

    osc1.type= "triangle";
    osc1Wave.value = "triangle";
    osc2.type= "triangle";
    osc2Wave.value = "triangle";
    osc3.type= "sawtooth";
    osc3Wave.value = "sawtooth";
 
    document.querySelector('#osc1-oct-2').checked =true;
    document.querySelector('#osc2-oct-1').checked =true;
    document.querySelector('#osc3-oct0').checked =true; 

    gainOsc1.gain.value = 0.3;
    osc1GainControl.value = 0.55;
    osc1GainVal.innerHTML = 0.30;

    gainOsc2.gain.value = 0.30;
    osc2GainControl.value = 0.55;
    osc2GainVal.innerHTML = 0.30;

    gainOsc3.gain.value = 0.06;
    osc3GainControl.value = 0.06;
    osc3GainVal.innerHTML = 0.06;

    osc1.detune.value = 0;
    osc1Det.value = 0;
    osc1DetVal.innerHTML = "0 cents";
    osc2.detune.value = 15;
    osc2Det.value = 15;
    osc2DetVal.innerHTML = "15 cents";
    osc3.detune.value = 0;
    osc3Det.value = 0;
    osc3DetVal.innerHTML = "0 cents";

    filter.type = "lowpass";
    filterType.querySelectorAll('option')[0].selected = true;
    filter.frequency.value = 2000;
    filterCut.value = filter.frequency.value;
    filterCutDisplay.innerHTML = "3000 Hz";
    filter.Q.value = 4;
    filterRes.value = 4;
    filterResDisplay.innerHTML = 4;

    if(modOsc1.checked) {
        lfoGain.disconnect(osc1.frequency);
        modOsc1.checked = false;
    } else if (modOsc2.checked) {
        lfoGain.disconnect(osc2.frequency);
        modOsc2.checked = false;
    }

    lfo.type = "triangle";
    lfoWave.value = "triangle";
    modFilt.checked = true;
    lfoGain.connect(filter.frequency);
    lfo.frequency.value = 0.6;
    lfoRate. value = 0.6;
    lfoRateDis.innerHTML = 0.6;
    lfoGain.gain.value = 666;
    lfoAmt.value = 666;

    delay.delayTime.value = 0;
    delayTimeInput.value = 0;
    delayTimeDis.innerHTML = 0;
    feedback.gain.value = 0;
    feedbackInput.value = 0;
}

let preset2 = () => {
    checkOsc();

    gainMaster.gain.value = 0.5;
    gainMasterControl.value = 0.5;

    osc1.type= "sawtooth";
    osc1Wave.value = "sawtooth";
    osc2.type= "triangle";
    osc2Wave.value = "triangle";
    osc3.type= "square";
    osc3Wave.value = "square";

    document.querySelector('#osc1-oct-1').checked =true;
    document.querySelector('#osc2-oct-1').checked =true;
    document.querySelector('#osc3-oct0').checked =true; 

    gainOsc1.gain.value = 0.15;
    osc1GainControl.value = 0.40;
    osc1GainVal.innerHTML = 0.15;

    gainOsc2.gain.value = 0.15;
    osc2GainControl.value = 0.40;
    osc2GainVal.innerHTML = 0.15;

    gainOsc3.gain.value = 0.10;
    osc3GainControl.value = 0.35;
    osc3GainVal.innerHTML = 0.10;

    osc1.detune.value = 0;
    osc1Det.value = 0;
    osc1DetVal.innerHTML = "0 cents";
    osc2.detune.value = 10;
    osc2Det.value = 10;
    osc2DetVal.innerHTML = "10 cents";
    osc3.detune.value = 0;
    osc3Det.value = 0;
    osc3DetVal.innerHTML = "0 cents";

    filter.type = "lowpass";
    filterType.querySelectorAll('option')[0].selected = true;
    filter.frequency.value = 1200;
    filterCut.value = filter.frequency.value;
    filterCutDisplay.innerHTML = "1200 Hz";
    filter.Q.value = 4;
    filterRes.value = 4;
    filterResDisplay.innerHTML = 4;

    if(modOsc2.checked) {
        lfoGain.disconnect(osc2.frequency);
        modOsc2.checked = false;
    }
    lfo.type = "sine";
    lfoWave.value = "sine";
    modFilt.checked = true;
    modOsc1.checked = true;
    lfoGain.connect(filter.frequency);
    lfoGain.connect(osc1.frequency);
    lfo.frequency.value = 0.1;
    lfoRate. value = 0.1;
    lfoRateDis.innerHTML = 0.1;
    lfoGain.gain.value = 666;
    lfoAmt.value = 666;

    delay.delayTime.value = 3;
    delayTimeInput.value = 3;
    delayTimeDis.innerHTML = 3.00;
    feedback.gain.value = 0.6;
    feedbackInput.value = 0.6;
}

let preset3 = () => {
    checkOsc();

    gainMaster.gain.value = 0.3;
    gainMasterControl.value = 0.3;

    osc1.type= "square";
    osc1Wave.value = "square";
    osc2.type= "triangle";
    osc2Wave.value = "triangle";
    osc3.type= "sine";
    osc3Wave.value = "sine";

    document.querySelector('#osc1-oct-2').checked =true;
    document.querySelector('#osc2-oct0').checked =true;
    document.querySelector('#osc3-oct0').checked =true; 

    gainOsc1.gain.value = 0.20;
    osc1GainControl.value = 0.45;
    osc1GainVal.innerHTML = 0.20;

    gainOsc2.gain.value = 0.30;
    osc2GainControl.value = 0.55;
    osc2GainVal.innerHTML = 0.30;

    gainOsc3.gain.value = 0.30;
    osc3GainControl.value = 0.55;
    osc3GainVal.innerHTML = 0.30;

    osc1.detune.value = 0;
    osc1Det.value = 0;
    osc1DetVal.innerHTML = "0 cents";
    osc2.detune.value = 15;
    osc2Det.value = 15;
    osc2DetVal.innerHTML = "15 cents";
    osc3.detune.value = 0;
    osc3Det.value = 0;
    osc3DetVal.innerHTML = "0 cents";

    filter.type = "lowpass";
    filterType.querySelectorAll('option')[0].selected = true;
    filter.frequency.value = 860;
    filterCut.value = filter.frequency.value;
    filterCutDisplay.innerHTML = "860 Hz";
    filter.Q.value = 3;
    filterRes.value = 3;
    filterResDisplay.innerHTML = 3;

    if(modOsc1.checked) {
        lfoGain.disconnect(osc1.frequency);
        modOsc1.checked = false;
    }
    if(modOsc2.checked) {
        lfoGain.disconnect(osc2.frequency);
        modOsc2.checked = false;
    }
    lfo.type = "sine";
    lfoWave.value = "sine";
    modFilt.checked = true;
    lfoGain.connect(filter.frequency);
    lfo.frequency.value = 30;
    lfoRate. value = 30;
    lfoRateDis.innerHTML = 30;
    lfoGain.gain.value = 220;
    lfoAmt.value = 220;

    delay.delayTime.value = 0;
    delayTimeInput.value = 0;
    delayTimeDis.innerHTML = 0;
    feedback.gain.value = 0;
    feedbackInput.value = 0;
}

let preset4 = () => {

    checkOsc();

    gainMaster.gain.value = 0.5;
    gainMasterControl.value = 0.5;

    osc1.type= "triangle";
    osc1Wave.value = "triangle";
    osc2.type= "triangle";
    osc2Wave.value = "triangle";
    osc3.type= "sine";
    osc3Wave.value = "sine";
 
    document.querySelector('#osc1-oct-1').checked =true;
    document.querySelector('#osc2-oct-1').checked =true;
    document.querySelector('#osc3-oct0').checked =true; 

    gainOsc1.gain.value = 0.3;
    osc1GainControl.value = 0.55;
    osc1GainVal.innerHTML = 0.30;

    gainOsc2.gain.value = 0.30;
    osc2GainControl.value = 0.55;
    osc2GainVal.innerHTML = 0.30;

    gainOsc3.gain.value = 0.20;
    osc3GainControl.value = 0.45;
    osc3GainVal.innerHTML = 0.30;

    osc1.detune.value = 0;
    osc1Det.value = 0;
    osc1DetVal.innerHTML = "0 cents";
    osc2.detune.value = 15;
    osc2Det.value = 15;
    osc2DetVal.innerHTML = "15 cents";
    osc3.detune.value = 0;
    osc3Det.value = 0;
    osc3DetVal.innerHTML = "0 cents";

    filter.type = "lowpass";
    filterType.querySelectorAll('option')[0].selected = true;
    filter.frequency.value = 2000;
    filterCut.value = filter.frequency.value;
    filterCutDisplay.innerHTML = "2000 Hz";
    filter.Q.value = 4;
    filterRes.value = 4;
    filterResDisplay.innerHTML = 4;

    if(modOsc1.checked) {
        lfoGain.disconnect(osc1.frequency);
        modOsc1.checked = false;
    } else if (modOsc2.checked) {
        lfoGain.disconnect(osc2.frequency);
        modOsc2.checked = false;
    }

    lfo.type = "triangle";
    lfoWave.value = "triangle";
    modFilt.checked = true;
    lfoGain.connect(filter.frequency);
    lfo.frequency.value = 0.6;
    lfoRate. value = 0.6;
    lfoRateDis.innerHTML = 0.6;
    lfoGain.gain.value = 666;
    lfoAmt.value = 666;

    delay.delayTime.value = 0;
    delayTimeInput.value = 0;
    delayTimeDis.innerHTML = 0;
    feedback.gain.value = 0;
    feedbackInput.value = 0;
}

let preset5 = () => {

    checkOsc();

    gainMaster.gain.value = 0.5;
    gainMasterControl.value = 0.5;

    osc1.type= "triangle";
    osc1Wave.value = "triangle";
    osc2.type= "triangle";
    osc2Wave.value = "triangle";
    osc3.type= "sawtooth";
    osc3Wave.value = "sawtooth";
 
    document.querySelector('#osc1-oct-2').checked =true;
    document.querySelector('#osc2-oct-1').checked =true;
    document.querySelector('#osc3-oct-1').checked =true; 

    gainOsc1.gain.value = 0.20;
    osc1GainControl.value = 0.45;
    osc1GainVal.innerHTML = 0.20;

    gainOsc2.gain.value = 0.22;
    osc2GainControl.value = 0.47;
    osc2GainVal.innerHTML = 0.22;

    gainOsc3.gain.value = 0.23;
    osc3GainControl.value = 0.48;
    osc3GainVal.innerHTML = 0.23;

    osc1.detune.value = 0;
    osc1Det.value = 0;
    osc1DetVal.innerHTML = "0 cents";
    osc2.detune.value = 17;
    osc2Det.value = 17;
    osc2DetVal.innerHTML = "17 cents";
    osc3.detune.value = 0;
    osc3Det.value = 0;
    osc3DetVal.innerHTML = "0 cents";

    filter.type = "lowpass";
    filterType.querySelectorAll('option')[0].selected = true;
    filter.frequency.value = 1100;
    filterCut.value = filter.frequency.value;
    filterCutDisplay.innerHTML = "1100 Hz";
    filter.Q.value = 6.90;
    filterRes.value = 6.90;
    filterResDisplay.innerHTML = 6.90;

    if(modOsc1.checked) {
        lfoGain.disconnect(osc1.frequency);
        modOsc1.checked = false;
    } else if (modOsc2.checked) {
        lfoGain.disconnect(osc2.frequency);
        modOsc2.checked = false;
    }

    lfo.type = "triangle";
    lfoWave.value = "triangle";
    modFilt.checked = true;
    lfoGain.connect(filter.frequency);
    lfo.frequency.value = 0.55;
    lfoRate. value = 0.55;
    lfoRateDis.innerHTML = 0.55;
    lfoGain.gain.value = 113;
    lfoAmt.value = 113;

    delay.delayTime.value = 0.3;
    delayTimeInput.value = 0.3;
    delayTimeDis.innerHTML = 0.3;
    feedback.gain.value = 0.68;
    feedbackInput.value = 0.68;
}

//preset random selector
let presets = [preset1, preset2, preset3, preset4, preset5];
let presetAnterior = "";

function presetRandom (resultadoAnterior) {
    let random;
    do {
        random = Math.floor(Math.random() * 5);
    } while (random === resultadoAnterior);
    presets[random]();
    presetAnterior = random;
}

presetRandomBtn.addEventListener('click', function(){
    presetRandom(presetAnterior);
});
