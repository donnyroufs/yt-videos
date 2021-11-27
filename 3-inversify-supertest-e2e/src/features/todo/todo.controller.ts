import { injectable } from "inversify"
import { Request, Response } from "express"

import { TodoDto } from "./todo.dto"
import { TodoService } from "./todo.service"

@injectable()
export class TodoController {
  public constructor(private readonly _todoService: TodoService) {}

  public async store(req: Request, res: Response) {
    const createdTodo = await this._todoService.createOne(req.body)

    const dto = new TodoDto(
      createdTodo.title,
      createdTodo.id,
      createdTodo.isCompleted
    )

    return res.json(dto)
  }
}
