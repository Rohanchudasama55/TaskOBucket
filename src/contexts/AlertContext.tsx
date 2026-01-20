import { createContext, useContext, useState } from "react";
import type { Alert, AlertContextType, AlertType } from "./types";

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: any }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const showAlert = (message: string, type: AlertType) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setAlerts((prev) => prev.filter((alert) => alert.id !== id));
        }, 3000);
    };

    const removeAlert = (id: number) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    const getIcon = (type: AlertType) => {
        const iconProps = "width: 20px; height: 20px;";
        switch (type) {
            case "success":
                return (
                    <svg style={{ ...parseStyle(iconProps), fill: "green" }} viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "error":
                return (
                    <svg style={{ ...parseStyle(iconProps), fill: "red" }} viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 10A8 8 0 11.001 10 8 8 0 0118 10zm-9-3a1 1 0 112 0v2a1 1 0 11-2 0V7zm0 4a1 1 0 100 2 1 1 0 000-2z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "info":
                return (
                    <svg style={{ ...parseStyle(iconProps), fill: "blue" }} viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 10A8 8 0 11.001 10 8 8 0 0118 10zM9 7a1 1 0 112 0 1 1 0 01-2 0zm1 3a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "warning":
                return (
                    <svg style={{ ...parseStyle(iconProps), fill: "orange" }} viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.593c.75 1.333-.213 2.998-1.742 2.998H3.48c-1.53 0-2.492-1.665-1.742-2.998L8.257 3.1zM11 14a1 1 0 11-2 0 1 1 0 012 0zm-.25-2.5a.75.75 0 01-1.5 0V8a.75.75 0 011.5 0v3.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
        }
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <div className="alert-container">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`alert alert-${alert.type}`}>
                        <div className="alert-icon">{getIcon(alert.type)}</div>
                        <div className="alert-message">{alert.message}</div>
                        <button className="alert-close" onClick={() => removeAlert(alert.id)}>
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) throw new Error("useAlert must be used within AlertProvider");
    return context.showAlert;
};

// helper
function parseStyle(style: string): Record<string, string> {
    return Object.fromEntries(style.split(";").filter(Boolean).map(s => {
        const [key, value] = s.split(":").map(part => part.trim());
        return [key, value];
    }));
}
