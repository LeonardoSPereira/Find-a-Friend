import { FastifyInstance } from "fastify";
import { createOrg } from "./create-org";
import { authenticateOrg } from "./authenticate";
import { refreshToken } from "./refresh-token";

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/sessions', authenticateOrg)

  app.patch('/token/refresh', refreshToken)
}