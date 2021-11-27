import { IsString } from "class-validator"

export class CreateTodoDto {
  @IsString()
  public title: string

  public constructor(title: string) {
    this.title = title
  }
}
