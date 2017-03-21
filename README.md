# OpenAPI Workbook

```
Usage: openapi-workbook [options] [command]


  Commands:

    template <spec> <filename>          Generate an empty "template" workbook from OpenAPI 2.0 spec
    export <spec> <filename>            Export data from workbook to API resource(s)
    import [options] <spec> <filename>  Import data from API resource(s) to a workbook

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## Template

Example:

```
./bin/openapi-workbook.js template http://petstore.swagger.io/v2/swagger.json tmp/out.xlsx
```

## Import

```
  Usage: import [options] <spec> <filename>

  Import data from API resource(s) to a workbook

  Options:

    -h, --help                       output usage information
    -r, --resource <resource>        path to the resource
    -p, --parameter <parameter>      name of the parameter to use, defaults to "body"
    -s, --spreadsheet <spreadsheet>  name of the spreadsheet to import data from
```

Example:

```
./bin/openapi-workbook.js import --resource /pet --spreadsheet Pet http://petstore.swagger.io/v2/swagger.json tmp/out.xlsx
```