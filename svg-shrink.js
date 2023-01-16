/** @type {HTMLElement} */
let textElementInput;
/** @type {HTMLElement} */
let textElementOutput;
/** @type {number} */
let roundValue;

window.onload = function() {
    textElementInput = document.getElementById('SVG_input');
    textElementOutput = document.getElementById('SVG_output');
    roundValue = parseInt(document.getElementById('SVG_round').value);
    let button = document.getElementById('SVG_copyResult').onclick = function(){
        CopyToClipboard(textElementOutput.value);
    }

    document.getElementById('SVG_round').onchange = function() {
        roundValue = parseInt(document.getElementById('SVG_round').value);
        textElementOutput.value = ShrinkText(textElementInput.value);
    }

    textElementInput.onkeyup = function(){
        textElementOutput.value = ShrinkText(textElementInput.value);
    }
}

/**
 * 
 * @param {string} text 
 */
function ShrinkText(text){
    let elements = text.split(' ');

    let resulrArray = [];

    elements.forEach(element =>{

        let commaExists = element.includes(',');

        let num = parseFloat(element);
        let isNumber = (commaExists)?false:(!isNaN(num));

        if(commaExists){
            let xy = element.split(',');
            let x = parseFloat(xy[0]);
            let y = parseFloat(xy[1]);
            x = round(x, roundValue);
            y = round(y, roundValue);
            resulrArray.push(x + ',' + y);
        }else{
            if(isNumber){
                resulrArray.push(round(num, roundValue));
            }
            else{
                resulrArray.push(element);
            }
        } 
    });

    return resulrArray.join(' ');
}

function round(number, digits){
    var p = Math.pow(10, digits);
    return Math.round((number + Number.EPSILON) * p) / p;
}

/**
 * 
 * @param {string} text 
 */
function CopyToClipboard(text){
    navigator.clipboard.writeText(text);
    console.log('copied');
}