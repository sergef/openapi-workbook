#!/usr/bin/env node
"use strict";

var program = require("commander"),
  chalk = require("chalk"),
  tool = require("../");

program
  .command("template <spec> <filename>")
  .description('Generate an empty "template" workbook from OpenAPI 2.0 spec')
  .action(function(spec, filename) {
    tool.template(spec, filename);
  });

program
  .command("export <spec> <filename>")
  .description('Export data from workbook to API resource(s)')
  .action(function(spec, filename) {
    tool.export(spec, filename);
  });

program
  .command("import <spec> <filename>")
  .description('Import data from API resource(s) to a workbook')
  .action(function(spec, filename) {
    tool.import(spec, filename);
  });

program
  .version(require("../package").version)
  .on("debug", function(filter) {
    process.env.DEBUG = filter ||
      "openapi-workbook:*,swagger:*,json-schema-ref-parser";
  })
  .parse(process.argv);

if (program.rawArgs.length < 3) {
  program.help();
}

function errorHandler(err) {
  console.error(chalk.red(err.stack));
  process.exit(1);
}
