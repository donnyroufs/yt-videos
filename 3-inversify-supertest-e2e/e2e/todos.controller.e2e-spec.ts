import { Server } from "http"
import supertest from "supertest"

import { bootstrap } from "../src/bootstrap"
import { CreateTodoDto } from "../src/features/todo/create-todo.dto"
import { PrismaService } from "../src/prisma.service"

describe("todo-controller", () => {
  let server: Server
  let prismaService: PrismaService

  beforeAll(async () => {
    const ref = await bootstrap()

    server = ref.server
    prismaService = ref.container.get(PrismaService)
  })

  describe("store()", () => {
    test("returns a 400 when invalid dto", async () => {
      const res = await supertest(server).post("/todos").send({
        title: 1,
      })

      expect(res.statusCode).toBe(400)
    })

    test("returns a 201 when successful", async () => {
      const dto = new CreateTodoDto("testing title")
      const res = await supertest(server).post("/todos").send(dto)

      expect(res.statusCode).toBe(201)
      expect(res.body.title).toBe(dto.title)
    })
  })

  afterAll(async () => {
    await server.close()
    await prismaService.$disconnect()
  })
})
