import createLoadingState from "./loadingSliceBuilder";
import createErrorsSlice from "./errorsSliceBuilder";

export const SliceBuilders = {
  loading: createLoadingState,
  errors: createErrorsSlice,
};
