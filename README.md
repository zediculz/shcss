
# TerseCSS A lightweight CSS Framework with
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

//import terseCSS and call init() for TerseCSS to start working
import { terseCSS } from "../terse/index"
terseCSS.init()
//import the main class and call init() for TerseCSS to start working
import TerseCSS from 'tersecss'
const t = new TerseCSS()
t.init()

//use TerseCSS like this
function HelloWorld() => {
    return(
        <div class="w-100px h-100dvh sm:w-10px">
            <h1>Hello World</h1>
        </div>
    )
}
```
# License

MIT © Ademujimi Oluwaseyi