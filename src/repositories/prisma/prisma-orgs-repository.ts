import { Prisma } from "@prisma/client";
import { orgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgsRepository implements orgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data
    })
    
    return org
  }

  async findOrgByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email
      }
    })

    return org
  }

  async findOrgById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id
      }
    })

    return org
  }

  async findOrgsByCity(city: string, state: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
        state
      }
    })

    return orgs
  }
}