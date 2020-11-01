const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?",
    },
    {
      type: "input",
      name: "description",
      message: "What is the description of your project?",
    },
  ]);

const generateReadMe = (answers) =>
  `
  ### ${answers.title}

  ### Description 
  ${answers.description}`;

promptUser()
  .then((answers) => writeFileAsync("READMESAMPLE.md", generateReadMe(answers)))
  .then(() => console.log("Successfully wrote to README"))
  .catch((err) => console.error(err));
