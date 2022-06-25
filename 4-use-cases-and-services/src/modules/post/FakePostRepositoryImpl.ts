import * as crypto from "crypto"

import { ICreatePostRequest } from "./ICreatePostRequest"
import { IPostRepository } from "./IPostRepository"
import { Post } from "./Post"

export class FakePostRepositoryImpl implements IPostRepository {
  public async create(data: ICreatePostRequest): Promise<Post> {
    return new Post(crypto.randomUUID(), data.title, data.content)
  }
}
