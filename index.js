const colourize = require('./colourize.js')
const patchConsoleLog = require('./patchconsole.js')

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

(async ()=>{
    patchConsoleLog()
    let cols=['black','red','yellow','purple','cyan','green','blue','white']
    for(let i=0;i<20;i++){
        let fore=cols[Math.trunc(Math.random()*cols.length)]
        let back=cols[Math.trunc(Math.random()*cols.length)]
        console.log(colourize(`{{${fore},bg${back}}}  ${fore} on ${back}  `))
    }
    console.log(colourize(`{{128,255,128}} RGB colour 128,255,128 `))
    console.log(colourize(`{{ul}} Underline `));
    console.log(colourize(`{{bold}} Bold `));
    console.log(colourize(`{{inv}} Inverted `));
    console.log(colourize(`{{italic}} Italic `));

    for(let x=0;x<40;x++){
        let px
        if (x<20) px=x
        else px=40-x
        console.log(colourize(`{{x=${px}}} You can position the cursor and move the cursor up {{up}}`))
        await sleep(50)
    }
    console.log('')

    for(let x=0;x<40;x++){
        let progress=''
        for(let i=1;i<=x;i++){
            progress+="\u25A0"
        }
        console.log(colourize(`{{hide,clrline}}Progress Bar:${progress}{{up}}`))
        await sleep(50)
    }
    console.log(colourize('{{show}}'))

    console.log("The patchConsoleLog function uses colourize which prints the file and line number that the console.log is on.")

})();

