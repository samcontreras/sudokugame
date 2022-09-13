import app from "./app.js";
import { createAdminUser } from "./libs/createUser.js";
import "./database.js";
import _ from 'lodash';

console.log(_.uniq([1, 1, 3])); // 👉️ [1, 3]

async function main() {
  await createAdminUser();
  app.listen(app.get("port"));

  console.log("Server on port", app.get("port"));
  console.log("Environment:", process.env.NODE_ENV);
}

main();
