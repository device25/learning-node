const url = require('url');

const calculate = {
  sum: (x, y) => parseInt(x, 10) + parseInt(y, 10),
  difference: (x, y) => parseInt(x, 10) - parseInt(y, 10),
  multiply: (x, y) => parseInt(x, 10) * parseInt(y, 10),
  divide: (x, y) => parseInt(x, 10) / parseInt(y, 10),
};

const requestListener = (req, res) => {
  console.log(`${req.method} ${req.url}`);
  const { query } = url.parse(req.url, true);
  const { pathname } = url.parse(req.url);

  switch (req.method) {
    case ('GET'): {
      if (!query.a || !query.b) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
      }

      switch (pathname) {
        case ('/sum'): {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ sum: calculate.sum(query.a, query.b) }));
          break;
        }
        case ('/difference'): {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ difference: calculate.difference(query.a, query.b) }));
          break;
        }
        case ('/multiply'): {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ multiply: calculate.multiply(query.a, query.b) }));
          break;
        }
        case ('/divide'): {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ divide: calculate.divide(query.a, query.b) }));
          break;
        }
        default: {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end();
        }
      }
      break;
    }
    case ('POST'): {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      req.on('end', () => {
        body = JSON.parse(body);

        if (!body.b) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Bad Request');
        }

        switch (pathname) {
          case ('/sum'): {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ sum: calculate.sum(body.a, body.b) }));
            break;
          }
          case ('/difference'): {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ difference: calculate.difference(body.a, body.b) }));
            break;
          }
          case ('/multiply'): {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ multiply: calculate.multiply(body.a, body.b) }));
            break;
          }
          case ('/divide'): {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ divide: calculate.divide(body.a, body.b) }));
            break;
          }
          default: {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end();
          }
        }
      });
      break;
    }
    default: {
      res.writeHead(404);
      res.end();
    }
  }
};

module.exports = requestListener;
