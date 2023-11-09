const colourize = require('./colourize.js')
var path = require('path')

function patchConsoleLog(){
	['debug', 'log', 'warn', 'error'].forEach((methodName) => {
		const originalLoggingMethod = console[methodName];
		console[methodName] = (firstArgument, ...otherArguments) => {
			const originalPrepareStackTrace = Error.prepareStackTrace
			Error.prepareStackTrace = (_, stack) => stack
			const callee = new Error().stack[1]
			Error.prepareStackTrace = originalPrepareStackTrace
			const relativeFileName = path.relative(process.cwd(), callee.getFileName())
			const prefix = `${relativeFileName}:${callee.getLineNumber()}:`
			let fore='green'
			let back='bgblack'
			if (methodName=='error'){
				fore='white'
				back='bgred'
			}

			if (typeof firstArgument === 'string') {
				originalLoggingMethod(colourize(`{{${fore},${back}}}${prefix}`) + ' ' + firstArgument, ...otherArguments);
			} else {
				originalLoggingMethod(colourize(`{{${fore},${back}}}${prefix}`), firstArgument, ...otherArguments);
			}
		};
	});
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

(async ()=>{
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
    console.log()

    for(let x=0;x<40;x++){
        let progress=''
        for(let i=1;i<=x;i++){
            progress+="\u25A0"
        }
        console.log(colourize(`{{hide,clrline}}Progress Bar:${progress}{{up}}`))
        await sleep(50)
    }
    console.log(colourize('{{show}}'))

    patchConsoleLog()
    console.log("The patchConsoleLog function uses colourize which prints the file and line number that the console.log is on.")

})();

