    import { build } from 'esbuild';

    build({
      entryPoints: ['./src/index.ts'],
      bundle: true,
      minify: true,
      sourcemap: true,
      platform: 'browser', // or 'node' if it's a Node.js library, 'browser' for browser
      format: 'esm', // or 'cjs' for CommonJS
      outfile: './dist/index.js',
      globalName: "ShCSS"
      // If you need to exclude node_modules from the bundle (for Node.js libraries)
      // external: Object.keys(require('./package.json').dependencies || {}),
    }).catch(() => process.exit(1));