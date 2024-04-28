import Handlebars from 'handlebars';

// Prepare a template
const source = `<p>Hello, {{name}}!</p>`;
const template = Handlebars.compile(source);

// Use the template
const html = template({ name: 'Electron' });
document.body.innerHTML = html;
