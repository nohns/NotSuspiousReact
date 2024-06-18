/** @format */

import { useQuery } from "@tanstack/react-query";

import client from "@/api/client/axios";

export interface GetExampleRequest {
  userId: string;
}

export interface GetExampleResponse {
  id: string;
  name: string;
}

const getExample = async (): Promise<GetExampleResponse> => {
  const response = await client.get<GetExampleResponse>(`/example`);

  return response.data;
};

const useGetExample = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["example"],
    queryFn: () => getExample(),
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetExample;
