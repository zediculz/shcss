
# TerseCSS
A lightweight, CSS Shorthand parser that generate the CSS Styles, append it to the document head and return the classname.

- 🚀 Zero dependencies
- 🔌 Less API
- 🛠️ Full TypeScript type inference

## TerseCSS is still very early in development

## Installation

```bash
npm i tersecss
```

### Basic Class Example
```javascript

//import any of this and use
import { terseCSS } from "tersecss"
import { terse } from "tersecss"

//or any of this 
import { tc } from "tersecss"
import { t } from "tersecss"
import { sh } from "tersecss"

//or import the main 
import TerseCSS from 'tersecss'
const t = new TerseCSS()

//use TerseCSS like this
function HelloWorld() => {
    return(
        <div className={t.css("w-100px h-100dvh sm:w-10px")}>
            <h1>Hello World</h1>
        </div>
    )
}
```
# License

MIT © Ademujimi Oluwaseyi