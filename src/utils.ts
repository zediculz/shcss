
export interface Token {
  command: string;
  value: string;
  option?: string;
  media?: string;
  mediaType?: string
  raw?: string
}

export interface ASTType extends Token {
  res: string;
}

export interface TerseTheme {
  color?: {
    primary?: string,
    secondary?: string
  }

  breakpoints?: {
    sm?: string,
    md?: string
    lg?: string
  }
}

export const defaultTheme: TerseTheme = {
  color: {
    primary: "#222",
    secondary: "lime"
  },
  breakpoints: {
    sm: "375px",
    md: "625px",
    lg: "1245px"
  }
}

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


/**@function tCommands all TerseCSS css shorthand commands and its utility function */
const tCommands = (command: string) => {
  switch (command) {
    case "bg":
      return "background";
    case "h":
      return "height";
     case "w":
      return "width";
    case "d":
      return "display";
    case "p":
      return "position";
    case "align":
      return "align-items";
    case "justify":
      return "justify-content";
    case "flexd":
      return "flex-direction";
    case "overflow":
      return "overflow";
    case "font":
      return "font-size";
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
    case "fontw":
      return "font-weight";
    case "text":
      return "text-align";
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
    case "cur":
      return "cursor";

    default:
      return command;
  }
};

//responsive
/**@function tMedia responsive media query */
const tMedia = (media: string, theme?: TerseTheme) => {
 
  const bk = theme?.breakpoints

  switch (media) {
    case "sm":
      return `@media screen and (max-width:${bk?.sm})`;
    case "md":
      return `@media screen and (max-width:${bk?.md})`;
    case "lg":
      return `@media screen and (min-width:${bk?.lg})`;
    case "dark":
      return "@media (prefers-color-scheme: dark)";
    case "hover":
      return "hover";

    default:
      return "";
  }
};

/**@function tClassName TerseCSS classname generator function */
const tClassName = () => {
  const r1 = alpha[Math.floor(Math.random() * 25)];
  const r2 = alpha[Math.floor(Math.random() * 25)];
  const r3 = alpha[Math.floor(Math.random() * 25)];
  const r4 = alpha[Math.floor(Math.random() * 25)];
  const r5 = alpha[Math.floor(Math.random() * 15)];
  const r6 = alpha[Math.floor(Math.random() * 15)];

  return `${r1}${r2}${r5}${r4}${r6}${r3}${r5}${r6}`;
};


const shOneLiner = (command: string) => {
  switch (command) {
    case "center":
      return "d-flex align-center justify-center";
    case "@container":
      return "w-100% h-100dvh";

    default:
      return command;
  }
};


/**@method tUtils TerseCSS utility function */
export const tUtils = {
  com: tCommands,
  media: tMedia,
  classname: tClassName,
  one: shOneLiner
};
