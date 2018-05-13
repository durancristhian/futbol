const fs = require('fs');
const path = require('path');

const manifestSrcPath = path.resolve('src', 'manifest.json');
const manifestDistPath = path.resolve('build', 'manifest.json');
const manifest = require(manifestSrcPath);

const newManifest = Object.assign({}, manifest, {
  name: process.env.REACT_APP_TITLE,
  short_name: process.env.REACT_APP_TITLE
});

fs.writeFileSync(manifestDistPath, JSON.stringify(newManifest, null, 2));
