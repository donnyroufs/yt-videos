import express from "express"
import { CreatePostUseCase } from "./modules/post/CreatePostUseCase"

import { FakePostRepositoryImpl } from "./modules/post/FakePostRepositoryImpl"
import { PostController } from "./modules/post/PostController"

export async function bootstrap() {
  const postRepository = new FakePostRepositoryImpl()
  const createPostUseCase = new CreatePostUseCase(postRepository)
  const postController = new PostController(createPostUseCase)

  const app = express()

  app.use(express.json())

  app.post("/post", postController.create.bind(postController))

  app.listen(5000, () => console.log("server is up and running"))
}

bootstrap()
