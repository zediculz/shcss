
///<reference lib="dom" />

import { shUtils } from "./utils"
import type { ASTType, Token } from "./utils";

/**@function shLexer Lexer function */
function shLexer(sh: string) {
  const tokens: Token[] = [];
  //console.log("sh: ", sh)
  const strArr = sh.split(" ");

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
            value: valueOption[0]
          };

          tokens.push(obj);
        } else {
          const obj: Token = {
            command: commandOption[1],
            value: valueOption[0],
            media: commandOption[0]
          };

          tokens.push(obj);
        }
      } else {
        if (valueOption.length === 2) {
          const obj: Token = {
            command: shArr[0],
            value: valueOption[0],
            option: valueOption[1]
          };

          tokens.push(obj);
        } else {
          const obj: Token = {
            command: shArr[0],
            value: shArr[1]
          };

          tokens.push(obj);
        }
      }
    } else {
      const obj: Token = {
        command: "center",
        value: shUtils.one(commandOption[0])
      };

      tokens.push(obj);
    }
  });

  return tokens;
}

/**@function shAST AST function */
function shAST(tks: Token[]) {
  const ast: ASTType[] = [];

  tks.forEach((tk) => {
    //console.log(tk)

    if (tk?.media !== undefined) {
      //console.log(tk)
      if (tk.option) {
        const command = shUtils.com(tk.command);
        const value = tk.value;
        const media = shUtils.media(tk.media);
        const text = `${command}:${value};`;

        const obj: ASTType = {
          command,
          value,
          option: tk.option,
          media,
          res: text.trim()
        };

        ast.push(obj);
      } else {
        const command = shUtils.com(tk.command);
        const value = tk.value;
        const media = shUtils.media(tk.media);
        const text = `${command}:${value};`;

        const obj: ASTType = {
          command,
          value,
          media,
          res: text.trim(),
          mediaType: tk.media
        };

        ast.push(obj);
      }
    } else {
      if (tk.option) {
        const command = shUtils.com(tk.command);
        const value = tk.value;
        const text = `${command}:${value};`;

        const obj: ASTType = {
          command,
          value,
          option: tk.option,
          res: text.trim()
        };

        ast.push(obj);
      } else {
        //console.log(tk)

        const command = shUtils.com(tk.command);
        const value = tk.value;
        const text = `${command}:${value};`;

        const obj: ASTType = {
          command,
          value,
          res: text.trim()
        };

        ast.push(obj);
      }
    }
  });

  return ast;
}

const cssRoot = ":root{font-synthesis:none; text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}"
/**@class SHCSS */
class ShCSS {
  private styles: string[];
  constructor() {
    this.styles = [cssRoot, "*{margin:0;padding:0}"];
  }

  /**@function Sh shorthand CSS */
  css(sh: string) {
    const tks = shLexer(sh);
    const ast = shAST(tks);
    const classname = this.#runtime(ast);
    return classname;
  }

  /**@method runtime Sh Runtime function */
  #runtime(ast: ASTType[]) {
    //console.log(ast)

    let rules = "";
    let mediaRules = "";
    const className = shUtils.rand();

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

        //mediaRules += `${tk.media}{.${className}{${tk.res}}}`;
      } else {
        rules += tk.res;
      }
    });

    const rule = `.${className}{${rules}}`;
    //console.log(rule)
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

    //console.log(this.buckets)
    return className;
  }
}

//main
/**@instance of ShCSS */
export const sh = new ShCSS();
