import { SwitchBuilder } from "Components/Switch";
import styles from "react-starter-kit/stories/Switch/index.module.css";

export const Switch = SwitchBuilder({
  classNames: {
    input: styles.input,
    circle: styles.circle,
    circleContainer: styles.circleContainer,
    container: styles.container,
  },
});
