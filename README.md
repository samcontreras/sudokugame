Leeme:
Para inciar el server de node ejecutar las siguiente lineas:

npm i
npm run dev # run in development mode
npm start # run in production mode
```

> Para la Base de Datos Mongodb, tomar en cuenta lo siguiente:

This app needs the following environment Variables

- `MONGODB_URI` this is the Mongodb URI string
- `PORT` the server http port for the application
- `NODE_ENV` node environment

# Comandos utiles para instalar las dependencias de forma manual

npm init -y

#depedencias principales 
npm i express connect-flash bcryptjs express-session express-handlebars method-override mongoose passport passport-local

#son depedencias Secundarias por eso va el "-D"
npm i dotenv nodemon handlebars npm-check-updates -D 


git init