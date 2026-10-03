// Bouwt de landingspagina uit template.html.
//
//   index.html     — losse pagina om zelf te hosten (compleet document)
//   artifact.html  — alleen de pagina-inhoud, voor publicatie als Artifact
//
// De lettertypen uit @fontsource gaan als data-URI mee, zodat er niets bij
// Google wordt opgehaald — zie de merkregel over privacy.
const fs = require('fs');
const path = require('path');

const root = __dirname;
const fonts = {
  __SANS_400__: 'node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2',
  __SANS_700__: 'node_modules/@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff2',
  __MONO_500__: 'node_modules/@fontsource/dm-mono/files/dm-mono-latin-500-normal.woff2',
};

const DESCRIPTION =
  'ParkMatiq start en stopt je parkeersessie zelf, met een melding zodra je ' +
  'geparkeerd staat en als je wegrijdt. Laat je e-mailadres achter voor de lancering.';

let html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

for (const [token, file] of Object.entries(fonts)) {
  const b64 = fs.readFileSync(path.join(root, file)).toString('base64');
  html = html.replace(token, b64);
}

const logo = fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
html = html.split('__LOGO__').join('data:image/png;base64,' + logo);

const [head, body] = html.split('<!--BODY-->');
if (body === undefined) {
  throw new Error('template.html mist de <!--BODY--> markering');
}

const standalone = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${DESCRIPTION}">
<meta name="theme-color" content="#002D72">
${head.trim()}
</head>
<body>
${body.trim()}
</body>
</html>
`;

write('index.html', standalone);
write('artifact.html', head.trim() + '\n' + body.trim() + '\n');

function write(name, contents) {
  const out = path.join(__dirname, name);
  fs.writeFileSync(out, contents);
  console.log('wrote', name, (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
}
