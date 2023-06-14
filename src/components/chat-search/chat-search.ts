import { Block } from "../../services/block";
import template from "./index.pug";
import { Input } from "../text-input";
import { debounce } from "../../utils";
import store from "../../store";
import { userSearch } from "../../sources/user";
import cn from "../../utils/classnames";

interface ChatSearchProps {
  disabled: boolean;
}

export class SearchUsers extends Block<ChatSearchProps> {
  constructor(props: ChatSearchProps) {
    super({ ...props });
  }

  init() {
    this.children.input = new Input({
      type: "text",
      classNames: cn(["text-input", "chatlist-input"]),
      placeholder: "Search",
      name: "search_user",
      disabled: true,
      autocomplete: "off",
      events: {
        input: debounce(this.handleInput, 1000),
      },
    });

    this.children.input.setProps({ disabled: this.props.disabled });
  }

  async handleInput(e: Event) {
    const inputEl = e.target as HTMLInputElement
    if (!inputEl.value) {
      return;
    }

    store.set("searchResult", []);

    const response = await userSearch({ login: inputEl.value });

    store.set("searchResult", response.message);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
