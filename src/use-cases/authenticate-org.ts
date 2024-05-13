import { orgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgUseCaseResponse {
  org: Org;
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: orgsRepository) {}

  async execute({ email, password }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findOrgByEmail(email);

    if(!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.password);

    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      org
    }

  }
}