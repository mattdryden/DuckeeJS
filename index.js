const { exec } = require('child_process');
const express = require('express');

exec('curl --unix-socket /var/run/docker.sock http://localhost/containers/json', (err, stdout, stderr) => {
  if (err) {
    return;
  }

  const containers = JSON.parse(stdout);

  let output = [];

  containers.forEach(container => {
    const name = container.Image.split('/').pop();
    const status = container.State;
    const port = container.Ports;
    const uptime = container.Status;
    output.push(`<a href="http://192.168.1.187:${port}">${name} (${uptime})</a><br />\n`);

  });

  const app = express();

  app.get('/', function (req, res) {
      res.send(output.join(''));
    })
    
  app.listen(8080);

});

