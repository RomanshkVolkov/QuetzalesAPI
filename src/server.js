import app from './app';

const port = app.get("port");

app.listen(port, () => {
   console.log('Application started successfully on port: ' + port);
})
