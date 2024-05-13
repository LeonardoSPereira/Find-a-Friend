import { beforeEach, describe, expect, it } from 'vitest'
import { createOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Org', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    const passwordHash = await hash('password', 6)

    await orgsRepository.create({
      name: 'Org Name',
      author_name: 'Author Name',
      email: 'org@email.com',
      password: passwordHash,
      whatsapp: 11912345678,
      zip_code: 12345678,
      state: 'State',
      city: 'City',
      neighborhood: 'Neighborhood',
      street: 'Street',
      latitude: -85,
      longitude: 123
    })

    const response = await sut.execute({
      email: 'org@email.com',
      password: 'password',
    })

    expect(response.org).toEqual(expect.objectContaining({
      id: expect.any(String),
    }))
  })

  it("shouldn't be able to authenticate with wrong email", async () => {
    await orgsRepository.create({
      name: 'Org Name',
      author_name: 'Author Name',
      email: 'org@email.com',
      password: 'password',
      whatsapp: 11912345678,
      zip_code: 12345678,
      state: 'State',
      city: 'City',
      neighborhood: 'Neighborhood',
      street: 'Street',
      latitude: -85,
      longitude: 123
    })

    await expect(() => 
      sut.execute({
        email: 'wrong-email@email.com',
        password: 'password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("shouldn't be able to authenticate with wrong password", async () => {
    const passwordHash = await hash('password', 6)

    await orgsRepository.create({
      name: 'Org Name',
      author_name: 'Author Name',
      email: 'org@email.com',
      password: passwordHash,
      whatsapp: 11912345678,
      zip_code: 12345678,
      state: 'State',
      city: 'City',
      neighborhood: 'Neighborhood',
      street: 'Street',
      latitude: -85,
      longitude: 123
    })

    await expect(() => 
      sut.execute({
        email: 'org@email.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})