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
	classToast?: string;
	classTitle?: string;
	classMessage?: string;
	classPrimary?: string;
	classSecondary?: string;
	classSingle?: string;
	classClose?: string;
	classTimeout?: string;
}

export interface ToastButton {
	label: string;
	action: Function;
}

export enum ToastType {
	SUCCESS = 'success',
	INFO = 'info',
	DANGER = 'danger',
	WARNING = 'warning',
	DENIED = 'denied',
	NORMAL = 0,
}
