import "reflect-metadata"
import { Container } from "inversify"
import { TodoModule } from "./features/todo/todo.module"
import { TodoController } from "./features/todo/todo.controller"
import { CreateTodoDto } from "./features/todo/create-todo.dto"
import { PrismaService } from "./prisma.service"
import express from "express"

async function bootstrap() {
  console.clear()
  const container = new Container({
    skipBaseClassChecks: true,
  })

  container.load(new TodoModule())

  container.bind(PrismaService).to(PrismaService)

  const prisma = container.get(PrismaService)

  await prisma.$connect()

  const app = express()

  app.use(express.json())

  const todoController = container.get(TodoController)

  app.post("/todos", todoController.store.bind(todoController))

  app.listen(5000)
}

bootstrap()
