import { ContainerModule } from "inversify"
import { TodoController } from "./todo.controller"
import { TodoService } from "./todo.service"

export class TodoModule extends ContainerModule {
  public constructor() {
    super((bind) => {
      bind(TodoController).toSelf()
      bind(TodoService).toSelf()
    })
  }
}
