const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
//const { createProxyMiddleware } = require('http-proxy-middleware');

// https://medium.com/codex/running-next-js-on-azure-app-services-84f707af761d
// Your app will get the Azure port from the process.enc.PORT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Azure 로 서비스할 때 process.env.PORT 를 사용해야 한다.
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on port ${port}`);
    });
});
