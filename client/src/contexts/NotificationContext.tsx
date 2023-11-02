import Notification from "@/components/Notification";
import { INotification, defaultNotification } from "@/types/notification";
import { AnimatePresence } from "framer-motion";
import { ReactNode, createContext, useState } from "react";
import { useTheme } from "styled-components";

interface NotificationContextProps {
  emitNotification: (settings: INotification) => Promise<unknown>;
  cancelNotification: () => Promise<unknown>;
  isShowing: boolean;
}

const defaultContextProps: Required<NotificationContextProps> = {
  emitNotification: async () => {},
  cancelNotification: async () => {},
  isShowing: false,
};

export const NotificationContext =
  createContext<NotificationContextProps>(defaultContextProps);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState(defaultNotification);
  const [isShowing, setIsShowing] = useState(defaultContextProps.isShowing);
  const [schedules, setSchedules] = useState<number[]>([]);
  const { transitions } = useTheme();
  const transitionDuration = transitions.notification.duration;
  const defineSchedule = (schedule: number) => {
    setSchedules([...schedules, schedule]);
  };
  const hide = (lastHide: boolean, endOfNotification?: (value: unknown) => void) => {
    return new Promise(endOfHide => {
      const end = () => {
        endOfHide(null);

        if (lastHide && endOfNotification) endOfNotification(null);
      };

      setIsShowing(false);
      defineSchedule(setTimeout(end, transitionDuration));
    });
  };
  const emitNotification = (settings: INotification) => {
    return new Promise(endOfNotification => {
      const props = { ...defaultNotification, ...settings };
      const { duration } = props;
      const show = () => {
        setNotification(props);
        setIsShowing(true);
        defineSchedule(setTimeout(() => hide(true, endOfNotification), duration));
      };

      schedules.forEach(id => clearTimeout(id));

      if (isShowing) hide(false).then(() => show());
      else show();
    });
  };
  const cancelNotification = () => {
    return new Promise(endOfNotification => {
      schedules.forEach(id => clearTimeout(id));
      hide(true, endOfNotification);
    });
  };

  return (
    <NotificationContext.Provider
      value={{ emitNotification, cancelNotification, isShowing }}
    >
      <AnimatePresence mode="wait">
        {isShowing && <Notification {...notification} />}
      </AnimatePresence>

      {children}
    </NotificationContext.Provider>
  );
};
