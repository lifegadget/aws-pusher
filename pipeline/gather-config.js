var inquirer = require('inquirer');
var path = require('path');

var run = function (context, config, options) {
  var pusherConfig = config.pusher;
  var projectNameGuess = config.pusher.name || config.npm.name || "unknown";
  if(pusherConfig.configured) {
    console.log(' - Rerunning/updating pusher initialization for %s project.', pusherConfig.name);
  } else {
    console.log('  - Initializing pusher');
  }
  var questions = [
    {
      type: "input",
      name: "project",
      message: "What is the project name",
      default: projectNameGuess
    },
    {
      type: "input",
      name: "url",
      message: "What is the base URL for your application (e.g., without the www or other subdomain)",
      default: projectNameGuess
    },
    {
      type: "list",
      name: "wwwStrategy",
      message: "Do you want requests to 'www' redirected to your base URL?",
      choices: ["www is redirected to base URL", "base URL redirects to www", "just use base URL, don't work about redirections"],
      default: projectNameGuess
    },
    
  ];
  inquirer.prompt(questions);
  
}

exports.run = run;