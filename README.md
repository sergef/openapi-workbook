# OpenAPI Workbook

```
Usage: openapi-workbook [options] [command]

 Commands:

   template <spec> <filename>  Generate an empty "template" workbook from OpenAPI 2.0 spec
   export <spec> <filename>    Export data from workbook to API resource(s)
   import <spec> <filename>    Import data from API resource(s) to a workbook

 Options:

   -h, --help     output usage information
   -V, --version  output the version number
```

```
#./bin/openapi-workbook.js template http://petstore.swagger.io/v2/swagger.json tmp/out.xlsx
```
