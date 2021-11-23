import { useState } from "react";

export type usePaginatorType = {
   pageCount: number;
   onPageChange: (n: { selected: number }) => void;
   current: number;
   pageRangeDisplayed: number;
   offset: number;
   setCurrent: (val: number) => void;
};
type usePaginatorPropsType = {
   length: number;
   perPage: number;
};
export const usePaginator = ({
   length,
   perPage,
}: usePaginatorPropsType): usePaginatorType => {
   const [current, setCurrent] = useState(0);

   return {
      current,
      pageCount: Math.ceil(length / perPage),
      onPageChange: (n: { selected: number }) => setCurrent(n.selected),
      pageRangeDisplayed: perPage,
      offset: current * perPage,
      setCurrent,
   };
};
