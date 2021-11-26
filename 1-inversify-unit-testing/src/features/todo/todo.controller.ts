import { injectable } from "inversify"

import { CreateTodoDto } from "./create-todo.dto"
import { TodoDto } from "./todo.dto"
import { TodoService } from "./todo.service"

@injectable()
export class TodoController {
  public constructor(private readonly _todoService: TodoService) {}

  public async store(dto: CreateTodoDto) {
    return this._todoService.createOne(dto)
  }
}
