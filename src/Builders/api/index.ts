import axios, { AxiosResponse } from "axios";

type returnedType<T> = T extends unknown
  ? () => Promise<AxiosResponse<any>>
  : (apiProps: T) => Promise<AxiosResponse<any>>;

export function apiBuilder<T>(method: T): T {
  //@ts-ignore
  const func = async (apiProps: T) => {
    try {
      //@ts-ignore
      return await method(apiProps);
    } catch (e: any) {
      throw await e.response;
    }
  };
  //@ts-ignore
  return func;
}
const blob = apiBuilder((rpops: { blob: 2 }) => axios.get("/hui"));
