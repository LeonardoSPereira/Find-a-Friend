import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { compare } from 'bcryptjs'

describe('Create Org', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: CreateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const response = await sut.execute({
      id: 'org-1',
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

    expect(response.org).toEqual(expect.objectContaining({
      id: 'org-1',
    }))
  })

  it("shouldn't be able to create an org with an email already in use", async () => {
    await orgsRepository.create({
      name: 'Org Name',
      author_name: 'Author Name',
      email: 'org@email.com',
      password: 'password',
      whatsapp: 123456789,
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
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it("should hash org's password upon registration", async () => {
    const { org } = await sut.execute({
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

    const isPasswordCorrectlyHashed = await compare('password', org.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  
})