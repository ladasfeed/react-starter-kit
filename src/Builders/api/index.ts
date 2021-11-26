import { AxiosResponse } from "axios";

export function apiBuilder<T>(
  method: (props: T) => Promise<AxiosResponse<any>>
): (apiProps: T) => Promise<AxiosResponse<any>> {
  return async (apiProps: T) => {
    try {
      return await method(apiProps);
    } catch (e: any) {
      throw await e.response;
    }
  };
}
