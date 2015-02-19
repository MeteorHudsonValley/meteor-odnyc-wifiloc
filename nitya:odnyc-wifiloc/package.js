Package.describe({
  name    : 'nitya:odnyc-wifiloc',
  version : '1.0.3',
  summary : 'OpenDataNYC dataset for WiFi locations',
  git     : '',
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('underscore@1.0.2');  
  api.export('WifiLocs');

  api.addFiles('wifiloc.js',['client','server']);
  api.addFiles('assets/data.json','server', { isAsset: true });
});

/* TODO: Add testing.
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('nitya:odnyc-wifilocations');
  api.addFiles('wifi-locations-tests.js');
});
*/
