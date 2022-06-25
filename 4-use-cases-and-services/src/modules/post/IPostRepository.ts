import { ICreatePostRequest } from "./ICreatePostRequest"
import { Post } from "./Post"

export interface IPostRepository {
  create(data: ICreatePostRequest): Promise<Post>
}
