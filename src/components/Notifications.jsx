import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";

export default function Notifications() {
  const { notifications, remove } = useNotification();
  const [removedIds, setRemovedIds] = useState(new Set());

  const handleRemove = (id) => {
    setRemovedIds((prev) => new Set(prev).add(id));
    setTimeout(() => remove(id), 300);
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <svg
            className="w-5 h-5 text-emerald-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 border-emerald-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-white border-slate-200";
    }
  };

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`${getBgColor(
            n.type
          )} border rounded-lg shadow-lg p-4 flex items-start gap-3 transition transform duration-300 w-full pointer-events-auto ${
            removedIds.has(n.id)
              ? "translate-x-[400px] opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">{getIcon(n.type)}</div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900">{n.title}</div>
            {n.message && (
              <div className="text-xs text-gray-700 mt-1">{n.message}</div>
            )}
          </div>
          <button
            onClick={() => handleRemove(n.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
