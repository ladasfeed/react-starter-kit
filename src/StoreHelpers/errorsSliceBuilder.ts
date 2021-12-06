import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  fieldsErrors: {},
  globalError: "",
};

export default <T>(props: T) => {
  const slice = createSlice({
    name: "errorsReducer",
    initialState,
    reducers: {
      setFieldsErrors: (state, { payload }: PayloadAction<any>) => {
        state.fieldsErrors = payload;
      },

      setGlobalError: (state, { payload }: PayloadAction<string>) => {
        state.globalError = payload;
      },
      removeFieldError: (state, { payload }: PayloadAction<string>) => {
        const oldErrors = { ...state.fieldsErrors };
        delete oldErrors[payload];
        state.fieldsErrors = oldErrors;
      },
    },
  });

  const selectors = {
    fieldsErrors: (state: any) => state.errorsSlice.fieldsErrors,
    globalError: (state: any) => state.errorsSlice.globalError,
  };

  return {
    slice,
    selectors,
  };
};
