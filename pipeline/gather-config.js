var inquirer = require('inquirer');
var path = require('path');
var debug = require('debug')('pusher:gather-config');

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
      default: 'my-app.com'
    },
    {
      type: "list",
      name: "wwwStrategy",
      message: "Do you want requests to 'www' redirected to your base URL?",
      choices: ["www redirected to base URL", "base URL redirected to www", "just base URL, no redirection"],
      default:  "www redirected to base URL"
    }
  ];
  inquirer.prompt(questions, function( answers ) {
    debug('Answers are:\n%s', JSON.stringify(answers));
  });
  
}

exports.run = run;