import InputB from "Components/InputBuilder";
import Lock from "react-starter-kit/stories/Input/assets/Lock.svg";
import EyeClosed from "react-starter-kit/stories/Input/assets/EyeClosed.svg";
import Edit from "react-starter-kit/stories/Input/assets/Edit.svg";
import Fuck from "react-starter-kit/stories/Input/assets/Edit.svg";
// import styles from './index.module.css'
import styles from "react-starter-kit/stories/Input/et.module.css";
import { CalendarConstructor } from "Components/CalendarCore";

export const Input = InputB.InputTextBuilder({
  classNames: {
    elements: {
      input: styles.input,
      label: styles.label,
      error: styles.error,
    },
    state: {
      // error: styles.error
    },
  },
  icons: {
    lock: Lock,
    edit: Edit,
    eyeClosed: EyeClosed,
  },
});

export const DatePicker = CalendarConstructor({
  Input: Input.CalendarInput,
  icons: {
    calendar: Edit,
  },
});
