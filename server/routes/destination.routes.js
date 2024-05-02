import express from 'express'
import  { getAll, create, createMany, explore, like } from "../controllers/destination.controller.js";

const route = express.Router();

route.get('/', getAll);

route.post("/", create);

route.post('/many', createMany)

route.get('/explore', explore)
route.get('/like', like)

export default route;