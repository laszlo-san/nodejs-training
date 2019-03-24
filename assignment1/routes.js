const handler = (req, res) => {

  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html><head><title>DUMMY_SERVER</title></head><body><h1>Hello in the page</h1></body></html>')
    return res.end();
  }

  if (url === '/users') {
    res.write('<html><head><title>DUMMY_SERVER</title></head>');
    res.write('<body><ul><li>User1</li><li>User 2</li><li>Another User</li></ul></body>')
    res.write('</html');
    return res.end();
  }


}

module.exports = handler;