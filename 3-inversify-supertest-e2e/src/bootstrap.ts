import "reflect-metadata"

import { Container } from "inversify"
import { createExpressServer, useContainer } from "routing-controllers"

import { TodoModule } from "./features/todo/todo.module"
import { PrismaService } from "./prisma.service"
import { Server } from "http"

export type BootstrapReturnType = {
  server: Server
  container: Container
}

export async function bootstrap(): Promise<BootstrapReturnType> {
  console.clear()
  const container = new Container({
    skipBaseClassChecks: true,
  })

  container.load(new TodoModule())
  container.bind(PrismaService).to(PrismaService).inSingletonScope()

  const prisma = container.get(PrismaService)

  await prisma.$connect()

  useContainer(container)

  const app = createExpressServer({
    validation: {
      whitelist: true,
    },
  })

  const server = app.listen(5000)

  return {
    server,
    container,
  }
}

if (process.env.NODE_ENV !== "test") {
  bootstrap()
}
