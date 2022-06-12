import express from 'express';
// @ts-ignore
import favicon from 'express-favicon';
import path from 'path';

const port = process.env.PORT || 8080;

const app = express();
app.use(favicon(__dirname + '/public/favicon.png'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port);
