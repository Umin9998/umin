const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { createProxyMiddleware } = require('http-proxy-middleware');

// https://medium.com/codex/running-next-js-on-azure-app-services-84f707af761d
// Your app will get the Azure port from the process.enc.PORT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Azure 로 서비스할 때 process.env.PORT 를 사용해야 한다.
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(
      '/api',
      createProxyMiddleware({
        //target: `${process.env.REACT_APP_API_HOST}`,
        target: 'https://careerdesignplatform.co.kr/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      })
    );

    server.use(
      '/api_across',
      createProxyMiddleware({
        //target: `${process.env.REACT_APP_API_HOST}`,
        target: 'https://microauth.azurewebsites.net/api',
        // https://localhost:7002/api/auth/isRegistered?userName=cass4
        //target: "https://localhost:7002/api",
        changeOrigin: true,
        pathRewrite: {
          '^/api_across': '/'
        }
      })
    );

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
