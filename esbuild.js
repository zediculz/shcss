import { build } from 'esbuild';
import { dtsPlugin } from "esbuild-plugin-d.ts";

  build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'browser', // or 'node' if it's a Node.js library, 'browser' for browser
    format: 'esm', // or 'cjs' for CommonJS
    outfile: './dist/index.js',
    globalName: "tersecss",
    plugins: [
      dtsPlugin()
    ]
    // If you need to exclude node_modules from the bundle (for Node.js libraries)
    // external: Object.keys(require('./package.json').dependencies || {}),
  }).catch(() => process.exit(1));