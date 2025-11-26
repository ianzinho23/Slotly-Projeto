import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const idRef = useRef(1);

  const remove = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    (type, title, message, timeout = 4500) => {
      const id = idRef.current++;
      setNotifications((prev) => [{ id, type, title, message }, ...prev]);
      if (timeout > 0) setTimeout(() => remove(id), timeout);
      return id;
    },
    [remove]
  );

  const value = {
    notifications,
    notify,
    success: (title, message, timeout) =>
      notify("success", title, message, timeout),
    error: (title, message, timeout) =>
      notify("error", title, message, timeout),
    info: (title, message, timeout) => notify("info", title, message, timeout),
    remove,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}

export default NotificationContext;
