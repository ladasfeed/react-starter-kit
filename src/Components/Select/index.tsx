import Select from "react-select";
import React from "react";
import "./index.css";

const CustomOption = ({ innerRef, innerProps, data }: any) => {
  return (
    <div ref={innerRef} {...innerProps}>
      {data.hui}
    </div>
  );
};
export const SelectTest = () => {
  return (
    <div>
      <Select
        components={{
          Option: CustomOption,
          DropdownIndicator: () => <div>Hell</div>,
        }}
        classNamePrefix={"react-select"}
        className={"Select"}
        options={[
          {
            value: "123",
            label: "Blobx",
            hui: "Pervonah",
          },
          {
            value: "123",
            label: "Blobx",
            hui: "Vtoronax",
          },
        ]}
      />
    </div>
  );
};
