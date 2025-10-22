
///<reference lib="dom" />

import { defaultTheme, tUtils } from "./utils"
import type { ASTType, TerseTheme, Token, Node } from "./utils";

/**@class TerseCSS */
class TerseCSS {
  private style: string[];
  private classList: string[];
  private nodeList: Node[];
  private theme: TerseTheme
  private sheet: CSSStyleSheet|null

  constructor() {
    this.theme = defaultTheme
    this.style = [this.theme.root as string, `*{margin:0;padding:0;transition:${this.theme.transition}}`];
    this.nodeList = []
    this.classList = []
    this.sheet = this.#DOM()
  }

  #DOM() {
    const shStyleElement = document.createElement("style");
    document.head.appendChild(shStyleElement);
    const shSheet = shStyleElement.sheet;
    return shSheet
  }

  /**@method tLexer terseCSS Lexer */
  #tLexer(sh: string) {
    //lexer token
    const tokens: Token[] = [];

    if (sh !== "") {
      //shorthand string array
      const strArray = sh.split(" ")

      strArray.forEach((sh) => {
        //shorthand array
        const shArr = sh.split("-");
        const commandOption = shArr[0].split(":")

        if (shArr.length !== 1) {
          const valueOption = shArr[1].split(":");

          if (commandOption.length === 2) {

            if (valueOption.length === 2) {

              const obj: Token = {
                command: commandOption[1],
                media: commandOption[0],
                option: valueOption[1],
                value: valueOption[0],
                raw: strArray.join(" ")
              };

              tokens.push(obj);
            } else {
              const obj: Token = {
                command: commandOption[1],
                value: valueOption[0],
                media: commandOption[0],
                raw: strArray.join(" ")
              };

              tokens.push(obj);
            }
          } else {
            if (valueOption.length === 2) {
              const obj: Token = {
                command: shArr[0],
                value: valueOption.join("-"),
                option: valueOption[1],
                raw: strArray.join(" ")
              };

              tokens.push(obj);
            } else {
              const obj: Token = {
                command: shArr[0],
                value: shArr[1],
                raw: strArray.join(" ")
              };

              tokens.push(obj);
            }
          }
        } else {
          //ONELINERS ARE STILL AN ISSUE
          const line = shArr[0]
          const oneLinerArray = this.#tLexer(tUtils.one(line))
          oneLinerArray.flatMap(obj => tokens.push(obj))
        }
      });

      return tokens
    }

    return tokens;
  }

  /**@method tAST terseCSS AST */
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

  /**@method runtime terseCSS runtime */
  #runtime(tks: Token[]) {
    const ast: ASTType[] = this.#tAST(tks)

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
        else if (tk.mediaType === "hover" || tk.mediaType === "focus") {
          rules += `&:${tk.mediaType}{${tk.res}}`;
        }
      } else {
        rules += tk.res;
      }
    });

    const rule = `.${className}{${rules}}`;
    this.style.push(rule);

    const mediaRulesArray = mediaRules
      .split("@media")
      .filter(Boolean)
      .map((rule) => `@media${rule}`);

    mediaRulesArray.forEach((mediaRule) => {
      this.style.push(mediaRule);
    });

    this.style.forEach((rule, id) => {
      this.sheet?.insertRule(rule, id);
    });

    this.classList.push(className)
    return className
  }


  #getNodeList() {
    const allElements = document.querySelectorAll('*');
    const classLists: Node[] = [];

    allElements.forEach((element, id) => {
      if (element.classList && element.classList.length > 0) {
        classLists.push({
          tag: element.tagName?.toLocaleLowerCase(),
          classes: Array.from(element.classList).join(" "),
          element,
          id
        });
      }
    });

    return classLists
  }

  //entry point
  /**@method init TerseCSS Entry Point */
  init(theme?: TerseTheme) {
    this.theme = tUtils.th(theme as TerseTheme)

    this.nodeList = this.#getNodeList()

    this.nodeList.flatMap((node, id) => {
      const tks = this.#tLexer(node?.classes)
      const name = this.#runtime(tks)
      node.element.classList.add(name)

      if (id === this.nodeList.length - 1) {
        console.log("END OF NODELIST")
      }
    })
  }
}

//main
/**@instance of TerseCSS */
export const terseCSS = new TerseCSS();
export default TerseCSS