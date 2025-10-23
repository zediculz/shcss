import type { TerseTheme } from "./index"

export interface Token {
  command: string;
  value: string;
  option?: string;
  media?: string;
  mediaType?: string
  raw?: string,
  rawClass?: string,
  effect?: string
}

export interface ASTType {
  res: string
  env?: "global"|"media"|"effect"|"mediaEffect"
  rawClass?: string
  option?: string;
  media?: string;
  mediaType?: string
  effect?: string,
}

export interface Node { tag: string, classes: string, element: Element, id: number }


/**@function tCommands all TerseCSS css shorthand commands and its utility function */
const tCommands = (command: string) => {
  switch (command) {
    //layouts
    case "h":
      return "height";
    case "w":
      return "width";
    case "maxw":
      return "max-width";
    case "maxh":
      return "max-height";
    case "minw":
      return "min-width";
    case "minh":
      return "min-height";
    case "d":
      return "display";
    case "dis":
      return "display";
    case "p":
      return "position";
    case "pos":
      return "position";
    case "top":
      return "top";
    case "bottom":
      return "bottom";
    case "left":
      return "left";
    case "right":
      return "right";
    case "z":
      return "z-index";
    case "pd":
      return "padding";
    case "pdl":
      return "padding-left";
    case "pdr":
      return "padding-right";
    case "pdt":
      return "padding-top";
    case "pdb":
      return "padding-bottom";
    case "mg":
      return "margin";
    case "mgl":
      return "margin-left";
    case "mgr":
      return "margin-right";
    case "mgt":
      return "margin-top";
    case "mgb":
      return "margin-bottom";
    case "float":
      return "float";
    case "clear":
      return "clear";
    case "overf":
      return "overflow";
    case "overflow":
      return "overflow";

    //flex
    case "flexd":
      return "flex-direction";
    case "align":
      return "align-items";
    case "alignc":
      return "align-content";
    case "justify":
      return "justify-content";
    case "justifyi":
      return "justify-items";
    case "flexw":
      return "flex-wrap";
    case "flexf":
      return "flex-flow";

    //grid
    case "gtc":
      return "grid-template-columns";
    case "gtr":
      return "grid-template-rows";
    case "gta":
      return "grid-template-area";
    case "gap":
      return "grid-gap";

    //text
    case "font":
      return "font-size";
    case "fontw":
      return "font-weight";
    case "fonts":
      return "font-style";
    case "fontf":
      return "font-family";
    case "text":
      return "text-align";
    case "textd":
      return "text-decoration";
    case "textt":
      return "text-transform";
    case "color":
      return "color";
    case "line":
      return "line-height";
    case "letter":
      return "letter-spacing";
    case "word":
      return "word-spacing";


    //background
    case "bg":
      return "background";
    case "bgc":
      return "background-color";
    case "bgi":
      return "background-image";
    case "bgr":
      return "background-repeat";
    case "bgp":
      return "background-position";
    case "bgs":
      return "background-size";

    //border
    case "bd":
      return "border";
    case "bdw":
      return "border-width";
    case "bds":
      return "border-style";
    case "bdc":
      return "border-color";
    case "bdr":
      return "border-radius";

    //effects
    case "cur":
      return "cursor";
    case "op":
      return "opacity";
    case "boxs":
      return "box-shadow";
    case "bs":
      return "box-shadow";
    case "filter":
      return "filter";
    case "rt":
      return "rotate";
    case "scale":
      return "scale";
    case "sc":
      return "scale";
    case "trsl":
      return "translate";
    case "trans":
      return "transition";
    case "ani":
      return "animation";
    
    //self codes
    case "space":
      return "margin-top"

    default:
      return command;
  }
};


/**@function tMedia responsive media query */
const tMedia = (media: string, theme?: TerseTheme) => {

  const bk = theme?.breakpoints

  switch (media) {
    case "sm":
      return `@media screen and (${bk?.sm})`;
    case "md":
      return `@media screen and (${bk?.md})`;
    case "lg":
      return `@media screen and (${bk?.lg})`;
    case "dark":
      return `@media (prefers-color-scheme: ${media})`;
    case "hover":
      return "hover";
    case "focus":
      return "focus";

    default:
      return "";
  }
};


/**@function tClassName TerseCSS classname generator function */
const tClassName = (node: Node) => {
  const alpha = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
  ];
  
  const tag = node.tag
  const r1 = alpha[Math.floor(Math.random() * 25)];
  const r2 = alpha[Math.floor(Math.random() * 25)];
  const r3 = alpha[Math.floor(Math.random() * 25)];
  const r4 = alpha[Math.floor(Math.random() * 25)];
  const r5 = alpha[Math.floor(Math.random() * 15)];
  const r6 = alpha[Math.floor(Math.random() * 15)];

  return `${tag}_${r1}${r2}${r5}${r4}${r6}${r3}${r5}${r6}`;
};


const shOneLiner = (command: string) => {
  switch (command) {
    case "center":
      return "d-flex align-center justify-center";
    case "container":
      return "w-100% h-100dvh d-flex";
    case "flex":
      return "d-flex align-center justify-start";
    case "btn":
      return "w-200px h-50px outline:none bdr-8px center font-14pt bd-none cur-pointer";
    case "primarybtn":
      return "btn bg-red";
    default:
      return "";
  }
};

export const defaultTheme: TerseTheme = {
  title: "ms",
  color: {
    primary: "#000",
    secondary: "#f5f5f5"
  },
  breakpoints: {
    sm: "max-width:375px",
    md: "max-width:768px",
    lg: "min-width:1245px"
  },
  root: ":root{font-synthesis:none; text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}"
}

export function resTheme(theme: TerseTheme) {
  //console.log(theme)
  const tColor = theme?.color === undefined ? {} : theme?.color
  const tBk = theme?.breakpoints === undefined ? {} : theme?.breakpoints

  const newTheme: TerseTheme = {
    title: theme?.title === undefined ? defaultTheme.title : theme.title,
    color: { ...defaultTheme.color, ...tColor },
    breakpoints: { ...defaultTheme.breakpoints, ...tBk },
    root: theme?.root === undefined ? defaultTheme.root : theme.root
  }

  //console.log(newTheme)
  return newTheme
}

/**@method tUtils TerseCSS utility functions */
export const tUtils = {
  com: tCommands,
  media: tMedia,
  classname: tClassName,
  one: shOneLiner,
  th: resTheme
};
