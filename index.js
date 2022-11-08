import app from "./app.js";
import { createAdminUser } from "./libs/createUser.js";
import "./database.js";
import express from "express";
import indexRoutes from "./routes/index.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import userRoutes from "./routes/auth.routes.js";
import "./config/passport.js";
//middleware


//swagger

import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node MongoDB API",
            version: "1.0.0"
        },
        servers: [{
            url: "http://localhost:4200"
        }]
    },
    apis: [`${path.join(__dirname,"./routes/*.js",import.meta.url)}`],
}
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));



async function main() {
    await createAdminUser();
    app.listen(app.get("port"));

    console.log("Server on port", app.get("port"));
    console.log("Environment:", process.env.NODE_ENV);
}

main();