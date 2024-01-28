import esbuildPluginTsc from 'esbuild-plugin-tsc';
import * as esbuild from 'esbuild';


await esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  platform:"node",
  target:"node18.15",
  format:'esm',
  packages:'external',
  minify:true,
  plugins: [
    esbuildPluginTsc({
      force: true,
      tsconfigPath:"./tsconfig.json"
    }),
  ],
});