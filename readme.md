# Console colourize + console.log file and line numbers

## Colourize Usage

Pass your string to console.log to colourize. Uses {{ }} to pass commands, multiple commands are separated by a comma. 
```js
const colourize = require('colourize.js')
console.log(colourize('{{purple,bgwhite}}This is purple text on a white background'))
```

The following text colours are available; black, red, yellow, purple, cyan, green, blue & white. For background colours just precede the colour with 'bg'.

For r,g,b values just pass three integers, e.g. {{255,0,0}} would be red

The following commands are also available:
```
bold
ul (underline)
inv (inverse)
italic
x=n (position cursor at column n)
up (move the cursor up one line)
clrline (clear the current line and position cursor at the start of the line)
show (show the cursor)
hide (hide the cursor)
```

## Displaying filename and line number

If you use console.log for simple debugging you don't have to have a very big application before you end up forgetting where the console.log are occurring. By using 'patchconsole' you get the filename and the line number that the console.log occurred at.

```
require('./patchconsole.js')()
console.log('Some example output')
```

e.g.
```
Normal output:
Some example output

With patchConsoleLog:
index.js:2: Some example output
```
