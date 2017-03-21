'use strict';

module.exports = function generate(spec, filename, options) {
  const _ = require('lodash');
  const sway = require('sway');
  const xlsx = require('xlsx');

  const Swagger = require('swagger-client');

  sway.create({definition: spec}).then(
    (api) => {
      const operation = api.getOperation(options.resource, 'post');
      const parameter = operation.getParameter(options.parameter || 'body', 'body');

      const workbook = xlsx.readFile(filename);
      const worksheet = workbook.Sheets[options.spreadsheet];

      const importRows = xlsx.utils.sheet_to_row_object_array(worksheet);

      new Swagger({url: spec, usePromise: true})
        .then((client) => {
          _.forEach(importRows, (importItem) => {

            const parameters = [];

            parameters[parameter.definitionFullyResolved.name] = importItem;
            client.apis[operation.tags[0]][operation.operationId](parameters)
              .then(
                (result) => {
                  console.log(result);
                },
                (err) => {
                  console.error(err);
                });
          });
        });

    },
    (err) => {
      console.error(err);
    }
  );
};
