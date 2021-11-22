import {SwitchBuilder} from "../../Components/Switch";
import styles from './index.module.css'

export const Switch = SwitchBuilder({
    classNames: {
        input: styles.input,
        circle: styles.circle,
        circleContainer: styles.circleContainer,
        container: styles.container
    }
})