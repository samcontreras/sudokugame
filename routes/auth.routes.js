import { Router } from "express";
import {
  renderSignUpForm,
  signup,
  renderSigninForm,
  signin,
  logout,
} from "../controllers/auth.controllers.js";

const router = Router();

// Routes


/**
 * @swagger
 * components:
 * schemas:
 *  user:
 *    type:object
 *  properties:
 *   name:
 *    type: string
 *    description : user name
 *   email:
 *    type: string
 *    description: user mail
 *   password: string
 * 
 *  required 
 *    - name
 *    - email
 * 
 *  example: 
 *    - name: Juan
 *    - email: juan1@mail.com
 */

/**
 * @swagger
 * api/auth:
 *  get:
 *  sumary: create new user
 *    tag:[user]
 *  requestBody:
 *    required:true
 *  content:
 *    application/json
 *  schema: 
 *    type:object 
 *    $ref:'#/components/schemas/user'
 *  responses:
 *    200;
 *  description: new user created
 */
router.get("/auth/signup", renderSignUpForm);


/**
 * @swagger
 * api/auth:
 *  post:
 *  sumary: new user
 *    tag:[user]
 *  responses:
 *    200;
 *  description: user created
 *  content:
 *    aplication/json
 *      schema:
 *        type: object
 *        items: 
 *          $ref:'#/components/schemas/user'
 */
router.post("/auth/signup", signup);

/**
 * @swagger
 * api/auth:
 *  get:
 *  sumary: user
 *    tag:[user]
 *  responses:
 *    200;
 *  description: return user
 *  content:
 *    aplication/json
 *      schema:
 *        type: object
 *          $ref:'#/components/schemas/user'
 */

router.get("/auth/signin", renderSigninForm);


/**
 * @swagger
 * api/auth/id:
 *  post:
 *  sumary: user
 *    tag:[user]
 *  parameters:
 *    -in: path
 *    email:
 *    schema:
 *      type:string
 *      required: true
 *      description: the user id
 *  responses:
 *    200;
 *  description: sing up
 *  content:
 *    aplication/json
 *      schema:
 *        type: object
 *          $ref:'#/components/schemas/user'
 */

router.post("/auth/signin", signin);


/**
 * @swagger
 api/auth/id:
 *  get:
 *  sumary: user
 *    tag:[user]
 *  parameters:
 *    -in: path
 *    email:
 *    schema:
 *      type:string
 *      required: true
 *      description: the user id
 *  responses:
 *    200;
 *  description: log out 
 *  content:
 *    aplication/json
 *      schema:
 *        type: object
 *          $ref:'#/components/schemas/user'
 */
router.get("/auth/logout", logout);

export default router;
