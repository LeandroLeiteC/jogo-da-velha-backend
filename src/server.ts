import app from './app'

const port = process.env.PORT || 8080;
app.server.listen(port, () => {
  console.log('Express server listening on port', port)
});
