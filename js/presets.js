'use strict';

//presets
const presetRandomBtn = document.querySelector("#preset-random");

let oscillators = [osc1, osc2, osc3];

function checkOsc (...oscillators) {

    oscillators.map(function(osc, index){
        if(osc === 0 && index === 0) {
            osc1 = createOsc(osc1, 0, gainOsc1, visualizerOsc1, canvasCtx1, analyser1, modOsc1); 
            return osc1;
        } else if (osc === 0 && index === 1) {
            osc2 = createOsc(osc2, 1, gainOsc2, visualizerOsc2, canvasCtx2, analyser2, modOsc2);
            return osc2; 
        }  else if  (osc === 0 && index === 2) {
            osc3 = createOsc(osc3, 2, gainOsc3, visualizerOsc3, canvasCtx3, analyser3, null);
            return osc3;
        } 

    });
}

function preset1() {
    checkOsc(osc1, osc2, osc3);

    gainMaster.gain.value = 0.5;
    gainMasterControl.value = 0.5;

    osc1.type= "triangle";
    waveSelect[0].value = "triangle";
    osc2.type= "triangle";
    waveSelect[1].value = "triangle";
    osc3.type= "sawtooth";
    waveSelect[2].value = "sawtooth";
 
    document.querySelector('#osc1-oct-2').checked =true;
    document.querySelector('#osc2-oct-1').checked =true;
    document.querySelector('#osc3-oct0').checked =true; 

    gainOsc1.gain.value = 0.3;
    gainFaders[0].value = 0.55;
    gainDisplays[0].innerHTML = 0.30;

    gainOsc2.gain.value = 0.30;
    gainFaders[1].value = 0.55;
    gainDisplays[1].innerHTML = 0.30;

    gainOsc3.gain.value = 0.06;
    gainFaders[2].value = 0.06;
    gainDisplays[2].innerHTML = 0.06;

    osc1.detune.value = 0;
    detuneFaders[0].value = 0;
    detuneDisplays[0].innerHTML = "0 cents";
    osc2.detune.value = 15;
    detuneFaders[1].value = 15;
    detuneDisplays[1].innerHTML = "15 cents";
    osc3.detune.value = 0;
    detuneFaders[2].value = 0;
    detuneDisplays[2].innerHTML = "0 cents";

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

function preset2() {
    checkOsc(osc1, osc2, osc3);

    gainMaster.gain.value = 0.5;
    gainMasterControl.value = 0.5;

    osc1.type= "sawtooth";
    waveSelect[0].value = "sawtooth";
    osc2.type= "triangle";
    waveSelect[1].value = "triangle";
    osc3.type= "square";
    waveSelect[2].value = "square";

    document.querySelector('#osc1-oct-1').checked =true;
    document.querySelector('#osc2-oct-1').checked =true;
    document.querySelector('#osc3-oct0').checked =true; 

    gainOsc1.gain.value = 0.15;
    gainFaders[0].value = 0.40;
    gainDisplays[0].innerHTML = 0.15;

    gainOsc2.gain.value = 0.15;
    gainFaders[1].value = 0.40;
    gainDisplays[1].innerHTML = 0.15;

    gainOsc3.gain.value = 0.10;
    gainFaders[2].value = 0.35;
    gainDisplays[2].innerHTML = 0.10;

    osc1.detune.value = 0;
    detuneFaders[0].value = 0;
    detuneDisplays[0].innerHTML = "0 cents";
    osc2.detune.value = 10;
    detuneFaders[1].value = 10;
    detuneDisplays[1].innerHTML = "10 cents";
    osc3.detune.value = 0;
    detuneFaders[2].value = 0;
    detuneDisplays[2].innerHTML = "0 cents";

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

function preset3() {
    checkOsc(osc1, osc2, osc3);

    gainMaster.gain.value = 0.3;
    gainMasterControl.value = 0.3;
    

    osc1.type= "square";
    waveSelect[0].value = "square";
    osc2.type= "triangle";
    waveSelect[1].value = "triangle";
    osc3.type= "sine";
    waveSelect[2].value = "sine";

    document.querySelector('#osc1-oct-2').checked =true;
    document.querySelector('#osc2-oct0').checked =true;
    document.querySelector('#osc3-oct0').checked =true; 

    gainOsc1.gain.value = 0.20;
    gainFaders[0].value = 0.45;
    gainDisplays[0].innerHTML = 0.20;

    gainOsc2.gain.value = 0.30;
    gainFaders[1].value = 0.55;
    gainDisplays[1].innerHTML = 0.30;

    gainOsc3.gain.value = 0.30;
    gainFaders[2].value = 0.55;
    gainDisplays[2].innerHTML = 0.30;

    osc1.detune.value = 0;
    detuneFaders[0].value = 0;
    detuneDisplays[0].innerHTML = "0 cents";
    osc2.detune.value = 15;
    detuneFaders[1].value = 15;
    detuneDisplays[1].innerHTML = "15 cents";
    osc3.detune.value = 0;
    detuneFaders[2].value = 0;
    detuneDisplays[2].innerHTML = "0 cents";

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

function preset4() {
    checkOsc(osc1, osc2, osc3);

    gainMaster.gain.value = 0.5;
    gainMasterControl.value = 0.5;

    osc1.type= "triangle";
    waveSelect[0].value = "triangle";
    osc2.type= "triangle";
    waveSelect[1].value = "triangle";
    osc3.type= "sine";
    waveSelect[2].value = "sine";
 
    document.querySelector('#osc1-oct-1').checked =true;
    document.querySelector('#osc2-oct-1').checked =true;
    document.querySelector('#osc3-oct0').checked =true; 

    gainOsc1.gain.value = 0.3;
    gainFaders[0].value = 0.55;
    gainDisplays[0].innerHTML = 0.30;

    gainOsc2.gain.value = 0.30;
    gainFaders[1].value = 0.55;
    gainDisplays[1].innerHTML = 0.30;

    gainOsc3.gain.value = 0.20;
    gainFaders[2].value = 0.45;
    gainDisplays[2].innerHTML = 0.30;

    osc1.detune.value = 0;
    detuneFaders[0].value = 0;
    detuneDisplays[0].innerHTML = "0 cents";
    osc2.detune.value = 15;
    detuneFaders[1].value = 15;
    detuneDisplays[1].innerHTML = "15 cents";
    osc3.detune.value = 0;
    detuneFaders[2].value = 0;
    detuneDisplays[2].innerHTML = "0 cents";

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

function preset5() {
    checkOsc(osc1, osc2, osc3);

    gainMaster.gain.value = 0.5;
    gainMasterControl.value = 0.5;

    osc1.type= "triangle";
    waveSelect[0].value = "triangle";
    osc2.type= "triangle";
    waveSelect[1].value = "triangle";
    osc3.type= "sawtooth";
    waveSelect[2].value = "sawtooth";
 
    document.querySelector('#osc1-oct-2').checked =true;
    document.querySelector('#osc2-oct-1').checked =true;
    document.querySelector('#osc3-oct-1').checked =true; 

    gainOsc1.gain.value = 0.20;
    gainFaders[0].value = 0.45;
    gainDisplays[0].innerHTML = 0.20;

    gainOsc2.gain.value = 0.22;
    gainFaders[1].value = 0.47;
    gainDisplays[1].innerHTML = 0.22;

    gainOsc3.gain.value = 0.23;
    gainFaders[2].value = 0.48;
    gainDisplays[2].innerHTML = 0.23;

    osc1.detune.value = 0;
    detuneFaders[0].value = 0;
    detuneDisplays[0].innerHTML = "0 cents";
    osc2.detune.value = 17;
    detuneFaders[1].value = 17;
    detuneDisplays[1].innerHTML = "17 cents";
    osc3.detune.value = 0;
    detuneFaders[2].value = 0;
    detuneDisplays[2].innerHTML = "0 cents";

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
