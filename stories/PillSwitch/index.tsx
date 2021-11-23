import React from "react";
import styles from "react-starter-kit/stories/PillSwitch/index.module.css";
import { CheckInputBuilder } from "Components/CheckInputCore";

type payloadType = {
  text: string;
};
export const PillSwitch = CheckInputBuilder<"custom", payloadType>({
  classNames: {
    input: styles.input,
  },
  customElement: {
    component: ({ text }) => {
      return <div className={styles.pill}>{text}</div>;
    },
  },
}).group;
