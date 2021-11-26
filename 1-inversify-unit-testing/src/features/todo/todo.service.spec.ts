import { mockClear, mockDeep } from "jest-mock-extended"

import { PrismaService } from "../../prisma.service"
import { createTestingModule } from "../../lib/create-testing-module"
import { CreateTodoDto } from "./create-todo.dto"
import { TodoEntity } from "./todo.entity"
import { TodoModule } from "./todo.module"
import { TodoService } from "./todo.service"

const mockedPrismaService = mockDeep<PrismaService>()

describe("todo-service", () => {
  let sut: TodoService

  beforeEach(() => {
    const moduleRef = createTestingModule(TodoModule)

    moduleRef.bind(PrismaService).toConstantValue(mockedPrismaService)

    sut = moduleRef.get(TodoService)

    mockClear(mockedPrismaService)
  })

  test("is defined", () => {
    expect(sut).toBeDefined()
  })

  describe("createOne()", () => {
    test("it creates a todo item", async () => {
      const dto = new CreateTodoDto("title")
      const expectedResult = new TodoEntity(dto.title, 1)

      mockedPrismaService.todo.create.mockResolvedValue(expectedResult)

      const todoItem = await sut.createOne(dto)

      expect(todoItem).toEqual(expectedResult)
    })
  })
})
