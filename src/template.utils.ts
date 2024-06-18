import * as Handlebars from 'handlebars';
import * as fs from 'fs-extra';
import * as path from 'path';

// export const compileTemplate = async (templateName: string, data: object): Promise<{ subject: string, html: string }> => {
//   const filePath = path.join(__dirname, '..', 'templates', `${templateName}.hbs`);
//   const source = await fs.readFile(filePath, 'utf8');
//   const template = Handlebars.compile(source);
//   const compiled = template(data);
  
//   const [subject, html] = compiled.split('\n\n'); 
//   return { subject, html };
// };

export const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "Nils" }));