import pc from "./pickColor.ts";

const printfn = {} as { [key: string]: (msj: string) => void };

printfn.title = (msj: string) => {
  console.log(pc.yellow(pc.bold(msj)));
  console.log(pc.yellow(msj.replace(/./g, '=')));
  console.log("\n\n");
};

printfn.success = (msj: string) => {
  console.log(pc.bgGreen(msj.replace(/./g, ' ')));
  console.log(pc.bgGreen(""+pc.bold(msj)));
  console.log(pc.bgGreen(msj.replace(/./g, ' ')));
};

printfn.error = (msj: string) => {
  console.log(pc.bgRed(msj.replace(/./g, ' ')));
  console.log(pc.bgRed(pc.bold(msj)));
  console.log(pc.bgRed(msj.replace(/./g, ' ')));
};



export default printfn;