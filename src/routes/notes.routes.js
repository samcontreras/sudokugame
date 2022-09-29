import { Router } from "express";
import {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

/**
 * @swagger
 * components:
 * schemas:
 *  note:
 *    type:object
 *  properties:
 *   title:
 *    type: string
 *    description : title note
 *   description:
 *    type: string
 *    description: description note
 * 
 *  required 
 *    - title
 *    - description
 * 
 *  example: 
 *    - name: Excelente juego
 *    - email: juego muy bien desarrollado
 */

/**
 * @swagger
 * api/notes:
 *  get:
 *  sumary: create new note
 *    tag:[note]
 *  requestBody:
 *    required:true
 *  content:
 *    application/json
 *  schema: 
 *    type:object 
 *    $ref:'#/components/schemas/note'
 *  responses:
 *    200;
 *  description: new note created
 */

// Nueva opinion
router.get("/notes/add", isAuthenticated, renderNoteForm);

/**
 * @swagger
 * api/notes:
 *  post:
 *  sumary: note created
 *    tag:[user]
 *  responses:
 *    200;
 *  description: note created
 *  content:
 *    aplication/json
 *      schema:
 *        type: object
 *        items: 
 *          $ref:'#/components/schemas/note'
 */
router.post("/notes/new-note", isAuthenticated, createNewNote);

/** 
 * @swagger
 * /api/notes
 * get:
 *  summary: get all notes
 *  tags:[note]
 * |responses:
 *     200:
 *      description: all notes
 *      content: application/json
 *      schema:
 *        type: array
 *        items:
 *          $ref
 */
// Ver todas la opiniones
router.get("/notes", isAuthenticated, renderNotes);

// Editar opiniones

/** 
 * @swagger
 * /api/note/edit/{id}:
 * get: 
 *  summary: change
 *  tags: [note]
 *  parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *        description: note id
 *      requestedBody:
 *        required: true
 *        content: aplication/json
 *          schema:
 *            type: object 
 *            $ref:'#/components/schemas/note
 *      responses:
 *        200:
 *          description: not changed
 *        404:
 * *          description: note not found
 *      
 */
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);



/**
 * @swagger
 * /api/note/edit/{id}:
 * put: 
 *  summary: change
 *  tags: [note]
 *  parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *        description: note id
 *      requestedBody:
 *        required: true
 *        content: aplication/json
 *          schema:
 *            type: object 
 *            $ref:'#/components/schemas/note
 *      responses:
 *        200:
 *          description: note changed
 *        404:
 * *          description: note not found
 *      
 */
router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// Eliminar opiniones

/**
 * @swagger
 * /api/note/delete/{id}:
 * felete: 
 *  summary: delete note
 *  tags: [note]
 *  parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *        description: note id
 *      responses:
 *        200:
 *          description: note deleted
 *        404:
 * *          description: note not found
 *      
 */
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

export default router;
