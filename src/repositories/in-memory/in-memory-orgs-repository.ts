import { Decimal } from "@prisma/client/runtime/library";
import { orgsRepository } from "../orgs-repository";
import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements orgsRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const createdOrg = {
      id: data.id ?? randomUUID(),
      name: data.name,
      author_name: data.author_name,
      email: data.email,  
      password: data.password,
      whatsapp: data.whatsapp,
      zip_code: data.zip_code,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString())
    }
    
    this.orgs.push(createdOrg)

    return createdOrg
  }

  async findOrgByEmail(email: string) {
    const org = this.orgs.find(org => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findOrgById(id: string) {
    const org = this.orgs.find(org => org.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findOrgsByCity(city: string, state: string) {
    const orgs = this.orgs.filter(org => org.city === city && org.state === state)

    if (!orgs) {
      return null
    }

    return orgs
  }
}