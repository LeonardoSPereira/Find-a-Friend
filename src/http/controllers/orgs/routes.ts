import { FastifyInstance } from "fastify";
import { createOrg } from "./create-org";

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
}