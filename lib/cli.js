'use strict';

const _ = require('lodash');

const validate = function (program) {
  const commands = program.commands.map((command) => { return command._name; });

  if (!_.includes(commands, program.rawArgs[2])) {
    if (program.rawArgs[2]) {
      console.log();
      console.log(`error: invalid command: ${ program.rawArgs[2]}`);
    }
    program.help();
  }
};

module.exports = {
  validate
};
