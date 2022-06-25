import { IUseCase } from "../shared"

import { CreatePostResponse } from "./CreatePostResponse"
import { ICreatePostRequest } from "./ICreatePostRequest"
import { IPostRepository } from "./IPostRepository"

export class CreatePostUseCase
  implements IUseCase<ICreatePostRequest, CreatePostResponse>
{
  private readonly _postRepository: IPostRepository

  public constructor(postRepository: IPostRepository) {
    this._postRepository = postRepository
  }

  public async execute(
    request: ICreatePostRequest
  ): Promise<CreatePostResponse> {
    const post = await this._postRepository.create(request)

    return CreatePostResponse.from(post)
  }
}
