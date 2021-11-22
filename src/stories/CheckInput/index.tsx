import {CheckInputBuilder} from "../../Components/CheckInputCore";
import RadioUnchecked from './assets/RadioUnchecked.svg'
import CheckBox_unchecked from './assets/CheckBox_unchecked.svg'
import CheckBox_checked from './assets/CheckBox_checked.svg'
import RadioChecked from './assets/RadioChecked.svg'
import styles from './index.module.css'

export const CheckInput = CheckInputBuilder<'default', {}>({
    classNames: {
        input: styles.input
    },
    icons: {
        radio: {
            checked: RadioChecked,
            unchecked: RadioUnchecked,
        },
        checkbox: {
            checked: CheckBox_checked,
            unchecked: CheckBox_unchecked,
        }
    }
})