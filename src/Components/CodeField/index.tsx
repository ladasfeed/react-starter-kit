import React, { FC } from "react";
import styles from "./index.module.css";
import cn from "classnames";
import { Control, UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import { useCodeFieldLogic } from "./useCodeFieldLogic";

export type CodeFieldPropsType = {
  // style
  className?: string;
  /** container, container--error, fields, input_container, input, error, timer,  */
  classNamePrefix?: string;

  /** length of code. D = 4 */
  length?: number | string;
  /** an error */
  error?: string;
  /** timeout seconds for one attempt. D = 60 */
  timeout?: number;
  /** count of total attempts. D = 5 */
  attempts?: number;

  // callbacks
  /** method for resend code */
  resendCode?: () => void;

  // components
  Components?: {
    Timer?: FC<{
      seconds: number;
      resend?(): void;
      currentAttempts: number;
      totalAttempts: number;
      printTimer(): string;
      hasAttempts: boolean;
      loading?: boolean;
    }>;
  };

  //state
  loading?: boolean;

  // hook form
  setValue: UseFormSetValue<any>;
  control: Control<any>;
  clearErrors: UseFormClearErrors<any>;
  name: string;
};

export const CodeField: React.FC<CodeFieldPropsType> = ({
  error,
  className,
  length = 4,
  timeout = 60,
  attempts = 5,
  setValue,
  classNamePrefix,
  control,
  resendCode,
  name,
  Components,
  clearErrors,
  loading,
}) => {
  /* state */

  const {
    fieldsArray,
    arrayOfInputs,
    onKeyDownHandler,
    onChangeHandler,
    onClickHandler,
    pasteHandler,
    currentAttempts,
    printTimer,
    sendCodeHandler,
    timerSeconds,
  } = useCodeFieldLogic({
    codeLength: Number(length),
    setValue: (v) => setValue(name, v),
    control: control,
    name,
    timeout,
    resendCode,
    clearErrors,
    totalAttempts: attempts,
    error,
  });

  function cnFactory(className: string) {
    return (classNamePrefix || "CodeField") + "__" + className;
  }

  return (
    <div
      className={cn(className, cnFactory("container"), {
        [styles.wrapper]: true,
        [cn(styles.wrapper_error, cnFactory("container--error"))]: error,
      })}
    >
      <div className={cn(styles.inputs_wrapper, cnFactory("fields"))}>
        {fieldsArray.map((value, index) => {
          function handlerRef(el: any) {
            arrayOfInputs.current[index] = el;
          }

          return (
            <div
              className={cn(styles.input_wrapper, cnFactory("input_container"))}
            >
              <input
                className={cn(cnFactory("input"), styles.input, {
                  [styles.wrapper_error_number]: error,
                })}
                type="tel"
                autoComplete={"off"}
                key={index}
                maxLength={1}
                id={`${index}-id`}
                data-index={index}
                value={value}
                autoFocus={index == 0}
                ref={handlerRef}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                onClick={onClickHandler}
                onPaste={pasteHandler}
              />
            </div>
          );
        })}
        {error && (
          <div className={cn(cnFactory("error"), styles.error)}>{error}</div>
        )}
      </div>
      <div className={cn(cnFactory("timer"), styles.timer)}>
        {Components?.Timer ? (
          <Components.Timer
            currentAttempts={currentAttempts}
            seconds={timerSeconds}
            totalAttempts={attempts}
            hasAttempts={attempts != currentAttempts}
            printTimer={printTimer}
            resend={sendCodeHandler}
            loading={loading}
          />
        ) : (
          <>
            <div style={{ cursor: "pointer" }} className={styles.timer_text}>
              <div className={styles.repeat_title}>
                {timerSeconds > 0 ? (
                  <>
                    Запросить код еще раз через{" "}
                    <span style={{ fontWeight: 700 }}>{printTimer()}</span>
                  </>
                ) : (
                  <div className={styles.resend_code} onClick={sendCodeHandler}>
                    Повторно отправить код <br /> {currentAttempts} / {attempts}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
