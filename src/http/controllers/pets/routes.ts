import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { createPet } from "./create-pet";
import { getPet } from "./get-pet";


export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', getPet)

  app.post('/pets', { 'onRequest': [verifyJwt]} , createPet)
}