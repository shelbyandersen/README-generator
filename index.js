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
  ]);

const generateReadMe = (answers) => `${answers.title}`;

promptUser()
  .then((answers) => writeFileAsync("READMETEST.md", generateReadMe(answers)))
  .then(() => console.log("Successfully wrote to README"))
  .catch((err) => console.error(err));
