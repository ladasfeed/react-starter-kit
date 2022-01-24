import { useFormContext, UseFormReturn } from "react-hook-form";

type propsType = {
  children(props: UseFormReturn<any, any>): JSX.Element;
};
export function ConnectedForm({ children }: propsType) {
  const form = useFormContext();
  return children({ ...form });
}
