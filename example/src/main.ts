import { terseCSS } from "../../src/index"
import type { TerseTheme } from "../../src/utils"

const th:TerseTheme = {
    color: {
        primary: "purple"
    },
    breakpoints: {
        sm: "390px",
        md: "600px"
    }
}

terseCSS.init(th)