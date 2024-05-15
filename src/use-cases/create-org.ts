import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { orgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

interface CreateOrgUseCaseRequest {
  id?: string
  name: string
  author_name: string
  email: string
  password: string
  whatsapp: number
  zip_code: number
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgRepository: orgsRepository){}

  async execute(data: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgAlreadyExists = await this.orgRepository.findOrgByEmail(data.email);
  
    if(orgAlreadyExists) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(data.password, 6);

    const org = await this.orgRepository.create({
      id: data.id,
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      password: passwordHash,
      whatsapp: data.whatsapp,
      zip_code: data.zip_code,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: data.latitude,
      longitude: data.longitude
    })

    return {
      org
    }
  }
}