import app from './app';

app.listen(app.get("port"), () => {
   console.log('Application started successfully on port: ' + port);
})
