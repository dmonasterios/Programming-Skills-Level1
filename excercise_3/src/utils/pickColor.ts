const pc = {} as {[key: string] : (msj: string) => string};

const reset = "\x1b[0m";
const colors = {
  black:"\x1b[30m",
  red:"\x1b[31m",
  green:"\x1b[32m",
  yellow:"\x1b[33m",
  blue:"\x1b[34m",
  magenta:"\x1b[35m",
  cyan:"\x1b[36m",
  white:"\x1b[37m",
  gray:"\x1b[90m",
}

const bg = {
  bgBlack:"\x1b[40m",
  bgRed:"\x1b[41m",
  bgGreen:"\x1b[42m",
  bgYellow:"\x1b[43m",
  bgBlue:"\x1b[44m",
  bgMagenta:"\x1b[45m",
  bgCyan:"\x1b[46m",
  bgWhite:"\x1b[47m",
}

const text = {
  bold:"\x1b[1m",
  underline:"\x1b[4m"
}

for(const [key, color] of Object.entries(colors)){
  pc[key] = (msj: string) => color+msj+reset;
}

for(const [key, bgColor] of Object.entries(bg)){
  pc[key] = (msj: string) => bgColor+msj+reset;
}

for(const [key, textType] of Object.entries(text)){
  pc[key] = (msj: string) => textType+msj+reset;
}


export default pc;