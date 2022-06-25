import { Post } from "./Post"

export class CreatePostResponse {
  public readonly id: string
  public readonly title: string
  public readonly content: string

  protected constructor(id: string, title: string, content: string) {
    this.id = id
    this.title = title
    this.content = content
  }

  public static from(post: Post): CreatePostResponse {
    return new CreatePostResponse(post.id, post.title, post.content)
  }
}
