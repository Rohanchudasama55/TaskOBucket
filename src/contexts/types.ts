export type AlertType = "success" | "error" | "info" | "warning";

export interface Alert {
    id: number;
    message: string;
    type: AlertType;
}

export interface AlertContextType {
    showAlert: (message: string, type: AlertType) => void;
}