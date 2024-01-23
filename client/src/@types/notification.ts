export interface INotification {
  variant?: "info" | "error" | "success";
  duration?: number;
  text: string;
}

export const defaultNotification: Required<INotification> = {
  variant: "info",
  duration: 6000,
  text: "",
};
