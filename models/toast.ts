export interface Toast {
    title?: string;
    message: string;
    type?: ToastType;
    progress?: boolean;
    icon?: string;
    iconPrimary?: string;
    iconSecondary?: string;
    timeout?: number;
    primary?: ToastButton;
    secondary?: ToastButton;
}

export interface ToastButton {
    label: string;
    action: () => void;
}

export enum ToastType {
    SUCCESS = 'success',
    INFO = 'info',
    DANGER = 'danger',
    WARNING = 'warning',
    DENIED = 'denied',
    NORMAL = 0
}
