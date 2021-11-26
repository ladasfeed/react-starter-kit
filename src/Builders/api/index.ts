import { AxiosResponse } from "axios";

export function apiBuilder<T>(
  method: (props: T) => Promise<AxiosResponse<any>>
): (apiProps: T) => Promise<AxiosResponse<any>> {
  const func: (apiProps: T) => Promise<AxiosResponse<any>> = async (
    apiProps: T
  ) => {
    try {
      return await method(apiProps);
    } catch (e: any) {
      throw await e.response;
    }
  };
  return func;
}
