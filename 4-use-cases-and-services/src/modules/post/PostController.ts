import { Request, Response } from "express"
import { CreatePostUseCase } from "./CreatePostUseCase"

export class PostController {
  private readonly _createPostUseCase: CreatePostUseCase

  public constructor(postService: CreatePostUseCase) {
    this._createPostUseCase = postService
  }

  public async create(req: Request, res: Response) {
    const response = await this._createPostUseCase.execute(req.body)

    return res.status(201).json({
      data: response,
    })
  }
}
