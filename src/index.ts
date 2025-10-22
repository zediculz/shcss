
///<reference lib="dom" />

import { defaultTheme, tUtils } from "./utils"
import type { ASTType, TerseTheme, Token } from "./utils";

const cssRoot = ":root{font-synthesis:none; text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}"

/**@class TerseCSS */
class TerseCSS {
  private styles: string[];
  private allClassList: { tag: string, classes: string, element: Element }[];
  private theme:TerseTheme

  constructor() {
    this.styles = [cssRoot, "*{margin:0;padding:0;transition:ease-in}"];
    this.allClassList = this.#getAllElementClassLists()
    this.theme = defaultTheme
  }

  /**@function TerseCSS method to convet shorthand to css */
  css(sh: string) {
    const tks = this.#tLexer(sh);
    const ast = this.#tAST(tks);
    const classname = this.#runtime(ast);
    return classname;
  }

  /**@method tLexer terseCSS Lexer function */
#tLexer(sh: string) {
  const tokens: Token[] = [];

  if (sh !== "") {
    const strArr = sh.split(" ")

    strArr.forEach((sh) => {
      const shArr = sh.split("-");
      const commandOption = shArr[0].split(":");

      if (shArr.length !== 1) {
        const valueOption = shArr[1].split(":");

        //console.log(commandOption)
        //console.log(valueOption)

        if (commandOption.length === 2) {
          if (valueOption.length === 2) {
            const obj: Token = {
              command: commandOption[1],
              media: commandOption[0],
              option: valueOption[1],
              value: valueOption[0],
              raw: strArr.join(" ")
            };

            tokens.push(obj);
          } else {
            const obj: Token = {
              command: commandOption[1],
              value: valueOption[0],
              media: commandOption[0],
              raw: strArr.join(" ")
            };

            tokens.push(obj);
          }
        } else {
          if (valueOption.length === 2) {
            const obj: Token = {
              command: shArr[0],
              value: valueOption[0],
              option: valueOption[1],
              raw: strArr.join(" ")
            };

            tokens.push(obj);
          } else {
            const obj: Token = {
              command: shArr[0],
              value: shArr[1],
              raw: strArr.join(" ")
            };

            tokens.push(obj);
          }
        }
      } else {
        const obj: Token = {
          command: "center",
          value: tUtils.one(commandOption[0]),
          raw: strArr.join(" ")
        };

        tokens.push(obj);
      }
    });

    return tokens
  }

  return tokens;
}
  
/**@method tAST terseCSS AST function */
#tAST(tks: Token[]) {
  const ast: ASTType[] = [];

  tks.forEach((tk) => {
    //console.log(tk)

    if (tk?.media !== undefined) {
      if (tk.option) {
        const command = tUtils.com(tk.command);
        const value = tk.value;
        const media = tUtils.media(tk.media);
        const text = `${command}:${value};`;

        const obj: ASTType = {
          command,
          value,
          option: tk.option,
          media,
          res: text.trim(),
          raw: tk.raw
        };

        ast.push(obj);
      } else {
        const command = tUtils.com(tk.command);
        const value = tk.value;
        const media = tUtils.media(tk.media, this.theme);
        const text = `${command}:${value};`;

        const obj: ASTType = {
          command,
          value,
          media,
          res: text.trim(),
          mediaType: tk.media,
          raw: tk.raw
        };

        ast.push(obj);
      }
    } else {
      if (tk.option) {
        const command = tUtils.com(tk.command);
        const value = tk.value;
        const text = `${command}:${value};`;

        const obj: ASTType = {
          command,
          value,
          option: tk.option,
          res: text.trim(),
          raw: tk.raw
        };

        ast.push(obj);
      } else {
        //console.log(tk)

        const command = tUtils.com(tk.command);
        const value = tk.value;
        const text = `${command}:${value};`;

        const obj: ASTType = {
          command,
          value,
          res: text.trim(),
          raw: tk.raw
        };

        ast.push(obj);
      }
    }
  });

  return ast;
}


  /**@method runtime Sh Runtime function */
  #runtime(ast: ASTType[]) {
    let rules = "";
    let mediaRules = "";
    const className = tUtils.classname();

    ast.flatMap((tk: ASTType) => {

      if (tk.media !== undefined) {
        //console.log(tk.mediaType)
        if (tk.mediaType === "sm") {
          mediaRules += `${tk.media}{.${className}{${tk.res}}}`;
        }
        else if (tk.mediaType === "md") {
          mediaRules += `${tk.media}{.${className}{${tk.res}}}`;
        }
        else if (tk.mediaType === "lg") {
          mediaRules += `${tk.media}{.${className}{${tk.res}}}`;
        }
        else if (tk.mediaType === "hover") {
          rules += `&:${tk.mediaType}{${tk.res}}`;
        }

        //mediaRules += `${tk.media}{.${className}{${tk.res}}}`;
      } else {
        rules += tk.res;
      }
    });

    const rule = `.${className}{${rules}}`;
    this.styles.push(rule);

    const mediaRulesArray = mediaRules
      .split("@media")
      .filter(Boolean)
      .map((rule) => `@media${rule}`);

    mediaRulesArray.forEach((mediaRule) => {
      this.styles.push(mediaRule);
    });

    const shStyleElement = document.createElement("style");
    document.head.appendChild(shStyleElement);
    const shSheet = shStyleElement.sheet;

    this.styles.forEach((rule, id) => {
      shSheet?.insertRule(rule, id);
    });

    //this.classes.push(className)
    return className
  }


  #getAllElementClassLists() {
    const allElements = document.querySelectorAll('*');
    const classLists: { tag: string, classes: string, element: Element }[] = [];

    allElements.forEach(element => {
      if (element.classList && element.classList.length > 0) {
        classLists.push({
          tag: element.tagName?.toLocaleLowerCase(),
          classes: Array.from(element.classList).join(" "),
          element
        });
      }
    });

    return classLists
  }

  //entry point
  /**@method init TerseCSS Entry Point */
  init(theme?:TerseTheme) {
    const newTheme = {...this.theme, ...theme}
    this.theme = newTheme

    //console.log(newTheme)

    this.allClassList = this.#getAllElementClassLists()
    //console.log(this.allClassList)

    this.allClassList.flatMap((cls) => {
      //console.log(cls)
      const tks = this.#tLexer(cls?.classes)
      const ast = this.#tAST(tks);
      const name = this.#runtime(ast)
      cls.element.classList.add(name)
    })
  }
}

//main
/**@instance of TerseCSS */
export const terseCSS = new TerseCSS();
export default TerseCSS