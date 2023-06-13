import { Block } from "../../services/block";
import { getUser } from "../../sources/auth";
import { setUserAvatar } from "../../sources/user";
import store from "../../store";
import { collectData } from "../../utils";
import { Input } from "../text-input";
import template from "./index.pug";

export class Avatar extends Block {
  constructor(props) {
    super({ type: "img", ...props });
  }

  init() {
    this.children.input = new Input({
      type: "file",
      classNames: ["input"],
      name: "avatar",
      events: {
        input: async (e: Event) => {
          const file = e.target.files[0];
          const allowedMimeTypes = ["image/png", "image/jpg"];

          if (file.size > 1_000_000) {
            this.children.input.setValue(null);
            new Notification("Upload file under 1mb");
            return;
          }

          if (!allowedMimeTypes.includes(file.type)) {
            this.children.input.setValue(null);
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
    console.log(this.props);
    return this.compile(template, { ...this.props });
  }
}
