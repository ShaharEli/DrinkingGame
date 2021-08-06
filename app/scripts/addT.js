/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const basePath = path.join(__dirname, '..', 'src', 'i18n', 'locales');
const enPath = path.join(basePath, 'en.json');
const hePath = path.join(basePath, 'he.json');

const addTo = (type, key, val) => {
  const file = JSON.parse(
    fs.readFileSync(type === 'en' ? enPath : hePath).toString(),
  );
  const newFile = {translation: {...file.translation, [key]: val}};
  fs.writeFileSync(type === 'en' ? enPath : hePath, JSON.stringify(newFile));
  console.log({[key]: val}, 'add to', type);
};
const addT = () => {
  const args = process.argv.slice(2);
  if (args[0] === '+') {
    addTo('he', args[1], args[2]);
  } else {
    if (args.length === 2) {
      addTo('en', args[0], args[1]);
    } else {
      addTo('he', args[0], args[2]);
      addTo('en', args[0], args[1]);
    }
  }
};

addT();
