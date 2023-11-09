const path = require('path')
const colourize = require('./colourize.js')

module.exports = function(){
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

