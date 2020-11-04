const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your application?",
    },
    {
      type: "input",
      name: "description",
      message: "What is the description of your application?",
    },
    // {
    //   type: "input",
    //   name: "tableofcontents",
    //   message: "Please enter your table of contents",
    // },
    {
      type: "input",
      name: "installation",
      message: "How do you install your application?",
    },

    {
      type: "input",
      name: "usage",
      message: "Please describe how to use your application",
    },
  ]);

const generateReadMe = (answers) =>
  `
  ### ${answers.title}

  ### Description 
  ${answers.description}
  
  ### Table of Contents 
  ${answers.tableofcontents}

  ### Installation
  ${answers.installation}

  ### Usage
  ${answers.usage}
  `;

promptUser()
  .then((answers) =>
    writeFileAsync("./demo/README-demo.md", generateReadMe(answers))
  )
  .then(() => console.log("Successfully wrote to README"))
  .catch((err) => console.error(err));
