import { CheckInputBuilder } from "Components/CheckInputCore";
import RadioUnchecked from "react-starter-kit/stories/CheckInput/assets/RadioUnchecked.svg";
import CheckBox_unchecked from "react-starter-kit/stories/CheckInput/assets/CheckBox_unchecked.svg";
import CheckBox_checked from "react-starter-kit/stories/CheckInput/assets/CheckBox_checked.svg";
import RadioChecked from "react-starter-kit/stories/CheckInput/assets/RadioChecked.svg";
import styles from "react-starter-kit/stories/CheckInput/index.module.css";

export const CheckInput = CheckInputBuilder<"default", {}>({
  classNames: {
    input: styles.input,
  },
  icons: {
    radio: {
      checked: RadioChecked,
      unchecked: RadioUnchecked,
    },
    checkbox: {
      checked: CheckBox_checked,
      unchecked: CheckBox_unchecked,
    },
  },
});
