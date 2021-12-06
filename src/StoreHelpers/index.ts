import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const createInitialState = (sagaActions: any) => {
  let temp: any = {};
  let groupKey: keyof typeof sagaActions;
  for (groupKey in sagaActions) {
    const group = sagaActions[groupKey];
    let actionKey: keyof typeof group;
    // @ts-ignore
    for (actionKey in group) {
      // @ts-ignore
      temp[`${group[actionKey].type}`] = false;
    }
  }
  return temp;
};

export const createLoadingState = <T>(sagaActions: T) => {
  const slice = createSlice({
    name: "@loadingStateSlice",
    initialState: createInitialState(sagaActions),
    reducers: {
      set: (
        state,
        {
          payload,
        }: PayloadAction<{
          key: string;
          value: boolean;
        }>
      ) => {
        state[payload.key] = payload.value;
      },
      clear: () => {},
    },
  });

  const get = (key: string) => (state: any) => {
    return state.loadingState[key] as boolean;
  };

  const set = (key: string, value: boolean) => {
    return slice.actions.set({
      key,
      value,
    });
  };

  return {
    slice,
    get,
    set,
  };
};
