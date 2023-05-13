import React from "react";
import useEscapeKey from "../../hooks/use-escapekey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(({message, variant}) => {
    setToasts([...toasts, { 
      id: crypto.randomUUID(), 
      message, 
      variant 
    }]);
  }, [toasts]);

  function removeToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  };

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(handleEscape);

  return (
    <ToastContext.Provider
        value={{
          toasts,
          addToast,
          removeToast
        }}
      >
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
