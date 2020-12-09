import { interpreter, parse, preProcessDefines } from '@pounce-lang/core';

// const stackEle = document.querySelector('#canvas');
let nextPounceAst = null;
let processing = false;
const off = 20;
const scale = 5;
const ctx = document.getElementById("output").getContext("2d");

const wd = {
    "rect": {
        compose: (s) => {
            const y = s.pop();
            const x = s.pop();
            ctx.fillStyle = `rgba(100,10,200)`;
            ctx.fillRect(x * scale + off, y * scale + off, scale, scale);
            return [s];
        }
    },
    "test5": {
        compose: (s) => {
            s.push(5);
            return [s];
        }
    }

};

// parse the Pounce program
export default function repl(pounceProgram, logLevel = 0) {
    nextPounceAst = parse(pounceProgram, { logLevel });
    if (nextPounceAst) {
        if (!processing) {
            processing = true;
            window.requestAnimationFrame(step);
        }
    }
};

const step = () => {
    ctx.fillStyle = " #615c57";
    ctx.fillRect(0, 0, 340, 340);

    const [preProcessedProgram0, corePlusUserDefinedWords0] = preProcessDefines(nextPounceAst, wd); // coreWords);
    const runner0 = interpreter(preProcessedProgram0, { wd: corePlusUserDefinedWords0 });
    const res = runner0?.next?.();

    processing = false;
};

