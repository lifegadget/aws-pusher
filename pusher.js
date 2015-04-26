// External Dependencies
var fs = require('fs');
var path = require('path');
var debug = require('debug')('pusher-cli');
var chalk = require('chalk');
var cli = require('commander');
var findup = require('findup-sync');
var xtend = require('xtend');
// Helper Variables
var projectRoot = path.dirname(findup('package.json')) || path.dirname(findup('pusher.json'));
var npmConfigFile = path.join(projectRoot, 'package.json');
var pusherConfigFile = path.join(projectRoot, 'pusher.json');
var pusherDefaults = {
  configured: false,
  pipeline: {
    init: [ 'gather-config' ],
    status: [],
    push: [],
    build: [],
    commit: []
  }
};
var npmDefaults = {
  name: 'undefined',
  version: '0.0.0',
  homepage: null
};
var pusherConfig, npmConfig;
try {
  pusherConfig = xtend(pusherDefaults, JSON.parse(fs.readFileSync(pusherConfigFile,{encoding: 'utf8'})));  
} catch (e) {
  pusherConfig = pusherDefaults;
}
try {
  npmConfig = xtend(npmDefaults,JSON.parse(fs.readFileSync(npmConfigFile,{encoding: 'utf8'})));
} catch (e) {
  npmConfig = npmDefaults;
}
var projectName = pusherConfig.name || npmConfig.name;
var projectVersion = pusherConfig.version || npmConfig.version;

cli
  .version('0.0.1')
  .option('-v, --verbose', "verbose output")
  .parse(process.argv);
  
console.log(chalk.bold('Pusher CLI ' + cli.version()));
if(projectName) {
  console.log(chalk.dim('  ' + projectName + ', v' + projectVersion));  
}
debug('PUSHER CONFIG\n%o', pusherConfig);

cli	
  .command('init')
	.description('Initialize your project to work with pusher-cli')
  .action(function(options) {
    executePipeline('init', options);
	}
);

cli	
  .command('status')
	.description('A dashboard status of all code and infrastructure relevant to this project\'s deployment status')
  .action(function(options) {
    executePipeline('status',options);
	}
);
cli	
  .command('push')
	.description('Push your current sandbox build environment to the cloud')
  .action(function(options) {
    executePipeline('push',options);
	}
);
cli	
  .command('build')
	.description('Builds your static assets locally, then pushes to the cloud')
  .action(function(options) {
    executePipeline('build',options);
	}
);
cli	
  .command('commit')
	.description('Picks up new tags, commits, and branches from your git repo and pushes new variants to the cloud')
  .action(function(options) {
    executePipeline('commit',options);
	}
);

function executePipeline(pipeline, options) {
  pipeline = pusherConfig.pipeline[pipeline];
  var context = {};
  var task = null;
  var previous = [];
  var config = {
    pusher: pusherConfig,
    npm: npmConfig
  };
  pipeline.forEach(function(item) {
    task = require('./pipeline/' + item );
    previous = task.run(previous, config, options);
  })
}

cli.parse(process.argv);

debug('ARGV[%s]: %o',process.argv.length, process.argv);
if(process.argv.length == 2) {
  cli.help();
}