import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "../authenticate-org";

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository)

  return authenticateOrgUseCase
}