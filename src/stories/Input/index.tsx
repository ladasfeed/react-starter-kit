import InputB from "../../Components/InputBuilder";
import Lock from "./assets/Lock.svg";
import EyeClosed from "./assets/EyeClosed.svg";
import Edit from "./assets/Edit.svg";
import Fuck from "./assets/Edit.svg";
// import styles from './index.module.css'
import styles from "./et.module.css";
import { CalendarConstructor } from "../../Components/CalendarCore";

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
