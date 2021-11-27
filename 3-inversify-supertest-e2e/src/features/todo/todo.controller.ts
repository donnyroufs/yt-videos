import { Body, HttpCode, Post } from "routing-controllers"

import { TodoService } from "./todo.service"
import { Controller } from "../../lib/controller.decorator"
import { TodoDto } from "./todo.dto"
import { CreateTodoDto } from "./create-todo.dto"

@Controller("/todos")
export class TodoController {
  public constructor(private readonly _todoService: TodoService) {}

  @Post()
  @HttpCode(201)
  public async store(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this._todoService.createOne(createTodoDto)

    return new TodoDto(
      createdTodo.title,
      createdTodo.id,
      createdTodo.isCompleted
    )
  }
}
