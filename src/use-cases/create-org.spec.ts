import { beforeEach, describe, expect, it } from 'vitest'
import { createOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

describe('Create Org', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: createOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new createOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const response = await sut.execute({
      id: 'org-1',
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

    expect(response.org).toEqual(expect.objectContaining({
      id: 'org-1',
    }))
  })
})