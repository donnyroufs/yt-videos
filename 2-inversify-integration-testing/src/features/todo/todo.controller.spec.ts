import { mock, mockClear, mockDeep } from "jest-mock-extended"
import { Response, Request } from "express"

import { createTestingModule } from "../../lib/create-testing-module"
import { CreateTodoDto } from "./create-todo.dto"
import { TodoController } from "./todo.controller"
import { TodoDto } from "./todo.dto"
import { TodoEntity } from "./todo.entity"
import { TodoModule } from "./todo.module"
import { TodoService } from "./todo.service"
import { PrismaService } from "src/prisma.service"

const mockedTodoService = mock<TodoService>()

const mockedResponse = mock<Response>()
const mockedRequest = mock<Request>()
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

  describe("createOne()", () => {
    test("creates a todo item", async () => {
      // Arrange
      const dto = new CreateTodoDto("my cool todo")
      const entity = new TodoEntity(dto.title, 1)
      const expectedResult = new TodoDto(dto.title, 1)

      mockedTodoService.createOne.mockResolvedValue(entity)
      mockedRequest.body = dto
      mockedResponse.json.mockImplementation((data) => data)

      // Act
      const todo = await sut.store(mockedRequest, mockedResponse)

      // Assert
      expect(todo).toEqual(expectedResult)
    })

    test("returns a todo.dto", async () => {
      // Arrange
      const dto = new CreateTodoDto("my cool todo")
      const entity = new TodoEntity(dto.title, 1)

      mockedTodoService.createOne.mockResolvedValue(entity)
      mockedRequest.body = dto
      mockedResponse.json.mockImplementation((data) => data)

      // Act
      const todo = await sut.store(mockedRequest, mockedResponse)

      expect(todo).toBeInstanceOf(TodoDto)
    })

    test("(INTEGRATION) returns a todo.dto", async () => {
      const service = new TodoService(mockedPrismaService)
      const controller = new TodoController(service)

      const dto = new CreateTodoDto("my cool todo")
      const entity = new TodoEntity(dto.title, 1)

      mockedRequest.body = dto
      mockedResponse.json.mockImplementation((data) => data)
      mockedPrismaService.todo.create.mockResolvedValue(entity)

      // Act
      const result = await controller.store(mockedRequest, mockedResponse)

      expect(result).toBeInstanceOf(TodoDto)
    })
  })
})
