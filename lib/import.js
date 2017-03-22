'use strict';

module.exports = function generate(spec, filename, options) {
  const async = require('async');
  const sway = require('sway');
  const xlsx = require('xlsx');

  const Progress = require('progress');
  const Swagger = require('swagger-client');

  sway.create({definition: spec}).then(
    (api) => {
      const operation = api.getOperation(options.resource, 'post');
      const parameter = operation.getParameter(options.parameter || 'body', 'body');

      const workbook = xlsx.readFile(filename);
      const worksheet = workbook.Sheets[options.spreadsheet];

      const importRows = xlsx.utils.sheet_to_row_object_array(worksheet);
      const bar = new Progress(':current/:total :bar', { total: importRows.length });

      new Swagger({url: spec, usePromise: true})
        .then((client) => {
          async.eachLimit(
            importRows,
            options.limit || 1,
            (importItem, done) => {

              const parameters = [];

              parameters[parameter.definitionFullyResolved.name] = importItem;
              client.apis[operation.tags[0]][operation.operationId](parameters)
                .then((result) => {
                  bar.tick();
                  done();
                })
                .catch((error) => {
                  console.error(error);
                  done(error);
                });
            },
            (error) => {
              if (error) {
                console.error(error);
              }
            });
        });
    },
    (error) => {
      console.error(error);
    }
  );
};
