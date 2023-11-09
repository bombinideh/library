import { apiURL } from "@/config";
import { RequestError } from "@/types/react-query";
import storage from "@/utils/storage";
import useNotification from "./useNotification";

interface useFetchProps {
  URL: string;
  method: string;
}

export default function useFetch<Body = null, Response = unknown>({
  URL,
  method,
}: useFetchProps) {
  const { emitNotification, cancelNotification } = useNotification();
  const notificationId = "fetchError";
  const token = storage.token.get();
  const request = async (body: Body | null = null): Promise<Response> => {
    const response = await fetch(`${apiURL}/${URL}`, {
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
