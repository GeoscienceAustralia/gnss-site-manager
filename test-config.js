// Load our SystemJS configuration.
System.config({
  baseURL: '/base/',
  map: {
      'moment': 'moment/moment',
      'ngx-bootstrap': 'ngx-bootstrap/ngx-bootstrap',
      'lodash': 'lodash/lodash',
      'alertify.js': 'alertify.js/dist/js/alertify.js',
      'scroll-into-view': 'scroll-into-view/scrollIntoView.js',
      'foreach': 'foreach/index',
      'raf': 'raf/index',
      'performance-now': 'performance-now/lib/performance-now',
      'oidc-client': 'oidc-client/lib/oidc-client',
      'map-factory': 'map-factory/dist/lib/map-factory.js'
  }
});


