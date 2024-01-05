import { Block } from '../../services/block';
import template from "./index.pug";

interface IError {
    [key: string]: any
  }


export class NotFound extends Block {
  constructor(props: IError ) {
    super({ type: "span", ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
