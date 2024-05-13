import { Org, Prisma } from "@prisma/client";

export interface orgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findOrgByEmail(email: string): Promise<Org | null>;
  findOrgById(id: string): Promise<Org | null>;
  findOrgsByCity(city: string, state: string): Promise<Org[] | null>;
}