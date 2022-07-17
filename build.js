const { nodeExternalsPlugin } = require('esbuild-node-externals')

require('esbuild').build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/src/index.js',
  platform: 'node',
  sourcemap: true,
  bundle: true,
  minify: false,
  target: 'node16',
  plugins: [nodeExternalsPlugin()]
});
