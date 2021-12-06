import React, { FC } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { useToggle } from "../../Hooks/useToggle";
import cn from "classnames";

type propsType = {
  router: any;
  classNames?: {
    container?: string;
    list?: string;
    list__item?: string;
    button?: string;
  };
  title?: string;
  protectedMode?: boolean;
};
export default function ({
  router,
  classNames,
  title,
  protectedMode,
}: propsType) {
  const [isOpen, toggleOpen] = useToggle(false);

  if (process.env.NODE_ENV == "production" && protectedMode) {
    return null;
  }

  return (
    <div className={cn(classNames?.container, styles.container)}>
      {isOpen && (
        <div className={cn(classNames?.list, styles.list)}>
          {router.array.map((item: string) => (
            <Link
              to={item}
              className={cn(classNames?.list__item, styles.list_item)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
      <div
        className={cn(classNames?.button, styles.button)}
        onClick={toggleOpen}
      >
        {title || "Routes"}
      </div>
    </div>
  );
}
