import { terseCSS } from "tersecss"

terseCSS.init({
    color: {
        primary: "purple"
    },
    breakpoints: {
        sm: "390px",
        md: "600px"
    }
})

console.log(terseCSS)