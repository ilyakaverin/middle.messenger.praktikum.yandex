import { Block } from "./block";
import { render, isEqual } from "../utils";

export class Route {
  private block: Block | null = null;

  constructor(
    private readonly pathname: string,
    private readonly blockClass: typeof Block,
    private readonly query: string
  ) {}

  public leave() {
    this.block = null;
  }

  public match(pathname: string) {
    return isEqual(pathname, this.pathname as any);
  }

  public render() {
    if (!this.block) {
      this.block = new this.blockClass({});

      render(this.query, this.block);
    }
  }

  public getPath() {
    return this.pathname;
  }
}
