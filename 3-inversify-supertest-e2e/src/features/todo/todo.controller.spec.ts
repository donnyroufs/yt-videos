import { mock, mockClear, mockDeep } from "jest-mock-extended"

import { createTestingModule } from "../../lib/create-testing-module"
import { CreateTodoDto } from "./create-todo.dto"
import { TodoController } from "./todo.controller"
import { TodoDto } from "./todo.dto"
import { TodoEntity } from "./todo.entity"
import { TodoModule } from "./todo.module"
import { TodoService } from "./todo.service"
import { PrismaService } from "src/prisma.service"

const mockedTodoService = mock<TodoService>()

const mockedPrismaService = mockDeep<PrismaService>()

describe("todo-controller", () => {
  let sut: TodoController

  beforeEach(() => {
    const moduleRef = createTestingModule(TodoModule)

    moduleRef.rebind(TodoService).toConstantValue(mockedTodoService)

    sut = moduleRef.get(TodoController)

    mockClear(mockedTodoService)
  })

  test("is defined", () => {
    expect(sut).toBeDefined()
  })

  describe("store()", () => {
    test("creates a todo item", async () => {
      const dto = new CreateTodoDto("my cool todo")
      const entity = new TodoEntity(dto.title, 1)
      const expectedResult = new TodoDto(dto.title, 1)

      mockedTodoService.createOne.mockResolvedValue(entity)

      const todo = await sut.store(dto)

      expect(todo).toEqual(expectedResult)
    })

    test("returns a todo.dto", async () => {
      // Arrange
      const dto = new CreateTodoDto("my cool todo")
      const entity = new TodoEntity(dto.title, 1)

      mockedTodoService.createOne.mockResolvedValue(entity)

      // Act
      const todo = await sut.store(dto)

      expect(todo).toBeInstanceOf(TodoDto)
    })

    test("(INTEGRATION) returns a todo.dto", async () => {
      const service = new TodoService(mockedPrismaService)
      const controller = new TodoController(service)

      const dto = new CreateTodoDto("my cool todo")
      const entity = new TodoEntity(dto.title, 1)

      mockedPrismaService.todo.create.mockResolvedValue(entity)

      const result = await controller.store(dto)

      expect(result).toBeInstanceOf(TodoDto)
    })
  })
})
