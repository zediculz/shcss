
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
## Available ShortHands

### Layouts
### ShortHand Meaning and Usage
w = width w-100% 
h = height h-100%
maxw = max-width w-100% 
maxh = max-height h-100%
minw = min-width w-100% 
minh = min-height h-100%
d = display d-flex
dis = display d-flex
p = postion p-absolute
pos = postion p-absolute
z = z-index z-10
top = top top-100
bottom = bottom bottom-100
right = right right-100
left = left left-100
overf = overflow overf-hidden
overflow = overflow overflow-hidden

### Margin
mg = margin margin-10px
mgl = margin-left mgl-10px
mgr = margin-right mgr-10px
mgb = margin-bottom mgb-10px
mgt = margin-top mgt-10px

### Padding
pd = padding padding-10px
pdl = padding-left pdl-10px
pdr = padding-right pdr-10px
pdt = padding pdt-10px
pdb = padding-bottom pdb-10px

### Flex
flexd = flex-direction flexd-row
align = align-items align-center
alignc = align-content alignc-center
justify = justify-content justify-center
justifyi = justify-items justifyi-space:around
flexw = flex-wrap flexw-wrap

### Text
font = font-size font-12pt
fontw = font-weight fontw-bold
fonts = font-style fonts-bold
fontf = font-family fontf-lato
text = text-align text-center
textd = text-decoration textd-underline
textt = text-transform textt-uppercase
color = color color-red
line = line-height line-10pt

### Background
bg = background bg-red
bgc = background-color bgc-red
bgi = background-image bgi-url("linktoimage")
bgr = background-repeat bgr-cover
bgp = background-position bgp-cover
bgs = background-size bgs-size

### Border
bd = border bd-1px:solid:red
bdw = border-width bdw-2px
bds = border-style bds-solid
bdc = border-color bdc-red
bdr = border-radius bdr-4px


cur = cursor cur-pointer
op = opacity op-.5
boxs = bos-shadow boxs-0px:0px:2px:red
bs = bos-shadow boxs-0px:0px:2px:red
filter = filter filter
rt = rotate rt-20deg
sc = scale sc-1
trsl = translate trsl-10
trans = transition trans-.3:all:ease
ani = animation ani-animation:example

### TerseCSS use only css values.
# License

MIT © Ademujimi Oluwaseyi