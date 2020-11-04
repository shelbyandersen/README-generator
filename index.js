const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// User input - ask questions that will build README

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

    {
      type: "input",
      name: "contributing",
      message: "Please list who has contributed to your application",
    },

    {
      type: "input",
      name: "tests",
      message: "Please describe how to test your application",
    },

    {
      type: "list",
      name: "license",
      message: "Please choose which license you would like to display",
      choices: ["MIT", "Apache2.0", "GPL3.0", "BSD3", "none"],
    },

    {
      type: "input",
      name: "github",
      message: "Please enter your Github username",
    },

    {
      type: "input",
      name: "email",
      message: "Please enter your email address",
    },
  ]);

// Write users answers to generate README

const generateReadMe = (answers) =>
  `
  ### ${answers.title}

  ### Table of Contents

  *[Title](#Title)

  *[Description](#Description)

  *[Installation](#Installation)

  *[Usage](#Usage)

  *[Contributing](#Contributing)

  *[Testing](#Testing)

  *[License](#License)

  *[Questions](#Questions)

  ### Description 
  ${answers.description}

  ### Installation
  ${answers.installation}

  ### Usage
  ${answers.usage}

  ### Contributing
  ${answers.contributing}

  ### Testing
  ${answers.tests}

  ### License
  ![GitHub license](https://img.shields.io/badge/license-${answers.license}-blue.svg)
  This application is using the ${answers.license} license. 

  ### Questions
  If you have any questions, please contact:
  https://github.com/${answers.github}

  And please email me at:
  ${answers.email}
  `;

// Generate README file

promptUser()
  .then((answers) =>
    writeFileAsync("./demo/README-demo.md", generateReadMe(answers))
  )
  .then(() => console.log("Successfully wrote to README"))
  .catch((err) => console.error(err));
