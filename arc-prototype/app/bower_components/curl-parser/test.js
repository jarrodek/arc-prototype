(function() {
  var curl = 'curl -u "demo" -X POST -d @file1.txt -d @file2.txt https://example.com/upload';

  var curlParser = require('./lib/curl-parser.js');
  var curlData = curlParser.parseCurl(curl);
  console.log(curlData);
})();
