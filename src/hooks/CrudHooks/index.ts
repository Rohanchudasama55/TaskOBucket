/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/axios";

type DeleteByIdProps = {
  apiname: string;
  id: number | string | Array<number | string>;
};

export const useDeleteById = () => {
  return useMutation({
    mutationFn: async ({
      apiname,
      id,
    }: DeleteByIdProps): Promise<AxiosResponse> => {
      if (Array.isArray(id)) {
        const config = {
          data: {
            Id: id,
          },
        };
        return await api.delete(apiname, config);
      } else {
        throw new Error("Invalid ID format");
      }
    },
  });
};

export const useCreateUpdate = <
  T extends Record<string, any> | FormData
>(
  apiname: string,
  id?: string | number,
  isId?: boolean 
) => {
  return useMutation<AxiosResponse, unknown, T>({
    mutationFn: async (data: T) => {
      // Decide URL
      const url = id && !isId ? `${apiname}/${id}` : apiname;

      // Decide Content-Type
      const config = {
        headers: data instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' }
      };

      if (id && !isId) {
        // Normal: PUT with /id
        return await api.put(url, data, config);
      } else if (isId) {
        // Forced: PUT without /id
        return await api.put(url, data, config);
      } else {
        // Default: POST
        return await api.post(url, data, config);
      }
    },
  });
};


 type APIResponse<T> = {
  Data: T;
  [key: string]: any;
};

const fetchAllID = async <T>(
  apiname: string,
  id?: string | number | undefined,
  urlApi?: string
): Promise<T> => {
  if (id === undefined || id === null) {
    return {} as T;
  }

  const url = urlApi ? urlApi : `${apiname}/GetById?id=${id}`;

  const response = await api.get<APIResponse<T>>(url.trim());
  return response.data.Data;
};

export const useFetchAllID = <T>(
  apiname: string,
  id?: string | number | undefined,
  urlApi?: string
) => {
  return useQuery<T>({
    queryKey: ["fetchAll", apiname, id, urlApi],
    queryFn: () => fetchAllID<T>(apiname, id, urlApi),
  });
};
