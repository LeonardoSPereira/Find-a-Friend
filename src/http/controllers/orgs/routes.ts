import { FastifyInstance } from "fastify";
import { createOrg } from "./create-org";
import { authenticateOrg } from "./authenticate";

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/sessions', authenticateOrg)
}