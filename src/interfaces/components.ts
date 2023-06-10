export interface InputProps {
  type?: string;
  classNames: string[];
  placeholder?: string;
  disabled?: boolean;
  autocomplete?: "off" | "on";
  attributes?: Record<string, string>;
  events?: {
    click?: () => void;
    focus?: () => void;
    blur?: (e: Event) => void;
    input?: (e: Event) => void;
  };
  name: string;
}
export interface FormLoginProps {
  type?: string;
  label: string;
  classNames?: string[];
  events?: {
    submit: () => void;
  };
}
export type Indexed<T = any> = {
  [key in string]: T;
};
