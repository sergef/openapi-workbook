#!/usr/bin/env node
'use strict';

const program = require('commander');
const chalk = require('chalk');
const tool = require('../');

program
  .command('template <spec> <filename>')
  .description('Generate an empty "template" workbook from OpenAPI 2.0 spec')
  .action((spec, filename) => {
    tool.template(spec, filename);
  });

program
  .command('export <spec> <filename>')
  .description('Export data from workbook to API resource(s)')
  .action((spec, filename) => {
    tool.export(spec, filename);
  });

program
  .command('import <spec> <filename>')
  .description('Import data from API resource(s) to a workbook')
  .option('-r, --resource <resource>', 'path to the resource')
  .option('-p, --parameter <parameter>', 'name of the parameter to use, defaults to "body"')
  .option('-s, --spreadsheet <spreadsheet>', 'name of the spreadsheet to import data from')
  .action((spec, filename, options) => {
    tool.import(spec, filename, options);
  });

program
  .version(require('../package').version)
  .on('debug', (filter) => {
    process.env.DEBUG = filter || 'openapi-workbook:*,swagger:*,json-schema-ref-parser';
  })
  .parse(process.argv);

tool.cli.validate(program);