import React from "react";
import { useNotification } from "../context/NotificationContext";

export default function Notifications() {
  const { notifications, remove } = useNotification();

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col-reverse gap-3 max-w-sm">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`rounded-lg shadow-lg p-3 border-l-4 flex items-start gap-3 transition transform bg-white w-full ${
            n.type === "success"
              ? "border-emerald-400"
              : n.type === "error"
              ? "border-red-400"
              : "border-sky-400"
          }`}
        >
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-800">{n.title}</div>
            {n.message && (
              <div className="text-xs text-gray-600 mt-1">{n.message}</div>
            )}
          </div>
          <button
            onClick={() => remove(n.id)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Fechar
          </button>
        </div>
      ))}
    </div>
  );
}
