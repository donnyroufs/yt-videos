export class Post {
  public readonly id: string
  public readonly title: string
  public readonly content: string

  public constructor(id: string, title: string, content: string) {
    this.id = id
    this.title = title
    this.content = content
  }
}
