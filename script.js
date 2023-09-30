const one = document.getElementById("one");
const two = document.getElementById("two");

function verify(answer) {
    var input = document.getElementById("pass");
    var response = input.value.trim().toLowerCase();

    if (response.toLowerCase() === answer) {
        one.classList.add("hidden");
        two.classList.remove("hidden");
    }
}

const svg = document.getElementById('rotatable-svg');
let step = 0;
let currentRotation = 80;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const input = document.getElementById('cipher').textContent.toUpperCase();


function normalizeShift(shift) {
    if (shift < 26) {
        return shift;
    } else {
        return (shift - 1) % 26;
    }
}

function decipher() {
    let output = "";
    let shift = 0;

    for (let target = 0; target < input.length; target++) {
        for (let letter = 0; letter < alphabet.length; letter++) {
            if (input[target] == alphabet[letter]) {
                if (letter > 25) {
                    shift = normalizeShift(letter - 25 + step);
                } else {
                    shift = normalizeShift(letter + step);
                }
                output += alphabet[shift];
                break;
            }
        }
    }

    document.getElementById('cipher').textContent = output;
}

function changeOutputTag(tag) {
    let output = document.getElementById("cipher");
    let element = document.createElement(tag);

    element.innerHTML = output.innerHTML;
    element.id = "cipher";
    if (tag == "a") {
        element.href = "https://x.com/AchasteAlgo?s=20";
        element.target = "_blank"; 
    }
    output.parentNode.replaceChild(element, output);
}


function updateRotation() {
    currentRotation = 80 + step * (360 / 26);
    svg.style.transform = `rotate(${currentRotation}deg)`;
    if (step == 5) {
        changeOutputTag("a");
    } else if (step == 4 || step == 6) {
        changeOutputTag("p");
    }
    decipher()
}

function rotateRight() {
    if (step == 25) {
        step = 0;
    } else {
        step++;
    }
    updateRotation();
}

function rotateLeft() {
    if (step == 0) {
        step = 25;
    } else {
        step--;
    }
    updateRotation();
}