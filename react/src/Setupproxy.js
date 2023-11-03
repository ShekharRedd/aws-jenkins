const { createProxyMiddleware } = require('http-proxy-middleware');
let apiUrl1 = process.env.REACT_APP_API_URL;
console.log(apiUrl1);
let apiUrl = `http://${apiUrl1}:5003`;

module.exports = function (app) {
  app.use(
    '/api/view_data',
    createProxyMiddleware({
      target: `${apiUrl}/api/view_data`,
      changeOrigin: true,
    })
  );

  app.use(
    '/api/add_data',
    createProxyMiddleware({
      target: `${apiUrl}/api/add_data`,
      changeOrigin: true,
    })
  );

  app.use(
    'api/delete_data',
    createProxyMiddleware({
      target: `${apiUrl}/api/delete_data`,
      changeOrigin: true,
    })
  );

  app.use(
    'api/submit_data',
    createProxyMiddleware({
      target: `${apiUrl}/api/submit_data`,
      changeOrigin: true,
    })
  );
};
