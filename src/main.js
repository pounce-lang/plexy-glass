import repl from './pounceEnv.js';

// Add event listener for code-mini-golf input

const a_PounceProgramEle = document.getElementById("user-pl-a");
// const exampleSelectEle = document.getElementById("example");

const initProgram = decodeURI(location.hash.substr(1))?.split(';');
let a_pounceProgram = initProgram[3] ? initProgram[3] : 'test5'; // '30 30 rect 40 40 rect';
let logLevel = 0;

// alpha
a_PounceProgramEle.addEventListener("blur", (e) => {
    if (e.target.value !== a_pounceProgram) {
        a_pounceProgram = e.target.value;
        repl(a_pounceProgram, logLevel);
    }
    if (e.key == 'Enter') {
        location.hash = encodeURI(a_pounceProgram);
    }
}, false);

a_PounceProgramEle.value = a_pounceProgram;

repl(a_pounceProgram, logLevel);