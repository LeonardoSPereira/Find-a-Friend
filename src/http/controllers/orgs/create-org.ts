import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.number().refine((value) => {
      const whatsappAsString = String(value);
      return whatsappAsString.length === 11;
    }),
    zip_code: z.number().refine((value) => {
      const zipCodeAsString = String(value);
      return zipCodeAsString.length === 8;
    }),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const data = createOrgBodySchema.parse(request.body);

  await prisma.org.create({
    data
  })

  return reply.status(201).send({ message: 'Org created successfully.' })
}