import { mock, mockClear } from "jest-mock-extended"
import { createTestingModule } from "../../lib/create-testing-module"
import { CreateTodoDto } from "./create-todo.dto"
import { TodoController } from "./todo.controller"
import { TodoDto } from "./todo.dto"
import { TodoEntity } from "./todo.entity"
import { TodoModule } from "./todo.module"
import { TodoService } from "./todo.service"

const mockedTodoService = mock<TodoService>()

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

  test("creates a todo item", async () => {
    // Arrange
    const dto = new CreateTodoDto("my cool todo")
    const entity = new TodoEntity(dto.title, 1)
    const expectedResult = new TodoDto(dto.title, 1)

    mockedTodoService.createOne.mockResolvedValue(entity)

    // Act
    const todo = await sut.store(dto)

    // Assert
    expect(todo).toEqual(expectedResult)
  })
})
