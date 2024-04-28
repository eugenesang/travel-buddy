import express from 'express'
import  { getAll, create, createMany } from "../controllers/destination.controller.js";

const route = express.Router();

route.get('/', getAll);

route.post("/", create);

route.post('/many', createMany)

export default route;