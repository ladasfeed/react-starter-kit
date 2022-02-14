import React, { useEffect, useRef, useState } from "react";
import { Control, UseFormClearErrors, useWatch } from "react-hook-form";

const isNumber = (value: string) => {
  return (Number(value) > 0 && Number(value) <= 9) || value == "0";
};

const addZeroToNumber = (value: string | number) => {
  return String(value).length == 1 ? `0${value}` : value;
};

type useCodeFieldType = {
  codeLength: number;
  control: Control<any>;
  name: string;
  setValue: (v: string) => void;
  resendCode?(): void;
  timeout: number;
  clearErrors: UseFormClearErrors<any>;
  totalAttempts: number;
  error?: string;
};
export const useCodeFieldLogic = ({
  codeLength,
  setValue,
  control,
  name,
  clearErrors,
  resendCode,
  timeout,
  totalAttempts,
  error,
}: useCodeFieldType) => {
  // state
  const [tempInput, setTempInput] = useState(0);
  const [fieldsArray, setFieldsArray] = useState<Array<string>>(
    Array(codeLength).fill("")
  );
  const timerId = useRef<number>();
  const arrayOfInputs = useRef<Array<HTMLInputElement | null>>([]);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const field = useWatch({
    control,
    name,
  });
  /* methods */

  // Clear previous interval and set new
  function createTimer() {
    setTimerSeconds(timeout);
    window.clearInterval(timerId.current);
    timerId.current = window.setInterval(updateTimer, 1000);
  }

  // Update timer state
  function updateTimer() {
    setTimerSeconds((v) => {
      if (v <= 1) {
        window.clearInterval(timerId.current);
        return 0;
      } else {
        return v - 1;
      }
    });
  }

  // --
  function printTimer() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    return `${addZeroToNumber(minutes)}:${addZeroToNumber(seconds)}`;
  }

  // resend code: cb() -> increase attempts -> createTimer()
  function sendCodeHandler() {
    if (timerSeconds == 0 && currentAttempts < totalAttempts) {
      resendCode && resendCode();
      setCurrentAttempts((v) => v + 1);
      createTimer();
    }
  }

  const focus = (index: number) => {
    arrayOfInputs.current[index]?.focus();
  };

  const setTempInputHandler = (newInputIndex: number) => {
    focus(newInputIndex);
    setTempInput(newInputIndex);
  };

  // fn takes string value and tries to put it into fields
  const setEntireValue = (value: string) => {
    const valueLength = value.length;
    const tempArray: Array<string> = [...fieldsArray];
    let isValid = true;

    for (let i = 0; i < valueLength && i < codeLength; i++) {
      tempArray[i] = value[i];
      if (!isNumber(value[i])) isValid = false;
    }
    const newIndex =
      valueLength < codeLength - 1 ? valueLength : codeLength - 1;

    if (isValid) {
      setTempInputHandler(newIndex);
      setFieldsArray(tempArray.slice(0, codeLength));
    }
  };

  const pasteHandler = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.clipboardData.getData("Text");
    setEntireValue(value);
  };

  // change input value by its index
  const setFieldsArraySetter = (newIndex: number, value: string) => {
    setFieldsArray(
      fieldsArray.map((item, index) => {
        return index == newIndex ? value : item;
      })
    );
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Backspace") {
      /* If input has value - delete it, else delete
       * prev value
       **/
      if (Boolean(fieldsArray[tempInput])) {
        setFieldsArraySetter(tempInput, "");
      } else if (tempInput != 0) {
        setFieldsArraySetter(tempInput - 1, "");
        setTempInputHandler(tempInput - 1);
      }
    }
  };

  const onChangeHandler = (event: any) => {
    const value = event.nativeEvent.data;

    if (!isNumber(value)) {
      return;
    }

    const eventType = {
      moveIfIsFilled: Boolean(
        tempInput != codeLength - 1 && fieldsArray[tempInput]
      ),
      moveIfIsEmpty: !fieldsArray[tempInput],
    };

    if (eventType.moveIfIsFilled) {
      setFieldsArraySetter(tempInput + 1, value);

      setTempInput(tempInput + 1);
      focus(tempInput + 1);
      return;
    }
    if (eventType.moveIfIsEmpty) {
      setFieldsArraySetter(tempInput, value);

      if (tempInput != codeLength - 1) {
        setTempInput(tempInput + 1);
        focus(tempInput + 1);
      }
      return;
    }
  };

  // Delete next inputs value if input clicked
  const onClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    const inputIndex = Number(event.currentTarget.getAttribute("data-index"));
    focus(inputIndex);
    event.currentTarget.setAttribute("placeholder", "");
    setTempInput(inputIndex);
    setFieldsArray(
      fieldsArray.map((item, index) => {
        return index >= inputIndex ? "" : item;
      })
    );
  };

  /* effects */
  useEffect(() => {
    timerId.current = window.setInterval(updateTimer, 1000);

    return () => {
      window.clearInterval(timerId.current);
    };
  }, []);

  // sync hook form with local and clear errors on change value
  useEffect(() => {
    if (field && field != fieldsArray.join("")) {
      setEntireValue(field);
    }
    if (error) {
      clearErrors(name);
    }
  }, [field]);
  // sync local with hook form
  useEffect(() => {
    setValue(fieldsArray.join(""));
  }, [fieldsArray]);

  /** @TIP there will no any re-renders cause state value is primitive. */

  // Did mount
  useEffect(() => {
    arrayOfInputs.current = arrayOfInputs.current.slice(0, codeLength);
    createTimer();
  }, []);

  return {
    fieldsArray,
    arrayOfInputs,
    onClickHandler,
    pasteHandler,
    onKeyDownHandler,
    onChangeHandler,
    currentAttempts,
    sendCodeHandler,
    printTimer,
    timerSeconds,
  };
};
