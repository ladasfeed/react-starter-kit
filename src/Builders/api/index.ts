import axios, { AxiosResponse } from "axios";

type returnedType<T> = T extends unknown
  ? () => Promise<AxiosResponse<any>>
  : (apiProps: T) => Promise<AxiosResponse<any>>;

export function apiBuilder<T>(
  method: (props: T) => Promise<AxiosResponse<any>>
): returnedType<T> {
  //@ts-ignore
  const func: returnedType<T> = async (apiProps: T) => {
    try {
      return await method(apiProps);
    } catch (e: any) {
      throw await e.response;
    }
  };
  return func;
}
