#!/usr/bin/env node

/* eslint no-unused-expressions: "off" */

const yargs = require('yargs');
const { version } = require('../package.json');

// const { argv } = yargs;

yargs
  .version(version)
  .command('create [projectName]', 'create a project boilerplate', (_yargs) => {
    _yargs
      .positional('projectName', {
        describe: 'project name, which will the dir name for your project',
        type: 'string'
      })
      .version(false);
  }, (argv) => {
    require('../lib/boilerplate/create')(argv);
  })
  .argv;
