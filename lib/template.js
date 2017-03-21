'use strict';

module.exports = function generate(spec, filename) {
  const _ = require('lodash');
  const sway = require('sway');
  const xlsx = require('xlsx');

  sway.create({definition: spec}).then(
    (api) => {
      const workbook = {
        SheetNames: [],
        Sheets: []
      };

      _.mapKeys(
        api.definitionRemotesResolved.definitions,
        (value, key) => {
          console.log(value);

          workbook.SheetNames.push(key);

          const worksheet = {};
          const range = {s: {c: 10000000, r: 0}, e: {c: 0, r: 0}};
          let col = 0;
          const row = 0;

          _.mapKeys(value.properties, (value, key) => {
            if (range.s.c > col) {
              range.s.c = col;
            }
            if (range.e.c < col) {
              range.e.c = col;
            }

            const cell = {
              v: key
            };

            const cellRef = xlsx.utils.encode_cell({c: col++, r: row});

            worksheet[cellRef] = cell;
            worksheet['!ref'] = xlsx.utils.encode_range(range);
          });

          workbook.Sheets[key] = worksheet;
        });

      xlsx.writeFile(workbook, filename);
    },
    (err) => {
      console.error(err.stack);
    }
  );
};
