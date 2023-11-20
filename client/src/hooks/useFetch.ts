import { apiURL } from "@/config";
import { RequestError } from "@/types/react-query";
import storage from "@/utils/storage";
import useNotification from "./useNotification";

interface useFetchProps {
  URL: string;
  method: string;
  queryParams?: Record<string, string | number>;
}

export default function useFetch<Body = null, Response = unknown>({
  URL,
  method,
  queryParams,
}: useFetchProps) {
  const { emitNotification, cancelNotification } = useNotification();
  const notificationId = "fetchError";
  const token = storage.token.get();
  const formatQueryParams = (
    queryParams: NonNullable<useFetchProps["queryParams"]>,
  ) => {
    const keys = Object.keys(queryParams);
    const eachParam = keys.map(key => `${key}=${queryParams[key]}`);

    return eachParam.join("&");
  };
  const request = async (body: Body | null = null): Promise<Response> => {
    const baseUrl = `${apiURL}/${URL}`;
    const finalURL = queryParams
      ? `${baseUrl}?${formatQueryParams(queryParams)}`
      : baseUrl;
    const response = await fetch(finalURL, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    const data = await response.json();

    if (!response.ok) {
      const message = data.error || "Desculpe, um erro desconhecido ocorreu";
      const requestError: RequestError = { message, statusCode: response.status };

      if (method !== "GET")
        emitNotification({
          text: message,
          variant: "error",
          duration: 4000,
          id: notificationId,
        });

      throw requestError;
    }

    cancelNotification(notificationId);
    return data;
  };

  return request;
}
