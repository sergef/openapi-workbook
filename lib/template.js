"use strict";

module.exports = function generate(spec, filename, cb) {
  const _ = require("lodash");
  const sway = require("sway");
  const xlsx = require("xlsx");

  sway.create({ definition: spec }).then(
    function(api) {
      console.log(api.definitions);

      var workbook = {
        SheetNames: [],
        Sheets: []
      };

      _.mapKeys(api.definitions, function(value, key) {
        workbook.SheetNames.push(key);

        var worksheet = {};
        var range = { s: { c: 10000000, r: 0 }, e: { c: 0, r: 0 } };
        var col = 0;
        var row = 0;

        _.mapKeys(value.properties, function(value, key) {
          if (range.s.c > col) range.s.c = col;
          if (range.e.c < col) range.e.c = col;

          var cell = {
            v: key
          };

          var cellRef = xlsx.utils.encode_cell({ c: col++, r: row });

          worksheet[cellRef] = cell;
          worksheet["!ref"] = xlsx.utils.encode_range(range);
        });

        workbook.Sheets[key] = worksheet;
      });

      xlsx.writeFile(workbook, filename);
    },
    function(err) {
      console.error(err.stack);
    }
  );
};
