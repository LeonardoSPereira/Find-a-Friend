import { Org, Prisma } from "@prisma/client";

export interface orgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findOrgByEmail(email: string): Promise<Org | null>;
}