// Terry King 2021
module.exports = function(msg){
	let colours={
		black: {r:0,g:0,b:0},
		red: {r:255,g:0,b:0},
		yellow: {r:255,g:255,b:0},
		purple: {r:255,g:0,b:255},
		cyan: {r:0,g:255,b:255},
		green: {r:0,g:255,b:0},
		blue: {r:0,g:0,b:255},
		white: {r:255,g:255,b:255},
	}
	let commands={
		bold: `\x1b[1m`,
		italic: `\x1b[3m`,
		ul:   `\x1b[4m`,
		inv:  `\x1b[7m`,
		up:		`\x1b[1A`,
		clrline: `\x1b[2K`,
        show: `\x1b[?25h`,
        hide: `\x1b[?25l`,
	}
	let res = msg.replace(/{{(.*?)}}/g,function(_,token){
		let p=token.toLowerCase().split(',')
		let cols=''
		let rgbpart=[]
		if (p=='reset'){
			cols+=`\x1b[0m`
		} else {
			let fgbg="38"
			for(let c of p){
				if (c.match('^x')){
					let v=c.split('=')[1]
					if (v>0){
						cols+=`\x1b[1000D\x1b[${v}C`
					} else {
						cols+=`\x1b[1000D`
					}
				} else if (c.match('^bg')){
					fgbg="48"
					c=c.substr(2)
				} else {
					if (rgbpart.length==0){
						fgbg="38"
					}
				}
				if (c.match(/^\d+$/)){
					rgbpart.push(c)
				}
				if (rgbpart.length==3){
					let s=`\x1b[${fgbg};2;${rgbpart[0]};${rgbpart[1]};${rgbpart[2]}m`
					cols+=s
					rgbpart = []
				}
				if (commands[c]){
					cols+=commands[c]
				}
				if (colours[c]){
					let rgb = colours[c]
					cols+=`\x1b[${fgbg};2;${rgb.r};${rgb.g};${rgb.b}m`
				}
			}
		}
		return cols
	})
		res+=`\x1b[m`
		return res
}