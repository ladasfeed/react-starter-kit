import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";

namespace filtersTypes {
  export type limitOffset = {
    limit: number;
    offset: number;
  };
  export type amount = {
    limit: number;
    offset: number;
  };
  export type date = {
    date_to?: string;
    date_from: string;
  };
  export type dateAmountLimitUnion = limitOffset & amount & date;
}

export type useFiltersPropsType<T> = {
  initialState: any;
  defaultValues: {
    [key in keyof filtersTypeCreator<T>]: any;
  };
  queryKey: string;
  queryFn: (data: any) => Promise<any>;
  scheme?: any;
};

export type filtersTypeCreator<T> = {
  [key in keyof T]: any;
};

/**
 * @Props
 * initialState фильтров,
 * defaultValues полей для сброса,
 * queryKey полей для useQuery,
 * queryFn апи метод получения данных
 * @Result
 * isLoading,
 * applyFiltersHandler,
 * resetHandler,
 * showMoreHandler,
 * data,
 * form ( hook-form )
 * */
//@TODO вернуть hasMoreItems
export function useFilters<T, DataType>({
  initialState,
  defaultValues,
  queryKey,
  queryFn,
  scheme,
}: useFiltersPropsType<T>) {
  const [data, setData] = useState<Array<DataType>>([]);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [filters, setFilters] = useState<
    filtersTypeCreator<T> & filtersTypes.limitOffset
  >(initialState);

  const form = useForm<any>({
    //@ts-ignore
    defaultValues,
    reValidateMode: "onSubmit",
    resolver: scheme ? yupResolver(scheme) : scheme,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (filters: any) => queryFn(filters),
    onSuccess: (response: any) => {
      setData((prev) => [...prev, ...response?.data?.data.items]);
      setItemsCount(response?.data?.data.items_count);
    },
  });

  const applyFiltersHandler = (filters: any) => {
    setData([]);
    setFilters({
      ...filters,
      offset: initialState?.offset || 0,
      limit: initialState?.limit || 10,
    });
  };

  const resetHandler = () => {
    setData([]);
    setItemsCount(0);
    setFilters({ ...initialState });
    form.reset();
  };

  const showMoreHandler = () => {
    setFilters((prev: any) => {
      return {
        ...prev,
        limit: initialState?.limit || 10,
        offset: prev.offset + initialState?.limit,
      };
    });
  };

  useEffect(() => {
    mutate(filters);
  }, [filters]);

  return {
    hasMoreItems: filters.offset + filters.limit <= itemsCount,
    isLoading: isLoading,
    applyFiltersHandler,
    resetHandler,
    showMoreHandler,
    data,
    form,
  };
}
