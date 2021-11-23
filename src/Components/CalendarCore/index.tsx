import React, { FC, useEffect, useState } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import DatePicker from "react-datepicker";
import styles from "Components/CalendarCore/index.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-starter-kit/src/Components/CalendarCores";
import { CalendarHeader } from "./Bricks/CalendarHeader";
import {
  formatWeekDay,
  renderDayContents,
} from "Components/CalendarCore/helpers";

type propsType = {
  control: Control<any>;
  name: string;
  big?: boolean;
  highlightDates?: any[];
  placeholder?: string;
  rightCalendar?: boolean;
  className?: string;
  error?: string;
  style?: any;
  defaultValue?: Date;
};

type constructorType = {
  Input: FC<any>;
  icons: {
    arrow?: FC<any>;
    calendar?: FC<any>;
  };
};

export const CalendarBuilder = (constructor: constructorType) => {
  const Calendar: FC<propsType> = ({
    control,
    name,
    big,
    highlightDates,
    placeholder = "Дата",
    rightCalendar = false,
    className,
    error,
    style,
    defaultValue,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
      setDidMount(true);
    }, []);
    const close = () => setIsOpen(false);

    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <DatePicker
              // locale={ru}
              formatWeekDay={formatWeekDay}
              inline={big}
              // dateIcon={<CalendarIcon />}
              popperClassName={cn({
                [styles.right]: rightCalendar,
              })}
              open={isOpen}
              selected={field.value}
              highlightDates={highlightDates}
              renderDayContents={renderDayContents}
              renderCustomHeader={(props) => (
                <CalendarHeader big={big} {...props} />
              )}
              onChange={(date) => {
                field.onChange(date);
                close();
              }}
              onBlur={close}
              dateFormat="dd.MM.yyyy"
              placeholderText={placeholder}
              //@ts-ignore
              customInputRef={field.ref}
              name={field.name}
              value={field.value}
              customInput={React.createElement(constructor.Input, {
                support: constructor.icons.calendar
                  ? React.createElement(constructor.icons.calendar, {
                      className: styles.icon,
                      onClick: () => setIsOpen(!isOpen),
                    })
                  : undefined,
                className: styles.input,
                placeholder: placeholder,
                label: placeholder,
                error: error,
              })}
            />
          );
        }}
      />
    );
  };

  return Calendar;
};
