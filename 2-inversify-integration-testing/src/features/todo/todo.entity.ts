export class TodoEntity {
  public constructor(
    public readonly title: string,
    public readonly id: number,
    public readonly isCompleted = false
  ) {}
}
