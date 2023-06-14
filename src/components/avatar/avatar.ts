import { Block } from "../../services/block";
import { getUser } from "../../sources/auth";
import { setUserAvatar } from "../../sources/user";
import store from "../../store";
import cn from "../../utils/classnames";
import { Input } from "../text-input";
import template from "./index.pug";

type IAvatarProps = Record<string, any>
export class Avatar extends Block {
  constructor(props: IAvatarProps) {
    super({ type: "img", ...props });
  }

  init() {
    this.children.input = new Input({
      type: "file",
      classNames: "input",
      name: "avatar",
      events: {
        input: async (e: Event) => {
        
          const inputElement = e.target as HTMLInputElement;
          const file: File | undefined = inputElement.files?.[0];
          const allowedMimeTypes = ["image/png", "image/jpg"];

          if (file.size > 1_000_000) {
            (this.children.input as Input).setValue(null);
            new Notification("Upload file under 1mb");
            return;
          }

          if (!allowedMimeTypes.includes(file.type)) {
            (this.children.input as Input).setValue(null);
            new Notification("allowed jpg or png files");
            return;
          }

          const formData = new FormData();
          formData.append("avatar", file);

          try {
            await setUserAvatar(formData);

            const response = await getUser();

            store.set("userData", response);
          } catch (e) {
            new Notification(e);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
