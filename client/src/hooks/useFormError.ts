import { NotificationContext } from "@/contexts/NotificationContext";
import { useContext, useEffect } from "react";
import { FieldValues, FormState } from "react-hook-form";

export default function useFormError<T extends FieldValues>(
  formState: FormState<T>,
) {
  const { errors, isSubmitSuccessful } = formState;
  const { emitNotification, cancelNotification } = useContext(NotificationContext);
  const notificationId = "formError";

  useEffect(() => {
    const [firstErrorKey] = Object.keys(errors);
    const firstError = errors[firstErrorKey as keyof T];

    if (!firstError || !("message" in firstError)) return;

    emitNotification({
      text: firstError.message as string,
      variant: "error",
      id: notificationId,
    });
  }, [errors]);

  useEffect(() => {
    if (isSubmitSuccessful) cancelNotification(notificationId);
  }, [isSubmitSuccessful]);
}
