
export interface Token {
  command: string;
  value: string;
  option?: string;
  media?: string;
  mediaType?: string
}

export interface ASTType extends Token {
  res: string;
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

//responsive
/**@function tCommands all TerseCSS css shorthand commands and its utility function */
const tCommands = (command: string) => {
  switch (command) {
    case "bg":
      return "background";
    case "h":
      return "height";
    case "d":
      return "display";
    case "p":
      return "position";
    case "align":
      return "align-items";
    case "justify":
      return "justify-content";
    case "w":
      return "width";
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

    default:
      return command;
  }
};

//responsive
/**@function tMedia responsive media query */
const tMedia = (media: string) => {
  switch (media) {
    case "sm":
      return "@media screen and (max-width:425px)";
    case "md":
      return "@media screen and (max-width:625px)";
    case "lg":
      return "@media screen and (max-width:1245px)";

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
