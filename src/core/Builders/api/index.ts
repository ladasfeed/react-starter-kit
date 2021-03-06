import axios, { AxiosResponse } from "axios";

type fnType = (...args: any) => any;
type returnedType<T extends fnType> = (
  ...apiArgs: Parameters<T>
) => Promise<AxiosResponse<any>>;

// DEPRECATED
export function apiBuilder<T extends fnType>(method: T): returnedType<T> {
  //@ts-ignore
  const func = async (apiProps: T) => {
    try {
      //@ts-ignore
      return await method(apiProps);
    } catch (e: any) {
      throw await e?.response;
    }
  };
  //@ts-ignore
  return func;
}
