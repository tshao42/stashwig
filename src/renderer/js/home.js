import Handlebars from 'handlebars';
const fs = require('fs');
const path = require('path');

// Load the Handlebars template
const templatePath = path.join(__dirname, '../views/home.hbs');
const source = fs.readFileSync(templatePath, 'utf8');
const template = Handlebars.compile(source);

// Data to be passed to the template
const data = { name: 'Electron' };

// Render the template with the data
const html = template(data);
document.body.innerHTML = html;
